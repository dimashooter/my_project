import React, { useEffect, useMemo, useState } from 'react';
import {
    Theme,
    ThemeContext,
} from '../lib/ThemeContext';
import { useJsonSettings } from '@/entities/User';



interface ThemeProviderProps {
    initialTheme?: Theme;
    children: React.ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {
    const { initialTheme, children } = props;
    const { theme: defaultTheme } = useJsonSettings()

    const [isFirst, setIsFirst] = useState(false)
    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme || Theme.LIGHT);


    useEffect(() => {
        if (!isFirst && defaultTheme) {
            setTheme(defaultTheme)
            setIsFirst(true)
        }
    }, [defaultTheme, isFirst])


    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme],
    );

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
