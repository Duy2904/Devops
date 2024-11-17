import { PaginationResponseOfVatDto, VatApi } from '@sdk/tour-operations';

import { AppConfig } from '@utils/config';
import { getAxiosInstance } from '@services/auth';
import { useQuery } from 'react-query';

export const getVatApi = () => {
    return new VatApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetVats = () => {
    return useQuery(
        ['getVats'],
        async (): Promise<PaginationResponseOfVatDto> => {
            const response = await getVatApi().vatSearch('root', {});
            return response.data;
        },
        { refetchOnWindowFocus: false, staleTime: Infinity },
    );
};
