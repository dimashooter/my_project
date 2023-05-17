import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as CardDeprecated, CardTheme } from '@/shared/ui/deprecated/Card/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { AppLink } from '@/shared/ui/deprecated/AppLink/AppLink';
import { Notification } from '../../model/type/notification';
import cls from './NotificationItem.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { Text } from '@/shared/ui/redesigned/Text/Text';

interface NotificationItemProps {
    className?: string;
    item: Notification;
}
export const NotificationItem = memo((props: NotificationItemProps) => {
    const { className, item } = props;

    const content = (
        <ToggleFeatures name='isAppRedesigned'
            on={
                <Card
                    padding='16'
                    className={classNames(cls.NotificationItem, {}, [className])}
                >
                    <Text title={item.title} />
                    <Text text={item.description} />
                </Card>
            }
            off={<CardDeprecated
                theme={CardTheme.OUTLINE}
                className={classNames(cls.NotificationItem, {}, [className])}
            >
                <TextDeprecated title={item.title} />
                <TextDeprecated text={item.description} />
            </CardDeprecated>}

        />

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
