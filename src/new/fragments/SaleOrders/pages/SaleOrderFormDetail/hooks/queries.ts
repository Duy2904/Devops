import { useQuery } from 'react-query';

import {
    GenderType,
    PaginationResponseOfVatDto,
    PaymentMethodApi,
    RoomType,
    TourFitApi,
    TourScheduleDto,
    VatApi,
} from '@sdk/tour-operations';
import { getAxiosInstance } from '@services/auth';
import i18n from '@src/i18n';
import { AppConfig } from '@utils/config';

import { QueriesKey } from './QueriesKey';

export const getTourFitApi = () => {
    return new TourFitApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const getVatApi = () => {
    return new VatApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useQueryGetTourScheduleUseId = (id: string) => {
    const response = async (): Promise<TourScheduleDto> => {
        const response = await getTourFitApi().tourFitGet(id, 'root');
        return response.data;
    };

    return useQuery([QueriesKey.GetTourScheduleId, id], response, {
        refetchOnWindowFocus: false,
        enabled: !!id,
        cacheTime: 0,
    });
};

export const useGetVats = () => {
    const response = async (): Promise<PaginationResponseOfVatDto> => {
        const response = await getVatApi().vatSearch('root', {});
        return response.data;
    };
    return useQuery([QueriesKey.GetVats], response, { refetchOnWindowFocus: false, staleTime: Infinity });
};

export const useGetPaymentMethods = () => {
    const requestFn = async () => {
        const response = await new PaymentMethodApi(
            undefined,
            AppConfig.ApiHost,
            getAxiosInstance(),
        ).paymentMethodSearch('root', {});

        const responseMap =
            response?.data?.data?.map(item => ({
                label: item.name ?? '',
                value: item.id ?? '',
            })) ?? [];

        return responseMap;
    };

    return useQuery([QueriesKey.GetPaymentMethods], requestFn, { refetchOnWindowFocus: false, staleTime: Infinity });
};

export const getGenderTypes = () =>
    Object.values(GenderType).map((key: string) => ({
        value: key,
        label: i18n.t(`GenderType.${key}`),
    }));

export const getRoomTypes = () =>
    Object.values(RoomType).map((key: string | RoomType) => ({
        value: key,
        label: i18n.t(`roomTypes.${key}`),
    }));
