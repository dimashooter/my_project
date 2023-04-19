import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticleRecommendationsIsLoading = (state: StateSchema) => {
    return state.articleDetailPage?.recommendations?.isLoading;
};
export const getArticleRecommendationsError = (state: StateSchema) => state.articleDetailPage?.recommendations?.error;
