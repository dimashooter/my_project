import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useState } from 'react';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { LoginModal } from '@/features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { AvatarDropdown } from '@/features/AvatarDropdown/ui/AvatarDropdown';
import { Drawer } from '@/shared/ui/Drawer/Drawer';
import { HStack } from '@/shared/ui/Stack';
import { NotificationList } from '@/entities/Notification';
import { NotificationButton } from '@/features/NotificationButton/NotificationButton';
import { detectDevice } from '@/shared/lib/helpers/detectDevice';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);

    const dispatch = useDispatch();

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <HStack gap="16" className={cls.actions}>
                    <NotificationButton />
                    <AvatarDropdown className={cls.dropdown} />
                </HStack>

            </header>
        );
    }

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>

            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onShowModal}
            >
                {t('Войти')}
            </Button>
            {isAuthModal && (
                <LoginModal
                    isOpen={isAuthModal}
                    onClose={onCloseModal}
                />
            )}
        </header>
    );
});
