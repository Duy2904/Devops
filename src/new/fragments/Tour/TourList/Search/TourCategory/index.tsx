import FilterSearch, { currentPage, pageSize } from '@utils/filterSearch';

import { BaseSelect } from '@src/new/components/customs/Selects/BaseSelect';
import { Select } from 'antd';
import { useDebouncedCallback } from 'use-debounce';
import { useGetTourCategoriesSelect } from './useTourCategory';
import { useSearchTableStoreNew } from '@src/new/shared/stores/SearchTableStore';

interface TourCategorySelectProps {
    className?: string;
    placeholder?: string;
}

export const TourCategorySelect: React.FC<TourCategorySelectProps> = props => {
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStoreNew(state => state);

    const { data, isLoading } = useGetTourCategoriesSelect();

    const onChange = useDebouncedCallback((value: string) => {
        setSearchParams({
            ...tableParams,
            pagination: { current: currentPage, pageSize: pageSize, showSizeChanger: true },
            tourCategoryId: value,
        });
    }, 500);

    const select = () => {
        return (
            <Select
                virtual={false}
                className="w-full"
                showSearch
                placeholder={props.placeholder}
                optionFilterProp="children"
                onChange={onChange}
                filterOption={FilterSearch.filterOption}
                options={data}
                allowClear
                loading={isLoading}
                value={tableParams.tourCategoryId}
            />
        );
    };

    return <BaseSelect className={props.className} items={select()} />;
};
