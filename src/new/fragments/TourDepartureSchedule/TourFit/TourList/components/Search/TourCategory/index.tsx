import { currentPage, pageSize } from '@utils/filterSearch';

import { AnyObject } from 'antd/es/_util/type';
import { MultiSelect } from '@src/new/components/customs/Selects/MultiSelect';
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

    const onChange = useDebouncedCallback((value: AnyObject) => {
        const arrCategories = value.flat();
        setSearchParams({
            ...tableParams,
            pagination: { current: currentPage, pageSize: pageSize, showSizeChanger: true },
            tourCategories: arrCategories,
        });
    }, 500);

    return (
        <MultiSelect
            className={props.className}
            onChange={onChange}
            placeholder={props.placeholder}
            defaultValue={tableParams.tourCategories}
            options={data}
            isLoading={isLoading}
        />
    );
};
