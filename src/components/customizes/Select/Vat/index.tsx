import { Select } from 'antd';
import { Rule } from 'antd/es/form';
import { ReactNode } from 'react';
import { DebouncedState } from 'use-debounce';

import i18n from '@src/i18n';

import FilterSearch from '../../../../utils/filterSearch';
import { BaseSelect } from '../BaseSelect';
import { useGetVats } from './useVat';

interface VatSelectProps {
    className?: string;
    name?: string | string[];
    rules?: Rule[];
    required?: boolean;
    label?: ReactNode;
    isForm?: boolean;
    disabled?: boolean;
    initialValue?: string | null;
    onChange?: DebouncedState<() => void>;
}

export const VatSelect: React.FC<VatSelectProps> = props => {
    const { data, isLoading } = useGetVats();
    const fetchItem =
        data?.data?.map(item => ({
            value: item.id ?? '',
            label: item.description ?? '',
        })) ?? [];

    const select = () => {
        return (
            <Select
                virtual={false}
                showSearch
                className="w-full"
                placeholder={i18n.t('--Chọn VAT--')}
                options={fetchItem}
                filterOption={FilterSearch.filterOption}
                loading={isLoading}
                disabled={props.disabled}
                onChange={props.onChange}
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
            items={select()}
            disable={props.disabled}
            initialValue={props.initialValue}
        />
    );
};
