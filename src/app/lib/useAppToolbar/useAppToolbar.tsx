/* eslint-disable i18next/no-literal-string */
import { ReactElement } from "react";
import { AppRoutes } from "@/shared/config/routeConfig/routeConfig";
import { ScrollOnTop } from "@/widgets/ScrollOnTop/ScrollOnTop";
import { useRouteChange } from "@/shared/lib/router/useRouterChange";


export function useAppToolbar() {
  const appRoute = useRouteChange();

  const toolbarByAppRouter: OptionalRecord<AppRoutes, ReactElement> = {
    [AppRoutes.ABOUT]: <div>about</div>,
    [AppRoutes.PROFILE]: <div>profile</div>,
    [AppRoutes.MAIN]: <div>main</div>,
    [AppRoutes.ARTICLES]: <ScrollOnTop />,
    [AppRoutes.ARTICLE_DETAILS]: <ScrollOnTop />
  }
  return toolbarByAppRouter[appRoute]
}