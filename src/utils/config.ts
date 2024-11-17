export const AppConfig = {
    ApiHost: import.meta.env.VITE_API_URL,
    ApiVersion: import.meta.env.VITE_API_VERSION,
    ApiIdentity: import.meta.env.VITE_API_IDENTITY_URL,
    GroupIdHNH: import.meta.env.VITE_GROUPID_HNH,
    DateFormat: 'DD/MM/YYYY',
    DateShortYearFormat: 'DD/MM/YY',
    DateTimeFormat: 'DD/MM/YYYY HH:mm',
    DateTimeWithSecondsFormat: 'DD/MM/YYYY HH:mm:ss',
    TimeDateFormat: 'HH:mm, DD/MM/YYYY',
    PhoneRegex: /^\(?(\d{3})\)?(\d{3})?(\d{4,6})$/,
    StorageEnum: {
        PrevPath: 'prePathUrl',
    },
    isLocal: true,
    AppSource: 1,
};

export const setPrevUrlPath = () => {
    const path = extractUrlPath(window.location.href);
    const isAuthPath = path && !path.includes('login') && !path.includes('logout') && path !== '/';
    if (isAuthPath) {
        localStorage.setItem(AppConfig.StorageEnum.PrevPath, path);
    }
};

const extractUrlPath = (url: string) => {
    let path;

    // find & remove protocol (http, ftp, etc)
    if (url.indexOf('://') > -1) {
        path = url.split('//')[1];
    } else {
        path = url;
    }

    // find & remove '#'
    if (url.indexOf('#') > -1) {
        path = path.split('#')[1];
    } else {
        path = path.substring(path.indexOf('/'));
    }

    return path;
};
