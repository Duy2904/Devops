import { create } from 'zustand';

interface BackStore {
    pathStore: string | null;
    setPathStore: (pathStore: string | null) => void;
}

export const useBackStore = create<BackStore>()(set => ({
    pathStore: null,
    setPathStore: (pathStore: string | null) => {
        set(() => {
            return { pathStore: pathStore };
        });
    },
}));
