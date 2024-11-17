import { Select } from 'antd';
import { Rule } from 'antd/es/form';
import { ReactNode } from 'react';

import { BaseSelect } from '@src/new/components/customs/Selects/BaseSelect';
import { useSearchTableStore } from '@store/searchTableStore';
import FilterSearch from '@utils/filterSearch';

import { useFetchCountries } from './useCountries';

interface CountriesSelectProps {
    className?: string;
    name?: string[] | string;
    rules?: Rule[];
    required?: boolean;
    label?: ReactNode;
    initialValue?: string;
    disabled?: boolean;
    isForm?: boolean;
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
            title={props?.title}
        />
    );
};
