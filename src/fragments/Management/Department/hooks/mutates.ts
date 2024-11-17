import { CreateDepartmentRequest, DepartmentApi, UpdateDepartmentRequest } from '@sdk/tour-operations';
import { useMutation, useQueryClient } from 'react-query';

import { AppConfig } from '@utils/config';
import { DepartmentKey } from '../Feature/key-type';
import { getAxiosInstance } from '@services/auth';
import i18n from '@src/i18n';
import { toastSuccess } from '@components/ui/Toast/Toast';

export const departmentApi = () => {
    return new DepartmentApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useCreateDepartment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: DepartmentKey.createDepartment,
        mutationFn: async (createData: CreateDepartmentRequest): Promise<string> => {
            const response = await departmentApi().departmentCreate('hnh', createData);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries([DepartmentKey.fetchDepartments]);
            toastSuccess(i18n.t('message.default.success'), i18n.t('message.default.createContentSuccess'));
        },
    });
};

export const useUpdateDepartment = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [DepartmentKey.updateDepartment],
        mutationFn: async (updateRequest: UpdateDepartmentRequest) => {
            const response = await departmentApi().departmentUpdate(id, 'hnh', updateRequest);
            return response.data;
        },
        onSuccess: () => {
            toastSuccess(i18n.t('message.default.success'), i18n.t('message.default.updateContentSuccess'));
            queryClient.invalidateQueries([DepartmentKey.fetchDepartment, id]);
            queryClient.invalidateQueries([DepartmentKey.fetchDepartments]);
        },
    });
};

export const useDeleteDepartment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: [DepartmentKey.deleteDepartment],
        mutationFn: async (id: string) => {
            const response = await departmentApi().departmentDelete(id, 'hnh');
            return response.data;
        },
        onSuccess: () => {
            toastSuccess(i18n.t('message.default.success'), i18n.t('message.default.deleteContentSuccess'));
            queryClient.invalidateQueries([DepartmentKey.fetchDepartments]);
        },
    });
};
