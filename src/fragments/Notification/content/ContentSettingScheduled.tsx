import i18n from '@src/i18n';
import { AppConfig } from '@utils/config';
import Format from '@utils/format';

import { combineString } from '../features/CombineString';
import { DataSignal } from '../features/NotificationFeature';

// Vé máy bay - Ngày đặt cọc
export const tourFlightDepositDateReminder = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('Tour')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.tourCode} - ${notiDetail?.name} `}</span>
            <span> {i18n.t('sắp đến ngày đặt cọc vé máy bay. Ngày đặt cọc là ngày')} </span>
            <span className="text-xs text-black font-semibold">
                {Format.formatUTCTime(notiDetail?.dateTime, AppConfig.DateFormat)}
            </span>
        </p>
    );
};

export const tourFlightDepositDateReminderString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('Tour'),
        `${notiDetail?.tourCode} - ${notiDetail?.name}`,
        i18n.t('sắp đến ngày đặt cọc vé máy bay. Ngày đặt cọc là ngày'),
        Format.formatUTCTime(notiDetail?.dateTime, AppConfig.DateFormat),
    ]);
};

// Vé máy bay - Ngày vào tên
export const tourFlightNameEntryDateReminder = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('Tour')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.tourCode} - ${notiDetail?.name} `}</span>
            <span> {i18n.t('sắp đến ngày vào tên cho vé máy bay. Ngày vào tên là ngày')} </span>
            <span className="text-xs text-black font-semibold">
                {Format.formatUTCTime(notiDetail?.dateTime, AppConfig.DateFormat)}
            </span>
        </p>
    );
};

export const tourFlightNameEntryDateReminderString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('Tour'),
        `${notiDetail?.tourCode} - ${notiDetail?.name}`,
        i18n.t('sắp đến ngày vào tên cho vé máy bay. Ngày vào tên là ngày'),
        Format.formatUTCTime(notiDetail?.dateTime, AppConfig.DateFormat),
    ]);
};

// Vé máy bay - Ngày xuất vé
export const tourFlightIssuanceDateReminder = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('Tour')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.tourCode} - ${notiDetail?.name} `}</span>
            <span> {i18n.t('sắp đến ngày xuất vé máy bay. Ngày xuất vé là ngày')} </span>
            <span className="text-xs text-black font-semibold">
                {Format.formatUTCTime(notiDetail?.dateTime, AppConfig.DateFormat)}
            </span>
        </p>
    );
};

export const tourFlightIssuanceDateReminderString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('Tour'),
        `${notiDetail?.tourCode} - ${notiDetail?.name}`,
        i18n.t('sắp đến ngày xuất vé máy bay. Ngày xuất vé là ngày'),
        Format.formatUTCTime(notiDetail?.dateTime, AppConfig.DateFormat),
    ]);
};

// Ngày khởi hành của tour
export const tourDepartureDateReminder = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('Tour')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.tourCode} - ${notiDetail?.name} `}</span>
            <span> {i18n.t('sẽ khởi hành vào ngày')} </span>
            <span className="text-xs text-black font-semibold">
                {Format.formatUTCTime(notiDetail?.dateTime, AppConfig.TimeDateFormat)}
            </span>
        </p>
    );
};

export const tourDepartureDateReminderString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('Tour'),
        `${notiDetail?.tourCode} - ${notiDetail?.name}`,
        i18n.t('sẽ khởi hành vào ngày'),
        Format.formatUTCTime(notiDetail?.dateTime, AppConfig.TimeDateFormat),
    ]);
};

// Land tour - Ngày thanh toán
export const landTourDepositDateReminder = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('Tour')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.tourCode} - ${notiDetail?.name} `}</span>
            <span> {i18n.t('sắp đến thời hạn thanh toán land tour ')} </span>
            {!!notiDetail?.depositOrder && (
                <>
                    <span> {i18n.t('đợt')} </span>
                    <span className="text-xs text-black font-semibold">{` ${notiDetail?.depositOrder} `}</span>
                </>
            )}
            <span> {i18n.t('vào ngày')} </span>
            <span className="text-xs text-black font-semibold">
                {Format.formatUTCTime(notiDetail?.dateTime, AppConfig.DateFormat)}
            </span>
        </p>
    );
};

export const landTourDepositDateReminderString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('Tour'),
        `${notiDetail?.tourCode} - ${notiDetail?.name}`,
        i18n.t('sắp đến thời hạn thanh toán land tour'),
        notiDetail?.depositOrder ? `đợt ${notiDetail?.depositOrder}` : '',
        i18n.t('vào ngày'),
        Format.formatUTCTime(notiDetail?.dateTime, AppConfig.DateFormat),
    ]);
};

// SO - Ngày đến hạn thanh toán
export const saleOrderPrepaidDateReminder = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('Đơn hàng')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.orderNo} `}</span>
            <span> {i18n.t('của khách')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.contactName} `}</span>
            <span> {i18n.t('có số điện thoại')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.contactPhone} `}</span>
            <span> {i18n.t('đến hạn thanh toán số tiền còn lại')} </span>
            <span className="text-xs text-black font-semibold">{` ${Intl.NumberFormat('en-US').format(
                Number(notiDetail?.remainingAmount),
            )} đồng `}</span>
            <span> {i18n.t('vào ngày')} </span>
            <span className="text-xs text-black font-semibold">
                {Format.formatUTCTime(notiDetail?.prepaidDate, AppConfig.DateFormat)}
            </span>
        </p>
    );
};

export const saleOrderPrepaidDateReminderString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('Đơn hàng'),
        notiDetail?.orderNo,
        i18n.t('của khách'),
        notiDetail?.contactName,
        i18n.t('có số điện thoại'),
        notiDetail?.contactPhone,
        i18n.t('đến hạn thanh toán số tiền còn lại'),
        `${Intl.NumberFormat('en-US').format(Number(notiDetail?.remainingAmount))} đồng`,
        i18n.t('vào ngày'),
        Format.formatUTCTime(notiDetail?.prepaidDate, AppConfig.DateFormat),
    ]);
};
// Visa - Hạn thu hồ sơ
export const tourVisaSubmissionDateReminder = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('Tour')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.tourCode} - ${notiDetail?.name} `}</span>
            <span> {i18n.t('sắp đến hạn thu hồ sơ visa vào ngày')} </span>
            <span className="text-xs text-black font-semibold">
                {Format.formatUTCTime(notiDetail?.dateTime, AppConfig.DateFormat)}
            </span>
        </p>
    );
};

export const tourVisaSubmissionDateReminderString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('Tour'),
        `${notiDetail?.tourCode} - ${notiDetail?.name}`,
        i18n.t('sắp đến hạn thu hồ sơ visa vào ngày'),
        Format.formatUTCTime(notiDetail?.dateTime, AppConfig.DateFormat),
    ]);
};

// Visa - Ngày nộp cho lãnh sự
export const tourVisaSubmissionToConsulateDateReminder = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('Tour')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.tourCode} - ${notiDetail?.name} `}</span>
            <span> {i18n.t('sắp đến hạn nộp hồ sơ visa cho lãnh sự vào ngày')} </span>
            <span className="text-xs text-black font-semibold">
                {Format.formatUTCTime(notiDetail?.dateTime, AppConfig.DateFormat)}
            </span>
        </p>
    );
};

export const tourVisaSubmissionToConsulateDateReminderString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('Tour'),
        `${notiDetail?.tourCode} - ${notiDetail?.name}`,
        i18n.t('sắp đến hạn nộp hồ sơ visa cho lãnh sự vào ngày'),
        Format.formatUTCTime(notiDetail?.dateTime, AppConfig.DateFormat),
    ]);
};

// Visa - Ngày dự kiến kết quả
export const tourVisaResultReturnDateReminder = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('Tour')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.tourCode} - ${notiDetail?.name} `}</span>
            <span> {i18n.t('sắp đến thời hạn lãnh sự trả kết quả hồ sơ visa, dự kiến vào ngày')} </span>
            <span className="text-xs text-black font-semibold">
                {Format.formatUTCTime(notiDetail?.dateTime, AppConfig.DateFormat)}
            </span>
        </p>
    );
};

export const tourVisaResultReturnDateReminderString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('Tour'),
        `${notiDetail?.tourCode} - ${notiDetail?.name}`,
        i18n.t('sắp đến thời hạn lãnh sự trả kết quả hồ sơ visa, dự kiến vào ngày'),
        Format.formatUTCTime(notiDetail?.dateTime, AppConfig.DateFormat),
    ]);
};

// Lưu trú - Ngày thanh toán
export const tourHotelDepositDateReminder = (notiDetail: DataSignal['data']) => {
    return (
        <p className="text-xs font-light">
            <span>{i18n.t('Tour')} </span>
            <span className="text-xs text-black font-semibold">{` ${notiDetail?.tourCode} - ${notiDetail?.name} `}</span>
            <span> {i18n.t('sắp đến thời hạn thanh toán khách sạn ')} </span>
            {!!notiDetail?.depositOrder && (
                <>
                    <span> {i18n.t('đợt')} </span>
                    <span className="text-xs text-black font-semibold">{` ${notiDetail?.depositOrder} `}</span>
                </>
            )}
            <span> {i18n.t('vào ngày')} </span>
            <span className="text-xs text-black font-semibold">
                {Format.formatUTCTime(notiDetail?.dateTime, AppConfig.DateFormat)}
            </span>
        </p>
    );
};

export const tourHotelDepositDateReminderString = (notiDetail: DataSignal['data']) => {
    return combineString([
        i18n.t('Tour'),
        `${notiDetail?.tourCode} - ${notiDetail?.name}`,
        i18n.t('sắp đến thời hạn thanh toán khách sạn'),
        notiDetail?.depositOrder ? `đợt ${notiDetail?.depositOrder}` : '',
        i18n.t('vào ngày'),
        Format.formatUTCTime(notiDetail?.dateTime, AppConfig.DateFormat),
    ]);
};
