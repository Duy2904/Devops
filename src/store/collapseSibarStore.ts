import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CollapseSibarStore {
    collapsed: boolean;
    // eslint-disable-next-line no-unused-vars
    setCollapse: (collapse: boolean) => void;
}

export const useCollapseSibarStore = create<CollapseSibarStore>()(
    persist(
        set => ({
            collapsed: false,
            setCollapse: (collapsed: boolean) => {
                set(() => ({ collapsed: collapsed }));
            },
        }),
        {
            name: 'user-collapse',
        },
    ),
);
