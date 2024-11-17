/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { LogLevel } from '@azure/msal-browser';

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */

export const b2cPolicies = {
    names: {
        signUpSignIn: import.meta.env.VITE_SIGNUP_SIGNIN,
        forgotPassword: import.meta.env.VITE_FORGOT_PASS,
        editProfile: import.meta.env.VITE_EDIT_PROFILE,
    },
    authorities: {
        signUpSignIn: {
            authority: import.meta.env.VITE_AUTHORITY_SIGN,
        },
        forgotPassword: {
            authority: import.meta.env.VITE_AUTHORITY_FORGOT_PASS,
        },
        editProfile: {
            authority: import.meta.env.VITE_AUTHORITY_EDIT_PROFILE,
        },
    },
    authorityDomain: import.meta.env.VITE_AUTHORITY_DOMAIN,
};
export const msalConfig = {
    auth: {
        clientId: import.meta.env.VITE_CLIENT_ID, // This is the ONLY mandatory field that you need to supply.
        authority: b2cPolicies.authorities.signUpSignIn.authority, // Choose SUSI as your default authority.
        knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
        redirectUri: import.meta.env.VITE_REDIRECT_URI, // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
        postLogoutRedirectUri: import.meta.env.VITE_LOGOUT_REDIRECT_URI, // Indicates the page to navigate after logout.
        navigateToLoginRequestUrl: true, // If "true", will navigate back to the original request location before processing the auth code response.
    },
    cache: {
        cacheLocation: import.meta.env.VITE_CACHE_LOCATION, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            },
        },
    },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: [import.meta.env.VITE_LOGIN_REQUEST],
};

export const silentRefreshTokenRequest = {
    scopes: [import.meta.env.VITE_SILENT_REFRESH_TOKEN_REQUEST],
};