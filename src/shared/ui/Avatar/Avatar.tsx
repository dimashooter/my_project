import { CSSProperties, useMemo } from 'react';
import UserIcon from '../../assets/icons/avatar-filled.svg';
import cls from './Avatar.module.scss';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { AppImage } from '../AppImage';
import { Skeleton } from '../Skeleton/Skeleton';
import { Icon } from '../Icon/Icon';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
    fallbackInverted?: boolean;
}

export const Avatar = ({
    className,
    src,
    size = 100,
    alt,
    fallbackInverted,
}: AvatarProps) => {
    const mods: Mods = {};

    const styles = useMemo<CSSProperties>(
        () => ({
            width: size || 100,
            height: size || 100,
        }),
        [size],
    );
    const ErrorFallback = (
        <Icon
            inverted={fallbackInverted}
            width={size}
            height={size}
            Svg={UserIcon}
        />
    );
    const Fallback = <Skeleton border="50%" width={30} height={30} />;
    return (
        <AppImage
            Errorfallback={ErrorFallback}
            fallback={Fallback}
            src={src}
            alt={alt}
            style={styles}
            className={classNames(cls.Avatar, mods, [className])}
        />
    );
};
