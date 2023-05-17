import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from '@/widgets/Page/Page';
import { ArticlePageFilters } from '@/features/articlesPageFilters';
import { ArticleInfiniteList } from '@/features/ArticleInfiniteList/ArticleInfiniteList';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import cls from './ArticlesPage.module.scss';


import { ArticlePageGreeting } from '@/pages/ArticlePageGreeting/ArticlePageGreeting';
import { ToggleFeatures } from '@/shared/lib/features';
import { StickyLayout } from '@/shared/layouts/StickyLayout';
import { ViewSelectorContainer } from '../ViewSelector/ViewSelectorContainer';
import { FilterSelectorContainer } from '../FilterSelectorContainer/FilterSelectorContainer';

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);
    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    const content = <ToggleFeatures on={
        <StickyLayout
            left={<ViewSelectorContainer />}
            content={
                <Page
                    data-testid='ArticlesPage'
                    onScrollEnd={onLoadNextPart}
                    className={classNames(cls.ArticlesPageRedesign, {}, [className])}
                >
                    <ArticleInfiniteList />
                    <ArticlePageGreeting />
                </Page>
            }
            right={<FilterSelectorContainer />}
        />

    } off={
        <Page
            data-testid='ArticlesPage'
            onScrollEnd={onLoadNextPart}
            className={classNames(cls.ArticlesPage, {}, [className])}
        >
            <ArticlePageFilters />
            <ArticleInfiniteList />
            <ArticlePageGreeting />
        </Page>
    } name='isAppRedesigned' />


    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            {content}
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
