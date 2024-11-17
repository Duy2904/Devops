import { Select } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { Rule } from 'antd/es/form';
import { ReactNode } from 'react';

import { ApproveStatus } from '../../../../sdk/tour-operations';
import i18n from '../../../i18n';
import { BaseSelect } from './BaseSelect';

interface ApproveSOSelectProps {
    className?: string;
    name?: string[] | string;
    rules?: Rule[];
    required?: boolean;
    label?: ReactNode;
    initialValue?: string | null;
    disabled?: boolean;
    size?: SizeType;
    isForm?: boolean;
}

export const ApproveSOSelect: React.FC<ApproveSOSelectProps> = props => {
    const saleOrderStatus = [
        {
            value: ApproveStatus.Allow,
            label: i18n.t(`OrderStatus.${ApproveStatus.Allow}`),
        },
        {
            value: ApproveStatus.Deny,
            label: i18n.t(`OrderStatus.${ApproveStatus.Deny}`),
        },
    ];

    const select = () => {
        return <Select options={saleOrderStatus} disabled={props.disabled} />;
    };

    return (
        <BaseSelect
            isForm={props.isForm}
            className={props.className}
            name={props.name}
            label={props.label}
            rules={props.rules}
            initialValue={props.initialValue}
            items={select()}
        />
    );
};
