import { AppConfig } from '@utils/config';
import { DataSignal } from '../features/NotificationFeature';
import Format from '@utils/format';
import { combineString } from '../features/CombineString';
import i18n from '@src/i18n';

// Refund Send for approve
export const voucherSendForApprove = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('Phiếu hoàn tiền')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.voucherNo}`}</span>
            <span> {i18n.t('notification.tour.createAt')} </span>
            <span className="text-xs text-black font-semibold">{`${Format.formatUTCTime(
                notiDetail?.createdOn,
                AppConfig.TimeDateFormat,
            )}`}</span>
            <span> {i18n.t('notification.tour.by')} </span>
            <span className="text-xs text-black font-semibold">{`${notiDetail?.fullName}`}</span>
            <span>{` ${i18n.t('đang chờ xác nhận')}`}</span>
        </p>
    );
};

export const voucherSendForApproveString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('Phiếu hoàn tiền'),
        notiDetail?.voucherNo,
        i18n.t('notification.tour.createAt'),
        Format.formatUTCTime(notiDetail?.createdOn, AppConfig.TimeDateFormat),
        i18n.t('notification.tour.by'),
        notiDetail?.fullName,
        i18n.t('đang chờ xác nhận'),
    ]);
};

// Refund voucher Approved
export const voucherApproved = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('Phiếu hoàn tiền')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.voucherNo}`}</span>
            <span> {i18n.t('notification.tour.createAt')} </span>
            <span className="text-xs text-black font-semibold">{`${Format.formatUTCTime(
                notiDetail?.createdOn,
                AppConfig.TimeDateFormat,
            )}`}</span>
            <span> {i18n.t('đã được')} </span>
            <span className="text-xs text-black font-semibold">{`${notiDetail?.fullName}`}</span>
            <span>{` ${i18n.t('đồng ý')}`}</span>
        </p>
    );
};
export const voucherApprovedString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('Phiếu hoàn tiền'),
        notiDetail?.voucherNo,
        i18n.t('notification.tour.createAt'),
        Format.formatUTCTime(notiDetail?.createdOn, AppConfig.TimeDateFormat),
        i18n.t('đã được'),
        notiDetail?.fullName,
        i18n.t('đồng ý'),
    ]);
};

// Refund voucher Rejected
export const voucherRejected = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('Phiếu hoàn tiền')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.voucherNo}`}</span>
            <span> {i18n.t('notification.tour.createAt')} </span>
            <span className="text-xs text-black font-semibold">{`${Format.formatUTCTime(
                notiDetail?.createdOn,
                AppConfig.TimeDateFormat,
            )} `}</span>
            <span>{i18n.t('đã bị')}</span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.fullName} `}</span>
            <span>{i18n.t('từ chối với lý do')}</span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.reason} `}</span>
        </p>
    );
};

export const voucherRejectedString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('Phiếu hoàn tiền'),
        notiDetail?.voucherNo,
        i18n.t('notification.tour.createAt'),
        Format.formatUTCTime(notiDetail?.createdOn, AppConfig.TimeDateFormat),
        i18n.t('đã bị'),
        notiDetail?.fullName,
        i18n.t('từ chối với lý do'),
        notiDetail?.reason,
    ]);
};

// Refund Send for Confirmation
export const refundVoucherSendForConfirmation = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('Phiếu hoàn tiền')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.voucherNo}`}</span>
            <span> {i18n.t('notification.tour.createAt')} </span>
            <span className="text-xs text-black font-semibold">{`${Format.formatUTCTime(
                notiDetail?.createdOn,
                AppConfig.TimeDateFormat,
            )}`}</span>
            <span> {i18n.t('notification.tour.by')} </span>
            <span className="text-xs text-black font-semibold">{`${notiDetail?.fullName}`}</span>
            <span>{` đang chờ xác nhận`}</span>
        </p>
    );
};

export const refundVoucherSendForConfirmationString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('Phiếu hoàn tiền'),
        notiDetail?.voucherNo,
        i18n.t('notification.tour.createAt'),
        Format.formatUTCTime(notiDetail?.createdOn, AppConfig.TimeDateFormat),
        i18n.t('notification.tour.by'),
        notiDetail?.fullName,
        i18n.t('đang chờ xác nhận'),
    ]);
};

// Refund voucher KT Approved
export const refundvoucherConfirmation = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('Phiếu hoàn tiền')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.voucherNo}`}</span>
            <span> {i18n.t('notification.tour.createAt')} </span>
            <span className="text-xs text-black font-semibold">{`${Format.formatUTCTime(
                notiDetail?.createdOn,
                AppConfig.TimeDateFormat,
            )}`}</span>
            <span> {i18n.t('đã được')} </span>
            <span className="text-xs text-black font-semibold">{`${notiDetail?.fullName}`}</span>
            <span>{` ${i18n.t('xác nhận')}`}</span>
        </p>
    );
};

export const refundvoucherConfirmationString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('Phiếu hoàn tiền'),
        notiDetail?.voucherNo,
        i18n.t('notification.tour.createAt'),
        Format.formatUTCTime(notiDetail?.createdOn, AppConfig.TimeDateFormat),
        i18n.t('đã được'),
        notiDetail?.fullName,
        i18n.t('xác nhận'),
    ]);
};
