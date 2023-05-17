import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ArticleTab,
    ArticleViewSelector,
} from '@/entities/Article';


import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/deprecated/Card/Card';
import { Input } from '@/shared/ui/deprecated/Input/Input';
import cls from './articlesPageFilters.module.scss';
import { ArticleSortSelector } from '@/features/ArticleSortSelector/ArticleSortSelector';
import { useArticleFilters } from '@/pages/ArticlesPage/lib';

interface ArticlePageFiltersProps {
    className?: string;

}
export const ArticlePageFilters = memo((props: ArticlePageFiltersProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { onChangeOrder, onChangeSort, order, sort, onChangeSearch, search,
        onChangeType, type, onChangeView, view } = useArticleFilters()
    return (
        <div className={classNames(cls.ArticlePageFilters, {}, [className])}>
            <ArticleSortSelector
                onChangeOrder={onChangeOrder} onChangeSort={onChangeSort} order={order}
                sort={sort} />
            <Card className={cls.InputCard}>
                <Input
                    placeholder={t('search') || ''}
                    onChange={onChangeSearch}
                    value={search}
                />
            </Card>
            <ArticleViewSelector view={view} onViewClick={onChangeView} />
            <ArticleTab onChangeType={onChangeType} type={type} />
        </div>
    );
});
