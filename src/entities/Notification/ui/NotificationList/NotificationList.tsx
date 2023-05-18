import { memo, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton/Skeleton';

import { VStack } from '@/shared/ui/redesigned/Stack';
import { useNotifications } from '../../api/notificationApi';
import cls from './NotificationList.module.scss';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { ToggleFeatures } from '@/shared/lib/features';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton/Skeleton';

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

            <ToggleFeatures
                name='isAppRedesigned'
                on={
                    <VStack
                        gap="16"
                        className={classNames(cls.NotificationList, mods, [className])}
                    >
                        <Skeleton width={500} height={80} border="8px" />
                        <Skeleton width={500} height={80} border="8px" />
                        <Skeleton width={500} height={80} border="8px" />
                    </VStack>


                }
                off={
                    <VStack
                        gap="16"
                        className={classNames(cls.NotificationList, mods, [className])}
                    >
                        <SkeletonDeprecated width={500} height={80} border="8px" />
                        <SkeletonDeprecated width={500} height={80} border="8px" />
                        <SkeletonDeprecated width={500} height={80} border="8px" />
                    </VStack>
                }
            />
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
