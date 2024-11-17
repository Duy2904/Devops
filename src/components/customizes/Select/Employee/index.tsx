import { BaseSelect } from '../BaseSelect';
import FilterSearch from '@utils/filterSearch';
import { ReactNode } from 'react';
import { Rule } from 'antd/es/form';
import { Select } from 'antd';
import i18n from '@src/i18n';
import { useGetEmployees } from './useEmployee';

interface EmployeesSelectProps {
    className?: string;
    name?: string;
    rules?: Rule[];
    required?: boolean;
    label?: ReactNode;
    isForm?: boolean;
    onChange?: () => void;
}

export const EmployeesSelect: React.FC<EmployeesSelectProps> = props => {
    const { data, isLoading } = useGetEmployees();
    const fetchItem =
        data?.data?.map(data => ({
            value: data.id ?? '',
            label: data.name ?? '',
        })) ?? [];

    const select = () => {
        return (
            <Select
                virtual={false}
                onChange={props.onChange}
                showSearch
                className="w-full"
                placeholder={i18n.t('--Seller--')}
                options={fetchItem}
                filterOption={FilterSearch.filterOption}
                loading={isLoading}
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
        />
    );
};
