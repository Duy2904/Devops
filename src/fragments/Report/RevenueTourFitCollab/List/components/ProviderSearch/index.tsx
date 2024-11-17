import { currentPage, pageSize } from '@utils/filterSearch';

import { AnyObject } from 'antd/es/_util/type';
import { MultiSelect } from '@components/customizes/Select/MultiSelect';
import { useDebouncedCallback } from 'use-debounce';
import { useFetchProviderRevenueCollab } from '@fragments/Report/RevenueTourFitCollab/hook/useRevenueTourFit';
import { useSearchTableStore } from '@store/searchTableStore';

interface ProviderMultiSelectCollabProps {
    className?: string;
    placeholderContent?: string;
    showTitle?: boolean;
    title?: string;
}

export const ProviderMultiSelectCollab: React.FC<ProviderMultiSelectCollabProps> = props => {
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    const { data, isLoading } = useFetchProviderRevenueCollab();

    const onChange = useDebouncedCallback((value: AnyObject) => {
        const providers = value.flat();
        setSearchParams({
            ...tableParams,
            pagination: { current: currentPage, pageSize: pageSize, showSizeChanger: true },
            groupIds: providers,
            createdByIds: [],
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
