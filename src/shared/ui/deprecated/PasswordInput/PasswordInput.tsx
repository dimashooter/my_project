import { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '../Button/Button';
import { Input, InputProps } from '../Input/Input';
import cls from './Passowrdinput.module.scss';

interface PassowrdInputProps extends InputProps {
    className?: string;
}

/**
    * use redesigned folder components
    * @deprecated
    */
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
        <div className={classNames(cls.PasswordInput, {}, [className])}>
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
        </div>
    );
});
