import i18n from '@src/i18n';
import { AppConfig } from '@utils/config';
import Format from '@utils/format';

import { combineString } from '../features/CombineString';
import { DataSignal } from '../features/NotificationFeature';

// quote send for approval
export const QuoteConfirmation = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('Chiết tính giá')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.orderNo} `}</span>
            <span> {i18n.t('do')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.fullName} `}</span>
            <span> {i18n.t('tạo ngày')} </span>
            <span className="text-xs text-black font-semibold">{`${Format.formatUTCTime(
                notiDetail?.createdDate,
                AppConfig.TimeDateFormat,
            )}`}</span>
            <span> {i18n.t('cho tour')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.infoTour} `}</span>
            <span> {i18n.t('đang chờ xác nhận')} </span>
        </p>
    );
};

export const QuoteConfirmationString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('Chiết tính giá'),
        notiDetail?.orderNo,
        i18n.t('do'),
        notiDetail?.fullName,
        i18n.t('tạo ngày'),
        Format.formatUTCTime(notiDetail?.createdDate, AppConfig.TimeDateFormat),
        i18n.t('cho tour'),
        notiDetail?.infoTour,
        i18n.t('đang chờ xác nhận'),
    ]);
};

// quote approved
export const QuoteApproved = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('Chiết tính giá')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.orderNo} `}</span>
            <span> {i18n.t('tạo ngày')} </span>
            <span className="text-xs text-black font-semibold">{`${Format.formatUTCTime(
                notiDetail?.createdDate,
                AppConfig.TimeDateFormat,
            )}`}</span>
            <span> {i18n.t('cho tour')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.infoTour} `}</span>
            <span> {i18n.t('đã được')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.fullNameManager} `}</span>
            <span> {i18n.t('đồng ý')} </span>
        </p>
    );
};

export const QuoteApprovedString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('Chiết tính giá'),
        notiDetail?.orderNo,
        i18n.t('tạo ngày'),
        Format.formatUTCTime(notiDetail?.createdDate, AppConfig.TimeDateFormat),
        i18n.t('cho tour'),
        notiDetail?.infoTour,
        i18n.t('đã được'),
        notiDetail?.fullNameManager,
        i18n.t('đồng ý'),
    ]);
};

// quote rejected
export const QuoteRejected = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('Chiết tính giá')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.orderNo} `}</span>
            <span> {i18n.t('tạo ngày')} </span>
            <span className="text-xs text-black font-semibold">{`${Format.formatUTCTime(
                notiDetail?.createdDate,
                AppConfig.TimeDateFormat,
            )}`}</span>
            <span> {i18n.t('cho tour')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.infoTour} `}</span>
            <span> {i18n.t('đã bị')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.fullNameManager} `}</span>
            <span> {i18n.t('từ chối')} </span>
            <>
                {notiDetail?.reason && notiDetail?.reason !== '' ? (
                    <>
                        <span> {i18n.t('với lý do')} </span>
                        <span className="text-xs text-black font-semibold">{` ${
                            notiDetail?.reason && notiDetail?.reason !== '' ? notiDetail?.reason : ''
                        } `}</span>
                    </>
                ) : (
                    ''
                )}
            </>
        </p>
    );
};

export const QuoteRejectedString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('Chiết tính giá'),
        notiDetail?.orderNo,
        i18n.t('tạo ngày'),
        Format.formatUTCTime(notiDetail?.createdDate, AppConfig.TimeDateFormat),
        i18n.t('cho tour'),
        notiDetail?.infoTour,
        i18n.t('đã bị'),
        notiDetail?.fullNameManager,
        i18n.t('từ chối'),
        notiDetail?.reason && notiDetail?.reason !== '' ? 'với lý do ' + notiDetail?.reason : '',
    ]);
};

// quote cancelled
export const QuoteCancelled = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('Chiết tính giá')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.orderNo} `}</span>
            <span> {i18n.t('tạo ngày')} </span>
            <span className="text-xs text-black font-semibold">{`${Format.formatUTCTime(
                notiDetail?.createdOn,
                AppConfig.TimeDateFormat,
            )}`}</span>
            <span> {i18n.t('cho tour')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.infoTour} `}</span>
            <span> {i18n.t('đã bị')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.fullNameManager} `}</span>
            <span> {i18n.t('hủy')} </span>
        </p>
    );
};

export const QuoteCancelledString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('Chiết tính giá'),
        notiDetail?.orderNo,
        i18n.t('tạo ngày'),
        Format.formatUTCTime(notiDetail?.createdOn, AppConfig.TimeDateFormat),
        i18n.t('cho tour'),
        notiDetail?.infoTour,
        i18n.t('đã bị'),
        notiDetail?.fullNameManager,
        i18n.t('hủy'),
    ]);
};

// Quote Git request approve

export const QuoteGitConfirmation = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('Chiết tính giá')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.orderNo} `}</span>
            <span> {i18n.t('tạo ngày')} </span>
            <span className="text-xs text-black font-semibold">{`${Format.formatUTCTime(
                notiDetail?.createdDate,
                AppConfig.TimeDateFormat,
            )}`}</span>
            <span> {i18n.t('do')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.fullName} `}</span>
            <span> {i18n.t('cho tour')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.infoTour} `}</span>
            <span> {i18n.t('đang chờ xác nhận')} </span>
        </p>
    );
};

export const QuoteGitConfirmationString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('Chiết tính giá'),
        notiDetail?.orderNo,
        i18n.t('tạo ngày'),
        Format.formatUTCTime(notiDetail?.createdDate, AppConfig.TimeDateFormat),
        i18n.t('do'),
        notiDetail?.fullName,
        i18n.t('cho tour'),
        notiDetail?.infoTour,
        i18n.t('đang chờ xác nhận'),
    ]);
};
