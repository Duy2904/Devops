import { useMutation, useQuery } from 'react-query';

import { AppConfig } from '@utils/config';
import { RouteApi } from '@sdk/tour-operations';
import { getAxiosInstance } from '@services/auth';

export const getRouteApi = () => {
    return new RouteApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetRouteByDestinationLocationId = (destinationLocationId: string) => {
    return useQuery(
        ['getRouteByDestinationLocationId'],
        async () => {
            const response = await getRouteApi().routeSearch(
                'root',
                {
                    advancedFilter: {
                        logic: 'or',
                        filters: [
                            {
                                field: 'LocationId',
                                operator: 'eq',
                                value: destinationLocationId
                            },
                        ]
                    },
                    orderBy: ['Order Asc']
                },
            );
            return response.data;
        },
        { refetchOnWindowFocus: false, enabled: !!destinationLocationId },
    );
};

export const useGetRouteById = () => {
    return useMutation(
        ['getRouteById'],
        async (id: string) => {
            const dataFetch = await getRouteApi().routeGet(id, 'root');
            return dataFetch.data;
        },
    );
}

