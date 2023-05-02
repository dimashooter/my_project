import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getArticles } from '@/pages/ArticlesPage/model/slices/articlesPageSlice';
import { ArticleList } from '@/entities/Article';
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '@/pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { Text } from '@/shared/ui/Text/Text';

interface ArticleInfiniteListProps {
    className?: string;
}
export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const articles = useSelector(getArticles.selectAll);

    const isLoading = useSelector(getArticlesPageIsLoading);
    const view = useSelector(getArticlesPageView);
    const error = useSelector(getArticlesPageError);

    if (error) {
        return <Text text={t('Error')} />;
    }
    return (
        <ArticleList
            isLoading={isLoading}
            view={view}
            articles={articles}
            className={className}
        />
    );
});
