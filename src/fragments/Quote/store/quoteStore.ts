/* eslint-disable no-unused-vars */
import { create } from 'zustand';

import { TourType } from '@src/types/TypeEnum';

interface QuoteStore {
    tourType?: TourType;
    actions: {
        setTourType: (tourType?: TourType) => void;
        resetQuoteStore: () => void;
    };
}

const initialValue: Omit<QuoteStore, 'actions'> = {
    tourType: undefined,
};

export const useQuoteStore = create<QuoteStore>()(set => ({
    ...initialValue,
    actions: {
        setTourType: (tourType?: TourType) => {
            set(() => ({ tourType }));
        },
        resetQuoteStore: () => {
            set(() => initialValue);
        },
    },
}));
