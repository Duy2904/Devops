import { create } from 'zustand';
import { PassengerTypeDto } from '../../sdk/tour-operations';

interface PassengerTypeStore {
    passengersType: PassengerTypeDto[];
    selectPassengerType: {
        value: string;
        label: string;
    }[];
    actions: {
        // eslint-disable-next-line no-unused-vars
        setPassengersType: (passengerTypes: PassengerTypeDto[]) => void;
    };
}

export const usePassengerTypeStore = create<PassengerTypeStore>()(set => ({
    passengersType: [],
    selectPassengerType: [],
    actions: {
        setPassengersType: (passengerTypes: PassengerTypeDto[]) => {
            set(() => {
                return {
                    passengersType: passengerTypes,
                    selectPassengerType: passengerTypes.map(passengerType => ({
                        value: passengerType.id ?? '',
                        label: passengerType.name ?? '',
                    })),
                };
            });
        },
    },
}));
