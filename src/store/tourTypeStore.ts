import { create } from 'zustand';
import { TourTypeDto } from '../../sdk/tour-operations';

interface TourTypeStore {
    tourTypes: TourTypeDto[];
    selectTourTypes: {
        value: string;
        label: string;
    }[];
    actions: {
        // eslint-disable-next-line no-unused-vars
        setTourType: (tourTypes: TourTypeDto[]) => void;
    };
}

export const useTourTypesStore = create<TourTypeStore>()(set => ({
    tourTypes: [],
    selectTourTypes: [],
    actions: {
        setTourType: (tourTypes: TourTypeDto[]) => {
            set(() => {
                return {
                    tourTypes: tourTypes,
                    selectTourTypes: tourTypes.map(tourType => ({
                        value: tourType.id ?? '',
                        label: tourType.name ?? '',
                    })),
                };
            });
        },
    },
}));
