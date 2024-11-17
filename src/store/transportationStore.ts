import { create } from 'zustand';
import { TransportationDto } from '../../sdk/tour-operations';

interface TransportationStore {
    transportations: TransportationDto[];
    selectTransportation: {
        value: string;
        label: string;
    }[];
    actions: {
        // eslint-disable-next-line no-unused-vars
        setTrans: (transportations: TransportationDto[]) => void;
    };
}

export const useTransportationStore = create<TransportationStore>()(set => ({
    transportations: [],
    selectTransportation: [],
    actions: {
        setTrans: (transportations: TransportationDto[]) => {
            set(() => {
                return {
                    transportations: transportations,
                    selectTransportation: transportations.map(transportation => ({
                        value: transportation.id ?? '',
                        label: transportation.name ?? '',
                    })),
                };
            });
        },
    },
}));
