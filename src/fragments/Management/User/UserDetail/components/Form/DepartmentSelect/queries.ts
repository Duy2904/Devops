import { DepartmentApi, DropdownDto } from '@sdk/tour-operations';

import { AppConfig } from '@utils/config';
import { DepartmentKey } from './key-type';
import { getAxiosInstance } from '@services/auth';
import { useQuery } from 'react-query';

const departmentApi = new DepartmentApi(undefined, AppConfig.ApiHost, getAxiosInstance());

export const useFetchDropdownDepartment = (branchId: string | undefined) => {
    const requestFn = async () => {
        const response = await departmentApi.departmentGetDropdown(branchId!, 'root');
        const optionRes = response.data.map((item: DropdownDto) => {
            return { value: `${item.id}`, label: `${item.name}` };
        });
        return optionRes;
    };

    return useQuery({
        queryKey: [DepartmentKey.fetchDropdownDepartment, branchId],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
        enabled: !!branchId,
    });
};
