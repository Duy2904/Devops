import { AnyObject } from 'antd/es/_util/type';
import { AppConfig } from '@utils/config';
import Format from '@utils/format';
import dayjs from 'dayjs';
import i18n from '@src/i18n';
import isNil from 'lodash/isNil';

const returnDateOpt = [
    'lastModifiedOn',
    'date',
    'saleStartDate',
    'saleEndDate',
    'depositDate',
    'nameEntryDate',
    'issuanceDate',
    'departureDate',
    'endDate',
    'visaSubmissionDate',
    'visaSubmissionToConsulateDate',
    'visaResultReturnDate',
    'dateOfBirth',
    'startDate',
    'expectedDate',
    'endCountDown',
    'requestGuaranteeOn',
    'approveCancelOn',
    'activeDate',
    'approvedOverloadOn',
    'approveGuaranteeOn',
    'expirationDate',
    'effectiveDate',
    'birthday',
    'approvedOn',
    'issueDate',
    'expiryDate',
];

const returnPriceOpt = [
    'tourPrice',
    'commissionAmt',
    'totalAmt',
    'totalIncludeVatAmt',
    'salesPrice',
    'amount',
    'depositAmt',
    'remainingAmount',
    'taxInclusivePrice',
    'penaltyFee',
    'paymentAmt',
    'value',
    'price',
    'revenue',
    'cost',
    'totalDiscountAmt',
    'paymentLimit',
    'remainingLimit',
    'nonRefundableVisaFees',
    'reducedVisaFees',
];

const getKeyLocale = (context: string, key: string): string => {
    return i18n.t(`history.${context}.${key}`);
};

const getDefaultKeyLocale = (key: string): string => {
    return i18n.t(`history.${key}`);
};

const handleDiscount = (key: string): string => {
    if (key === 'startDate' || key === 'endDate') {
        return getKeyLocale('discountOnTime', key);
    }
    return getDefaultKeyLocale(key);
};

const handleDiscountLine = (key: string): string => {
    if (key === 'startDate') {
        return i18n.t(`Ngày bắt đầu`);
    } else if (key === 'endDate') {
        return i18n.t(`Ngày kết thúc`);
    }
    return getDefaultKeyLocale(key);
};

const handleVoucher = (tableName: string, key: string): string => {
    const context = tableName === 'ReceivableVoucher' ? 'receivable' : 'refund';
    if (key === 'amount' || key === 'remainingAmount') {
        return getKeyLocale(context, key);
    }
    return getDefaultKeyLocale(key);
};

const returnKey = (tableName: string, key: string): string => {
    switch (tableName) {
        case 'ReceivableVoucher':
        case 'RefundVoucher':
            return handleVoucher(tableName, key);
        case 'Discount':
            return handleDiscount(key);
        case 'DiscountLineLastPlaces':
        case 'DiscountLineFirstPlaces':
            return handleDiscountLine(key);
        default:
            return getDefaultKeyLocale(key);
    }
};

const returnStatusLocale = (key: string, data: AnyObject, tableName: string) => {
    let statusLocale: string;
    const baseValue = data[key];
    switch (tableName) {
        case 'TourSchedule':
        case 'TourGit':
            statusLocale = i18n.t(`tour.status.${baseValue}`);
            break;
        case 'SaleOrder':
            statusLocale = i18n.t(`OrderStatus.${baseValue}`);
            break;
        case 'ReceivableVoucher':
        case 'RefundVoucher':
            statusLocale = i18n.t(`voucher.status.${baseValue}`);
            break;
        case 'TourVisa':
            statusLocale =
                key == 'status'
                    ? i18n.t(`tourVisa.visaLineStatus.${baseValue}`)
                    : i18n.t(`tourVisa.status.${baseValue}`);
            break;
        case 'Quote':
        case 'QuoteGit':
            statusLocale = i18n.t(`quote.status.${baseValue}`);
            break;
        case 'SaleOrderLineTraveller':
            statusLocale = i18n.t(`TravellerOrderStatus.${baseValue}`);
            break;
        default:
            statusLocale = baseValue;
            break;
    }
    return statusLocale;
};

const returnStatusApprovalLocale = (key: string, data: AnyObject, tableName: string) => {
    let statusLocale: string;
    const baseValue = data[key];
    switch (tableName) {
        case 'TourSchedule':
        case 'TourGit':
            statusLocale = baseValue ? i18n.t(`tour.approveStatus.${baseValue}`) : '';
            break;
        case 'SaleOrder':
            statusLocale = baseValue ? i18n.t(`OrderStatus.${baseValue}`) : '';
            break;
        default:
            statusLocale = baseValue ?? '';
            break;
    }
    return statusLocale;
};

const returnValue = (key: string, data: AnyObject, tableName: string): string => {
    const translationMap: { [key: string]: string } = {
        depositType: data[key] == 'percentage' ? '%' : i18n.t('Tiền mặt'),
        discountType: data[key] == 'percentage' ? '%' : i18n.t('Tiền mặt'),
        discountConditionType: i18n.t(`discountConditionType.${data[key]}`),
        type: tableName.startsWith('Quote') ? i18n.t(`quote.table.${data[key]}`) : data[key],
        tourNature: i18n.t(`history.nameTourNature.${data[key]}`),
        paymentOption: i18n.t(`history.paymentOptionType.${data[key]}`),
    };

    if (returnDateOpt.includes(key)) {
        return data[key] ? dayjs(data[key]).format(AppConfig.DateFormat) : '';
    }
    if (returnPriceOpt.includes(key)) {
        return `${Format.formatNumber(data[key])}`;
    }
    if (key === 'status' || key === 'tourVisaStatus' || key === 'orderStatus') {
        return returnStatusLocale(key, data, tableName);
    }
    if (['approvalStatus', 'approveStatus', 'approveGuaranteeStatus'].includes(key)) {
        return returnStatusApprovalLocale(key, data, tableName);
    }
    if (key === 'gender') {
        return i18n.t(`GenderHistory.${data[key]}`);
    }
    if (Object.prototype.hasOwnProperty.call(translationMap, key)) {
        return translationMap[key];
    }
    return isNil(data[key]) ? '' : data[key];
};

export const historyDataParse = (tableName: string, data: AnyObject) => {
    const listReturnData: Array<string> = [];

    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const keyLocale = returnKey(tableName, key);
            const value = returnValue(key, data, tableName);
            listReturnData.push(`${keyLocale}: ${value}`);
        }
    }
    return listReturnData;
};
