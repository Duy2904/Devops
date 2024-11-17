import { Col, Form, FormInstance } from 'antd';
import { Fragment } from 'react';

import { useGetPaymentMethods } from '@src/new/components/customs/Selects/PaymentMethod/usePaymentMethod';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import { useTranslation } from 'react-i18next';
import { ContactPersonComponent } from '@src/new/components/customs/PersonContact';

interface ContactPersonProps {
    form: FormInstance;
    travellerId?: string;
}

export const ContactPerson: React.FC<ContactPersonProps> = props => {
    const { form, travellerId } = props;
    const { t } = useTranslation();

    const paymentMethodIdForm = Form.useWatch('paymentMethodId', { form, preserve: true });
    const { data: dataPaymentMethod } = useGetPaymentMethods();


    return (
        <div className="p-4">
            <ContactPersonComponent travellerId={travellerId} canSearch={!travellerId} form={form} />
            {dataPaymentMethod?.data?.find(item => item.id === paymentMethodIdForm)?.name === 'Chuyển khoản' && (
                <Fragment>
                    <p className='text-base font-semibold mt-2 mb-4'>{t('Thông tin ngân hàng')}</p>
                    <Col className="grid grid-cols-2 gap-x-5">
                        <BaseInput
                            className="mb-3"
                            isForm
                            type="text"
                            name="contactBankAccount"
                            placeholder="Tên tài khoản"
                            label="Tên tài khoản"
                            rules={[
                                {
                                    required: true,
                                    message: t('validation.default.validDefault'),
                                },
                            ]}
                        />
                        <BaseInput
                            className="mb-3"
                            isForm
                            type="text"
                            name="contactBankNumber"
                            placeholder="Số tài khoản"
                            label="Số tài khoản"
                            rules={[
                                {
                                    required: true,
                                    message: t('validation.default.validDefault'),
                                },
                            ]}
                        />
                        <BaseInput
                            className="mb-3 col-span-2"
                            isForm
                            type="text"
                            name="contactBankName"
                            placeholder="Tên ngân hàng - Chi nhánh"
                            label="Tên ngân hàng - Chi nhánh"
                            rules={[
                                {
                                    required: true,
                                    message: t('validation.default.validDefault'),
                                },
                            ]}
                        />
                    </Col>
                </Fragment>

            )}
        </div>
    );
};
