export type PassengerType = 'ADT' | 'CHD' | 'INF';

export interface GuestInfo {
    id?: string;
    passengerType: PassengerType;
    passengerTypeName: string;
    taxInclusivePrice: number;
    originPrice?: number;
    initialGuestQuantity?: number;
}

export interface PriceList {
    title: string;
    description: string;
    price: number;
}
