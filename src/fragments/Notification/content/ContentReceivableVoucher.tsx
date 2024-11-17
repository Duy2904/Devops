import i18n from '@src/i18n';
import { AppConfig } from '@utils/config';
import Format from '@utils/format';

import { combineString } from '../features/CombineString';
import { DataSignal } from '../features/NotificationFeature';

// VoucherSendForConfirmation
export const voucherSendForConfirmation = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('Phiếu thu')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.voucherNo}`}</span>
            <span> {i18n.t('notification.tour.createAt')} </span>
            <span className="text-xs text-black font-semibold">{`${Format.formatUTCTime(
                notiDetail?.createdOn,
                AppConfig.TimeDateFormat,
            )}`}</span>
            <span> {i18n.t('notification.tour.by')} </span>
            <span className="text-xs text-black font-semibold">{`${notiDetail.fullName}`}</span>
            <span>{` ${i18n.t('đang chờ xác nhận')}`}</span>
        </p>
    );
};
export const voucherSendForConfirmationString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('Phiếu thu'),
        notiDetail?.voucherNo,
        i18n.t('notification.tour.createAt'),
        Format.formatUTCTime(notiDetail?.createdOn, AppConfig.TimeDateFormat),
        i18n.t('notification.tour.by'),
        notiDetail.fullName,
        i18n.t('đang chờ xác nhận'),
    ]);
};

// VoucherApproval
export const voucherApproval = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('Phiếu thu')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.voucherNo}`}</span>
            <span> {i18n.t('notification.tour.createAt')} </span>
            <span className="text-xs text-black font-semibold">{`${Format.formatUTCTime(
                notiDetail?.createdOn,
                AppConfig.TimeDateFormat,
            )}`}</span>
            <span> {i18n.t('đã được')} </span>
            <span className="text-xs text-black font-semibold">{`${notiDetail.fullName}`}</span>
            <span>{` ${i18n.t('xác nhận')}`}</span>
        </p>
    );
};

export const voucherApprovalString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('Phiếu thu'),
        notiDetail?.voucherNo,
        i18n.t('notification.tour.createAt'),
        Format.formatUTCTime(notiDetail?.createdOn, AppConfig.TimeDateFormat),
        i18n.t('đã được'),
        notiDetail.fullName,
        i18n.t('xác nhận'),
    ]);
};
