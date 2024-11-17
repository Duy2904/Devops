import { Select } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { Rule } from 'antd/es/form';
import { FocusEventHandler, ReactNode } from 'react';

import FilterSearch from '../../../utils/filterSearch';
import { BaseSelect } from './BaseSelect';

interface EnumOptionSelectProps {
    isForm?: boolean;
    className?: string;
    name?: string[] | string;
    rules?: Rule[];
    required?: boolean;
    label?: ReactNode;
    disable?: boolean;
    size?: SizeType;
    onBlur?: FocusEventHandler<HTMLElement>;
    onChange?: () => void;
    initialValue?: string | null;
    showTitle?: boolean;
    title?: string;
    placeholder?: string;
    optionValue?: {
        value: string;
        label: string;
    }[];
}

export const EnumOptionSelect: React.FC<EnumOptionSelectProps> = props => {
    const select = () => {
        return (
            <Select
                virtual={false}
                disabled={props.disable}
                showSearch
                className="w-full"
                placeholder={props.placeholder}
                options={props.optionValue}
                filterOption={FilterSearch.filterOption}
                size={props.size}
                onBlur={props.onBlur}
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
            showTitle={props?.showTitle}
            title={props.title}
            items={select()}
            initialValue={props.initialValue}
        />
    );
};
