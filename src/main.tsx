import './i18n';
import './index.css';

import ReactDOM from 'react-dom/client';

import { AuthenticationResult, EventType, PublicClientApplication } from '@azure/msal-browser';

import App from './App.tsx';
import { msalConfig } from './services/authConfig.ts';
import { SignalRService } from './services/signalRService.ts';
import useAuthStore from './store/authStore.ts';
import { useSignalRStore } from './store/useSignalRStore.ts';
import { Navigate } from 'react-router-dom';

export const msalInstance = new PublicClientApplication(msalConfig);

const authStore = useAuthStore.getState();
const signalRStore = useSignalRStore.getState();

// Default to using the first account if no account is active on page load
if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
    const account = msalInstance.getAllAccounts()[0];
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    msalInstance.setActiveAccount(account);
}

msalInstance.addEventCallback(event => {
    if (
        (event.eventType === EventType.LOGIN_SUCCESS ||
            event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS ||
            event.eventType === EventType.SSO_SILENT_SUCCESS) &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        event?.payload?.account
    ) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        msalInstance.setActiveAccount(event.payload.account);
        if ((event.payload as AuthenticationResult)?.accessToken) {
            const token = (event.payload as AuthenticationResult)?.accessToken;
            authStore.setToken(token);
            authStore.decodeToken();
            signalRStore.initializeSignalR(SignalRService.getInstance(token));
        }
    }
    // Handle event refresh token over 24h
    if (event.eventType === EventType.ACQUIRE_TOKEN_FAILURE) {
        Navigate({ to: '/logout', replace: true });
    }
});

msalInstance.initialize().then(() => {
    msalInstance
        .handleRedirectPromise()
        .then(result => {
            if (result) {
                msalInstance.setActiveAccount(result.account);
                authStore.setToken(result.accessToken);
                authStore.decodeToken();
                signalRStore.initializeSignalR(SignalRService.getInstance(result.accessToken));
            }
        })
        .catch(error => {
            console.error(error);
        });
});

ReactDOM.createRoot(document.getElementById('root')!).render(<App instance={msalInstance} />);
