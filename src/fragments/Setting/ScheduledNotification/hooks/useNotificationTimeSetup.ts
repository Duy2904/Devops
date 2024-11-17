import { NotificationTimeSetupApi, NotificationTimeSetupRequest } from '@sdk/tour-operations';
import { getAxiosInstance } from '@services/auth';
import { AppConfig } from '@utils/config';
import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';

export const useGetNotificationTimeSetup = () => {
    const fetchData = async () => {
        const response = await new NotificationTimeSetupApi(
            undefined,
            AppConfig.ApiHost,
            getAxiosInstance(),
        ).notificationTimeSetupGet('root');
        return response.data;
    };

    return useQuery(['fetchNotificationTimeSetup'], fetchData, { refetchOnWindowFocus: false });
};

export const useUpdateNotificationTimeSetup = () => {
    return useMutation(
        ['updateNotificationTimeSetup'],
        async (setups: NotificationTimeSetupRequest[]): Promise<AxiosResponse<void>> => {
            const response = await new NotificationTimeSetupApi(
                undefined,
                AppConfig.ApiHost,
                getAxiosInstance(),
            ).notificationTimeSetupUpdate('root', { setups: setups });
            return response;
        },
    );
};