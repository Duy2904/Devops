import { AppConfig } from '@utils/config';
import { FormItemProps } from 'antd';
import { TBranchForm } from './type';
import i18n from '@src/i18n';

export const branchFormValidation: Record<keyof TBranchForm, FormItemProps['rules']> = {
    name: [{ required: true, message: i18n.t('validation.default.validDefault') }],
    address: [{ required: true, message: i18n.t('validation.default.validDefault') }],
    phoneNumber: [
        {
            pattern: AppConfig.PhoneRegex,
            message: i18n.t('validation.default.errorPhone'),
        },
        {
            required: true,
            message: i18n.t('validation.default.validPhone'),
        },
    ],
    email: [
        {
            required: true,
            message: i18n.t('validation.default.validDefault'),
        },
        {
            type: 'email',
            message: i18n.t('validation.default.validMail'),
        },
    ],
    isActive: undefined,
    representative: undefined,
    shortName: undefined,
    taxCode: undefined,
    bankAccount: undefined,
    website: undefined,
    bankName: undefined,
    note: undefined,
};
