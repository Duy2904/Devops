import 'dayjs/locale/vi';

import { TourNatureType, TourType } from '@src/types/TypeEnum';

import dayjs from 'dayjs';

const dd_vn = 'vn';
const domestic = 'do';
const inbound = 'ib';

export interface GenerateCodeProps {
    tourType: string;
    twoLetterCode: string;
    tourCategoryCode: string;
    codeRoute?: string;
    currentDate: dayjs.Dayjs;
    departureDate: dayjs.Dayjs;
    customerCode?: string;
    isOB: boolean;
    tourNatureType?: TourNatureType;
}

export const generateCode = (dataForm: GenerateCodeProps, tourType: TourType) => {
    const lt = genLT(dataForm.tourType);
    const dd = genDD(dataForm.twoLetterCode, dataForm.tourCategoryCode);
    const tc = dataForm.tourNatureType ?? '';
    const ht = dataForm.codeRoute ?? '';
    const departure = genDateFormat(dataForm.departureDate, false);
    if (dataForm && tourType == TourType.FIT) {
        return tourCodeFIT(lt, dd, tc, ht, departure)
    } else {
        return tourCodeGIT(lt, dd, departure)
    }
};

// Generate Date
export const genDateFormat = (date: dayjs.Dayjs, isCurrent: boolean) => {
    return dayjs(date).format(isCurrent ? 'DDMMYYYY' : 'DDMMYY');
};

// Generate TourCode FIT
const tourCodeFIT = (lt: string, dd: string, tc: string, ht: string, departure: string) => {
    const data = `${lt}${dd}${tc}.${ht}.${departure}`;
    return data;
};

// Generate TourCode GIT
const tourCodeGIT = (lt: string, dd: string, departure: string) => {
    const data = `${lt}${dd}.${departure}`;
    return data;
};

// Generate LT
const genLT = (tourTypeCode: string) => {
    return tourTypeCode[0] ?? '';
};

// Generate DD
const genDD = (twoLetterISO: string, tourCategoryCode: string) => {
    if (twoLetterISO == dd_vn && tourCategoryCode == domestic) {
        return 'VN';
    } else if (twoLetterISO == dd_vn && tourCategoryCode == inbound) {
        return 'VI';
    } else {
        return twoLetterISO.toUpperCase();
    }
};
