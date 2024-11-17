import { Flex, Form, FormInstance, InputNumber, Space, Switch } from 'antd';

import { BaseInput } from '@components/customizes/Input/BaseInput';
import { TimeUnitSelect } from '@components/customizes/Select/TimeUnitSelect';
import { NotificationTimeSetupDto, TimeUnits } from '@sdk/tour-operations';
import i18n from '@src/i18n';

interface FormItemProps {
    item: NotificationTimeSetupDto;
    form: FormInstance;
}

const timeUnitOptions = [
    {
        value: TimeUnits.Day,
        label: i18n.t(`timeUnits.${TimeUnits.Day}`),
    },
    {
        value: TimeUnits.Week,
        label: i18n.t(`timeUnits.${TimeUnits.Week}`),
    },
];

export const FormItem: React.FC<FormItemProps> = props => {
    const { form, item } = props;
    const itemId = item.id ?? '';
    const dataFormWatch = Form.useWatch('isActive', form);

    return (
        <Flex align="center">
            <p className="flex-none w-52 text-right mb-6 mr-4">{item.eventName}:</p>
            <Form.Item name={['isActive', itemId]} initialValue={item.isActive}>
                <Switch defaultChecked={item.isActive} size="small" />
            </Form.Item>
            <Form.Item className="flex-none w-52 pl-4">
                <Space.Compact>
                    <Form.Item
                        name={['value', itemId]}
                        noStyle
                        initialValue={item.value}
                        dependencies={['isActive', itemId]}
                    >
                        <InputNumber style={{ width: '70%' }} min="1" disabled={!dataFormWatch?.[itemId]} />
                    </Form.Item>
                    <TimeUnitSelect
                        isForm
                        name={['timeUnit', itemId]}
                        initialValue={item.timeUnit}
                        options={timeUnitOptions}
                        noStyle
                        disabled={!dataFormWatch?.[itemId]}
                        dependencies={['isActive', itemId]}
                    />
                </Space.Compact>
            </Form.Item>
            <BaseInput isForm isHidden type="text" name={['id', itemId]} initialValue={itemId} />
            <BaseInput isForm isHidden type="text" name={['eventKey', itemId]} initialValue={item.eventKey} />
            <BaseInput isForm isHidden type="text" name={['eventName', itemId]} initialValue={item.eventName} />
            <BaseInput isForm isHidden type="text" name={['module', itemId]} initialValue={item.module} />
        </Flex>
    );
};
