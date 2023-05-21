import { AppRoutes, getRouteAbout, getRouteAdmin, getRouteArticleDetails, 
  getRouteArticleEdit, getRouteArticles, getRouteForbidden, getRouteMain, 
  getRouteProfile, getRouteSettings }
 from "../config/routeConfig/routeConfig";

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
  [getRouteMain()]: AppRoutes.MAIN,
  [getRouteSettings()]: AppRoutes.SETTINGS,
  [getRouteAbout()]: AppRoutes.ABOUT,
  [getRouteProfile(':id')]: AppRoutes.PROFILE,
  [getRouteArticles()]: AppRoutes.ARTICLES,
  [getRouteArticleDetails(':id')]: AppRoutes.ARTICLE_DETAILS,
  [getRouteArticleEdit(':id')]: AppRoutes.ARTICLE_EDIT,
  [getRouteAdmin()]: AppRoutes.ADMIN_PANEL,
  [getRouteForbidden()]: AppRoutes.FORBIDDEN,
};