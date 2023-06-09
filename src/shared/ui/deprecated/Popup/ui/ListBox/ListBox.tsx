import { Fragment, ReactNode, useMemo } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import SelectIcon from '@/shared/assets/icons/done-20-20.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '../../../../redesigned/Stack';
import { Button } from '../../../Button/Button';
import cls from './ListBox.module.scss';
import PopupCls from '../../styles/popup.module.scss';
import { directionClasses, directionType } from '../../styles/variables';

type ListBoxItem = {
    content: ReactNode;
    value: string;
    disabled?: boolean;
};

interface ListBoxProps {
    label?: string;
    className?: string;
    items?: ListBoxItem[];
    value?: string;
    defaultValue?: string;
    onChange: <T extends string>(value: T) => void;
    readonly?: boolean;
    direction?: directionType;
}


export const ListBox = (props: ListBoxProps) => {
    const {
        items,
        defaultValue,
        value,
        className,
        onChange,
        label,
        readonly,
        direction = 'top right',
    } = props;

    const directionClass = [directionClasses[direction]];

    const selectedItem = useMemo(() => {
        return items?.find(item => item.value === value)
    }, [items, value])

    return (
        <HStack gap="16">
            {label && <div>{label}</div>}
            <HListBox
                disabled={readonly}
                as="div"
                className={classNames('', {}, [className, PopupCls.relative])}
                value={value}
                onChange={onChange}
            >
                <HListBox.Button as={Button} className={cls.button}>
                    {selectedItem?.content ?? defaultValue}
                </HListBox.Button>
                <HListBox.Options
                    className={classNames(cls.ListItems, {}, directionClass)}
                >
                    {items?.map((item) => (
                        <HListBox.Option
                            key={item.value}
                            value={item.value}
                            as={Fragment}
                            disabled={item.disabled}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={classNames(
                                        cls.ListItem,
                                        { [cls.active]: active },
                                        [],
                                    )}
                                >
                                    {selected && <SelectIcon />}
                                    {item.content}
                                </li>
                            )}
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>
    );
};
