import { HTMLAttributeAnchorTarget, memo } from 'react';
import {
    Article,
    ArticleView,
} from '../../model/types/article';
import { ToggleFeatures } from '@/shared/lib/features';
import { ArticleListItemRedesigned } from '../ArticleList/ArticleListItemRedesigned/ArticleListItemRedesigned';
import { ArticleListItemDeprecated } from '../ArticleList/ArticleListItemDeprecated/ArticleListItemDeprecated';

export interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo(({ className, article, view, target = '_self' }: ArticleListItemProps) => {
    const props = {
        className, article, view, target
    }

    return (
        <ToggleFeatures name='isAppRedesigned' on={<ArticleListItemRedesigned {...props} />}
            off={<ArticleListItemDeprecated {...props} />} />
    )
});
