import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import EyeIcon from '@/shared/assets/icons/views.svg';
import { getRouteArticleDetails } from '@/shared/config/routeConfig/routeConfig';
import { AppLink } from '@/shared/ui/redesigned/AppLink/AppLink';
import cls from './ArticleListItemRedesigned.module.scss'
import { ArticleBlockType, ArticleTextBlock, ArticleView } from '@/entities/Article/model/types/article';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar/Avatar';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { ArticleListItemProps } from '../../ArticleListItem/ArticleListItem';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { AppImage } from '@/shared/ui/deprecated/AppImage';

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
  const { className, article, view, target = '_self' } = props;
  const { t } = useTranslation();

  const views = (
    <HStack gap='8'>
      <Icon Svg={EyeIcon} width={32} height={32} />
      <Text text={String(article.views)} />
    </HStack>
  );

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    return (
      <div

      >
        <Card padding='24' max className={classNames(cls.ArticleListItemRedesigned, {}, [
          className,
          cls[view],
        ])}>
          <VStack max gap='16' alignItems='start'>

            <HStack max gap='8'>
              <Avatar size={30} src={article.user.avatar} />
              <Text
                bold
                text={article.user.username}
              />
              <Text text={article.createdAt} />
            </HStack>
            <Text title={article.title} bold />
            <Text title={article.subtitle} size='s' bold
            />
            <AppImage
              fallback={<Skeleton width="100%" height={150} />}
              src={article.img}
              className={cls.img}
              alt={article.title}
            />

            {textBlock && (
              <ArticleTextBlockComponent
                block={textBlock}
                className={cls.textBlock}
              />
            )}
            <HStack max justifyContent='between'>
              <AppLink target={target} to={getRouteArticleDetails(article.id)}>
                <Button variant='outline'>
                  {t('Читать далее...')}
                </Button>
              </AppLink>
              {views}
            </HStack>
          </VStack>
        </Card>
      </div >
    );
  }

  return (
    <AppLink
      data-testid='ArticleListItem'

      target={target}
      to={getRouteArticleDetails(article.id)}
      className={classNames(cls.ArticleListItemRedesigned, {}, [className, cls[view]])}
    >
      <Card padding='0' border='semi' className={cls.card} >
        <AppImage
          fallback={<Skeleton width="100%" height={200} border='35px' />}
          Errorfallback={<Skeleton width="100%" height={200} border='35px' />}
          alt={article.title}
          src={article.img}
          className={cls.img}
        />
        <VStack className={cls.padding} gap='4'>
          <Text text={article.title} />
          <VStack gap='4' max >
            <HStack justifyContent='between' max>
              <Text text={article.createdAt} />
              {views}
            </HStack>
            <HStack gap='4' max justifyContent='start'>
              <Avatar size={32} src={article.user.avatar} className={cls.avatar} />
              <Text text={article.user.username} />
            </HStack>
          </VStack>
        </VStack>
      </Card>
    </AppLink>
  );
});
