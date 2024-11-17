import { FormItemProps } from 'antd';
import { TDepartmentForm } from './type';
import i18n from '@src/i18n';

export const departmentFormValidation: Record<keyof TDepartmentForm, FormItemProps['rules']> = {
    name: [{ required: true, message: i18n.t('validation.default.validDefault') }],
    branchId: [{ required: true, message: i18n.t('validation.default.validDefault') }],
    isActive: undefined,
    parentId: undefined,
    employeeId: undefined,
    note: undefined,
};
