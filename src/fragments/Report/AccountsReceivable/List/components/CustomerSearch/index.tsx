import { AnyObject } from 'antd/es/_util/type';
import { useDebouncedCallback } from 'use-debounce';

import { MultiSelect } from '@components/customizes/Select/MultiSelect';
import { useFetchCustomer } from '@fragments/Report/AccountsReceivable/hook/useAccountsReceivable';
import { useSearchTableStore } from '@store/searchTableStore';
import { currentPage, pageSize } from '@utils/filterSearch';

interface CustomerMultiSelectProps {
    className?: string;
    placeholderContent?: string;
    showTitle?: boolean;
    title?: string;
}

export const CustomerMultiSelect: React.FC<CustomerMultiSelectProps> = props => {
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    const { data, isLoading } = useFetchCustomer();

    const onChange = useDebouncedCallback((value: AnyObject) => {
        const customerIds = value.flat();
        setSearchParams({
            ...tableParams,
            pagination: { current: currentPage, pageSize: pageSize, showSizeChanger: true },
            customerIds: customerIds,
        });
    }, 500);

    return (
        <MultiSelect
            className={props.className}
            showTitle={props?.showTitle}
            title={props.title}
            onChange={onChange}
            isLoading={isLoading}
            placeholder={props.placeholderContent}
            options={data}
            defaultValue={tableParams.groupIds}
        />
    );
};
