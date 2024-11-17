import { AppConfig } from '@utils/config';
import { NotificationMessageDto } from '@sdk/tour-operations';
import dayjs from 'dayjs';
import i18n from '@src/i18n';

export interface DataSignal {
    id: string;
    title: string;
    userId: string;
    source: string;
    isRead: boolean;
    connectionId: string;
    data: {
        createdOn: string | undefined;
        departureDate: string | undefined;
        firstName: string | undefined;
        lastName: string | undefined;
        name: string;
        tourCode: string;
        tourName: string;
        status: string;
        rejectedReason: string;
        orderNo: string;
        voucherNo: string;
        orderDate: string | undefined;
        id: string;
        fullName: string;
        dateTime: string | undefined;
        contactName: string;
        contactPhone: string;
        remainingAmount: number;
        paymentTimes: number;
        prepaidDate: string | undefined;
        depositOrder: number;
        fullNameCreate: string;
        fullNameManager: string;
        cancelDate: string | undefined;
        createdDate: string | undefined;
        infoTour: string;
        reason: string;
        tourTypeCode: string | undefined;
        failedTourNumber: number;
        successTourNumber: number;
        failedTourExportUrl: string;
    };
    createdOn: string | undefined;
}

const resDayLocale = (data: string) => {
    const formattedDate = dayjs(data, AppConfig.DateFormat).format('dddd');
    const i18nKey = `time.${formattedDate}`;
    const localizedDay = i18n.t(i18nKey);
    return `${localizedDay}, ${data}`;
};

export const jsonDataInSignal = (data: NotificationMessageDto[]) => {
    return (
        data?.map((item: NotificationMessageDto) => ({
            ...item,
            data: JSON.parse(item.data),
        })) ?? []
    );
};

export const sortedDataSignal = (jsonDataInSignal: NotificationMessageDto[]) => {
    const dataSortAfterGroup = [...jsonDataInSignal].sort((a, b) => {
        const dateA = new Date(dayjs(a.createdOn).format(AppConfig.DateFormat)).getTime();
        const dateB = new Date(dayjs(b.createdOn).format(AppConfig.DateFormat)).getTime();

        // Sort in descending order, adjust the comparison for ascending order if needed
        return dateB - dateA;
    });
    return dataSortAfterGroup;
};

export const groupedDateDataSignal = (sortedData: NotificationMessageDto[]) => {
    return sortedData.reduce((acc, item) => {
        const key = dayjs(item.createdOn).format(AppConfig.DateFormat).split('T')[0]; // Grouping by date only (not considering time)
        acc[key] = acc[key] || [];
        acc[key].push(item);
        return acc;
    }, {} as { [key: string]: NotificationMessageDto[] });
};

export const formatDateNoti = (data: string) => {
    const beforeDate = dayjs(data, AppConfig.DateFormat).diff(dayjs(), 'day');
    let resValue: string = '';
    switch (beforeDate) {
        case 0:
            resValue = i18n.t('time.today');
            break;
        case -1:
            resValue = i18n.t('time.tommorrow');
            break;
        default:
            resValue = resDayLocale(data);
            break;
    }
    return resValue;
};

export const resTitleToast = (status: string) => {
    const i18nKey = `notification.${status}`;
    const localizedDay = i18n.t(i18nKey);
    return localizedDay;
};
