import { BaseSelect } from './BaseSelect';
import FilterSearch from '../../../utils/filterSearch';
import { ReactNode } from 'react';
import { Rule } from 'antd/es/form';
import { Select } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';

interface ApprovalStatusSelectProps {
    className?: string;
    name?: string[] | string;
    rules?: Rule[];
    required?: boolean;
    label?: ReactNode;
    initialValue?: string | null;
    disabled?: boolean;
    size?: SizeType;
    isForm?: boolean;
    approveStatus?: {
        value: string;
        label: string;
    }[];
}

export const ApprovalStatusSelect: React.FC<ApprovalStatusSelectProps> = props => {
    const select = () => {
        return (
            <Select
                virtual={false}
                showSearch
                className="w-full"
                placeholder="--Hành động--"
                options={props.approveStatus}
                filterOption={FilterSearch.filterOption}
                disabled={props.disabled}
                size={props.size}
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
        />
    );
};
