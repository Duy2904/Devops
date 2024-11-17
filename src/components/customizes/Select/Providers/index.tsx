import { currentPage, pageSize } from '@utils/filterSearch';

import { AnyObject } from 'antd/es/_util/type';
import { MultiSelect } from '../MultiSelect';
import { useDebouncedCallback } from 'use-debounce';
import { useGetTourProviders } from './useTourProvider';
import { useSearchTableStore } from '@store/searchTableStore';

interface TourProviderMultiSelectProps {
    className?: string;
    placeholderContent?: string;
    showTitle?: boolean;
    title?: string;
}

export const TourProviderMultiSelect: React.FC<TourProviderMultiSelectProps> = props => {
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    const { data, isLoading } = useGetTourProviders();

    const onChange = useDebouncedCallback((value: AnyObject) => {
        const providers = value.flat();
        setSearchParams({
            ...tableParams,
            pagination: { current: currentPage, pageSize: pageSize, showSizeChanger: true },
            providers,
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
            defaultValue={tableParams.providers}
        />
    );
};
