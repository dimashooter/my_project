import { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { HPopover as PopoverDeprecated } from '@/shared/ui/deprecated/Popup';
import NotificationIconDepreacted from '@/shared/assets/icons/NotificationDeprecated.svg';
import NotificationIcon from '@/shared/assets/icons/Notification.svg';
import { NotificationList } from '@/entities/Notification';
import { detectDevice } from '@/shared/lib/helpers/detectDevice';
import { Drawer } from '@/shared/ui/redesigned/Drawer/Drawer';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon/Icon';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import { HPopover } from '@/shared/ui/redesigned/Popup';

interface NotificationButtonProps {
    className?: string;
}
export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props;
    const [isDrawer, setIsDrawer] = useState(false);

    const onCloseDrawer = useCallback(() => {
        setIsDrawer(false);
    }, []);

    const onShowDrawer = useCallback(() => {
        setIsDrawer(true);
    }, []);
    const trigger = (
        <ToggleFeatures name='isAppRedesigned' on={
            <Icon size={32} Svg={NotificationIcon}
                clickable
                onClick={onShowDrawer} />
        } off={
            <ButtonDeprecated theme={ButtonTheme.CLEAR} onClick={onShowDrawer}>
                <IconDeprecated Svg={NotificationIconDepreacted} inverted />
            </ButtonDeprecated>} />

    );
    return (

        <div className={classNames('', {}, [className])}>
            {detectDevice() ? (
                <>
                    {trigger}
                    <Drawer isOpen={isDrawer} onClose={onCloseDrawer}>
                        <NotificationList isMobile={detectDevice()} />
                    </Drawer>
                </>
            ) : (
                <ToggleFeatures name='isAppRedesigned' on={
                    <HPopover direction="bottom right" trigger={trigger}>
                        <NotificationList />
                    </HPopover>
                } off={
                    <PopoverDeprecated direction="bottom left" trigger={trigger}>
                        <NotificationList />
                    </PopoverDeprecated>
                }
                />


            )}
        </div>
    );
});
