import { memo, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { VStack } from '@/shared/ui/deprecated/Stack';
import { useNotifications } from '../../api/notificationApi';
import cls from './NotificationList.module.scss';
import { NotificationItem } from '../NotificationItem/NotificationItem';

interface NotificationListProps {
    className?: string;
    isMobile?: boolean;
}
export const NotificationList = memo((props: NotificationListProps) => {
    const { className, isMobile = false } = props;

    const { data: notifications, isLoading, isError } = useNotifications(null);

    const mods = {
        [cls.isMobile]: isMobile,
    };

    useEffect(() => {
        if (isError) {
            toast.error('server error');
        }
    }, [isError]);
    if (isLoading) {
        return (
            <VStack
                gap="16"
                className={classNames(cls.NotificationList, mods, [className])}
            >
                <Skeleton width={500} height={80} border="8px" />
                <Skeleton width={500} height={80} border="8px" />
                <Skeleton width={500} height={80} border="8px" />
            </VStack>
        );
    }

    return (
        <VStack
            gap="16"
            className={classNames(cls.NotificationList, mods, [className])}
        >
            {notifications?.map((notification, idx) => (
                <NotificationItem item={notification} key={idx} />
            ))}
        </VStack>
    );
});
