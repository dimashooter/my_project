import { Fragment, ReactNode } from 'react';
import { Menu } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Dropdown.module.scss';
import { AppLink } from '../AppLink/AppLink';

type Links = {
    disabled?:boolean
    content?:ReactNode
    onClick?: () => void
    href?: string
}
type directionType = 'top left' | 'top right' | 'bottom left' | 'bottom right'

const directionClasses:Record<directionType, string> = {
    'bottom left': cls.optionsBottomLeft,
    'bottom right': cls.optionsBottomRight,
    'top left': cls.optionsTopLeft,
    'top right': cls.optionsTopRight,
};

interface DropdownProps {
    className?:string
    items?: Links[]
    trigger:ReactNode
    direction?:directionType
}

export function MyDropdown(props:DropdownProps) {
    const {
        className, items, trigger, direction = 'bottom right',
    } = props;

    const optionClasses = [directionClasses[direction]];
    return (
        <Menu as="div" className={classNames(cls.Dropdown, {}, [className])}>
            <Menu.Button className={cls.btn}>
                {trigger}
            </Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, optionClasses)}>
                {items?.map((item) => {
                    const content = ({ active }: {active: boolean}) => (
                        <button
                            type="button"
                            disabled={item.disabled}
                            onClick={item.onClick}
                            className={classNames(cls.item, { [cls.active]: active })}
                        >
                            {item.content}
                        </button>
                    );

                    if (item.href) {
                        return (
                            <Menu.Item as={AppLink} to={item.href} disabled={item.disabled}>
                                {content}
                            </Menu.Item>
                        );
                    }

                    return (
                        <Menu.Item as={Fragment} disabled={item.disabled}>
                            {content}
                        </Menu.Item>
                    );
                })}

            </Menu.Items>
        </Menu>
    );
}
