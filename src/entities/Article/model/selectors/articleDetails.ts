import { StateSchema } from '@/app/providers/StoreProvider';
import { buildSelector } from '@/shared/lib/store';

export const [useArticleDetailsData, getArticleDetailsData] = buildSelector((state) => state.articleDetails?.data);
export const getArticleDetailsIsLoading = (state: StateSchema) => state.articleDetails?.isLoading || false;
export const getArticleDetailsError = (state: StateSchema) => state.articleDetails?.error;
