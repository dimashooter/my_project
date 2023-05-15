import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card, CardTheme } from '@/shared/ui/deprecated/Card/Card';
import { Text } from '@/shared/ui/deprecated/Text/Text';
import { AppLink } from '@/shared/ui/deprecated/AppLink/AppLink';
import { Notification } from '../../model/type/notification';
import cls from './NotificationItem.module.scss';

interface NotificationItemProps {
    className?: string;
    item: Notification;
}
export const NotificationItem = memo((props: NotificationItemProps) => {
    const { className, item } = props;

    const content = (
        <Card
            theme={CardTheme.OUTLINE}
            className={classNames(cls.NotificationItem, {}, [className])}
        >
            <Text title={item.title} />
            <Text text={item.description} />
        </Card>
    );

    if (item.href) {
        return (
            <AppLink to={item.href} className={cls.NotificationItem}>
                {content}
            </AppLink>
        );
    }

    return content;
});
