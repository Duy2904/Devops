import { BaseSelect } from '@components/customizes/Select/BaseSelect';
import FilterSearch from '@utils/filterSearch';
import { ReactNode } from 'react';
import { Rule } from 'antd/es/form';
import { Select } from 'antd';
import { useFetchDropdownRoles } from './queries';

interface RoleSelectProps {
    className?: string;
    name?: string;
    label?: ReactNode;
    isForm?: boolean;
    rules?: Rule[];
    required?: boolean;
    disabled?: boolean;
    groupId?: string;
    ownerId?: string;
}

export const RoleSelect: React.FC<RoleSelectProps> = props => {
    const { data, isLoading } = useFetchDropdownRoles(props.ownerId, props.groupId);

    const select = () => {
        return (
            <Select
                virtual={false}
                showSearch
                className="w-full"
                options={data}
                filterOption={FilterSearch.filterOption}
                placeholder={'--Chọn bộ quyền--'}
                disabled={props.disabled}
                loading={isLoading}
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
