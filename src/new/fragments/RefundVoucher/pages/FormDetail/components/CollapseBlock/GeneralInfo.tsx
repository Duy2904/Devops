import { Col, Form, FormInstance } from 'antd';

import { BaseInput } from '@components/customizes/Input/BaseInput';
import { CurrenciesSelect } from '@components/customizes/Select/Currency';
import { PaymentMethodsSelect } from '@components/customizes/Select/PaymentMethod';
import i18n from '@src/i18n';
import { RefundCode } from './RefundCode';
import TextArea from 'antd/es/input/TextArea';

interface GeneralInfoProps {
    form: FormInstance;
    refundId: string;
}

export const GeneralInfo: React.FC<GeneralInfoProps> = props => {
    const { form, refundId } = props;

    return (
        <div className="p-4">
            <BaseInput isForm isHidden name="id" />
            <BaseInput isForm isHidden name="travellerId" />
            <Col className="grid grid-cols-2 gap-4">
                <RefundCode refundId={refundId} form={form} />
                <PaymentMethodsSelect
                    isForm
                    className="col-span-2 lg:col-span-1 mb-0"
                    name="paymentMethodId"
                    rules={[
                        {
                            required: true,
                            message: i18n.t('validation.default.validDefault'),
                        },
                    ]}
                    label="Phương thức thanh toán"
                />
                <CurrenciesSelect
                    isForm
                    className="col-span-2 lg:col-span-1 mb-0"
                    name="currencyId"
                    label={i18n.t('Loại tiền')}
                    rules={[
                        {
                            required: true,
                            message: i18n.t('validation.default.validDefault'),
                        },
                    ]}
                />
                <Form.Item
                    className="col-span-2"
                    name="description"
                    label="Diễn giải"
                    rules={[
                        {
                            required: true,
                            message: i18n.t('validation.default.validDefault'),
                        },
                    ]}
                >
                    <TextArea rows={5} placeholder="Thông tin mô tả" showCount maxLength={500}
                    ></TextArea>
                </Form.Item>
            </Col>
        </div>
    );
};
