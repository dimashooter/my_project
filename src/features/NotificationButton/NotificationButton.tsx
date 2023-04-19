import { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Icon } from '@/shared/ui/Icon/Icon';
import { HPopover } from '@/shared/ui/Popup';
import NotificationIcon from '@/shared/assets/icons/Notification.svg';
import { NotificationList } from '@/entities/Notification';
import { detectDevice } from '@/shared/lib/helpers/detectDevice';
import { Drawer } from '@/shared/ui/Drawer/Drawer';
import { AnimationProvider } from '@/shared/lib/components/AnimationProvider/AnimationProvider';

interface NotificationButtonProps {
    className?: string
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
        <Button theme={ButtonTheme.CLEAR} onClick={onShowDrawer}>
            <Icon Svg={NotificationIcon} inverted />
        </Button>
    );
    return (
        <div className={classNames('', {}, [className])}>
            {
                detectDevice()
                    ? (
                        <AnimationProvider>
                            {trigger}
                            <Drawer isOpen={isDrawer} onClose={onCloseDrawer}>
                                <NotificationList isMobile={detectDevice()} />
                            </Drawer>
                        </AnimationProvider>
                    )
                    : (
                        <HPopover
                            direction="bottom left"
                            trigger={trigger}
                        >
                            <NotificationList />
                        </HPopover>
                    )
            }
        </div>
    );
});
