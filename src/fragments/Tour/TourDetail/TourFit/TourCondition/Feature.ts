import { AnyObject } from 'antd/es/_util/type';
import { CancellationTypeDto } from '@sdk/tour-operations';
import { FormInstance } from 'antd';
import dayjs from 'dayjs';
import i18n from '@src/i18n';
import { isUndefined } from 'lodash';
import { toastWarning } from '@components/ui/Toast/Toast';

export const handleDateValue = (date: dayjs.Dayjs) => date.format('MM-DD-YYYY');

export const isHidden = (cancellationTypeList: CancellationTypeDto[], cancellationTypeId: string) => {
    const cancellationType = cancellationTypeList.find(x => x.id === cancellationTypeId);
    if (cancellationType?.isImmediately || cancellationType?.isAfterAll) {
        return true;
    }
    return false;
};

export const disabledDate = (
    departureDate: dayjs.Dayjs,
    current: dayjs.Dayjs,
    form: FormInstance,
    listDateChecked: string[],
) => {
    if (current >= departureDate || current <= form.getFieldValue('saleStartDate')) {
        return true;
    }
    return listDateChecked.some(date => current?.isSame(date, 'day'));
};

const removeDataAfterChange = (recordId: string, tourCancelForm: FormInstance) => {
    tourCancelForm.setFieldValue(['numberOfDate', recordId], null);
    tourCancelForm.setFieldValue(['date', recordId], undefined);
    toastWarning(i18n.t('tour.tourDetail.cancelTourCondition'), i18n.t('Số ngày đã được chọn trước đó'));
};

export const numberOfDateChange = (
    value: number,
    recordId: string,
    cancelFormUseWatch: AnyObject,
    tourCancelForm: FormInstance,
    departureDate: dayjs.Dayjs,
) => {
    const listNumberOfDate = Object.values(cancelFormUseWatch?.numberOfDate);
    if (listNumberOfDate.filter(data => data === value).length > 1) {
        removeDataAfterChange(recordId, tourCancelForm);
    } else {
        tourCancelForm.setFieldValue(
            ['date', recordId],
            isUndefined(value) ? undefined : dayjs(departureDate).subtract(value + 1, 'day'),
        );
    }
};

export const dateChange = (
    value: dayjs.Dayjs | null,
    recordId: string,
    cancelFormUseWatch: AnyObject,
    tourCancelForm: FormInstance,
    departureDate: dayjs.Dayjs,
) => {
    const tempNumberOfDate = dayjs(departureDate).diff(value, 'day') - 1;
    const listNumberOfDate = Object.values(cancelFormUseWatch?.numberOfDate);
    if (listNumberOfDate.includes(tempNumberOfDate)) {
        removeDataAfterChange(recordId, tourCancelForm);
    } else {
        tourCancelForm.setFieldValue(['numberOfDate', recordId], isNaN(tempNumberOfDate) ? '' : tempNumberOfDate);
    }
};
