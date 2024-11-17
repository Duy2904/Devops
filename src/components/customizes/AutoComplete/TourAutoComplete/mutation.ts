import { DebtReportApi, TourFitApi, TourGitApi } from '@sdk/tour-operations';

import { AnyObject } from 'antd/es/_util/type';
import { AppConfig } from '@utils/config';
import { getAxiosInstance } from '@services/auth';
import { useMutation } from 'react-query';

export const getTourFitApi = () => {
    return new TourFitApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const getTourGitApi = () => {
    return new TourGitApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const getDebtApi = () => {
    return new DebtReportApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetListTourFitDropdown = () => {
    const response = async (request: AnyObject) => {
        const res = await getTourFitApi().tourFitDropdown('root', request);
        const responseMap =
            res.data?.map(item => ({
                value: `${item.id}`,
                label: `${item.tourCode}-${item.name}`,
            })) ?? [];
        return responseMap;
    };
    return useMutation(['FETCH_LIST_TOUR_FIT_DROPDOWN'], response);
};

export const useGetListTourGitDropdown = () => {
    const response = async (request: AnyObject) => {
        const res = await getTourGitApi().tourGitDropdown('root', request);
        const responseMap =
            res.data?.map(item => ({
                value: `${item.id}`,
                label: `${item.tourCode}-${item.name}`,
            })) ?? [];
        return responseMap;
    };
    return useMutation(['FETCH_LIST_TOUR_GIT_DROPDOWN'], response);
};

export const useGetListTourFitTransferDropdown = (id: string) => {
    const response = async (request: AnyObject) => {
        const res = await getTourFitApi().tourFitGetTransfer(id, 'root', { ...request, id: id });
        const responseMap =
            res?.data?.data?.map(item => ({
                value: `${item.id}`,
                label: `${item.tourCode}-${item.name}`,
            })) ?? [];
        return responseMap;
    };
    return useMutation(['FETCH_LIST_TOUR_FIT_TRANSFER'], response);
};

export const useGetListTourFitDebtDropdown = () => {
    const response = async (request: AnyObject) => {
        const res = await getDebtApi().debtReportDropdown('root', request);
        const responseMap =
            res.data?.map(item => ({
                value: `${item.id}`,
                label: `${item.tourCode}-${item.name}`,
            })) ?? [];
        return responseMap;
    };
    return useMutation(['FETCH_LIST_TOUR_FIT_DEBT_DROPDOWN'], response);
};
