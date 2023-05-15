import { LinkProps, NavLink } from 'react-router-dom';
import { memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'secondary' | 'red';

interface AppLinkProps extends LinkProps {
    className?: string;
    variant?: AppLinkVariant;
    children?: ReactNode;
    activeClass?: string
}

export const AppLink = memo((props: AppLinkProps) => {
    const {
        to,
        className,
        children,
        activeClass = '',
        variant = 'primary',
        ...otherProps
    } = props;



    return (
        <NavLink
            to={to}
            className={({ isActive }) => classNames(cls.AppLink, {
                [activeClass]: isActive
            }, [
                cls[variant],
                className,
            ])}
            {...otherProps}
        >
            {children}
        </NavLink>
    );
});
