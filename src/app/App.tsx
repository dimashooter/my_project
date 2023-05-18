import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/app/providers/ThemeProvider';
import { AppRouter } from '@/app/providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserInited, initAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLoader } from '@/shared/ui/deprecated/PageLoader/PageLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { MainLayouts } from '@/shared/layouts/MainLayouts';

function App() {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(initAuthData());
    }, [dispatch]);

    if (!inited) {
        return < PageLoader />

    }



    return (
        <ToggleFeatures
            name='isAppRedesigned'
            on={<div id='app' className={classNames('app_redesigned', {}, [theme])}>
                <Suspense fallback="">
                    <div className="content-page">
                        <MainLayouts
                            Header={<Navbar />}
                            Content={<AppRouter />}
                            Sidebar={<Sidebar />}
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
}

export default App;
