import { create } from 'zustand';
import { SaleOrderLineTravellerDto } from '../../../../sdk/tour-operations';

interface SaleOrderLineTravellersStore {
    saleOrderLineTravellers: SaleOrderLineTravellerDto[];
    actions: {
        // eslint-disable-next-line no-unused-vars
        setSaleOrderLineTravellers: (saleOrderLineTravellers: SaleOrderLineTravellerDto[]) => void;
        resetSaleOrderLineTravellers: () => void;
    };
}

const initialValue = {
    saleOrderLineTravellers: [],
};

export const useSaleOrderLineTravellersStore = create<SaleOrderLineTravellersStore>()(set => ({
    ...initialValue,
    actions: {
        setSaleOrderLineTravellers: (saleOrderLineTravellers: SaleOrderLineTravellerDto[]) => {
            set(() => {
                return {
                    saleOrderLineTravellers: saleOrderLineTravellers,
                };
            });
        },
        resetSaleOrderLineTravellers: () => {
            set(() => initialValue);
        },
    },
}));
