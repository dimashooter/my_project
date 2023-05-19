import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar/Avatar';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink/AppLink';
import { getRouteProfile } from '@/shared/config/routeConfig/routeConfig';
import cls from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card/Card';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar/Avatar';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { AppLink } from '@/shared/ui/redesigned/AppLink/AppLink';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading } = props;

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned, off: () => SkeletonDeprecated
    })
    if (isLoading) {
        return (
            <div
                className={classNames(cls.CommentCard, {}, [
                    className,
                    cls.loading,
                ])}
            >
                <div className={cls.header}>
                    <Skeleton width={30} height={30} border="50%" />
                    <Skeleton
                        height={16}
                        width={100}
                        className={cls.username}
                    />
                </div>
                <Skeleton className={cls.text} width="100%" height={50} />
            </div>
        );
    }

    if (!comment) {
        return null;
    }

    return (
        <ToggleFeatures
            name='isAppRedesigned'
            on={
                <Card border='semi' padding='24' max
                    className={classNames(cls.CommentCardRedesigne, {}, [className])}
                    data-testid='CommentCard.Content'>
                    <AppLink to={getRouteProfile(comment.user.id)} >
                        <HStack max gap='8'>

                            {comment.user.avatar ? <Avatar size={30} src={comment.user.avatar} /> : null}
                            <Text title={comment.user.username} className={cls.username} />
                        </HStack>
                    </AppLink>
                    <Text title={comment.text} bold size='s' />
                </Card>
            }
            off={
                <CardDeprecated max className={classNames(cls.CommentCard, {}, [className])}
                    data-testid='CommentCard.Content'>
                    <AppLinkDeprecated to={getRouteProfile(comment.user.id)} className={cls.header}>
                        {comment.user.avatar ? <AvatarDeprecated size={30} src={comment.user.avatar} /> : null}
                        <TextDeprecated className={cls.username} title={comment.user.username} />
                    </AppLinkDeprecated>
                    <TextDeprecated className={cls.text} text={comment.text} />
                </CardDeprecated>
            }
        />
    );
});
