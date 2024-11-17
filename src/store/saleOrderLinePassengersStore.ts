import { create } from 'zustand';
import { SaleOrderLinePassengerDto } from '../../sdk/tour-operations';

interface SaleOrderLinePassengersStore {
    saleOrderLinePassengers: SaleOrderLinePassengerDto[];
    actions: {
        // eslint-disable-next-line no-unused-vars
        setSaleOrderLinePassengers: (saleOrderLinePassengers: SaleOrderLinePassengerDto[]) => void;
    };
}

export const useSaleOrderLinePassengersStore = create<SaleOrderLinePassengersStore>()(set => ({
    saleOrderLinePassengers: [],
    actions: {
        setSaleOrderLinePassengers: (saleOrderLinePassengers: SaleOrderLinePassengerDto[]) => {
            set(() => {
                return {
                    saleOrderLinePassengers: saleOrderLinePassengers,
                };
            });
        },
    },
}));
