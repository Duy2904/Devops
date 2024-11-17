import { ApprovalSettingApi, UpdateApprovalSettingRequest } from '@sdk/tour-operations';
import { getAxiosInstance } from '@services/auth';
import { AppConfig } from '@utils/config';
import { useMutation, useQuery } from 'react-query';

export const useGetApprovalSetting = () => {
    const fetchData = async () => {
        const response = await new ApprovalSettingApi(
            undefined,
            AppConfig.ApiHost,
            getAxiosInstance(),
        ).approvalSettingGet('root');
        return response.data;
    };

    return useQuery(['fetchApprovalSetting'], fetchData, { refetchOnWindowFocus: false });
};

export const useGetListUserApprovalSetting = () => {
    const fetchData = async () => {
        const response = await new ApprovalSettingApi(
            undefined,
            AppConfig.ApiHost,
            getAxiosInstance(),
        ).approvalSettingGetUserForApproval('root');
        return response.data;
    };

    return useQuery(['fetchListUserApprovalSetting'], fetchData, { refetchOnWindowFocus: false });
};

export const useUpdateApprovalSetting = () => {
    const fn = async (request: UpdateApprovalSettingRequest) => {
        const response = await new ApprovalSettingApi(
            undefined,
            AppConfig.ApiHost,
            getAxiosInstance(),
        ).approvalSettingUpdate('root', request);
        return response;
    };

    return useMutation(['updateApprovalSetting'], fn);
};
