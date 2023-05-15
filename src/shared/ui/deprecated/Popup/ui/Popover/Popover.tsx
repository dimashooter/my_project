import { Popover } from '@headlessui/react';
import { ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { directionClasses, directionType } from '../../styles/variables';
import cls from '../../styles/popup.module.scss';

interface HPopoverProps {
    classname?: string;
    trigger: ReactNode;
    direction?: directionType;
    children: ReactNode;
}

/**
    * use redesigned folder components
    * @deprecated
    */
export function HPopover(props: HPopoverProps) {
    const { classname, direction = 'bottom left', trigger, children } = props;

    const optionClasses = [directionClasses[direction]];

    return (
        <Popover
            className={classNames(cls.Popover, {}, [classname, cls.relative])}
        >
            <Popover.Button as="div" className={cls.trigger}>
                {trigger}
            </Popover.Button>

            <Popover.Panel
                unmount
                className={classNames(cls.panel, {}, optionClasses)}
            >
                {children}
            </Popover.Panel>
        </Popover>
    );
}
