import { OrderStatus, ReceivableType, ReceivableVoucherDto, ReceivableVoucherLineDto } from '@sdk/tour-operations';

import { AnyObject } from 'antd/es/_util/type';
import { FormInstance } from 'antd';
import { convertValues } from '@utils/formHelper';
import i18n from '@src/i18n';

export interface TourSaleOrder {
    tourId: string;
    listSaleOrder: { value: string; label: string }[];
}

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

export const saleOrderApprovedStatus = (status: OrderStatus | null | undefined) => {
    switch (status) {
        case OrderStatus.New:
        case OrderStatus.Confirming:
        case OrderStatus.Confirmed:
        case OrderStatus.Deposited:
            return true;
        default:
            return false;
    }
};

export const validateAmount = async (
    value: number,
    record: ReceivableVoucherLineDto,
    dataRec: ReceivableVoucherDto,
    form: FormInstance,
) => {
    const errorValueMessage = i18n.t('validation.default.errorValue');

    if (value <= 0) {
        return Promise.reject(new Error(errorValueMessage));
    }

    // nếu đơn được tạo tự động thì receivableType: ReceivableType.Deposit
    if (dataRec?.receivableType === ReceivableType.Deposit) {
        const depositAmt = record.saleOrderDepositAmt ?? 0;
        const totalIncludeVatAmt = form.getFieldValue(['totalIncludeVatAmtLines', record.id]);
        if (
            (record.saleOrderStatus === OrderStatus.Paid || record.saleOrderStatus === OrderStatus.Deposited) &&
            (value < depositAmt || value > totalIncludeVatAmt)
        ) {
            return Promise.reject(new Error(errorValueMessage));
        }
    } else {
        const totalIncludeVatAmt = form.getFieldValue(['totalIncludeVatAmtLines', record.id]);
        const saleOrderId = form.getFieldValue(['saleOrderIdLines', record.id]);
        // nếu có chứng từ và số tiền thu > số tiền phải thu
        if (value > totalIncludeVatAmt && saleOrderId) {
            return Promise.reject(new Error(errorValueMessage));
        }
    }

    return Promise.resolve();
};
