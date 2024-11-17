import {
    DiscountConditionType,
    DiscountDetailDto,
    DiscountLineRequest,
    DiscountOnType,
    TourScheduleStatus,
} from '@sdk/tour-operations';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { FormInstance, TablePaginationConfig } from 'antd';

import { AnyObject } from 'antd/es/_util/type';
import { convertValues } from '@utils/formHelper';
import dayjs from 'dayjs';
import i18n from '@src/i18n';
import isNil from 'lodash/isNil';
import { rootPaths } from '@src/routers/route';

export declare type typePromote = '1' | '2'; // 1 CTKM theo số chỗ, 2 CTKM khách đi nhóm

// excludes status with Tour
export const statusRemove = [
    TourScheduleStatus.Cancel,
    TourScheduleStatus.NoSeatsAvailable,
    TourScheduleStatus.SaleTimeExpired,
];

export interface TableParams<BaseParamsDto> {
    pagination?: TablePaginationConfig;
    advancedFilter?: Record<string, FilterValue | null>;
    sorter?: SorterResult<BaseParamsDto> | SorterResult<BaseParamsDto>[];
    keyword?: string;
    customerId?: string;
    fromDate?: Date | null;
    toDate?: Date | null;
    typePromote?: typePromote;
    createdOn?: Date | null;
    tourScheduleId?: string;
}

export const slugSeat = [
    {
        name: i18n.t('Chương trình khuyến mãi'),
        slug: '',
    },
    {
        name: i18n.t('menu.promoteFromSeat'),
        slug: rootPaths.promoteBySeat,
    },
];

export const slugGroup = [
    {
        name: i18n.t('Chương trình khuyến mãi'),
        slug: '',
    },
    {
        name: i18n.t('menu.promoteFromGroup'),
        slug: rootPaths.promoteByGroup,
    },
];

export const ConditionTypeSelect = () => {
    const temp = Object.values(DiscountConditionType).map((key: string) => ({
        value: key,
        label: i18n.t(`discountConditionType.${key}`),
    }));
    return temp;
};

export const resFetchData = (values: AnyObject, type: DiscountOnType) => {
    const commonProperties = {
        id: values.discountLineId,
        discountConditionType: values.discountLineConditionType,
        quantity: values.discountLineQuantity,
        discountType: values.discountLineDiscountType,
        value: values.discountLineDiscountValue,
    };

    const fetchGroupLines = {
        ...commonProperties,
        startDate: type === DiscountOnType.EarlyBirdLastMinute ? values.discountLineStartDate ?? undefined : '',
        endDate: type === DiscountOnType.EarlyBirdLastMinute ? values.discountLineEndDate ?? undefined : '',
    };

    const fetchconvertValues = convertValues(fetchGroupLines).map(item => {
        item.id.startsWith('discount') && delete item.id;
        const tempData =
            type == DiscountOnType.Group
                ? {
                      ...item,
                      startDate: dayjs(values.startDate).startOf('day').toDate(),
                      endDate: dayjs(values.endDate).endOf('day').toDate(),
                  }
                : {
                      ...item,
                      startDate: dayjs(item.startDate).startOf('day').toDate(),
                      endDate: dayjs(item.endDate).endOf('day').toDate(),
                  };
        return tempData;
    });
    const convertFetchGroupLines = values.discountLineId ? fetchconvertValues : undefined;
    return {
        id: values.id,
        code: values.code,
        currencyId: values.currencyId,
        type: type,
        isActive: values.isActive,
        tourScheduleIds: values.tourScheduleIds,
        name: values.name,
        discountLines: convertFetchGroupLines,
        startDate: values.startDate,
        endDate: values.endDate,
    };
};

export const checkRegexCode = (code: string) => {
    const regex = /[^A-Z0-9]/;
    return regex.exec(code);
};

export const validateDisableStartDate = (dataDetail: DiscountDetailDto | undefined, record: DiscountLineRequest) => {
    return IsDisableInput(dataDetail, record);
};

export const IsDisableEndDate = (
    tourDiscountForm: FormInstance,
    record: DiscountLineRequest,
    dataDetail: DiscountDetailDto | undefined,
) => {
    return (
        isNil(tourDiscountForm.getFieldValue(['discountLineStartDate', record.id!])) ||
        IsDisableInput(dataDetail, record)
    );
};

export const validateDisableDateStartDate = (
    current: dayjs.Dayjs,
    saleStartDate: dayjs.Dayjs,
    saleEndDate: dayjs.Dayjs,
    tourDiscountForm: FormInstance,
    record: DiscountLineRequest,
    endDateOfEB: dayjs.Dayjs | null,
) => {
    return (
        current <= (endDateOfEB || dayjs(saleStartDate).subtract(1, 'day')) ||
        current >
            (tourDiscountForm.getFieldValue(['discountLineEndDate', record.id!])
                ? dayjs(tourDiscountForm.getFieldValue(['discountLineEndDate', record.id!])).subtract(1, 'day')
                : saleEndDate)
    );
};

export const validateDisableDateEndDate = (
    current: dayjs.Dayjs,
    tourDiscountForm: FormInstance,
    record: DiscountLineRequest,
    saleEndDate: dayjs.Dayjs,
) => {
    return (
        current > saleEndDate ||
        current <= dayjs(tourDiscountForm.getFieldValue(['discountLineStartDate', record.id!])).subtract(1, 'day')
    );
};

export const IsDisableInput = (dataDetail: DiscountDetailDto | undefined, record: DiscountLineRequest) => {
    const discountConditionType = dataDetail?.discountLines?.map(item => item.discountConditionType) ?? [];
    return (
        // had EB && isUsed = true
        dataDetail?.isUsed &&
        (record.discountConditionType === DiscountConditionType.FirstPlaces ||
            dataDetail.discountLines?.length == 2 ||
            (record.discountConditionType === DiscountConditionType.LastPlaces &&
                dataDetail.discountLines?.length == 1 &&
                !discountConditionType.includes(DiscountConditionType.FirstPlaces)))
    );
};

export const getIdOfLastMinute = (discountFormUseWatch: AnyObject) => {
    const positionOfLastMinutes = Object.values(discountFormUseWatch?.discountLineConditionType).findIndex(
        item => item == DiscountConditionType.LastPlaces,
    );
    // return Id Of LastMinutes
    return Object.keys(discountFormUseWatch?.discountLineConditionType)[positionOfLastMinutes];
};
