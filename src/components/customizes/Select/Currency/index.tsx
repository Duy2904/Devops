import { BaseSelect } from '../BaseSelect';
import FilterSearch from '../../../../utils/filterSearch';
import { ReactNode } from 'react';
import { Rule } from 'antd/es/form';
import { Select } from 'antd';
import i18n from '@src/i18n';
import { useGetCurrencies } from './useCurrencies';

interface CurrenciesSelectProps {
    className?: string;
    name?: string[] | string;
    rules?: Rule[];
    required?: boolean;
    label?: ReactNode;
    isForm?: boolean;
    disable?: boolean;
    initialValue?: string;
    onChange?: (value: string) => void;
    showAll?: boolean;
}

export const CurrenciesSelect: React.FC<CurrenciesSelectProps> = props => {
    const { data, isLoading } = useGetCurrencies(props.showAll);
    const fetchItem =
        data?.data?.map(country => ({
            value: country.id ?? '',
            label: country.name ?? '',
        })) ?? [];

    const select = () => {
        return (
            <Select
                virtual={false}
                showSearch
                className="w-full"
                placeholder={i18n.t('--Loại tiền--')}
                options={fetchItem}
                filterOption={FilterSearch.filterOption}
                loading={isLoading}
                onChange={props.onChange}
                disabled={props.disable}
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
            disable={props.disable}
            initialValue={props.initialValue}
        />
    );
};
