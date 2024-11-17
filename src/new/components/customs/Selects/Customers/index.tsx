import { ReactNode, useCallback, useEffect, useState } from 'react';

import { BaseSelect } from '../BaseSelect';
import { Rule } from 'antd/es/form';
import { Select } from 'antd';
import { useGetCustomers } from './useCustomers';
import { useSearchTableStore } from '@store/searchTableStore';
import { useCustomersStore } from '@store/customersStore';
import { SearchCustomersRequest } from '@sdk/tour-operations';
import { currentPage, pageSize } from '@src/new/shared/types/BaseTypes';
import FilterSearch from '@utils/filterSearch';

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
    initialValue?: string;
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
            title={props.title}
            items={select()}
            initialValue={(props.isForm && props.initialValue) ? props.initialValue : undefined}
        />
    );
};
