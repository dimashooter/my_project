import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextSize } from '@/shared/ui/deprecated/Text/Text';
import { ArticleList } from '@/entities/Article';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Loader } from '@/shared/ui/deprecated/Loader/Loader';
import cls from './articleRecommendation.module.scss';
import { useArticleRecommendationList } from '../api/articleRecommendationApi';

interface ArticleRecommendationListProps {
    className?: string;
}

export const ArticleRecommendationList = memo(
    (props: ArticleRecommendationListProps) => {
        const { className } = props;
        const { t } = useTranslation('article-details');
        const {
            data: articles,
            isLoading,
            isError,
        } = useArticleRecommendationList(3);
        if (isLoading) {
            return <Loader />;
        }
        if (isError) {
            return <Text title={t('throw error')} />;
        }

        return (
            <VStack gap="8" data-testid='ArticleRecommendation.List'>
                <Text
                    size={TextSize.L}
                    className={cls.commentTitle}
                    title={t('recommendation')}
                />
                <ArticleList
                    // eslint-disable-next-line i18next/no-literal-string
                    target="_blank"
                    className={cls.recommendations}
                    articles={articles}
                    isLoading={isLoading}
                />
            </VStack>
        );
    },
);
