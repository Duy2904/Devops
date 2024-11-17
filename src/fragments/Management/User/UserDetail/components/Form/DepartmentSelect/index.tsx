import { BaseSelect } from '@components/customizes/Select/BaseSelect';
import FilterSearch from '@utils/filterSearch';
import { ReactNode } from 'react';
import { Rule } from 'antd/es/form';
import { Select } from 'antd';
import { useFetchDropdownDepartment } from './queries';

interface DepartmentSelectProps {
    className?: string;
    name?: string;
    label?: ReactNode;
    isForm?: boolean;
    rules?: Rule[];
    required?: boolean;
    disabled?: boolean;
    branchIdUseWatch?: string;
}

export const DepartmentSelect: React.FC<DepartmentSelectProps> = props => {
    const { data, isLoading } = useFetchDropdownDepartment(props.branchIdUseWatch);

    const select = () => {
        return (
            <Select
                virtual={false}
                showSearch
                className="w-full"
                options={data}
                filterOption={FilterSearch.filterOption}
                placeholder={'--Chọn bộ phận--'}
                disabled={props.disabled}
                loading={isLoading}
                allowClear
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
            required={props.required}
        />
    );
};
