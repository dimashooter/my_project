import { HTMLAttributes, memo, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export type CardVariant = 'normal' | 'outline' | 'light'
export type CardPadding = '0' | '8' | '16' | '24'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    variant?: CardVariant;
    max?: boolean;
    padding?: CardPadding
}
const mapPaddingToClass: Record<CardPadding, string> = {
    "0": 'padding_0',
    "8": 'padding_8',
    "16": 'padding_16',
    "24": 'padding_24',
}
export const Card = memo((props: CardProps) => {
    const {
        className,
        children,
        variant = 'normal',
        max = false,
        padding = '8',
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.max]: max,
    };

    const paddings = mapPaddingToClass[padding]


    return (
        <div
            className={classNames(cls.Card, mods, [className, cls[variant], cls[paddings]])}
            {...otherProps}
        >
            {children}
        </div>
    );
});
