import { Dispatch } from '@reduxjs/toolkit';
import { ArticleSortType } from '@/entities/Article';
import { ArticleType } from '@/entities/Article/model/types/article';
import { articlesPageActions } from '@/pages/ArticlesPage/model/slices/articlesPageSlice';
import { ArticleOrder } from '@/shared/types';

export function dispatchUrlSearchParams(
    param: OptionalRecord<string, string>,
    dispatch: Dispatch,
) {
    Object.entries(param).forEach((elem) => {
        if (elem[0] !== undefined || elem[0] !== null) {
            switch (elem[0]) {
                case 'order':
                    dispatch(
                        articlesPageActions.setOrder(elem[1] as ArticleOrder),
                    );
                    break;
                case 'sort':
                    dispatch(
                        articlesPageActions.setSort(elem[1] as ArticleSortType),
                    );
                    break;
                case 'search':
                    dispatch(articlesPageActions.setSearch(elem[1] as string));
                    break;
                case 'type':
                    dispatch(
                        articlesPageActions.setType(elem[1] as ArticleType),
                    );
                    break;
                default:
                    break;
            }
        }
    });
}
