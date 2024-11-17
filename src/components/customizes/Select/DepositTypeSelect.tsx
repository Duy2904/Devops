import { Select } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { Rule } from 'antd/es/form';
import { ReactNode } from 'react';

import { DepositType } from '../../../../sdk/tour-operations';
import { BaseSelect } from './BaseSelect';

interface OptionType {
    value: string;
    label: string;
}
interface DepositTypeSelectProps {
    className?: string;
    name?: string[] | string;
    rules?: Rule[];
    required?: boolean;
    label?: ReactNode;
    // eslint-disable-next-line no-unused-vars
    onChange?: (value: string) => void;
    size?: SizeType;
    initialValue?: string;
    disableCash?: boolean;
    disabled?: boolean;
    isForm?: boolean;
}

export const DepositTypeSelect: React.FC<DepositTypeSelectProps> = props => {
    const depositTypeOptions = Object.values(DepositType).map((value, index: number) => ({
        value,
        label: index === 0 ? '%' : 'Tiền mặt',
    }));

    const optionsDisableCash: OptionType[] = depositTypeOptions.map(option => ({
        ...option,
        disabled: option.value == DepositType.Cash,
    }));

    const select = () => {
        return (
            <Select
                allowClear
                virtual={false}
                onChange={props.onChange}
                showSearch
                className="w-full"
                placeholder="--Chọn loại--"
                options={props.disableCash ? optionsDisableCash : depositTypeOptions}
                size={props.size}
                disabled={props.disabled}
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
