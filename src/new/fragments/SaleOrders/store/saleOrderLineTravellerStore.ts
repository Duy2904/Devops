import { SaleOrderLineTravellerDto } from '@sdk/tour-operations';
import { TravellerSub } from '../features/key-type';
import { create } from 'zustand';

interface SaleOrderLineTravellersStore {
    saleOrderLineTravellers: SaleOrderLineTravellerDto[];
    groupSaleOrderTravellers: TravellerSub[];
    actions: {
        // eslint-disable-next-line no-unused-vars
        setSaleOrderLineTravellers: (saleOrderLineTravellers: SaleOrderLineTravellerDto[]) => void;
        resetSaleOrderLineTravellers: () => void;
        // eslint-disable-next-line no-unused-vars
        setGroupSaleOrderTravellers: (groupSaleOrderTravellers: TravellerSub[]) => void;
    };
}

const initialValue = {
    saleOrderLineTravellers: [],
    groupSaleOrderTravellers: [],
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
        setGroupSaleOrderTravellers: (groupSaleOrderTravellers: TravellerSub[]) => {
            set(() => {
                return {
                    groupSaleOrderTravellers: groupSaleOrderTravellers,
                };
            });
        },
    },
}));
