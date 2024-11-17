import {
    GenderType,
    PaginationResponseOfSaleOrderLineTravellerDto,
    RoomType,
    SaleOrderLineTravellerApi,
} from '../../../sdk/tour-operations';
import { useMutation, useQuery } from 'react-query';

import { AppConfig } from '../../utils/config';
import { getAxiosInstance } from '../../services/auth';
import i18n from '../../i18n';

export const useGetSaleOrderLineTravellers = (id: string) => {
    const fetchData = async (): Promise<PaginationResponseOfSaleOrderLineTravellerDto> => {
        const response = await new SaleOrderLineTravellerApi(
            undefined,
            AppConfig.ApiHost,
            getAxiosInstance(),
        ).saleOrderLineTravellerSearch('root', { saleOrderId: id });
        return response.data;
    };

    return useQuery(['fetchSaleOrderLineTravellers', id], fetchData, {
        refetchOnWindowFocus: false,
        enabled: !!id,
    });
};

export const useDeleteSaleOrderLineTraveller = () => {
    return useMutation(['deleteSaleOrderLineTraveller'], async (id: string): Promise<string> => {
        const response = await new SaleOrderLineTravellerApi(
            undefined,
            AppConfig.ApiHost,
            getAxiosInstance(),
        ).saleOrderLineTravellerDelete(id, 'root');
        return response.data;
    });
};

export const getGenderTypes = () =>
    Object.values(GenderType).map((key: string) => ({
        value: key,
        label: i18n.t(`GenderType.${key}`),
    }));

export const getRoomTypes = () =>
    Object.values(RoomType).map((key: string | RoomType) => ({
        value: key,
        label: i18n.t(`${key}`),
    }));
