import { BaseSelect } from '../BaseSelect';
import FilterSearch from '@utils/filterSearch';
import { ReactNode } from 'react';
import { Rule } from 'antd/es/form';
import { Select } from 'antd';
import { useGetPaymentMethods } from './usePaymentMethod';

interface PaymentMethodsSelectProps {
    className?: string;
    name?: string;
    rules?: Rule[];
    required?: boolean;
    label?: ReactNode;
    isForm?: boolean;
}

export const PaymentMethodsSelect: React.FC<PaymentMethodsSelectProps> = props => {
    const { data, isLoading } = useGetPaymentMethods();
    const fetchItem =
        data?.data?.map(PaymentMethod => ({
            value: PaymentMethod.id ?? '',
            label: PaymentMethod.name ?? '',
        })) ?? [];

    const select = () => {
        return (
            <Select
                virtual={false}
                showSearch
                className="w-full"
                placeholder="--Phương thức thanh toán--"
                options={fetchItem}
                filterOption={FilterSearch.filterOption}
                loading={isLoading}
            />
        );
    };

    return (
        <BaseSelect
            isForm={props.isForm}
            className={props.className}
            name={props.name}
            rules={props.rules}
            required={props.required}
            label={props.label}
            items={select()}
        />
    );
};
