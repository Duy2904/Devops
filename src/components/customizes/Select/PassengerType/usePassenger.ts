import { AnyObject } from 'antd/es/_util/type';
import { useQuery } from 'react-query';

import {
    PaginationResponseOfPassengerTypeDto,
    PassengerTypeApi,
    SearchPassengerTypesRequest,
} from '@sdk/tour-operations';
import { getAxiosInstance } from '@services/auth';
import { AppConfig } from '@utils/config';

export const getPassengerApi = () => {
    return new PassengerTypeApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useFetchPassengerTypeDefaultFIT = (condition: AnyObject) => {
    const response = async (): Promise<PaginationResponseOfPassengerTypeDto> => {
        const res = await getPassengerApi().passengerTypeSearch('root', {
            pageSize: 100,
            orderBy: ['code'],
            ...condition,
        } as SearchPassengerTypesRequest);
        return res.data;
    };
    return useQuery(['getPassengerType', JSON.stringify(condition)], response, {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
};

export const useGetPassengerTypeDefaultGIT = () => {
    const response = async (): Promise<PaginationResponseOfPassengerTypeDto> => {
        const res = await getPassengerApi().passengerTypeSearch('root', {
            isGIT: true,
            orderBy: ['code'],
        });
        return res.data;
    };
    return useQuery(['getPassengerTypeDefaultGIT'], response, { refetchOnWindowFocus: false, staleTime: Infinity });
};
