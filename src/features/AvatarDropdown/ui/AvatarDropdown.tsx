import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { MyDropdown } from '@/shared/ui/Popup';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUserAuthData, isUserAdmin, userActions } from '@/entities/User';
import { Avatar } from '@/shared/ui/Avatar/Avatar';

interface AvatarDropdownProps {
    className?: string
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
    return (
        <MyDropdown
            direction="bottom left"
            className={className}
            items={[
                ...(isAdmin ? [{ content: (t('Admin_panel')), href: RoutePath.admin_panel }] : []),
                {
                    content: (t('user_profile')),
                    href: RoutePath.profile + authData!.id,
                },
                {
                    content: t('Выйти'), onClick: onLogout,
                },
            ]}
            trigger={(
                <Button theme={ButtonTheme.CLEAR}>
                    <Avatar
                        fallbackInverted
                        size={30}
                        src={authData!.avatar}
                    />
                </Button>
            )}
        />
    );
});
