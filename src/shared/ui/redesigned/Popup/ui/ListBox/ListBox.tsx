import { Fragment, ReactNode, useMemo } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import SelectIcon from '@/shared/assets/icons/done-20-20.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '../../../../redesigned/Stack';
import { Button } from '../../../Button/Button';
import cls from './ListBox.module.scss';
import Arrow from '@/shared/assets/icons/Arrow_horizontal.svg'
import PopupCls from '../../styles/popup.module.scss';
import { directionClasses, directionType } from '../../styles/variables';
import { Icon } from '../../../Icon/Icon';
import { Text } from '../../../Text/Text';

type ListBoxItem<T extends string> = {
    content: ReactNode;
    value: string;
    disabled?: boolean;
};

interface ListBoxProps<T extends string> {
    label?: string | null | undefined;
    className?: string;
    items?: ListBoxItem<T>[];
    value?: T;
    defaultValue?: string;
    onChange: (value: T) => void;
    readonly?: boolean;
    direction?: directionType;
}


export function ListBox<T extends string>(props: ListBoxProps<T>) {
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

    const directionClass = [directionClasses[direction], PopupCls.menu];

    const selectedItem = useMemo(() => {
        return items?.find(elem => elem.value === value)
    }, [items, value])

    return (
        <HStack gap="16" max alignItems='start'>
            <HListBox
                disabled={readonly}
                as="div"
                className={classNames('', {}, [className, PopupCls.relative])}
                value={value}
                onChange={onChange}
            >
                <HStack max gap='8'>
                    {label && <Text text={label} />}
                    <HListBox.Button as={Button} className={cls.button} variant='filled'
                        addonRight={<Icon Svg={Arrow} />}>
                        {selectedItem?.content ?? defaultValue}
                    </HListBox.Button>
                </HStack>
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
                                        {
                                            [cls.active]: active,
                                            [cls.disabled]: item.disabled,
                                            [cls.selected]: selected
                                        },

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
