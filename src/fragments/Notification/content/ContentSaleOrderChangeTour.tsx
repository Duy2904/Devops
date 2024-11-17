import i18n from '@src/i18n';

import { combineString } from '../features/CombineString';
import { DataSignal } from '../features/NotificationFeature';

// change tour
export const changeTourSO = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('Đơn hàng bán')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.orderNo} `}</span>
            <span> {i18n.t('đã được')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.fullName} `}</span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail.rejectedReason} `}</span>
        </p>
    );
};

export const changeTourSOString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('Đơn hàng bán'),
        notiDetail?.orderNo,
        i18n.t('đã được'),
        notiDetail?.fullName,
        notiDetail.rejectedReason,
    ]);
};
