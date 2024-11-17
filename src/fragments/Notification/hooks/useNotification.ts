import {
    GetUserNotificationsRequest,
    NotificationApi,
    PaginationResponseOfNotificationMessageDto,
} from '@sdk/tour-operations';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { AppConfig } from '@utils/config';
import { UserDetailsDto } from '@sdk/identity-next/models';
import { getAxiosInstance } from '@services/auth';

export const getNotificationApis = () => {
    return new NotificationApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetNotifications = (fetchPersonal: UserDetailsDto | undefined, paging: GetUserNotificationsRequest) => {
    return useQuery(
        ['fetchNotifications', JSON.stringify(paging)],
        async (): Promise<PaginationResponseOfNotificationMessageDto> => {
            const response = await getNotificationApis().notificationGetNotifications('root', paging);
            return response.data;
        },
        {
            refetchOnWindowFocus: false,
            enabled: fetchPersonal && fetchPersonal.isActive && fetchPersonal.groups?.[0]?.healthz,
        },
    );
};

export const useMarkAllReadNotifications = () => {
    const queryClient = useQueryClient();
    return useMutation(
        ['markAllReadNotifications'],
        async () => {
            const response = await getNotificationApis().notificationSetAllNotificationsAsRead('root', {});
            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['fetchNotifications']);
            },
        },
    );
};

export const useMarkReadNotification = () => {
    const queryClient = useQueryClient();
    return useMutation(
        ['markReadNotification'],
        async (id: string) => {
            const response = await getNotificationApis().notificationSetNotificationAsRead(id, 'root', { id });
            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['fetchNotifications']);
            },
        },
    );
};
