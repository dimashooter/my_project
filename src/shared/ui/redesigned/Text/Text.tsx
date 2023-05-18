import { memo } from 'react';
import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export type TextVariant = "primary" | 'error' | 'accent'

export type TextAlign = 'left' | 'right' | 'center'

export type TextSize = 's' | 'm' | 'l'

export type HeaderTagsType = 'h1' | 'h2' | 'h3';

const mapSizeToClass: Record<TextSize, string> = {
    l: 'size_l',
    m: 'size_m',
    s: 'size_s',
};

const mapSizeToHeaderTag: Record<TextSize, HeaderTagsType> = {
    l: 'h1',
    m: 'h2',
    s: 'h3',
};

interface TextProps {
    className?: string;
    title?: string | null;
    text?: string | null;
    TextVariant?: TextVariant;
    align?: TextAlign;
    size?: TextSize;
    bold?: boolean;
}

export const Text = memo((props: TextProps) => {
    const {
        className,
        text,
        title,
        TextVariant = 'primary',
        align = 'left',
        size = 'm',
        bold
    } = props;

    const HeaderTag = mapSizeToHeaderTag[size];
    const sizeClass = mapSizeToClass[size];

    const mods: Mods = {
        [cls.bold]: bold
    }

    return (
        <div className={classNames(cls.Text, mods, [className, cls[TextVariant], cls[align], sizeClass])}>
            {title && <HeaderTag className={cls.title}>{title}</HeaderTag>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    );
});
