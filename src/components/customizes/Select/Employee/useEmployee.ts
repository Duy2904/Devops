import { EmployeeApi, PaginationResponseOfEmployeeDto } from '@sdk/tour-operations';

import { AppConfig } from '@utils/config';
import { getAxiosInstance } from '@services/auth';
import { useQuery } from 'react-query';

export const useGetEmployees = () => {
    return useQuery(
        ['getEmployees'],
        async (): Promise<PaginationResponseOfEmployeeDto> => {
            const res = await new EmployeeApi(undefined, AppConfig.ApiHost, getAxiosInstance()).employeeSearch(
                'root',
                {},
            );
            return res.data;
        },
        { refetchOnWindowFocus: false, staleTime: Infinity },
    );
};
