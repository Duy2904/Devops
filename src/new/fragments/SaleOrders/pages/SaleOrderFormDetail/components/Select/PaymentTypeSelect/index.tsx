import { Select } from 'antd';

import { BaseSelect } from '@src/new/components/customs/Selects/BaseSelect';

interface PaymentTypeSelectProps {
    className?: string;
    name?: string[] | string;
    disabled?: boolean;
    isForm?: boolean;
    options: { label: string; value: string }[];
    // eslint-disable-next-line no-unused-vars
    onChange?: (value: string) => void;
}

export const PaymentTypeSelect: React.FC<PaymentTypeSelectProps> = props => {
    const select = () => {
        return (
            <Select
                virtual={false}
                placeholder="Chọn loại"
                options={props.options}
                onChange={props.onChange}
                disabled={props.disabled}
            />
        );
    };

    return <BaseSelect isForm={props.isForm} className={props.className} name={props.name} items={select()} />;
};
