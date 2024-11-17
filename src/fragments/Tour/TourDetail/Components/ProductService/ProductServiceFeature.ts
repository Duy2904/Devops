import { AnyObject } from 'antd/es/_util/type';
import { AppConfig } from '@utils/config';
import { TourServiceDepositDto } from '@sdk/tour-operations';
import dayjs from 'dayjs';

// Return fieldValue
export const isBeforeDate = (firstDate: dayjs.Dayjs, secondDate: dayjs.Dayjs) => {
    const fetchFirstDate = dayjs(firstDate, AppConfig.DateFormat);
    const fetchSecondDate = dayjs(secondDate, AppConfig.DateFormat);
    return fetchFirstDate.isBefore(fetchSecondDate);
};

export const verifyDisableDateHotelLandTour = (
    currentDate: dayjs.Dayjs,
    infoForm: AnyObject,
    hotelLandTourForm: AnyObject,
    itemData: TourServiceDepositDto,
) => {
    let returnValueHadDataRow: dayjs.Dayjs;
    const order = itemData?.order ?? 0;
    const depositDateForOrder = hotelLandTourForm?.depositDate?.[order - 1];

    if (depositDateForOrder) {
        returnValueHadDataRow = dayjs(depositDateForOrder).subtract(-1, 'day');
    } else {
        returnValueHadDataRow = isBeforeDate(dayjs(), infoForm?.saleStartDate)
            ? (infoForm?.saleStartDate as dayjs.Dayjs) // Assuming infoForm?.saleStartDate is of type Dayjs
            : dayjs();
    }
    return currentDate <= returnValueHadDataRow || currentDate > dayjs(infoForm?.departureDate);
};
