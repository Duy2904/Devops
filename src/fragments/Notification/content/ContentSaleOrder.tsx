import { ApproveStatus, SaleOrderHistoryStatus } from '@sdk/tour-operations';

import { AppConfig } from '@utils/config';
import { DataSignal } from '../features/NotificationFeature';
import Format from '@utils/format';
import { combineString } from '../features/CombineString';
import i18n from '@src/i18n';

// overload status
export const waitConfirmOverloadSO = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('Bạn có đơn')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.orderNo} `}</span>
            <span> {i18n.t('notification.tour.by')} </span>
            <span className="text-xs text-black font-semibold">{`${notiDetail.fullName}`}</span>
            <span> {i18n.t('notification.tour.createAt')} </span>
            <span className="text-xs text-black font-semibold">{`${Format.formatUTCTime(
                notiDetail?.orderDate,
                AppConfig.TimeDateFormat,
            )}`}</span>
            <span className="lowercase text-red-600 font-semibold"> {i18n.t(`OrderStatus.${notiDetail.status}`)}</span>
            <span> {i18n.t('chờ duyệt')} </span>
        </p>
    );
};

export const waitConfirmOverloadSOString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('Bạn có đơn'),
        notiDetail?.orderNo,
        i18n.t('notification.tour.by'),
        notiDetail.fullName,
        i18n.t('notification.tour.createAt'),
        Format.formatUTCTime(notiDetail?.orderDate, AppConfig.TimeDateFormat),
        i18n.t(`OrderStatus.${notiDetail.status}`),
        i18n.t('chờ duyệt'),
    ]);
};

// guarantee SO - send for approval
export const guaranteeSO = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('Bạn có')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.orderNo}`}</span>
            <span> {i18n.t('notification.tour.by')} </span>
            <span className="text-xs text-black font-semibold">{`${notiDetail?.fullName}`}</span>
            <span> {i18n.t('notification.tour.createAt')} </span>
            <span className="text-xs text-black font-semibold">{`${Format.formatUTCTime(
                notiDetail?.orderDate,
                AppConfig.TimeDateFormat,
            )}`}</span>
            {notiDetail.rejectedReason && (
                <>
                    <span>{` ${i18n.t('lý do')} `}</span>
                    <span>{`${notiDetail.rejectedReason}`}</span>
                </>
            )}
            <span>{` ${i18n.t('đang chờ duyệt')}`}</span>
        </p>
    );
};

export const guaranteeSOString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('Bạn có'),
        notiDetail?.orderNo,
        i18n.t('notification.tour.by'),
        notiDetail?.fullName,
        i18n.t('notification.tour.createAt'),
        Format.formatUTCTime(notiDetail?.orderDate, AppConfig.TimeDateFormat),
        notiDetail.rejectedReason ? i18n.t('lý do') + ' ' + notiDetail.rejectedReason : '',
        i18n.t('đang chờ duyệt'),
    ]);
};

// paid < deposit SO - send for approval
export const paymentLessThanDepositSO = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('Bạn có')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.orderNo}`}</span>
            <span> {i18n.t('notification.tour.by')} </span>
            <span className="text-xs text-black font-semibold">{`${notiDetail?.fullName}`}</span>
            <span> {i18n.t('notification.tour.createAt')} </span>
            <span className="text-xs text-black font-semibold">{`${Format.formatUTCTime(
                notiDetail?.orderDate,
                AppConfig.TimeDateFormat,
            )}`}</span>
            <span className="lowercase"> {i18n.t(`OrderStatus.${notiDetail.status}`)}</span>
            <span>{` ${i18n.t('là đơn khách thanh toán tiền cọc nhỏ hơn quy định đang chờ duyệt')}`}</span>
        </p>
    );
};

export const paymentLessThanDepositSOString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('Bạn có'),
        notiDetail?.orderNo,
        i18n.t('notification.tour.by'),
        notiDetail?.fullName,
        i18n.t('notification.tour.createAt'),
        Format.formatUTCTime(notiDetail?.orderDate, AppConfig.TimeDateFormat),
        i18n.t(`OrderStatus.${notiDetail.status}`),
        i18n.t('là đơn khách thanh toán tiền cọc nhỏ hơn quy định đang chờ duyệt'),
    ]);
};

// approved or rejected
export const confirmedSO = (notiDetail: DataSignal['data']) => {
    return (
        <>
            <p className="text-xs font-light">
                <span>{i18n.t('Đơn')} </span>
                <span className="text-xs text-black font-semibold">{` ${notiDetail?.orderNo}`}</span>
                <span> {i18n.t('notification.tour.createAt')} </span>
                <span className="text-xs text-black font-semibold">{`${Format.formatUTCTime(
                    notiDetail?.orderDate,
                    AppConfig.TimeDateFormat,
                )}`}</span>
                <span> {notiDetail.status == ApproveStatus.Deny ? i18n.t(' đã bị ') : i18n.t(' đã được ')} </span>
                <span className="text-xs text-black font-semibold">{`${notiDetail?.fullName}`}</span>
                <span>
                    {' '}
                    {notiDetail.status == ApproveStatus.Deny
                        ? i18n.t('notification.tour.reject')
                        : i18n.t('notification.tour.approve')}{' '}
                </span>
            </p>
            {notiDetail.status == ApproveStatus.Deny && (
                <p className="text-xs font-semibold text-red-500">Lý do: {notiDetail.rejectedReason}</p>
            )}
        </>
    );
};

export const confirmedSOString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('Đơn'),
        notiDetail?.orderNo,
        i18n.t('notification.tour.createAt'),
        Format.formatUTCTime(notiDetail?.orderDate, AppConfig.TimeDateFormat),
        notiDetail.status == ApproveStatus.Deny ? i18n.t('đã bị') : i18n.t('đã được'),
        notiDetail?.fullName,
        notiDetail.status == ApproveStatus.Deny
            ? i18n.t('notification.tour.reject')
            : i18n.t('notification.tour.approve'),
    ]);
};

// refund SO
export const refundSO = (notiDetail: DataSignal['data']) => {
    switch (notiDetail.status) {
        case SaleOrderHistoryStatus.Send:
            // send request
            return (
                <p className="text-xs font-light">
                    <span>{i18n.t('Bạn có')} </span>
                    <span className="text-xs text-black font-semibold">{` ${notiDetail?.orderNo} `}</span>
                    <span>{i18n.t('do')} </span>
                    <span className="text-xs text-black font-semibold">{` ${notiDetail?.fullNameCreate} `}</span>
                    <span> {i18n.t('notification.tour.createAt')} </span>
                    <span className="text-xs text-black font-semibold">{` ${Format.formatUTCTime(
                        notiDetail?.orderDate,
                        AppConfig.TimeDateFormat,
                    )} `}</span>
                    {notiDetail?.rejectedReason && (
                        <>
                            <span>{i18n.t('lý do')} </span>
                            <span className="text-xs text-black font-semibold">{` ${notiDetail?.rejectedReason} `}</span>
                        </>
                    )}
                    <span>{i18n.t('đang chờ duyệt.')} </span>
                </p>
            );
        case SaleOrderHistoryStatus.Allow:
            // approve request
            return (
                <p className="text-xs font-light">
                    <span>{i18n.t('Đơn')}</span>
                    <span className="text-xs text-black font-semibold">{` ${notiDetail?.orderNo} `}</span>
                    <span>{i18n.t('notification.tour.createAt')}</span>
                    <span className="text-xs text-black font-semibold">{` ${Format.formatUTCTime(
                        notiDetail?.orderDate,
                        AppConfig.TimeDateFormat,
                    )} `}</span>
                    <span>{i18n.t('đã được')}</span>
                    <span className="text-xs text-black font-semibold">{` ${notiDetail?.fullNameManager} `}</span>
                    <span>{i18n.t('đồng ý.')}</span>
                </p>
            );
        case SaleOrderHistoryStatus.Deny:
            // reject request
            return (
                <p className="text-xs font-light">
                    <span>{i18n.t('Đơn')}</span>
                    <span className="text-xs text-black font-semibold">{` ${notiDetail?.orderNo} `}</span>
                    <span>{i18n.t('notification.tour.createAt')}</span>
                    <span className="text-xs text-black font-semibold">{` ${Format.formatUTCTime(
                        notiDetail?.orderDate,
                        AppConfig.TimeDateFormat,
                    )} `}</span>
                    <span>{i18n.t('đã bị')}</span>
                    <span className="text-xs text-black font-semibold">{` ${notiDetail?.fullNameManager} `}</span>
                    <span>{i18n.t('từ chối với lý do')}</span>
                    <span className="text-xs text-black font-semibold">{` ${notiDetail?.rejectedReason} `}</span>
                </p>
            );
    }
};

export const refundSOString = (notiDetail: DataSignal['data']) => {
    switch (notiDetail.status) {
        case SaleOrderHistoryStatus.Send:
            return combineString([
                i18n.t('Bạn có'),
                notiDetail?.orderNo,
                i18n.t('do'),
                notiDetail?.fullNameCreate,
                i18n.t('notification.tour.createAt'),
                Format.formatUTCTime(notiDetail?.orderDate, AppConfig.TimeDateFormat),
                notiDetail?.rejectedReason ? i18n.t('lý do') + notiDetail?.rejectedReason : '',
                i18n.t('đang chờ duyệt.'),
            ]);
        case SaleOrderHistoryStatus.Allow:
            return combineString([
                i18n.t('Đơn'),
                notiDetail?.orderNo,
                i18n.t('notification.tour.createAt'),
                Format.formatUTCTime(notiDetail?.orderDate, AppConfig.TimeDateFormat),
                i18n.t('đã được'),
                notiDetail?.fullNameManager,
                i18n.t('đồng ý.'),
            ]);
        case SaleOrderHistoryStatus.Deny:
            return combineString([
                i18n.t('Đơn'),
                notiDetail?.orderNo,
                i18n.t('notification.tour.createAt'),
                Format.formatUTCTime(notiDetail?.orderDate, AppConfig.TimeDateFormat),
                i18n.t('đã bị'),
                notiDetail?.fullNameManager,
                i18n.t('từ chối với lý do'),
                notiDetail?.rejectedReason,
            ]);
    }
};
