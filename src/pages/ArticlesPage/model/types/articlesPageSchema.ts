import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleSortType, ArticleView } from '@/entities/Article';
import { ArticleType } from '@/entities/Article/model/types/article';
import { ArticleOrder } from '@/shared/types';

export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;

    view: ArticleView;
    // pagination
    page: number;
    limit: number;
    hasMore: boolean;
    search: string;
    order: ArticleOrder;
    sort: ArticleSortType;
    _inited: boolean;
    type: ArticleType;
}
