import { BaseSelect } from '@components/customizes/Select/BaseSelect';
import FilterSearch from '@utils/filterSearch';
import { ReactNode } from 'react';
import { Rule } from 'antd/es/form';
import { Select } from 'antd';
import i18n from '@src/i18n';
import { useFetchDepartmentsSelect } from '../../hooks/queries';

interface DepartmentGroupSelectProps {
    className?: string;
    name?: string;
    label?: ReactNode;
    isForm?: boolean;
    rules?: Rule[];
    departmentId?: string;
    branchId?: string;
}

export const DepartmentGroupSelect: React.FC<DepartmentGroupSelectProps> = props => {
    const { data, isLoading } = useFetchDepartmentsSelect();

    const select = () => {
        return (
            <Select
                virtual={false}
                showSearch
                allowClear
                className="w-full"
                placeholder={i18n.t('--Chọn Bộ phận--')}
                options={data?.filter(item => item.value !== props.departmentId && item.branchId === props.branchId)}
                loading={isLoading}
                filterOption={FilterSearch.filterOption}
                disabled={!props.branchId}
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
