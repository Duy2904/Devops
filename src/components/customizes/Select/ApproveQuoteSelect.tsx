import { Select } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { Rule } from 'antd/es/form';
import { ReactNode } from 'react';

import { ConfirmQuoteStatus } from '@sdk/tour-operations';
import i18n from '@src/i18n';

import { BaseSelect } from './BaseSelect';

interface OptionType {
    value: string;
    label: string;
}

interface ApproveQuoteSelectProps {
    className?: string;
    name?: string[] | string;
    rules?: Rule[];
    required?: boolean;
    label?: ReactNode;
    initialValue?: string | null;
    disabled?: boolean;
    size?: SizeType;
    isForm?: boolean;
    dataSelect?: OptionType[];
    // eslint-disable-next-line no-unused-vars
    onChange?: (value: string) => void;
}

export const ApproveQuoteSelect: React.FC<ApproveQuoteSelectProps> = props => {
    const saleOrderStatus = [
        {
            value: ConfirmQuoteStatus.Approve,
            label: i18n.t(`QuoteStatus.${ConfirmQuoteStatus.Approve}`),
        },
        {
            value: ConfirmQuoteStatus.Reject,
            label: i18n.t(`QuoteStatus.${ConfirmQuoteStatus.Reject}`),
        },
    ];

    const select = () => {
        return (
            <Select
                options={props.dataSelect ? props.dataSelect : saleOrderStatus}
                disabled={props.disabled}
                onChange={props.onChange}
            />
        );
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
