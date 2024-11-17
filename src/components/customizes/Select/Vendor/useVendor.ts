import { PaginationResponseOfVendorDto, VendorApi } from '@sdk/tour-operations';

import { AppConfig } from '@utils/config';
import { getAxiosInstance } from '@services/auth';
import { useQuery } from 'react-query';

export const getVendorApi = () => {
    return new VendorApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetVendors = () => {
    return useQuery(
        ['getVendors'],
        async (): Promise<PaginationResponseOfVendorDto> => {
            const response = await getVendorApi().vendorSearch('root', {});
            return response.data;
        },
        { refetchOnWindowFocus: false, staleTime: Infinity },
    );
};
