import { Dispatch, ReactNode, SetStateAction } from 'react';
import { Flex, Form, Input, InputNumber } from 'antd';

import { Rule } from 'antd/es/form';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { runes } from 'runes2';

declare type inputType = 'number' | 'text' | 'mail' | 'password' | 'checkbox' | 'radio';

interface BaseInputProps {
    className?: string;
    clasNameInput?: string;
    name?: string[] | string;
    rules?: Rule[];
    required?: boolean;
    label?: ReactNode;
    disable?: boolean;
    isForm?: boolean;
    showTitle?: boolean;
    title?: string;
    children?: JSX.Element | JSX.Element[] | React.ReactNode;
    initialValue?: string | number | null | boolean;
    type?: inputType;
    size?: SizeType;
    addonAfterValue?: ReactNode;
    addonBeforeValue?: ReactNode;
    placeholder?: string;
    isHidden?: boolean;
    value?: string | number;
    onChange?: Dispatch<SetStateAction<number | null | undefined>>;
    // eslint-disable-next-line no-unused-vars
    onInputChange?: (value: string | number | null) => void;
    min?: string | number;
    max?: string | number;
    dependencies?: string[];
    showCount?: boolean;
    maxCountNumber?: number;
    forceUppercase?: boolean;
}

export const BaseInput = (_props: BaseInputProps) => {
    const input = () => {
        return _props.type === 'number' ? (
            <InputNumber
                className={`w-full ${_props.clasNameInput}`}
                disabled={_props.disable}
                formatter={value => (value ? Intl.NumberFormat('en-US').format(Number(value)) : '')}
                size={_props.size}
                addonAfter={_props.addonAfterValue}
                addonBefore={_props.addonBeforeValue}
                placeholder={_props.placeholder}
                value={_props.value}
                onChange={
                    _props.onInputChange ??
                    (value => {
                        const numericValue = typeof value === 'number' ? value : undefined;
                        _props.onChange?.(numericValue);
                    })
                }
                min={_props.min}
                max={_props.max}
            />
        ) : (
            <Input
                onInput={e =>
                    _props.forceUppercase
                        ? ((e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.toUpperCase())
                        : {}
                }
                type={_props.type}
                className={`w-full ${_props.clasNameInput}`}
                disabled={_props.disable}
                size={_props.size}
                placeholder={_props.placeholder}
                value={_props.value}
                count={{
                    show: _props.showCount,
                    max: _props.maxCountNumber,
                    strategy: txt => runes(txt).length,
                    exceedFormatter: (txt, { max }) => runes(txt).slice(0, max).join(''),
                }}
            />
        );
    };

    return (
        <>
            {_props.isForm ? (
                <Form.Item
                    className={_props.className}
                    name={_props.name}
                    rules={_props.rules}
                    required={_props.required}
                    label={_props.label}
                    initialValue={_props.initialValue}
                    hidden={_props.isHidden}
                    dependencies={_props.dependencies}
                >
                    {input()}
                </Form.Item>
            ) : (
                <Flex className={_props.className} vertical>
                    {_props?.showTitle && <p className="text-xs mb-2 font-medium">{_props.title}</p>}
                    {input()}
                </Flex>
            )}
        </>
    );
};
