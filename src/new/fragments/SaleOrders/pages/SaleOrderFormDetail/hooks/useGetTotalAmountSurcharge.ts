import { Form, FormInstance } from 'antd';

import { convertValues } from '@utils/formHelper';

export const useGetTotalAmountSurcharge = (surchargeForm: FormInstance) => {
    const surchargeFormWatch = Form.useWatch([], surchargeForm);
    const datatotalTravellerConvert = convertValues(surchargeFormWatch);
    const initialValue = 0;
    const sumTotal = datatotalTravellerConvert.reduce(
        (accumulator, currentValue) => accumulator + (currentValue?.quantity ?? 0) * (currentValue?.salesPrice ?? 0),
        initialValue,
    );

    return sumTotal;
};
