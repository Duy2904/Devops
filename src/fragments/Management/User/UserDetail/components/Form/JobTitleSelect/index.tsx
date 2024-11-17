import { BaseSelect } from '@components/customizes/Select/BaseSelect';
import FilterSearch from '@utils/filterSearch';
import { ReactNode } from 'react';
import { Rule } from 'antd/es/form';
import { Select } from 'antd';
import { useFetchDropdownPosition } from './queries';

interface JobTitleSelectProps {
    className?: string;
    name?: string;
    label?: ReactNode;
    isForm?: boolean;
    rules?: Rule[];
    required?: boolean;
    disabled?: boolean;
}

export const JobTitleSelect: React.FC<JobTitleSelectProps> = props => {
    const { data, isLoading } = useFetchDropdownPosition();

    const select = () => {
        return (
            <Select
                virtual={false}
                showSearch
                className="w-full"
                options={data}
                filterOption={FilterSearch.filterOption}
                placeholder={'--Chọn Chức vụ--'}
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
