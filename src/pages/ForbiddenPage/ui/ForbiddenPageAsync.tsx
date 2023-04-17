import { lazy } from 'react';

export const ForbiddenPageAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./ForbiddenPage')), 1500);
}));
