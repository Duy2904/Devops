import { create } from 'zustand';
import { TourCategoryDto } from '../../sdk/tour-operations';

interface TourCategoryStore {
    TourCategories: TourCategoryDto[];
    selectTourCategories: {
        value: string;
        label: string;
    }[];
    actions: {
        // eslint-disable-next-line no-unused-vars
        setTourCategory: (TourCategories: TourCategoryDto[]) => void;
    };
}

export const useTourCategorysStore = create<TourCategoryStore>()(set => ({
    TourCategories: [],
    selectTourCategories: [],
    actions: {
        setTourCategory: (TourCategories: TourCategoryDto[]) => {
            set(() => {
                return {
                    TourCategories: TourCategories,
                    selectTourCategories: TourCategories.map(TourCategory => ({
                        value: TourCategory.id ?? '',
                        label: TourCategory.name ?? '',
                    })),
                };
            });
        },
    },
}));
