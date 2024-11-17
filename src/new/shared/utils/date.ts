import dayjs, { Dayjs } from 'dayjs';

export const isSameRange = (range1: [Dayjs, Dayjs], range2: [Dayjs, Dayjs]): boolean => {
    const [start1, end1] = range1;
    const [start2, end2] = range2;
    return start1.isSame(start2, 'day') && end1.isSame(end2, 'day');
};

export const calculateRemainingDays = (endDate: Date | null | undefined) => {
    if (!endDate) return 0;

    if (dayjs(endDate).diff(dayjs(), 'days') == 0 && dayjs(endDate).diff(dayjs()) > 0) {
        return 0;
    } else if (dayjs(endDate).diff(dayjs(), 'days') == 0 && dayjs(endDate).diff(dayjs()) < 0) {
        return -1;
    }

    return dayjs(endDate).diff(dayjs(), 'days');
};
