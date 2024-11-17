import { create } from 'zustand';

interface TourFitAutoCompletedStore {
    labelName: string;
    // eslint-disable-next-line no-unused-vars
    setLabelName: (labelName: string) => void;
}

export const useTourFitAutoCompletedStore = create<TourFitAutoCompletedStore>()(set => ({
    labelName: '',
    setLabelName: (labelName: string) => {
        set(() => ({ labelName: labelName }));
    },
}));
