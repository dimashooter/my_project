import { Fragment, ReactNode } from 'react';
import { Menu } from '@headlessui/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '../../../AppLink/AppLink';
import cls from './Dropdown.module.scss';
import PopupCls from '../../styles/popup.module.scss';
import { directionClasses, directionType } from '../../styles/variables';

type Links = {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
};

interface DropdownProps {
    className?: string;
    items?: Links[];
    trigger: ReactNode;
    direction?: directionType;
}



export function MyDropdown(props: DropdownProps) {
    const { className, items, trigger, direction = 'bottom left' } = props;

    const optionClasses = [directionClasses[direction], PopupCls.menu];
    return (
        <Menu
            as="div"
            className={classNames('', {}, [className, PopupCls.relative])}
        >
            <Menu.Button as="div" className={cls.trigger}>
                {trigger}
            </Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, optionClasses)}>
                {items?.map((item, idx) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            type="button"
                            disabled={item.disabled}
                            onClick={item.onClick}
                            className={classNames(cls.item, {
                                [cls.active]: active,
                            })}
                            key={idx}
                        >
                            {item.content}
                        </button>
                    );

                    if (item.href) {
                        return (
                            <Menu.Item
                                as={AppLink}
                                to={item.href}
                                disabled={item.disabled}
                                key={idx}
                            >
                                {content}
                            </Menu.Item>
                        );
                    }

                    return (
                        <Menu.Item
                            as={Fragment}
                            disabled={item.disabled}
                            key={idx}
                        >
                            {content}
                        </Menu.Item>
                    );
                })}
            </Menu.Items>
        </Menu>
    );
}
