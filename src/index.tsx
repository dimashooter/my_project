import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { StoreProvider } from '@/app/providers/StoreProvider';
import App from './app/App';
import '@/app/styles/index.scss';
import './shared/config/i18n/i18n';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import { ForceUpdateProfived } from './shared/lib/render/forceUpdate';

const container = document.getElementById('root');
if (!container) {
    throw new Error('error');
}
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <BrowserRouter>
        <StoreProvider>
            <ErrorBoundary>
                <ForceUpdateProfived>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </ForceUpdateProfived>
            </ErrorBoundary>
        </StoreProvider>
    </BrowserRouter>,
);
