export const IDENTITY_API_BASE_URL = import.meta.env.VITE_IDENTITY_API_BASE_URL;
export const TMC_API_BASE_URL = import.meta.env.VITE_TMC_API_BASE_URL;
export const SIGNALR_HUB_ADDRESS = import.meta.env.VITE_SIGNALR_HUB_ADDRESS;

export const {
    // # Authentication Routing Config
    VITE_AUTHORITY_DOMAIN,
    VITE_AUTHORITY_SIGN,
    VITE_AUTHORITY_FORGOT_PASS,
    VITE_AUTHORITY_EDIT_PROFILE,
    VITE_CLIENT_ID,
    VITE_LOGIN_REQUEST,
    VITE_SILENT_REFRESH_TOKEN_REQUEST,
    VITE_REDIRECT_URI,
    VITE_LOGOUT_REDIRECT_URI,
    // # Authentication Config name
    VITE_SIGNUP_SIGNIN,
    VITE_FORGOT_PASS,
    VITE_EDIT_PROFILE,
} = import.meta.env;