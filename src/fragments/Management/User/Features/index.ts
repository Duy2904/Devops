import { AnyObject } from 'antd/es/_util/type';
import { AppConfig } from '@utils/config';
import { FormItemProps } from 'antd';
import { SorterResult } from 'antd/es/table/interface';
import { TableParams } from '@src/types/SearchResponse';
import i18n from '@src/i18n';

export type TUserForm = {
    email?: string;
    groupId?: string;
    roleId?: string;
    phoneNumber?: string;
    branchId?: string;
    firstName?: string;
    lastName?: string;
};

export const mapSearchRequest = (params: TableParams<AnyObject>): AnyObject => {
    const searchKeyWord = {
        fields: ['email', 'fullName', 'phoneNumber'],
        keyword: params.keyword,
    };
    const request: AnyObject = {
        advancedSearch: searchKeyWord,
        pageNumber: params.pagination?.current,
        pageSize: params.pagination?.pageSize,
        statuses: params.status,
        branchIds: params.branchIds,
        groupIds: params.groupIds,
        orderBy: ['CreatedOn Desc'],
    };
    const sorter = params.sorter as SorterResult<AnyObject>;
    if (sorter?.columnKey && sorter?.order) {
        request.orderBy = [`${sorter.columnKey} ${sorter.order == 'ascend' ? 'Asc' : 'Desc'}`];
    }
    return request;
};

export const UserFormValidation: Record<keyof TUserForm, FormItemProps['rules']> = {
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
    firstName: [{ required: true, message: i18n.t('validation.default.validDefault') }],
    lastName: [{ required: true, message: i18n.t('validation.default.validDefault') }],
    groupId: [{ required: true, message: i18n.t('validation.default.validDefault') }],
    roleId: [{ required: true, message: i18n.t('validation.default.validDefault') }],
    phoneNumber: [
        {
            pattern: AppConfig.PhoneRegex,
            message: i18n.t('validation.default.errorPhone'),
        },
    ],
    branchId: [{ required: true, message: i18n.t('validation.default.validDefault') }],
};
