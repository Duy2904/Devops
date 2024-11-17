/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LanguageStore {
  language: string;
  setLanguage: (language: string) => void;
}

const DEFAULT_LANGUAGE = "vi";

export const useLanguage = create<LanguageStore>()(
  persist(
    (set) => ({
      language: DEFAULT_LANGUAGE,
      setLanguage: (language: string) => {
        set(() => ({ language }));
      },
    }),
    {
      name: "app-language",
    },
  ),
);
