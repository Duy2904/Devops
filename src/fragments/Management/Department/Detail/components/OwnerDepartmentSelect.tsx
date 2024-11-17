import { BaseSelect } from '@components/customizes/Select/BaseSelect';
import FilterSearch from '@utils/filterSearch';
import { ReactNode } from 'react';
import { Rule } from 'antd/es/form';
import { Select } from 'antd';
import i18n from '@src/i18n';
import { useFetchEmployees } from '../../hooks/queries';

interface OwnerDepartmentSelectProps {
    className?: string;
    name?: string;
    label?: ReactNode;
    isForm?: boolean;
    rules?: Rule[];
}

export const OwnerDepartmentSelect: React.FC<OwnerDepartmentSelectProps> = props => {
    const { data, isLoading } = useFetchEmployees();

    const select = () => {
        return (
            <Select
                virtual={false}
                showSearch
                allowClear
                className="w-full"
                placeholder={i18n.t('--Trưởng bộ phận--')}
                options={data}
                loading={isLoading}
                filterOption={FilterSearch.filterOption}
            />
        );
    };

    return (
        <BaseSelect
            isForm={props.isForm}
            className={props.className}
            name={props.name}
            label={props.label}
            items={select()}
            rules={props.rules}
        />
    );
};
