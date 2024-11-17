import { AppConfig } from '@utils/config';
import { DataSignal } from '../features/NotificationFeature';
import Format from '@utils/format';
import { TourScheduleStatus } from '@sdk/tour-operations';
import { combineString } from '../features/CombineString';
import i18n from '@src/i18n';

// tour send for approval
export const waitConfirmContentTour = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('notification.tour.haveTour')}</span>
            <span className="text-xs text-black font-semibold">
                {` ${notiDetail?.tourCode} - ${notiDetail?.name} - ${Format.formatUTCTime(
                    notiDetail?.departureDate,
                    AppConfig.DateFormat,
                )} `}
            </span>
            <span> {i18n.t('notification.tour.by')} </span>
            <span className="text-xs text-black font-semibold">{`${notiDetail?.fullName}`}</span>
            <span> {i18n.t('notification.tour.createAt')} </span>
            <span className="text-xs text-black font-semibold">{`${Format.formatUTCTime(
                notiDetail?.createdOn,
                AppConfig.TimeDateFormat,
            )}`}</span>
            <span className="lowercase"> {i18n.t(`tour.status.${notiDetail.status}`)}</span>
        </p>
    );
};

export const waitConfirmContentTourString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('notification.tour.haveTour'),
        `${notiDetail?.tourCode} - ${notiDetail?.name} - ${Format.formatUTCTime(
            notiDetail?.departureDate,
            AppConfig.DateFormat,
        )}`,
        i18n.t('notification.tour.by'),
        notiDetail?.fullName,
        i18n.t('notification.tour.createAt'),
        Format.formatUTCTime(notiDetail?.createdOn, AppConfig.TimeDateFormat),
        i18n.t(`tour.status.${notiDetail.status}`),
    ]);
};

// approved or rejected
export const anotherContentTour = (notiDetail: DataSignal['data']) => {
    return (
        <>
            <p className="text-xs font-light">
                <span>Tour</span>
                <span className="text-xs text-black font-semibold">
                    {` ${notiDetail?.tourCode} - ${notiDetail?.name} - ${Format.formatUTCTime(
                        notiDetail?.departureDate,
                        AppConfig.DateFormat,
                    )} `}
                </span>
                <span> {i18n.t('notification.tour.had')} </span>
                <span className="text-xs text-black font-semibold">{`${notiDetail?.fullName}`}</span>
                <span>
                    {' '}
                    {notiDetail.status == TourScheduleStatus.Rejected
                        ? i18n.t('notification.tour.reject')
                        : i18n.t('notification.tour.approve')}{' '}
                </span>
            </p>
            {notiDetail.status == TourScheduleStatus.Rejected && (
                <p className="text-xs font-semibold text-red-500">Lý do: {notiDetail.rejectedReason}</p>
            )}
        </>
    );
};

export const anotherContentTourString = (notiDetail: DataSignal['data']) => {
    return combineString([
        'Tour',
        `${notiDetail?.tourCode} - ${notiDetail?.name} - ${Format.formatUTCTime(
            notiDetail?.departureDate,
            AppConfig.DateFormat,
        )}`,
        i18n.t('notification.tour.had'),
        notiDetail?.fullName,
        notiDetail.status == TourScheduleStatus.Rejected
            ? i18n.t('notification.tour.reject')
            : i18n.t('notification.tour.approve'),
    ]);
};

// change tour code in waiting for approval
export const updateTourCodeInWaitingForApproval = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('notification.tour.haveTour')} </span>
            <span className="text-xs text-black font-semibold">
                {` ${notiDetail?.tourCode} - ${notiDetail?.name} - ${Format.formatUTCTime(
                    notiDetail?.departureDate,
                    AppConfig.DateFormat,
                )} `}
            </span>
            <span> {i18n.t('notification.tour.by')} </span>
            <span className="text-xs text-black font-semibold">{`${notiDetail?.fullName}`}</span>
            <span> {i18n.t('notification.tour.createAt')} </span>
            <span className="text-xs text-black font-semibold">{`${Format.formatUTCTime(
                notiDetail?.createdOn,
                AppConfig.TimeDateFormat,
            )}`}</span>
            <span className="lowercase">
                {i18n.t(` đang `)} {i18n.t(`tour.status.${notiDetail.status}`)} {i18n.t(` (đã được thay đổi Mã Tour)`)}
            </span>
        </p>
    );
};

export const updateTourCodeInWaitingForApprovalString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('notification.tour.haveTour'),
        `${notiDetail?.tourCode} - ${notiDetail?.name} - ${Format.formatUTCTime(
            notiDetail?.departureDate,
            AppConfig.TimeDateFormat,
        )}`,
        i18n.t('notification.tour.by'),
        notiDetail?.fullName,
        i18n.t('notification.tour.createAt'),
        Format.formatUTCTime(notiDetail?.createdOn, AppConfig.TimeDateFormat),
        i18n.t(`đang`),
        i18n.t(`tour.status.${notiDetail.status}`),
        i18n.t(`(đã được thay đổi Mã Tour)`),
    ]);
};

// Cancel Tour Schedule
export const cancelTourSchedule = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>Tour</span>
            <span className="text-xs text-black font-semibold">
                {` ${notiDetail?.tourCode} - ${notiDetail?.tourName} `}
            </span>
            <span>{i18n.t('đã được')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.fullName} `}</span>
            <span>{i18n.t('hủy tour ngày')}</span>
            <span className="text-xs text-black font-semibold">{` ${Format.formatUTCTime(
                notiDetail?.cancelDate,
                AppConfig.TimeDateFormat,
            )} `}</span>
        </p>
    );
};

export const cancelTourScheduleString = (notiDetail: DataSignal['data']) => {
    return combineString([
        'Tour',
        `${notiDetail?.tourCode} - ${notiDetail?.tourName}`,
        i18n.t('đã được'),
        notiDetail?.fullName,
        i18n.t('hủy tour ngày'),
        Format.formatUTCTime(notiDetail?.cancelDate, AppConfig.TimeDateFormat),
    ]);
};
