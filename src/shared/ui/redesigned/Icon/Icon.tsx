import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';


type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>

interface IconBaseProps extends SvgProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    size?: number
}

interface NonClickableIconProps extends IconBaseProps {
    clickable?: false
}

interface ClickableIconProps extends IconBaseProps {
    clickable: true
    onClick: () => void
}

type IconProps = NonClickableIconProps | ClickableIconProps

export const Icon = memo((props: IconProps) => {
    const { className, Svg, size = 32, clickable, ...otherProps } = props;

    const icon = <Svg
        className={className}
        width={size}
        height={size}
        onClick={undefined}
        {...otherProps}
    />

    if (clickable) {
        return <button type='button' className={classNames(cls.button, {}, [])}>{icon}</button>
    }
    return icon
});
