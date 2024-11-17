import { FormItemProps } from 'antd';
import i18n from '@src/i18n';

type TAccountForm = {
    firstName?: string;
    lastName?: string;
    displayName?: string;
    phoneNumber?: string;
};

export const AccountFormValidation: Record<keyof TAccountForm, FormItemProps['rules']> = {
    firstName: [
        {
            required: true,
            message: i18n.t('validation.default.validDefault'),
        },
    ],
    lastName: [
        {
            required: true,
            message: i18n.t('validation.default.validDefault'),
        },
    ],
    displayName: undefined,
    phoneNumber: undefined,
};
