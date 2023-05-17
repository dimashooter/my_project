import React, {
    InputHTMLAttributes,
    ReactNode,
    memo,
    useEffect,
    useRef,
    useState,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import { Text } from '../Text/Text';
import { HStack } from '../Stack';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly'
>;

export interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    autofocus?: boolean;
    readonly?: boolean;
    addonLeft?: ReactNode
    addonRight?: ReactNode
    label?: string
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        label,
        type = 'text',
        placeholder = '',
        autofocus,
        readonly,
        addonLeft,
        addonRight,
        ...otherProps
    } = props;
    const ref = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autofocus]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    const onBlur = () => {
        setIsFocused(false);
    };

    const onFocus = () => {
        setIsFocused(true);
    };

    const mods: Mods = {
        [cls.readonly]: readonly,
        [cls.focused]: isFocused,
        [cls.withAddonLeft]: Boolean(addonLeft),
        [cls.withAddonRight]: Boolean(addonRight),
    };

    const input = <div className={classNames(cls.InputWrapper, mods, [className])}>
        <div className={cls.addonLeft}>{addonLeft}</div>
        <input
            placeholder={placeholder}
            ref={ref}
            type={type}
            value={value}
            onChange={onChangeHandler}
            className={cls.input}
            onFocus={onFocus}
            onBlur={onBlur}
            readOnly={readonly}
            {...otherProps}
        />
        <div className={cls.addonRight}>{addonRight}</div>
    </div>
    if (label) {
        return (
            <HStack max gap='8'>
                < Text text={label} />
                {input}
            </HStack >
        );
    }
    return input
});
