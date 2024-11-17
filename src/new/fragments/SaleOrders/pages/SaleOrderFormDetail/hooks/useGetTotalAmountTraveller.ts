import { Form, FormInstance } from 'antd';

import { convertValues } from '@utils/formHelper';

import { TravellerSub } from '../type';

export const useGetTotalAmountTraveller = (totalTravellerForm: FormInstance) => {
    const totalTravellerFormWatch = Form.useWatch([], totalTravellerForm);
    const datatotalTravellerConvert: TravellerSub[] = convertValues(totalTravellerFormWatch);
    const initialValue = 0;
    const sumTotal = datatotalTravellerConvert.reduce(
        (accumulator, currentValue) => accumulator + (currentValue?.quantity ?? 0) * (currentValue?.price ?? 0),
        initialValue,
    );

    return sumTotal;
};
