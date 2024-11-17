import { ReceivableVoucherDto, ReceivableVoucherLineDto, VoucherStatus } from '@sdk/tour-operations';

import { AnyObject } from 'antd/es/_util/type';
import { FormInstance } from 'antd';
import { convertValues } from '@utils/formHelper';
import i18n from '@src/i18n';

export const resFetchData = (values: AnyObject) => {
    const fetchGroupLines = {
        id: values.receivableVoucherLineIdLines,
        receivableVoucherId: values.receivableVoucherIdLines,
        tourScheduleId: values.tourScheduleIdLines,
        saleOrderId: values.saleOrderIdLines,
        remainingAmount: values.totalIncludeVatAmtLines,
        amount: values.amountLines,
        note: values.noteLines,
    };

    const fetchconvertValues = convertValues(fetchGroupLines).map(item => {
        item.id.startsWith('voucher') && delete item.id;
        return item;
    });
    const convertFetchGroupLines = values.receivableVoucherLineIdLines ? fetchconvertValues : undefined;
    return {
        ...values,
        receivableType: 'Receivable',
        receivableVoucherLines: convertFetchGroupLines,
    };
};

export const validateAmount = async (
    value: number,
    record: ReceivableVoucherLineDto,
    dataRefund: ReceivableVoucherDto,
    form: FormInstance,
) => {
    const errorValueMessage = i18n.t('validation.default.errorValue');

    if (!value || value <= 0) {
        return Promise.reject(new Error(errorValueMessage));
    }

    if (
        dataRefund.status &&
        [VoucherStatus.Draft, VoucherStatus.WaitingForApproval, VoucherStatus.Refunded].includes(dataRefund.status) &&
        !record.saleOrderId
    ) {
        return Promise.resolve();
    } else {
        const totalIncludeVatAmt = form.getFieldValue(['totalIncludeVatAmtLines', record.id]);
        if (value > totalIncludeVatAmt) {
            return Promise.reject(
                new Error(i18n.t('Số tiền chi trả lớn hơn Số tiền phải trả. Vui lòng kiểm tra lại dữ liệu')),
            );
        }
    }
    return Promise.resolve();
};

export const canAddRemoveRow = (dataRefund: ReceivableVoucherDto) => {
    const refundStatusesToCheck = [VoucherStatus.Draft, VoucherStatus.WaitingForApproval];
    return dataRefund?.status && refundStatusesToCheck.includes(dataRefund.status);
};

export const canChangeAmount = (dataRefund: ReceivableVoucherDto) => {
    const refundStatusesToCheck = [
        VoucherStatus.Draft,
        VoucherStatus.WaitingForApproval,
        VoucherStatus.Refunded,
        VoucherStatus.Rejected,
    ];
    return dataRefund?.status != null && refundStatusesToCheck.includes(dataRefund.status);
};

export const canChangeRefundVoucher = (dataRefund: ReceivableVoucherDto) => {
    const refundStatusesToCheck = [
        VoucherStatus.Draft,
        VoucherStatus.WaitingForApproval,
        VoucherStatus.Refunded,
        VoucherStatus.Received,
    ];
    return dataRefund?.status != null && refundStatusesToCheck.includes(dataRefund.status);
};