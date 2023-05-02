import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ArticleSortType } from '@/entities/Article';
import { ArticleType } from '@/entities/Article/model/types/article';
import { dispatchUrlSearchParams } from '@/shared/lib/url/dispatchUrlSearchParams';
import { ArticleOrder } from '@/shared/types';
import { getArticlesPageInited } from '../../selectors/articlesPageSelectors';
import { articlesPageActions } from '../../slices/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>('articlesPage/initArticlesPage', async (params, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const orderFromUrl = params.get('order') as ArticleOrder;
    const searchFromUrl = params.get('search') as string;
    const sortFromUrl = params.get('sort') as ArticleSortType;
    const typeFromUrl = params.get('type') as ArticleType;

    dispatchUrlSearchParams(
        {
            order: orderFromUrl,
            search: searchFromUrl,
            sort: sortFromUrl,
            type: typeFromUrl,
        },
        dispatch,
    );
    // dispatchUrlSearchParams({ search: searchFromUrl }, dispatch);
    // dispatchUrlSearchParams({ sort: sortFromUrl }, dispatch);

    const inited = getArticlesPageInited(getState());

    if (!inited) {
        dispatch(articlesPageActions.initState());
        dispatch(fetchArticlesList({}));
    }
});
