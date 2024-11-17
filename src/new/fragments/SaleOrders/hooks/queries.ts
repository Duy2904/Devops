import { SaleOrderApi, TourFitApi, TourScheduleDto } from '@sdk/tour-operations';

import { AppConfig } from '@utils/config';
import { QueriesKey } from '../pages/SaleOrderFormDetail/hooks/QueriesKey';
import { getAxiosInstance } from '@services/auth';
import { useQuery } from 'react-query';

export const getTourFitApi = () => {
    return new TourFitApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetSaleOrder = (id: string | undefined) => {
    const fetchData = async () => {
        const response = await new SaleOrderApi(undefined, AppConfig.ApiHost, getAxiosInstance()).saleOrderGet(
            id!,
            'root',
        );
        return response.data;
    };

    return useQuery([QueriesKey.GetSaleOrderDetail, id], fetchData, {
        refetchOnWindowFocus: false,
        enabled: !!id,
    });
};

export const useQueryGetTourScheduleUseId = (id: string) => {
    const response = async (): Promise<TourScheduleDto> => {
        const response = await getTourFitApi().tourFitGet(id, 'root');
        return response.data;
    };

    return useQuery(['getTourScheduleId', id], response, { refetchOnWindowFocus: false, enabled: !!id });
};
