import { useQuery } from 'react-query';

import { ApprovalSettingApi } from '@sdk/tour-operations';
import { getAxiosInstance } from '@services/auth';
import { AppConfig } from '@utils/config';

export const useGetMyApprovalSetting = () => {
    const fetchData = async () => {
        const response = await new ApprovalSettingApi(
            undefined,
            AppConfig.ApiHost,
            getAxiosInstance(),
        ).approvalSettingGetMyApprovalPermissions('root');
        return response.data;
    };
    return useQuery(['fetchMyApprovalSetting'], fetchData, { refetchOnWindowFocus: false });
};
