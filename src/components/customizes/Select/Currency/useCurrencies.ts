import { useQuery } from 'react-query';

import { CurrencyApi, PaginationResponseOfCurrencyDto } from '@sdk/tour-operations';
import { getAxiosInstance } from '@services/auth';
import { AppConfig } from '@utils/config';

export const getCurrencyApi = () => {
    return new CurrencyApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetCurrencies = (showAll?: boolean) => {
    return useQuery(
        ['fetchCurrencies'],
        async (): Promise<PaginationResponseOfCurrencyDto> => {
            const dataFetch = await getCurrencyApi().currencySearch('root', { pageSize: 100, showOnlyVND: !showAll });
            return dataFetch.data;
        },
        { refetchOnWindowFocus: false, staleTime: Infinity },
    );
};
