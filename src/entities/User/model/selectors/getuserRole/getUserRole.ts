import { StateSchema } from 'app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';
import { UserRole } from '../../types/user';

export const getUserRole = (state:StateSchema) => state.user.authData?.roles;

export const isUserAdmin = createSelector(getUserRole, (roles) => {
    return Boolean(roles?.includes(UserRole.ADMIN));
});
export const isUserCopyrighter = createSelector(getUserRole, (roles) => {
    return Boolean(roles?.includes(UserRole.COPYRIGHTER));
});

export const isUser = createSelector(getUserRole, (roles) => {
    return Boolean(roles?.includes(UserRole.USER));
});
