import React, { ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/app/providers/ThemeProvider';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import cls from './Modal.module.scss';
import { Portal } from '../../deprecated/Portal/Portal';
import { Overlay } from '../../deprecated/Overlay/Overlay';
import { toggleFeatures } from '@/shared/lib/features';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

export const Modal = (props: ModalProps) => {
    const { className, children, isOpen, onClose, lazy } = props;
    const { theme } = useTheme();

    const { isClosing, isMounted, closeHandler, onContentClick } = useModal({
        animationDelay: 300,
        isOpen,
        onClose,
    });

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <div
                className={classNames(cls.Modal, mods, [
                    className,
                    theme,
                    'app_modal',
                    toggleFeatures({ name: 'isAppRedesigned', on: () => cls.ModalNew, off: () => cls.ModalOld })
                ])}
            >
                <Overlay onClick={closeHandler} />
                <div className={cls.content} onClick={onContentClick}>
                    {children}
                </div>
            </div>
        </Portal>
    );
};
