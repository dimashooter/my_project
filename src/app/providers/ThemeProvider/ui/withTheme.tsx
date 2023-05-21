import { useJsonSettings } from "@/entities/User"
import ThemeProvider from "./ThemeProvider"

export const withTheme = (Component: React.ComponentType) => {
    return () => {
        const { theme } = useJsonSettings()
        return (
            <ThemeProvider initialTheme={theme}>
                <Component />
            </ThemeProvider>
        )
    }
}