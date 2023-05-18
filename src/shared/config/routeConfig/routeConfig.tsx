import { RouteProps } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage';
import { AboutPage } from '@/pages/AboutPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage/AdminPanelPage';
import { UserRole } from '@/entities/User/model/types/user';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { SettingsPage } from '@/pages/SettingsPage/ui';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRole[];
};

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteArticles = () => '/articles';
export const getRouteAdmin = () => '/admin';
export const getRouteSettings = () => '/settings';
export const getRouteArticleDetails = (id: string) => `/articles/${id}`;
export const getRouteForbidden = () => '/forbidden';
export const getRouteNotFound = () => '*';

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    ADMIN_PANEL = 'admin_panel',
    SETTINGS = 'settings',
    // last
    NOT_FOUND = 'not_found',
    FORBIDDEN = 'forbidden',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: getRouteMain(),
    [AppRoutes.ABOUT]: getRouteAbout(),
    [AppRoutes.PROFILE]: getRouteProfile(':id'), // + :id
    [AppRoutes.ARTICLES]: getRouteArticles(),

    [AppRoutes.ARTICLE_DETAILS]: getRouteArticleDetails(':id'), // + :id
    // последний
    [AppRoutes.ADMIN_PANEL]: getRouteAdmin(),
    [AppRoutes.NOT_FOUND]: getRouteNotFound(),
    [AppRoutes.FORBIDDEN]: getRouteForbidden(),
    [AppRoutes.SETTINGS]: getRouteSettings()

};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: getRouteAbout(),
        element: <AboutPage />,
    },
    [AppRoutes.PROFILE]: {
        path: getRouteProfile(':id'),
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLES]: {
        path: getRouteArticles(),
        element: <ArticlesPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_DETAILS]: {
        path: getRouteArticleDetails(':id'),
        element: <ArticleDetailsPage />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_PANEL]: {
        path: getRouteAdmin(),
        element: <AdminPanelPage />,
        authOnly: true,
        roles: [UserRole.ADMIN, UserRole.COPYRIGHTER],
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: getRouteNotFound(),
        element: <NotFoundPage />,
    },
    [AppRoutes.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage />,
    },
    [AppRoutes.SETTINGS]: {
        path: getRouteSettings(),
        element: <SettingsPage />,
    },
};
