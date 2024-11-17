import { Form, FormInstance, Input, Skeleton } from 'antd';
import { Dispatch, SetStateAction } from 'react';

import { BaseInput } from '@components/customizes/Input/BaseInput';
import { useGetPaymentMethods } from '@components/customizes/Select/PaymentMethod/usePaymentMethod';
import { PersonContactForm } from '@fragments/PersonContactForm';
import { TravellerDto } from '@sdk/tour-operations';
import i18n from '@src/i18n';

interface CustomerInfoProps {
    form: FormInstance;
    personContactForm: FormInstance;
    isLoading: boolean;
    travellerId?: string;
    submittable: boolean;
    setSubmittable: Dispatch<SetStateAction<boolean>>;
}

export const CustomerInfo: React.FC<CustomerInfoProps> = props => {
    const { form, isLoading, personContactForm, travellerId, submittable, setSubmittable } = props;
    const paymentMethodIdForm = Form.useWatch('paymentMethodId', { form, preserve: true });
    const { data: dataPaymentMethod } = useGetPaymentMethods();

    const handleDataPersonContact = (traveller: TravellerDto) => {
        form.setFieldValue('travellerId', traveller.id);
        form.setFieldValue('contactName', `${traveller.lastName} ${traveller.firstName}`);
        form.setFieldValue('contactPhone', traveller.phone);
        form.setFieldValue('contactEmail', traveller.email);
        form.setFieldValue('contactAddress', traveller.address);
    };

    if (isLoading) return <Skeleton className="p-4 min-h-[350px]" paragraph={{ rows: 10 }} active></Skeleton>;
    return (
        <div className="p-4 min-h-[350px]">
            <Form.Item name="contactName" hidden>
                <Input />
            </Form.Item>
            <Form.Item name="contactPhone" hidden>
                <Input />
            </Form.Item>
            <Form.Item name="contactEmail" hidden>
                <Input />
            </Form.Item>
            <Form.Item name="contactAddress" hidden>
                <Input />
            </Form.Item>
            <Form.Item name="travellerId" hidden>
                <Input />
            </Form.Item>
            <PersonContactForm
                form={personContactForm}
                travellerId={travellerId}
                handleDataPersonContact={handleDataPersonContact}
                isEnableEdit={submittable}
                setIsEnableEdit={setSubmittable}
            />
            {dataPaymentMethod?.data?.find(item => item.id === paymentMethodIdForm)?.name === 'Chuyển khoản' && (
                <BaseInput
                    className="mb-0"
                    isForm
                    type="text"
                    name="contactBankAccount"
                    placeholder="Tài khoản ngân hàng"
                    label="Tài khoản ngân hàng"
                    rules={[
                        {
                            required: true,
                            message: i18n.t('validation.default.validDefault'),
                        },
                    ]}
                />
            )}
        </div>
    );
};
