import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import {
    getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile, getRouteSettings,
} from '@/shared/config/routeConfig/routeConfig';
import MainIcon from '@/shared/assets/icons/Home.svg';
import ArticleIcon from '@/shared/assets/icons/doc.svg';
import  AboutIcon from '@/shared/assets/icons/Info.svg';
import ProfileIcon from '@/shared/assets/icons/Avatar.svg';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItemsList: SidebarItemType[] = [
        {
            path: getRouteMain(),
            Icon: MainIcon,
            text: 'Главная',
        },
        {
            path: getRouteAbout(),
            Icon: AboutIcon,
            text: 'О сайте',
        },
    ];

    if (userData) {
        sidebarItemsList.push(
            {
                path:  getRouteProfile(userData.id),
                Icon: ProfileIcon,
                text: 'Профиль',
                authOnly: true,
            },
            {
                path: getRouteArticles(),
                Icon: ArticleIcon,
                text: 'Статьи',
                authOnly: true,
            },
            {
                path: getRouteSettings(),
                Icon: ArticleIcon,
                text: 'Settings',
                authOnly: true,
            },
        );
    }

    return sidebarItemsList;
});
