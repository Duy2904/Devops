import { Select } from 'antd';

import { BaseSelect } from './BaseSelect';
import { Rule } from 'antd/es/form';

interface RoomTypeSelectProps {
    className?: string;
    name?: string[] | string;
    isForm?: boolean;
    options: { label: string; value: string }[];
    // eslint-disable-next-line no-unused-vars
    onChange?: (value: string) => void;
    initialValue?: string | null;
    rules?: Rule[];
    disabled?: boolean;
}

export const RoomTypeSelect: React.FC<RoomTypeSelectProps> = props => {
    const select = () => {
        return <Select virtual={false} className="w-full" options={props.options} disabled={props.disabled} />;
    };

    return (
        <BaseSelect
            isForm={props.isForm}
            className={props.className}
            name={props.name}
            items={select()}
            initialValue={props.initialValue}
            rules={props.rules}
        />
    );
};
