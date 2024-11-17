import 'dayjs/locale/vi';

import { DatePicker, Form } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import { AnyObject } from 'antd/es/_util/type';
import { ReactNode } from 'react';
import { Rule } from 'antd/es/form';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import locale from 'antd/es/date-picker/locale/vi_VN';
import { AppConfig } from '@utils/config';

type formatDateType = 'date' | 'dateTime' | 'shortDate';

interface DatePickerFormProps {
    className?: string;
    name?: string[] | string;
    label?: ReactNode;
    rules?: Rule[];
    isRequired?: boolean;
    format?: formatDateType;
    placeholder?: string;
    size?: SizeType;
    disabled?: boolean;
    // eslint-disable-next-line no-unused-vars
    disabledDate?: (date: Dayjs) => boolean;
    initialValue?: dayjs.Dayjs;
    // eslint-disable-next-line no-unused-vars
    onChange?: (data: dayjs.Dayjs | null) => void;
    showTime?: boolean | AnyObject;
    hidden?: boolean;
    customDefaultValue?: dayjs.Dayjs;
    value?: dayjs.Dayjs;
    allowClear?: boolean;
}

export const DatePickerForm: React.FC<DatePickerFormProps> = props => {
    const customDefaultDate = props.customDefaultValue ?? undefined;

    const listFormat = [
        {
            key: 'date',
            value: AppConfig.DateFormat,
        },
        {
            key: 'dateTime',
            value: AppConfig.DateTimeFormat,
        },
        {
            key: 'shortDate',
            value: AppConfig.DateShortYearFormat,
        },
    ];
    return (
        <Form.Item
            className={props.className}
            name={props.name}
            label={props.label}
            rules={props.rules}
            required={props.isRequired}
            initialValue={props.initialValue}
            hidden={props.hidden}
        >
            <DatePicker
                className="w-full"
                locale={locale}
                placeholder={props.placeholder}
                format={listFormat.find(item => item.key == props.format)?.value}
                size={props.size}
                disabled={props.disabled}
                disabledDate={props.disabledDate}
                onChange={props.onChange}
                showTime={props.showTime}
                defaultPickerValue={customDefaultDate}
                value={props.value}
                allowClear={props.allowClear ? props.allowClear : true}
            />
        </Form.Item>
    );
};
