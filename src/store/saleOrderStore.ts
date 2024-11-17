import { SaleOrderDto, SearchSaleOrderViewDto } from '../../sdk/tour-operations';

import { create } from 'zustand';

interface SaleOrderStore {
    saleOrder: SaleOrderDto;
    saleOrderFormStatus: SaleOrderFormStatus;
    itemReceivable: {
        orderData: SearchSaleOrderViewDto;
    };
    actions: {
        // eslint-disable-next-line no-unused-vars
        setSaleOrder: (saleOrder: SaleOrderDto) => void;
        removeSaleOrder: () => void;
        // eslint-disable-next-line no-unused-vars
        setSaleOrderFormStatus: (saleOrderFormStatus: SaleOrderFormStatus) => void;
        // eslint-disable-next-line no-unused-vars
        setItemReceivable: (itemReceivable: { orderData: SearchSaleOrderViewDto }) => void;
        resetSaleOrderStore: () => void;
    };
}

export interface SaleOrderFormStatus {
    soId?: string;
    isInfoFormSuccess?: boolean;
    isTouristFormSuccess?: boolean;
    isSurchargeFormSuccess?: boolean;
    message?: string;
}

export const useSaleOrderStore = create<SaleOrderStore>()(set => ({
    saleOrder: {} as SaleOrderDto,
    saleOrderFormStatus: {} as SaleOrderFormStatus,
    itemReceivable: { orderData: {} },
    actions: {
        setSaleOrder: (saleOrder: SaleOrderDto) => {
            set(() => ({ saleOrder }));
        },
        removeSaleOrder: () => {
            set(() => ({ saleOrder: {} as SaleOrderDto }));
        },
        setSaleOrderFormStatus: (saleOrderFormStatus: SaleOrderFormStatus) => {
            set(() => ({ saleOrderFormStatus }));
        },
        setItemReceivable: (itemReceivable: { orderData: SearchSaleOrderViewDto }) => {
            set(() => ({ itemReceivable }));
        },
        resetSaleOrderStore: () => {
            set(() => ({ saleOrder: {} as SaleOrderDto, saleOrderFormStatus: {} as SaleOrderFormStatus }));
        },
    },
}));
