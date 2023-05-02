import { Suspense, lazy } from 'react';
import { Loader } from '@/shared/ui/Loader/Loader';
import { ProfileRatingProps } from './ProfileRating';

const ProfileRatingLazy = lazy(
    () =>
        new Promise((resolve) => {
            // @ts-ignore
            setTimeout(() => resolve(import('./ProfileRating')), 1500);
        }),
);

export const ProfileRatingAsync = (props: ProfileRatingProps) => {
    return (
        <Suspense fallback={<Loader />}>
            <ProfileRatingLazy {...props} />
        </Suspense>
    );
};
