import FilterSearch, { currentPage, pageSize } from '../../../../utils/filterSearch';
import { ReactNode, useCallback, useEffect, useState } from 'react';

import { BaseSelect } from '../BaseSelect';
import { Rule } from 'antd/es/form';
import { SearchCustomersRequest } from '../../../../../sdk/tour-operations';
import { Select } from 'antd';
import { useCustomersStore } from '../../../../store/customersStore';
import { useGetCustomers } from './useCustomers';
import { useSearchTableStore } from '../../../../store/searchTableStore';

interface CustomersSelectProps {
    className?: string;
    name?: string;
    rules?: Rule[];
    required?: boolean;
    label?: ReactNode;
    onChange?: () => void;
    disable?: boolean;
    isForm?: boolean;
    showTitle?: boolean;
    title?: string;
}

export const CustomersSelect: React.FC<CustomersSelectProps> = props => {
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);
    const {
        customers,
        selectCustomers,
        actions: { setCustomers },
    } = useCustomersStore(state => state);
    const { mutateAsync: getCustomers } = useGetCustomers();
    const [count, setCount] = useState<number>(0);

    const fetchCustomers = useCallback(async () => {
        if (customers.length > 0) return;
        if (count !== 0) return;
        const customerRequest: SearchCustomersRequest = {};
        const data = await getCustomers(customerRequest);
        setCustomers(data.data ?? []);
        setCount(count + 1);
    }, [count, customers, getCustomers, setCustomers]);

    const onChange = (value: string) => {
        setSearchParams({
            ...tableParams,
            pagination: { current: currentPage, pageSize: pageSize, showSizeChanger: true },
            customerId: value,
        });
    };

    const select = () => {
        return (
            <Select
                virtual={false}
                disabled={props.disable}
                showSearch
                className="w-full"
                placeholder="--Khách hàng--"
                onChange={!props.isForm ? onChange : undefined}
                options={selectCustomers}
                filterOption={FilterSearch.filterOption}
                value={!props.isForm ? tableParams.customerId : undefined}
                allowClear
            />
        );
    };

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    return (
        <BaseSelect
            isForm={props.isForm}
            className={props.className}
            name={props.name}
            rules={props.rules}
            required={props.required}
            label={props.label}
            showTitle={props?.showTitle}
            title={props.title}
            items={select()}
        />
    );
};
