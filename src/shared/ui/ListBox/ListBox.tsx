import { Fragment, ReactNode, useState } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import SelectIcon from 'shared/assets/icons/done-20-20.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ListBox.module.scss';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import { HStack } from '../Stack';

type ListBoxItem = {
    content:ReactNode
    value:string;
    disabled?:boolean
}
type directionType = 'top' | 'bottom'

const mapDirection: Record<directionType, string> = {
    bottom: cls.bottom,
    top: cls.top,
};
interface ListBoxProps {
    label?:string
    className?:string
    items?: ListBoxItem[];
    value?:string;
    defaultValue?:string
    onChange: <T extends string>(value:T) => void
    readonly?:boolean
    direction?: directionType
}

export const ListBox = (props:ListBoxProps) => {
    const {
        items, defaultValue, value, className, onChange, label, readonly, direction = 'top',
    } = props;

    const directionClass = [mapDirection[direction]];

    return (
        <HStack gap="16">
            {label && <div>{label}</div>}
            <HListBox
                disabled={readonly}
                as="div"
                className={classNames(cls.ListBox, { }, [className])}
                value={value}
                onChange={onChange}
            >
                <HListBox.Button className={cls.button}>
                    <Button>
                        {value ?? defaultValue}
                    </Button>
                </HListBox.Button>
                <HListBox.Options className={classNames(cls.ListItems, {}, directionClass)}>
                    {items?.map((item) => (
                        <HListBox.Option
                            key={item.value}
                            value={item.value}
                            as={Fragment}
                            disabled={item.disabled}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={classNames(cls.ListItem, { [cls.active]: active }, [])}
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
