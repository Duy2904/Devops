import i18n from '@src/i18n';

import { DataSignal } from '../features/NotificationFeature';
import { combineString } from '../features/CombineString';

// booking TN
export const bookingSOInProgress = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('Đơn hàng bán')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.orderNo} `}</span>
            <span> {i18n.t('đang được đặt. Vui lòng đợi.')} </span>
        </p>
    );
};

export const bookingSOSuccess = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('Đơn hàng bán')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.orderNo} `}</span>
            <span> {i18n.t('đã được đặt thành công.')} </span>
        </p>
    );
};

// booking TN failed
export const bookingSOFailed = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('Đơn hàng bán')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.orderNo} `}</span>
            <span> {i18n.t('đã bị Hủy do đặt không thành công. Vui lòng liên hệ để được hỗ trợ.')} </span>
        </p>
    );
};

export const bookingSOInProgressString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('Đơn hàng bán'),
        notiDetail?.orderNo,
        i18n.t('đang được đặt. Vui lòng đợi.')
    ]);
};

export const bookingSOSuccessString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('Đơn hàng bán'),
        notiDetail?.orderNo,
        i18n.t('đã được đặt thành công.')
    ]);
};

export const bookingSOFailedString = (notiDetail: DataSignal['data']) => {
    const segments = window.location.href.split('/');
    const lastSegment = segments.pop() || '';
    if (notiDetail.id === lastSegment) {
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    }

    return combineString([
        i18n.t('Đơn hàng bán'),
        notiDetail?.orderNo,
        i18n.t('đã bị Hủy do đặt không thành công. Vui lòng liên hệ để được hỗ trợ.')
    ]);
};