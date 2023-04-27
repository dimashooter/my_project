import { Suspense, lazy } from 'react';
import { ArticleRatingProps } from './ArticleRating';
import { Loader } from '@/shared/ui/Loader/Loader';

const ArticleRatingLazy = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./ArticleRating')), 1500);
}));

export const ArticleRatingAsync = (props: ArticleRatingProps) => {
    return (
        <Suspense fallback={<Loader />}>
            <ArticleRatingLazy {...props} />
        </Suspense>
    );
};
