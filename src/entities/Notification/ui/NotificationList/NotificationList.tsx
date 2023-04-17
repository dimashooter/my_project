import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { VStack } from 'shared/ui/Stack';
import { useNotifications } from '../../api/notificationApi';
import cls from './NotificationList.module.scss';
import { NotificationItem } from '../NotificationItem/NotificationItem';

interface NotificationListProps {
    className?: string
}
export const NotificationList = memo((props: NotificationListProps) => {
    const { className } = props;

    const { data: notifications, isLoading, isError } = useNotifications(null, {
        pollingInterval: 3000,
    });
    if (isLoading) {
        return (
            <VStack gap="16" className={classNames(cls.NotificationList, {}, [className])}>
                <Skeleton width={500} height={80} border="8px" />
                <Skeleton width={500} height={80} border="8px" />
                <Skeleton width={500} height={80} border="8px" />
            </VStack>
        );
    }
    return (
        <VStack gap="16" className={classNames(cls.NotificationList, {}, [className])}>
            {
                notifications?.map((notification, idx) => (
                    <NotificationItem item={notification} key={idx} />
                ))
            }
        </VStack>
    );
});
