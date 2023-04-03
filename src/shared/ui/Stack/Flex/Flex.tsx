import { memo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './Flex.module.scss';

type FlexJustify = 'center' | 'start' | 'end' | 'between'
type FlexAlign = 'start' |'center' | 'end'
type FlexDirection = 'column' | 'row'
type FlexGap = '4' | '8' | '16' | '32'

const justifyClasses: Record<FlexJustify, string> = {
    start: cls.justifyStart,
    center: cls.justifyCenter,
    end: cls.justifyEnd,
    between: cls.justifyBetween,
};
const alignClasses: Record<FlexAlign, string> = {
    start: cls.alignStart,
    center: cls.alignCenter,
    end: cls.alignEnd,
};
const directionClasses: Record<FlexDirection, string> = {
    column: cls.column,
    row: cls.row,
};
const gapClasses: Record<FlexGap, string> = {
    8: cls.gap8,
    16: cls.gap16,
    32: cls.gap32,
    4: cls.gap4,
};

export interface FlexProps {
className?: string
children?: React.ReactNode
justifyContent?:FlexJustify
alignItems?:FlexAlign
direction?:FlexDirection
gap?:FlexGap
max?:boolean
}

export const Flex = memo((props:FlexProps) => {
    const {
        className, children, justifyContent = 'start', alignItems = 'center', direction = 'row', gap, max,
    } = props;

    const mods: Mods = {
        [cls.max]: max,
    };
    const classes = [
        className,
        justifyClasses[justifyContent],
        alignClasses[alignItems],
        directionClasses[direction],
        gap && gapClasses[gap],
    ];

    return (
        <div className={classNames(cls.Flex, mods, classes)}>
            {children}
        </div>
    );
});
