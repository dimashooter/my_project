import { useCallback } from "react";
import { useSelector } from "react-redux";
import { ArticleSortType, ArticleType, ArticleView } from "@/entities/Article";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { articlesPageActions } from "../../model/slices/articlesPageSlice";
import { ArticleOrder } from "@/shared/types";
import { fetchArticlesList } from "../../model/services/fetchArticlesList/fetchArticlesList";
import { getArticlesPageOrder, getArticlesPageSearch, getArticlesPageSort, 
  getArticlesPageType, getArticlesPageView } from "../../model/selectors/articlesPageSelectors";
import { useDebounce } from "@/shared/lib/hooks/useDebounce/useDebounce";

export const useArticleFilters = () => {
  const dispatch = useAppDispatch()
  const view = useSelector(getArticlesPageView);
  const type = useSelector(getArticlesPageType);
  const sort = useSelector(getArticlesPageSort);
  const search = useSelector(getArticlesPageSearch);
  const order = useSelector(getArticlesPageOrder);
  const onChangeView = useCallback(
    (view: ArticleView) => {
        dispatch(articlesPageActions.setView(view));
    },
    [dispatch],
);
const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }));
}, [dispatch]);
const debouncedFetchData = useDebounce(fetchData, 500);

const onChangeSort = useCallback(
    (sort: ArticleSortType) => {
        dispatch(articlesPageActions.setSort(sort));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    },
    [dispatch, fetchData],
);
const onChangeOrder = useCallback(
    (order: ArticleOrder) => {
        dispatch(articlesPageActions.setOrder(order));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    },
    [dispatch, fetchData],
);

const onChangeSearch = useCallback(
    (text: string) => {
        dispatch(articlesPageActions.setSearch(text));
        dispatch(articlesPageActions.setPage(1));
        debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
);

const onChangeType = useCallback(
    (value: ArticleType) => {
        dispatch(articlesPageActions.setType(value));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    },
    [fetchData, dispatch],
);

return {
  onChangeOrder,
  onChangeSearch,
  onChangeType,
  onChangeSort,
  onChangeView,
  view,
  type,
  sort,
  order,
  search
}

}