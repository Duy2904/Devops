import { AnyObject } from 'antd/es/_util/type';
import { BaseSelect } from './BaseSelect';
import { Cascader } from 'antd';
import { ReactNode } from 'react';
import { Rule } from 'antd/es/form';

interface MultiSelectProps {
    className?: string;
    name?: string[] | string;
    isForm?: boolean;
    options: { label: string; value: string }[] | undefined;
    // eslint-disable-next-line no-unused-vars
    onChange?: (value: AnyObject) => void;
    initialValue?: string | null;
    rules?: Rule[];
    label?: ReactNode;
    placeholder?: string;
    title?: string;
    isLoading?: boolean;
    defaultValue?: string[];
    values?: string[];
}

export const MultiSelect: React.FC<MultiSelectProps> = props => {
    const select = () => {
        return (
            <Cascader
                className="w-full"
                placeholder={props.placeholder}
                showSearch
                options={props.options}
                onChange={props.onChange}
                multiple
                maxTagCount={'responsive'}
                defaultValue={props.defaultValue?.map(item => [item])}
                value={props.values?.map(item => [item])}
                loading={props.isLoading}
                dropdownMenuColumnStyle={{
                    height: 'auto',
                }}
            />
        );
    };

    return (
        <BaseSelect
            isForm={props.isForm}
            className={props.className}
            name={props.name}
            label={props.label}
            title={props.title}
            items={select()}
        />
    );
};
