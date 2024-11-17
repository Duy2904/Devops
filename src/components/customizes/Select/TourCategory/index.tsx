import FilterSearch, { currentPage, pageSize } from '@utils/filterSearch';
import { ReactNode, useEffect } from 'react';

import { BaseSelect } from '../BaseSelect';
import { Rule } from 'antd/es/form';
import { Select } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { TourCategoryDto } from '@sdk/tour-operations';
import { useGetTourCategories } from './useTourCategory';
import { useSearchTableStore } from '@store/searchTableStore';
import { useTourCategorysStore } from '@store/tourCategoryStore';

interface TourCategorySelectProps {
    className?: string;
    name?: string;
    rules?: Rule[];
    required?: boolean;
    label?: ReactNode;
    disable?: boolean;
    isForm?: boolean;
    showTitle?: boolean;
    title?: string;
    size?: SizeType;
}

export const TourCategorySelect: React.FC<TourCategorySelectProps> = props => {
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);
    const {
        actions: { setTourCategory },
    } = useTourCategorysStore(state => state);
    const { data, isLoading } = useGetTourCategories();
    const fetchItem =
        data?.data?.map(data => ({
            value: data.id ?? '',
            label: data.name ?? '',
        })) ?? [];

    const onChange = (value: string) => {
        setSearchParams({
            ...tableParams,
            pagination: { current: currentPage, pageSize: pageSize, showSizeChanger: false },
            tourCategoryId: value,
        });
    };

    useEffect(() => {
        if (data) {
            setTourCategory(data.data as TourCategoryDto[]);
        }
    }, [data, setTourCategory]);

    const select = () => {
        return (
            <Select
                virtual={false}
                className="w-full"
                showSearch
                placeholder="--Chọn Thị trường--"
                optionFilterProp="children"
                onChange={!props.isForm ? onChange : undefined}
                filterOption={FilterSearch.filterOption}
                options={fetchItem}
                disabled={props.disable}
                allowClear
                size={props.size}
                loading={isLoading}
                value={!props.isForm ? tableParams.tourCategoryId : null}
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
            showTitle={props?.showTitle}
            title={props.title}
            items={select()}
        />
    );
};
