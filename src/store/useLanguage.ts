import { create } from 'zustand';
import { persist } from 'zustand/middleware';
type language = 'en' | 'vi';
interface LanguageStore {
    language: language;
    actions: {
        setLanguage: (language: language) => void;
    };
}

export const useLanguage = create<LanguageStore>()(
    persist(
        set => ({
            language: 'vi',
            actions: {
                setLanguage: (language: language) => {
                    set(() => ({ language }));
                },
            },
        }),
        {
            name: 'app-language',
        },
    ),
);
