import { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '../Button/Button';
import { Input, InputProps } from '../Input/Input';
import cls from './Passowrdinput.module.scss';
import { HStack } from '../Stack';

interface PassowrdInputProps extends InputProps {
    className?: string;
}

export const PasswordInput = memo((props: PassowrdInputProps) => {
    const { className, onChange, value, ...otherProps } = props;
    // const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     onChange?.(e.target.value);
    // };
    const [show, setShow] = useState<boolean>(false);

    const onHandleShow = useCallback(() => {
        setShow(!show);
    }, [show]);

    return (
        <HStack max justifyContent='between' gap='8'
            className={classNames(cls.PasswordInput, {}, [className])}>
            <Input
                className={className}
                type={show ? 'text' : 'password'}
                onChange={onChange}
                value={value}
                {...otherProps}
            />
            <Button
                className={cls.show_btn}
                type="button"
                onClick={onHandleShow}
            >
                {show ? 'hide' : 'show'}
            </Button>
        </HStack>
    );
});
