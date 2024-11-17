import FilterSearch, { currentPage, pageSize } from '../../../../utils/filterSearch';

import { BaseSelect } from '../BaseSelect';
import { ReactNode } from 'react';
import { Rule } from 'antd/es/form';
import { Select } from 'antd';
import { useFetchCountries } from './useCountries';
import { useSearchTableStore } from '@store/searchTableStore';

interface CountriesSelectProps {
    className?: string;
    name?: string[] | string;
    rules?: Rule[];
    required?: boolean;
    label?: ReactNode;
    initialValue?: string;
    disabled?: boolean;
    isForm?: boolean;
    showTitle?: boolean;
    title?: string;
    placeholder?: string;
}

export const CountriesSelect: React.FC<CountriesSelectProps> = props => {
    const { data, isLoading } = useFetchCountries();
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    const fetchItem =
        data?.data?.map(country => ({
            value: country.id ?? '',
            label: country.name ?? '',
        })) ?? [];

    const onChange = (value: string) => {
        setSearchParams({
            ...tableParams,
            pagination: { current: currentPage, pageSize: pageSize, showSizeChanger: true },
            countryId: value,
        });
    };

    const select = () => {
        return (
            <Select
                virtual={false}
                showSearch
                allowClear
                className="w-full"
                placeholder="--Chọn Quốc Gia--"
                options={fetchItem}
                filterOption={FilterSearch.filterOption}
                disabled={props.disabled}
                loading={isLoading}
                onChange={!props.isForm ? onChange : undefined}
                value={!props.isForm ? tableParams.countryId : undefined}
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
            initialValue={props.initialValue}
            items={select()}
            showTitle={props?.showTitle}
            title={props?.title}
        />
    );
};
