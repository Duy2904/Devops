import { create } from 'zustand';

export interface SaleOrderDefaultContactDto {
    name?: string;
    phone?: string;
}

interface SaleOrderStore {
    surchargeTotalAmount: number;
    travellerTotalAmount: number;
    fareCount: { key: string; value: number }[];
    roomCount: { key: string; value: number }[];
    totalCount: number;
    defaultContact: SaleOrderDefaultContactDto;
    actions: {
        // eslint-disable-next-line no-unused-vars
        setSurchargeTotalAmount: (surchargeTotalAmount: number) => void;
        // eslint-disable-next-line no-unused-vars
        setTravellerTotalAmount: (travellerTotalAmount: number) => void;
        // eslint-disable-next-line no-unused-vars
        setFareCount: (fareCounts: { key: string; value: number }[]) => void;
        // eslint-disable-next-line no-unused-vars
        setRoomCount: (roomCounts: { key: string; value: number }[]) => void;
        // eslint-disable-next-line no-unused-vars
        setTotalCount: (count: number) => void;
        // eslint-disable-next-line no-unused-vars
        setDefaultContact: (name?: string, phone?: string) => void;
        resetSOFormStore: () => void;
    };
}

const initialValue = {
    surchargeTotalAmount: 0,
    travellerTotalAmount: 0,
    fareCount: [],
    roomCount: [],
    totalCount: 0,
    defaultContact: {},
};

export const useSaleOrderFormStore = create<SaleOrderStore>()(set => ({
    ...initialValue,
    actions: {
        setSurchargeTotalAmount: (surchargeTotalAmount: number) => {
            set(() => {
                return {
                    surchargeTotalAmount: surchargeTotalAmount,
                };
            });
        },
        setTravellerTotalAmount: (travellerTotalAmount: number) => {
            set(() => {
                return {
                    travellerTotalAmount: travellerTotalAmount,
                };
            });
        },
        setFareCount: (fareCounts: { key: string; value: number }[]) => {
            set(() => {
                return {
                    fareCount: fareCounts,
                };
            });
        },
        setRoomCount: (roomCounts: { key: string; value: number }[]) => {
            set(() => {
                return {
                    roomCount: roomCounts,
                };
            });
        },
        setTotalCount: (count: number) => {
            set(() => {
                return {
                    totalCount: count,
                };
            });
        },
        setDefaultContact: (name?: string, phone?: string) => {
            set(() => {
                return {
                    defaultContact: {
                        name: name,
                        phone: phone,
                    },
                };
            });
        },
        resetSOFormStore: () => {
            set(() => initialValue);
        },
    },
}));
