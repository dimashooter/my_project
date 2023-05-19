import { useTranslation } from 'react-i18next';
import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text as TextDeprecated, TextAlign, TextSize } from '@/shared/ui/deprecated/Text/Text';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton/Skeleton';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar/Avatar';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon/Icon';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import cls from './ArticleDetails.module.scss';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { renderBlock } from './ArticleRenderBlock';
import { AppImage } from '@/shared/ui/deprecated/AppImage';

interface ArticleDetailsProps {
    className?: string;
    id: string;
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, id } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const article = useSelector(getArticleDetailsData);
    const error = useSelector(getArticleDetailsError);


    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned', on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated
    })


    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchArticleById(id));
        }
    }, [dispatch, id]);

    let content;

    if (isLoading) {
        content = (
            <>
                <Skeleton
                    className={cls.avatar}
                    width={200}
                    height={200}
                    border="50%"
                />
                <Skeleton className={cls.title} width={300} height={32} />
                <Skeleton className={cls.skeleton} width={600} height={24} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
            </>
        );
    } else if (error) {
        content = (
            <ToggleFeatures
                name='isAppRedesigned'
                on={
                    <Text
                        align='center'
                        title={t('Произошла ошибка при загрузке статьи.')}
                    />
                }
                off={
                    <TextDeprecated
                        align={TextAlign.CENTER}
                        title={t('Произошла ошибка при загрузке статьи.')}
                    />
                }
            />

        );
    } else {
        content = (
            <ToggleFeatures
                name='isAppRedesigned'
                on={
                    <Card padding='24' border='semi'>
                        <Text
                            TextVariant='accent'
                            align='center'
                            title={article?.title}
                            size='l'
                            bold
                        />
                        <Text
                            TextVariant='accent'
                            align='center'
                            text={article?.subtitle}
                        />
                        <AppImage fallback={<SkeletonRedesigned width="100%" height={420} border='20px' />}
                            src={article?.img}
                            className={cls.img}
                        />
                        {article?.blocks.map(renderBlock)}
                    </Card>
                }
                off={
                    <>
                        <HStack max>
                            <AvatarDeprecated
                                size={200}
                                src={article?.img}
                                className={cls.avatar}
                            />
                        </HStack>
                        <VStack max gap='4' data-testid='ArticleDetails.Info'>
                            <TextDeprecated
                                className={cls.title}
                                title={article?.title}
                                text={article?.subtitle}
                                size={TextSize.L}
                            />
                            <HStack>
                                <IconDeprecated className={cls.icon} Svg={EyeIcon} />
                                <Text text={String(article?.views)} />
                            </HStack>
                            <HStack>
                                <IconDeprecated className={cls.icon} Svg={CalendarIcon} />
                                <Text text={article?.createdAt} />
                            </HStack>
                            {article?.blocks.map(renderBlock)}
                        </VStack>
                    </>
                }
            />


        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames(cls.ArticleDetails, {}, [className])}>
                {content}
            </div>
        </DynamicModuleLoader>
    );
});
