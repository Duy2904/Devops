import { create } from 'zustand';
import { TourInforDto } from '../../sdk/tour-operations';

interface TourSerialsStore {
    tourSerials: TourInforDto[];
    selectTourSerial: {
        value: string;
        label: string;
    }[];
    actions: {
        // eslint-disable-next-line no-unused-vars
        setTourSerials: (tourSerials: TourInforDto[]) => void;
    };
}

export const useTourSerialsStore = create<TourSerialsStore>()(set => ({
    tourSerials: [],
    selectTourSerial: [],
    actions: {
        setTourSerials: (tourSerials: TourInforDto[]) => {
            set(() => {
                return {
                    tourSerials: tourSerials,
                    selectTourSerial: tourSerials.map(tourSerial => ({
                        label: tourSerial.name ?? '',
                        value: tourSerial.id ?? '',
                    })),
                };
            });
        },
    },
}));
