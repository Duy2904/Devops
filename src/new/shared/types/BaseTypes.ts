export const currentPage = 1;
export const pageSize = 10;

// declare Item
declare type EventValue<DateType> = DateType | null;
export declare type RangeValue<DateType> = [EventValue<DateType>, EventValue<DateType>] | null;
