/* eslint-disable no-unused-vars */
import { create } from 'zustand';

interface DiscountStore {
    isAppliedPromotions: boolean;
    actions: {
        setIsAppliedPromotions: (isAppliedPromotions: boolean) => void;
        resetDiscountStore: () => void;
    };
}

const initialValue: Omit<DiscountStore, 'actions'> = {
    isAppliedPromotions: false,
};

export const useDiscountStore = create<DiscountStore>()(set => ({
    ...initialValue,
    actions: {
        setIsAppliedPromotions: (isAppliedPromotions: boolean) => {
            set(() => ({ isAppliedPromotions }));
        },
        resetDiscountStore: () => {
            set(() => initialValue);
        },
    },
}));
