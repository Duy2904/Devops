import { Select } from 'antd';
import { Rule } from 'antd/es/form';
import { ReactNode } from 'react';

import i18n from '@src/i18n';
import { BaseSelect } from '@src/new/components/customs/Selects/BaseSelect';
import FilterSearch from '@utils/filterSearch';

import { useGetVats } from '../../../hooks/queries';

interface VatSelectProps {
    className?: string;
    name?: string | string[];
    rules?: Rule[];
    required?: boolean;
    label?: ReactNode;
    isForm?: boolean;
    disabled?: boolean;
    initialValue?: string | null;
    onChange?: () => void;
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
