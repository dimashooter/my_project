import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { HPopover } from 'shared/ui/Popup';
import NotificationIcon from 'shared/assets/icons/Notification.svg';
import { NotificationList } from 'entities/Notification';

interface NotificationButtonProps {
    className?: string
}
export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props;
    return (
        <div className={classNames('', {}, [className])}>
            <HPopover
                direction="bottom left"
                trigger={(
                    <Button theme={ButtonTheme.CLEAR}>
                        <Icon Svg={NotificationIcon} inverted />
                    </Button>
                )}
            >
                <NotificationList />
            </HPopover>
        </div>
    );
});
