import { Flex, Form } from 'antd';

import { ReactNode } from 'react';
import { Rule } from 'antd/es/form';

interface BaseSelectProps {
    className?: string;
    name?: string[] | string;
    rules?: Rule[];
    required?: boolean;
    label?: ReactNode;
    disable?: boolean;
    isForm?: boolean;
    title?: string;
    items?: JSX.Element | JSX.Element[] | React.ReactNode;
    initialValue?: string | string[] | null;
    noStyle?: boolean;
    dependencies?: string[] | undefined;
}

export const BaseSelect: React.FC<BaseSelectProps> = props => {
    return (
        <>
            {props.isForm ? (
                <Form.Item
                    className={props.className}
                    name={props.name}
                    rules={props.rules}
                    required={props.required}
                    label={props.label}
                    initialValue={props.initialValue}
                    noStyle={props.noStyle}
                    dependencies={props.dependencies}
                >
                    {props.items}
                </Form.Item>
            ) : (
                <Flex className={props.className} vertical>
                    {props?.title && <p className="text-sm mb-2">{props.title}</p>}
                    {props.items}
                </Flex>
            )}
        </>
    );
};
