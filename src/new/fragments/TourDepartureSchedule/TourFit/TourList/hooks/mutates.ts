import { SaleOrderApi, SaleOrdersOfTourDto, TourScheduleMediaApi } from '@sdk/tour-operations';

import { AppConfig } from '@src/new/shared/utils/config';
import { getAxiosInstance } from '@services/auth';
import { useMutation } from 'react-query';

export const getTourScheduleMedia = () => {
    return new TourScheduleMediaApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useDownloadAllFile = () => {
    const requestFn = async (tourId: string) => {
        const response = await getTourScheduleMedia().tourScheduleMediaDownloadAttachment(tourId, 'root', {
            headers: {
                accept: 'application/octet-stream',
            },
            responseType: 'blob',
        });
        return response.data;
    };

    return useMutation(['DOWNLOAD_ALL_FILE'], requestFn);
};

export const useGetListSOBookedTourFit = () => {
    const requestFn = async (id: string): Promise<SaleOrdersOfTourDto> => {
        const response = await new SaleOrderApi(undefined, AppConfig.ApiHost, getAxiosInstance()).saleOrderGetBooked(
            'root',
            id,
        );
        return response.data;
    };
    return useMutation(['FETCH_SO_BOOKED'], requestFn);
};

export const useGetListSOReservedTourFit = () => {
    const requestFn = async (id: string): Promise<SaleOrdersOfTourDto> => {
        const response = await new SaleOrderApi(undefined, AppConfig.ApiHost, getAxiosInstance()).saleOrderGetReserved(
            'root',
            id,
        );
        return response.data;
    };
    return useMutation(['FETCH_SO_RESERVED'], requestFn);
};
