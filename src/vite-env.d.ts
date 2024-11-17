/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_NOTIFICATION_HUB: string;
    readonly VITE_API_URL: string;
    readonly VITE_API_VERSION: string;
    readonly VITE_NOTIFICATION_METHOD_NAME: string;

    // authorization
    readonly VITE_AUTHORITY_DOMAIN: string;
    readonly VITE_AUTHORITY_SIGN: string;
    readonly VITE_AUTHORITY_FORGOT_PASS: string;
    readonly VITE_AUTHORITY_EDIT_PROFILE: string;
    readonly VITE_AUTHORITY_CHANGE_PASSWORD: string;
    readonly VITE_CLIENT_ID: string;
    readonly VITE_LOGIN_REQUEST: string;
    readonly VITE_SILENT_REFRESH_TOKEN_REQUEST: string;
    readonly VITE_REDIRECT_URI: string;
    readonly VITE_LOGOUT_REDIRECT_URI: string;
    readonly VITE_SIGNUP_SIGNIN: string;
    readonly VITE_FORGOT_PASS: string;
    readonly VITE_EDIT_PROFILE: string;
    readonly VITE_CACHE_LOCATION: string;

    // authentication config Identity
    readonly VITE_API_IDENTITY_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
