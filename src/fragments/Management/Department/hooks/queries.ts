import { ActiveStatus, DepartmentApi, EmployeeApi } from '@sdk/tour-operations';

import { AnyObject } from 'antd/es/_util/type';
import { AppConfig } from '@utils/config';
import { DepartmentKey } from '../Feature/key-type';
import _ from 'lodash';
import { getAxiosInstance } from '@services/auth';
import i18n from '@src/i18n';
import { mapSearchRequest } from '../Feature/mapSearchRequest';
import { useQuery } from 'react-query';

export const departmentApi = () => {
    return new DepartmentApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const employeeApi = () => {
    return new EmployeeApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useFetchDepartments = (request: AnyObject) => {
    const customKey = _.omit(request, 'pagination.total');
    const requestFn = async () => {
        const response = await departmentApi().departmentSearch('root', mapSearchRequest(request));
        return response.data;
    };

    return useQuery({
        queryKey: [DepartmentKey.fetchDepartments, JSON.stringify(customKey)],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
    });
};

export const useFetchDepartment = (id: string) => {
    const requestFn = async () => {
        const response = await departmentApi().departmentGet(id, 'root');
        return response.data;
    };

    return useQuery({
        queryKey: [DepartmentKey.fetchDepartment, id],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
        enabled: !!id,
    });
};

export const useFetchDepartmentsSelect = () => {
    const requestFn = async () => {
        const response = await departmentApi().departmentSearch('root', {});
        const data =
            response.data?.data
                ?.filter(item => item.status == ActiveStatus.Active)
                .map(x => {
                    const { id, name, branchId } = x;
                    return { value: id ?? '', label: name ?? '', branchId: branchId ?? '' };
                }) ?? [];
        return data;
    };

    return useQuery({
        queryKey: [DepartmentKey.fetchDepartmentsSelect],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
    });
};

export const useFetchEmployees = () => {
    const requestFn = async () => {
        const response = await employeeApi().employeeSearch('root', {});
        const data =
            response.data?.data?.map(x => {
                const { id, name, phone } = x;
                return { value: `${id}`, label: `${name} - ${phone}` };
            }) ?? [];
        return data;
    };

    return useQuery({
        queryKey: [DepartmentKey.fetchEmployees],
        queryFn: requestFn,
        refetchOnWindowFocus: false,
    });
};

export const getDepartmentStatus = () =>
    Object.values(ActiveStatus).map((key: string) => ({
        value: key,
        label: i18n.t(`departmentStatus.${key}`),
    }));
