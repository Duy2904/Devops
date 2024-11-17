import { Form, FormInstance } from 'antd';
import { useEffect, useState } from 'react';

import { BaseInput } from '@components/customizes/Input/BaseInput';
import { EmployeesSelect } from '@components/customizes/Select/Employee';
import i18n from '@src/i18n';
import { useGetEmployees } from '@components/customizes/Select/Employee/useEmployee';

interface SellerProps {
    form: FormInstance;
}

export const Seller: React.FC<SellerProps> = props => {
    const { form } = props;
    const sellerId = Form.useWatch('sellerId', { form, preserve: true });
    const [phone, setPhone] = useState<string>('');

    const { data } = useGetEmployees();

    useEffect(() => {
        const phone = data?.data?.find(item => item.id === sellerId)?.phone ?? '';
        setPhone(phone);
    }, [data, sellerId]);

    return (
        <div className="grid grid-cols-2 cols-2 gap-4 px-5 pt-4">
            <EmployeesSelect
                isForm
                label={<p className="text-sm font-medium">{i18n.t('tour.tourDetail.seller')}</p>}
                name="sellerId"
                className="col-span-2 lg:col-span-1"
            />
            <BaseInput
                isForm
                label={<p className="text-sm font-medium">{i18n.t('personContact.phone')}</p>}
                className="col-span-2 lg:col-span-1"
                value={phone}
                placeholder="-"
                disable
            />
        </div>
    );
};
