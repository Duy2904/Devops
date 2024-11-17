import { create } from 'zustand';
import { SaleOrderLineDto } from '../../sdk/tour-operations';

interface SaleOrderLinesStore {
    saleOrderLines: SaleOrderLineDto[];
    actions: {
        // eslint-disable-next-line no-unused-vars
        setSaleOrderLines: (saleOrderLines: SaleOrderLineDto[]) => void;
    };
}

export const useSaleOrderLinesStore = create<SaleOrderLinesStore>()(set => ({
    saleOrderLines: [],
    actions: {
        setSaleOrderLines: (saleOrderLines: SaleOrderLineDto[]) => {
            set(() => {
                return {
                    saleOrderLines: saleOrderLines,
                };
            });
        },
    },
}));
