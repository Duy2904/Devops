import { AnyObject } from 'antd/es/_util/type';
import { TableParams } from '../types/SearchResponse';

export const currentPage = 1;
export const pageSize = 10;
declare type EventValue<DateType> = DateType | null;
export declare type RangeValue<DateType> = [EventValue<DateType>, EventValue<DateType>] | null;

class FilterSearch {
    public static filterOption = (input: string, option?: { label: string; value: string; disabled?: boolean }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
}

export const filterAdvanceListTourFit = () => {
    return {
        logic: 'or',
        filters: [
            {
                field: 'status',
                operator: 'eq',
                value: 'SalesOpen',
            },
            {
                field: 'status',
                operator: 'eq',
                value: 'NoSeatsAvailable',
            },
            {
                field: 'status',
                operator: 'eq',
                value: 'SaleTimeExpired',
            },
        ],
    };
};

export const filterAdvanceListTourFitFromSODetail = (departureDate: Date) => {
    return {
        logic: 'and',
        filters: [
            {
                logic: 'or',
                filters: [
                    {
                        field: 'status',
                        operator: 'eq',
                        value: 'SalesOpen',
                    },
                    {
                        field: 'status',
                        operator: 'eq',
                        value: 'NoSeatsAvailable',
                    },
                ],
            },
            {
                field: 'departureDate',
                operator: 'gt',
                value: departureDate,
            },
        ],
    };
};

export const numberSTT = (index: number, tableParams: TableParams<AnyObject>) => {
    const numberOf =
        index + 1 + ((tableParams.pagination?.current ?? 1) - 1) * (tableParams.pagination?.pageSize ?? 10);
    return numberOf;
};

export default FilterSearch;
