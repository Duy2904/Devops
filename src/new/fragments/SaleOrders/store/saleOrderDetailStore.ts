/* eslint-disable no-unused-vars */
import { SaleOrderLineDto, SaleOrderLineTravellerDto } from '@sdk/tour-operations';

import { CommissionModel } from '@fragments/SaleOrders/pages/SaleOrderFormComp/components/CommissionComponent';
import { create } from 'zustand';

interface SaleOrderDetailStore {
    saleOrderId: string | undefined;
    travellers: SaleOrderLineTravellerDto[];
    numberOfRooms: number;
    numberOfTravellers: number;
    saleOrderLines: SaleOrderLineDto[];
    tourId: string | undefined;
    commission: CommissionModel;
    soIdParams: string;
    paymentMethod: { id: string; value: number };
    isCallAgainDiscountList: boolean;
    actions: {
        setTravellers: (travellers: SaleOrderLineTravellerDto[]) => void;
        removeTravellers: () => void;
        setNumberOfRooms: (numberOfRooms: number) => void;
        setNumberOfTravellers: (numberOfTravellers: number) => void;
        setSaleOrderLines: (saleOrderLines: SaleOrderLineDto[]) => void;
        setTourId: (tourId: string | undefined) => void;
        setSaleOrderId: (saleOrderId: string | undefined) => void;
        resetSaleOrderDetailStore: () => void;
        setCommission: (commission: CommissionModel) => void;
        setSoIdParams: (soIdParams: string) => void;
        setPaymentMethod: (paymentMethod: { id: string; value: number }) => void;
        setIsCallAgainDiscountList: (isCallAgainDiscountList: boolean) => void;
    };
}

const initialValue: Omit<SaleOrderDetailStore, 'actions'> = {
    travellers: [],
    numberOfRooms: 0,
    numberOfTravellers: 0,
    saleOrderLines: [],
    tourId: undefined,
    saleOrderId: undefined,
    commission: {},
    soIdParams: '',
    paymentMethod: { id: '', value: 0 },
    isCallAgainDiscountList: false,
};

export const useSaleOrderDetailStore = create<SaleOrderDetailStore>()(set => ({
    ...initialValue,
    actions: {
        setTravellers: (travellers: SaleOrderLineTravellerDto[]) => {
            set(() => ({ travellers }));
        },
        removeTravellers: () => {
            set(() => ({ travellers: [] as SaleOrderLineTravellerDto[] }));
        },
        setNumberOfRooms: (numberOfRooms: number) => {
            set(() => ({ numberOfRooms: numberOfRooms }));
        },
        setNumberOfTravellers: (numberOfTravellers: number) => {
            set(() => ({ numberOfTravellers }));
        },
        setSaleOrderLines: (saleOrderLines: SaleOrderLineDto[]) => {
            set(() => ({ saleOrderLines }));
        },
        setTourId: (tourId: string | undefined) => {
            set(() => ({ tourId }));
        },
        setSaleOrderId: (saleOrderId: string | undefined) => {
            set(() => ({ saleOrderId }));
        },
        setCommission: (commission: CommissionModel) => {
            set(state => ({ ...state.commission, commission }));
        },
        setSoIdParams: (soIdParams: string) => {
            set(() => ({ soIdParams }));
        },
        setPaymentMethod: (paymentMethod: { id: string; value: number }) => {
            set(() => ({ paymentMethod }));
        },
        setIsCallAgainDiscountList: (isCallAgainDiscountList: boolean) => {
            set(() => ({ isCallAgainDiscountList }));
        },
        resetSaleOrderDetailStore: () => {
            set(() => initialValue);
        },
    },
}));
