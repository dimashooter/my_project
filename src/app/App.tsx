import React, { Suspense, memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme, withTheme } from '@/app/providers/ThemeProvider';
import { AppRouter } from '@/app/providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserInited, initAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { PageLoader } from '@/shared/ui/deprecated/PageLoader/PageLoader';
import { MainLayout } from '@/shared/layouts/MainLayouts';
import { useAppToolbar } from './lib/useAppToolbar/useAppToolbar';

const App = memo(() => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);
    const toolbar = useAppToolbar();

    useEffect(() => {
        if (!inited) {
            dispatch(initAuthData());
        }
    }, [dispatch, inited]);

    if (!inited) {
        return <ToggleFeatures
            name='isAppRedesigned'
            off={<PageLoader />}
            on={
                <div id='app' className={classNames('app_redesigned', {}, [theme])}>
                    <AppLoaderLayout />
                </div>
            }
        />
    }



    return (
        <ToggleFeatures
            name='isAppRedesigned'
            on={<div id='app' className={classNames('app_redesigned', {}, [theme])}>
                <Suspense fallback="">
                    <div className="content-page">
                        <MainLayout
                            header={<Navbar />}
                            content={<AppRouter />}
                            sidebar={<Sidebar />}
                            toolbar={toolbar}
                        />
                    </div>
                    <Toaster position="bottom-center" reverseOrder={false} />
                </Suspense>
            </div>}
            off={<div id='app' className={classNames('app', {}, [theme])}>
                <Suspense fallback="">
                    <Navbar />
                    <div className="content-page">
                        <Sidebar />
                        {inited && <AppRouter />}
                    </div>
                    <Toaster position="bottom-center" reverseOrder={false} />
                </Suspense>
            </div>}
        />
    );
})

export default withTheme(App);
