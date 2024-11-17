import { currentPage, pageSize } from '@utils/filterSearch';

import { AnyObject } from 'antd/es/_util/type';
import { MultiSelect } from '@components/customizes/Select/MultiSelect';
import isEmpty from 'lodash/isEmpty';
import { useDebouncedCallback } from 'use-debounce';
import { useFetchProvider } from '@fragments/Report/AccountsReceivableAgency/hook/useAccountsReceivable';
import { useSearchTableStore } from '@store/searchTableStore';

interface ProviderMultiSelectProps {
    className?: string;
    placeholderContent?: string;
    showTitle?: boolean;
    title?: string;
}

export const ProviderMultiSelect: React.FC<ProviderMultiSelectProps> = props => {
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    const { data, isLoading } = useFetchProvider();

    const onChange = useDebouncedCallback((value: AnyObject) => {
        const providers = value.flat();
        setSearchParams({
            ...tableParams,
            pagination: { current: currentPage, pageSize: pageSize, showSizeChanger: true },
            groupIds: providers,
            createdByIds: !isEmpty(providers) ? tableParams.createdByIds : [],
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
