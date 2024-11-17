import { AnyObject } from 'antd/es/_util/type';
import { TourVisaLineStatus } from '@sdk/tour-operations';
import { convertValues } from '@utils/formHelper';
import dayjs from 'dayjs';

export const resFetchData = (values: AnyObject) => {
    const fetchGroupLines = {
        id: values.visaLineId,
        saleOrderLineTravellerId: values.visaLineId,
        expiryDate: values.visaLineExpiredPassport,
        note: values.visaLineNote,
        status: values.visaLineStatus,
        passport: values.visaLinePassport,
    };
    const fetchconvertValues = convertValues(fetchGroupLines);
    const swapDateUtc = fetchconvertValues.map(item => {
        const tempDataCheckLists = {
            id: values.visaLineCheckList[item.id],
            isOriginal: values.visaLineIsOriginal[item.id],
            isCopy: values.visaLineIsCopy[item.id],
            isPhoto: values.visaLineIsPhoto[item.id],
        };
        const dataConvert = convertValues(tempDataCheckLists);
        return {
            ...item,
            expiryDate: item.expiryDate ? new Date(dayjs(item.expiryDate).format('YYYY-MM-DD')) : undefined,
            checkLists: dataConvert,
        };
    });
    return {
        ...values,
        expectedDate: values.expectedDate ? new Date(dayjs(values.expectedDate).format('YYYY-MM-DD')) : undefined,
        tourVisaLines: swapDateUtc,
    };
};

export const dataForm = (data: AnyObject, contentDepartureLocation: string | null | undefined) => {
    const nameTourSchedule = `${data.tourSchedule?.tourCode ?? ''} - ${data.tourSchedule?.name ?? ''}`;
    return {
        ...data,
        id: undefined,
        fullName: data.contactName ?? data.fullName,
        phone: data.contactPhone ?? data.phone,
        email: data.contactEmail ?? data.email,
        address: data.contactAddress ?? data.address,
        tourScheduleId: data.tourSchedule?.id,
        expectedDate: data.expectedDate ? dayjs(data.expectedDate) : undefined,
        tourSchedule: {
            ...data.tourSchedule,
            name: data.tourSchedule ? nameTourSchedule : undefined,
            departureDate: data.tourSchedule ? dayjs(data.tourSchedule?.departureDate) : undefined,
            endDate: data.tourSchedule ? dayjs(data.tourSchedule?.endDate) : undefined,
            destinationLocation: contentDepartureLocation,
        },
    };
};

export const isLessThanSixMonthAgo = (dateInput: Date | null | undefined, endDate: Date | null | undefined) => {
    const sixMonthsAgo = dayjs(endDate).add(6, 'month');
    const inputDate = dayjs(dateInput);

    return inputDate.isBefore(sixMonthsAgo);
};

export const isReceivedDocument = (useWatchForm: AnyObject, recordId: string, itemId: string) => {
    const listOriginal = useWatchForm?.visaLineIsOriginal?.[recordId]?.[itemId];
    const listCopy = useWatchForm?.visaLineIsCopy?.[recordId]?.[itemId];
    const listPhoto = useWatchForm?.visaLineIsPhoto?.[recordId]?.[itemId];

    return !!listOriginal || !!listCopy || !!listPhoto;
};

export const sortDataWithStatus = (dataObj: AnyObject) => {
    if (dataObj?.length < 2) return dataObj;
    const tempSort = dataObj?.sort((a: AnyObject, b: AnyObject) => {
        if (a.status === TourVisaLineStatus.Wait && b.status !== TourVisaLineStatus.Wait) {
            return -1;
        } else if (a.status !== TourVisaLineStatus.Wait && b.status === TourVisaLineStatus.Wait) {
            return 1;
        }
        return 0;
    });
    return tempSort;
};
