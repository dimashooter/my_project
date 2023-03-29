import {
    ArticleSortType, ArticleTab, ArticleView, ArticleViewSelector,
} from 'entities/Article';
import { ArticleType } from 'entities/Article/model/types/article';
import { getArticlesPageType, getArticlesPageView } from 'pages/ArticlesPage/model/selectors/articlesPageSelectors';
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from 'pages/ArticlesPage/model/slices/articlesPageSlice';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { ArticleOrder } from 'shared/types';
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import cls from './articlesPageFilters.module.scss';

interface ArticlePageFiltersProps {
className?: string
sort : ArticleSortType
order: ArticleOrder
search:string
}
export const ArticlePageFilters = memo((props:ArticlePageFiltersProps) => {
    const {
        className, order, sort, search,
    } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const view = useSelector(getArticlesPageView);
    const type = useSelector(getArticlesPageType);

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageActions.setView(view));
    }, [dispatch]);
    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);
    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeSort = useCallback((sort:ArticleSortType) => {
        dispatch(articlesPageActions.setSort(sort));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);
    const onChangeOrder = useCallback((order:ArticleOrder) => {
        dispatch(articlesPageActions.setOrder(order));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeSearch = useCallback((text:string) => {
        dispatch(articlesPageActions.setSearch(text));
        dispatch(articlesPageActions.setPage(1));
        debouncedFetchData();
    }, [dispatch, debouncedFetchData]);

    const onTabClick = useCallback(({ value }) => {
        dispatch(articlesPageActions.setType(value));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [fetchData, dispatch]);

    const orderOptions = useMemo<SelectOption<ArticleOrder>[]>(() => [
        {
            value: 'asc',
            content: t('asc'),

        },
        {
            value: 'desc',
            content: t('desc'),
        },

    ], [t]);

    const sortOptions = useMemo<SelectOption<ArticleSortType>[]>(() => [
        {
            value: ArticleSortType.CREATED_AT,
            content: t('by_date'),

        },
        {
            value: ArticleSortType.TITLE,
            content: t('by_title'),
        },
        {
            value: ArticleSortType.VIEW,
            content: t('by_view'),
        },
    ], [t]);
    return (
        <div className={classNames(cls.ArticlePageFilters, {}, [className])}>
            <div className={cls.filterWrapper}>
                <Select
                    label={t('sort_by')}
                    options={sortOptions}
                    onChange={onChangeSort}
                    value={sort}
                />
                <Select
                    label={t('order_by')}
                    options={orderOptions}
                    onChange={onChangeOrder}
                    value={order}
                />
            </div>
            <Card className={cls.InputCard}>
                <Input placeholder={t('search')} onChange={onChangeSearch} value={search} />
            </Card>
            <ArticleViewSelector view={view} onViewClick={onChangeView} />
            <ArticleTab onTabClick={onTabClick} type={type} />
        </div>
    );
});
