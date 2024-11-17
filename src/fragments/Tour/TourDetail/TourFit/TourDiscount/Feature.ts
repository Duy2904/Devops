import {
    DiscountConditionType,
    DiscountDetailDto,
    DiscountLineRequest,
    DiscountOnType,
    TourScheduleDto,
} from '@sdk/tour-operations';
import { isNull, isUndefined } from 'lodash';

import { AnyObject } from 'antd/es/_util/type';
import { FormInstance } from 'antd';
import { convertValues } from '@utils/formHelper';
import dayjs from 'dayjs';
import { statusRemove } from '@fragments/PromotionProgram/Feature';

export const mappingData = (valuesForm: AnyObject, tourId: string) => {
    const tableData = {
        id: valuesForm.discountLineId,
        discountConditionType: valuesForm.discountLineConditionType,
        discountType: valuesForm.discountLineDiscountType,
        quantity: valuesForm.discountLineQuantity,
        value: valuesForm.discountLineDiscountValue,
        startDate: valuesForm.discountLineStartDate,
        endDate: valuesForm.discountLineEndDate,
    };
    const convertTableData =
        convertValues(tableData)
            .filter(
                x =>
                    !isUndefined(x.endDate) &&
                    !isUndefined(x.quantity) &&
                    !isUndefined(x.startDate) &&
                    !isNull(x.quantity),
            )
            .map(item => {
                item.id.startsWith('discount') && delete item.id;
                const tempData = {
                    ...item,
                    startDate: dayjs(item.startDate).startOf('day').toDate(),
                    endDate: dayjs(item.endDate).endOf('day').toDate(),
                };
                return tempData;
            }) ?? [];
    const mapData = {
        id: valuesForm.id,
        code: valuesForm.code,
        name: valuesForm.name,
        isActive: valuesForm.isActive,
        discountLines: convertTableData as DiscountLineRequest[],
        tourScheduleIds: [tourId],
        type: DiscountOnType.EarlyBirdLastMinute,
    };

    return mapData;
};

export const validateDisableStartDate = (
    saleStartDate: dayjs.Dayjs,
    dataDetail: DiscountDetailDto | undefined,
    tourSchedule: TourScheduleDto | undefined,
    record: DiscountLineRequest,
) => {
    return !saleStartDate || validateDisableInput(dataDetail, record, tourSchedule);
};

export const validateDisableEndDate = (
    saleEndDate: dayjs.Dayjs,
    tourDiscountForm: FormInstance,
    record: DiscountLineRequest,
    dataDetail: DiscountDetailDto | undefined,
    tourSchedule: TourScheduleDto | undefined,
) => {
    return (
        !saleEndDate ||
        !tourDiscountForm.getFieldValue(['discountLineStartDate', record.id!]) ||
        validateDisableInput(dataDetail, record, tourSchedule)
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

export const validateDisableForm = (tourSchedule: TourScheduleDto | undefined) => {
    return (tourSchedule?.status && statusRemove.includes(tourSchedule?.status)) ?? false;
};

export const validateDisableInput = (
    dataDetail: DiscountDetailDto | undefined,
    record: DiscountLineRequest,
    tourSchedule: TourScheduleDto | undefined,
) => {
    const discountConditionType = dataDetail?.discountLines?.map(item => item.discountConditionType) ?? [];
    return (
        (dataDetail?.isUsed &&
            (record.discountConditionType === DiscountConditionType.FirstPlaces ||
                dataDetail?.discountLines?.length == 2 ||
                (record.discountConditionType === DiscountConditionType.LastPlaces &&
                    dataDetail?.discountLines?.length == 1 &&
                    !discountConditionType.includes(DiscountConditionType.FirstPlaces)))) ||
        validateDisableForm(tourSchedule)
    );
};

export const getIdOfLastMinute = (discountFormUseWatch: AnyObject) => {
    const positionOfLastMinutes = Object.values(discountFormUseWatch?.discountLineConditionType).findIndex(
        item => item == DiscountConditionType.LastPlaces,
    );
    // return Id Of LastMinutes
    return Object.keys(discountFormUseWatch?.discountLineConditionType)[positionOfLastMinutes];
};
