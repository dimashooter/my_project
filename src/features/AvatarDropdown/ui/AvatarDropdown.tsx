import { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { MyDropdown, } from '@/shared/ui/redesigned/Popup';
import { MyDropdown as DeprecatedDropdwon } from '@/shared/ui/deprecated/Popup';
import { getRouteAdmin, getRouteProfile, getRouteSettings } from '@/shared/config/routeConfig/routeConfig';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData, isUserAdmin, userActions } from '@/entities/User';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar/Avatar';
import { ToggleFeatures } from '@/shared/lib/features';
import { Avatar } from '@/shared/ui/redesigned/Avatar/Avatar';

interface AvatarDropdownProps {
    className?: string;
}
export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const { t } = useTranslation();

    const { className } = props;
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const isAdmin = useSelector(isUserAdmin);
    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);
    const items = useMemo(() => ([
        ...(isAdmin ? [{ content: (t('Admin_panel')), href: getRouteAdmin() },
        { content: (t('user_settigns')), href: getRouteSettings() }
        ] : []),
        {
            content: (t('user_profile')),
            href: getRouteProfile(authData!.id),
        },
        {
            content: t('Выйти'),
            onClick: onLogout,
        },
    ]), [authData, isAdmin, onLogout, t])
    return (
        <ToggleFeatures name='isAppRedesigned'
            on={
                <MyDropdown
                    direction="bottom right"
                    className={className}
                    items={items}
                    trigger={
                        <Avatar size={40} src={authData!.avatar} />
                    }
                />
            }
            off={
                <DeprecatedDropdwon
                    direction="bottom right"
                    className={className}
                    items={items}
                    trigger={
                        <AvatarDeprecated fallbackInverted size={30} src={authData!.avatar} />
                    }
                />}
        />

    );
});
