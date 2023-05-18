import { lazy } from 'react';

export const SettingsPageAsync = lazy(
  () =>
    new Promise((resolve) => {
      // @ts-ignore
      setTimeout(() => resolve(import('./SettingsPage')), 1500);
    }),
);
