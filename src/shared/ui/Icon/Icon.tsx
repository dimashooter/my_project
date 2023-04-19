import { Mods, classNames } from '@/shared/lib/classNames/classNames';
import React, { memo } from 'react';
import cls from './Icon.module.scss';

interface IconProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>
    inverted?: boolean
}

export const Icon = memo((props: IconProps) => {
    const { className, Svg, inverted } = props;

    const mods: Mods = {
        [cls.inverted]: inverted,
    };

    return (
        <Svg className={classNames(cls.Icon, mods, [className])} />
    );
});
