import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationVI from './locales/vi/translation.json';
import translationEN from './locales/en/translation.json';

export const resources = {
    en: { translation: translationEN },
    vi: { translation: translationVI },
};

i18n.use(initReactI18next).init({
    lng: 'vi',
    resources,
    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    },
});

export default i18n;
