import { create } from 'zustand';
import { LocationDto } from '../../sdk/tour-operations';

interface TourLocationStore {
    locations: LocationDto[];
    selectLocations: {
        value: string;
        label: string;
    }[];
    actions: {
        // eslint-disable-next-line no-unused-vars
        setLocation: (locations: LocationDto[]) => void;
    };
}

export const useTourLocationsStore = create<TourLocationStore>()(set => ({
    locations: [],
    selectLocations: [],
    actions: {
        setLocation: (locations: LocationDto[]) => {
            set(() => {
                return {
                    locations: locations,
                    selectLocations: locations.map(location => ({
                        value: location.id ?? '',
                        label: location.name ?? '',
                    })),
                };
            });
        },
    },
}));
