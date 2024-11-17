import { currentPage, pageSize } from '@utils/filterSearch';
import { useEffect, useState } from 'react';

import { AnyObject } from 'antd/es/_util/type';
import { MultiSelect } from '@components/customizes/Select/MultiSelect';
import isEmpty from 'lodash/isEmpty';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchTableStore } from '@store/searchTableStore';
import { useSendCustomerRevenue } from '@fragments/Report/RevenueTourFit/hook/useRevenueTourFit';

interface SendCustomerMultiSelectProps {
    className?: string;
    placeholderContent?: string;
    showTitle?: boolean;
    title?: string;
}

export const SendCustomerMultiSelect: React.FC<SendCustomerMultiSelectProps> = props => {
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    const [dataOptions, setDataOptions] = useState<
        {
            value: string;
            label: string;
        }[]
    >([]);
    const { mutateAsync: fetchSendCustomer, isLoading } = useSendCustomerRevenue();

    const onChange = useDebouncedCallback((value: AnyObject) => {
        const sendCustomers = value.flat();
        setSearchParams({
            ...tableParams,
            pagination: { current: currentPage, pageSize: pageSize, showSizeChanger: true },
            createdByIds: sendCustomers,
        });
    }, 500);

    useEffect(() => {
        const dataOption = async (ids: string[]) => {
            const res = await fetchSendCustomer(ids);
            setDataOptions(res ?? []);
        };
        if (!isEmpty(tableParams.groupIds)) {
            dataOption(tableParams.groupIds!);
        }
    }, [fetchSendCustomer, tableParams.groupIds]);

    return (
        <MultiSelect
            // key use fresh DOM when groupIds empty
            key={crypto.randomUUID()}
            className={props.className}
            showTitle={props?.showTitle}
            title={props.title}
            onChange={onChange}
            isLoading={isLoading}
            placeholder={props.placeholderContent}
            options={dataOptions}
            defaultValue={tableParams.createdByIds}
            disabled={isEmpty(tableParams.groupIds)}
        />
    );
};
