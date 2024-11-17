import { ConfigProvider } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider } from 'react-router-dom';

import { IPublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { setPrevUrlPath } from '@utils/config.ts';

import { BrowserRouter } from './routers';
import { useLanguage } from './store/useLanguage.ts';

const queryClient = new QueryClient();

// @typescript-eslint/no-explicit-any
function App({ instance }: { readonly instance: IPublicClientApplication }) {
    setPrevUrlPath();

    const { i18n } = useTranslation();
    const { language } = useLanguage(state => state);

    useEffect(() => {
        i18n.changeLanguage('vi');
    }, [language, i18n]);

    return (
        <MsalProvider instance={instance}>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#3E6DDA',
                        motionDurationMid: '0.2s',
                        motionDurationSlow: '0.2s',
                        motionEaseInOutCirc: 'linear',
                        motionEaseOutCirc: 'linear',
                    },
                }}
            >
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={BrowserRouter} />
                </QueryClientProvider>
            </ConfigProvider>
        </MsalProvider>
    );
}

export default App;
