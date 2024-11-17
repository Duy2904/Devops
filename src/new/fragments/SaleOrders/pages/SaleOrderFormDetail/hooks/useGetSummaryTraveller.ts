import { Form, FormInstance } from 'antd';
import isEmpty from 'lodash/isEmpty';

import { convertValues } from '@utils/formHelper';

import { TravellerSub } from '../type';

export const useGetSummaryTraveller = (totalTravellerForm: FormInstance) => {
    const totalTravellerFormWatch = Form.useWatch([], totalTravellerForm);
    const dataConvert: TravellerSub[] = convertValues(totalTravellerFormWatch);

    const newData: TravellerSub[] = [];
    dataConvert?.forEach(item => {
        const findExistItem = newData?.filter(x => x.passengerTypeCode === item.passengerTypeCode);

        if (isEmpty(findExistItem)) {
            const quantity = dataConvert
                .filter(x => x.passengerTypeCode === item.passengerTypeCode)
                .reduce((acc, obj) => acc + Number(obj?.quantity ?? 0), 0);
            newData.push({
                ...item,
                quantity: quantity,
            });
        }
    });

    return newData;
};
