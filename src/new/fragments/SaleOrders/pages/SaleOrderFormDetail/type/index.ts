/* eslint-disable no-unused-vars */
export type TravellerSub = {
    id?: string;
    passengerTypeId?: string;
    passengerTypeCode?: string;
    passengerTypeName?: string;
    title?: string;
    subTitle?: string;
    hasVisa?: boolean;
    quantity?: number;
    price?: number;
    totalPrice?: number;
};

export enum defaultID {
    travellers = 'soTravellerId',
    surcharge = 'soLineId',
    revenueItems = 'revenueItemId',
}
