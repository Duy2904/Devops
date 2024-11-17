import { Col, Form, FormInstance } from 'antd';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import { ContactPersonComponent } from '@src/new/components/customs/PersonContact';
import { useEffect } from 'react';

interface PersonContactProps {
    form: FormInstance;
    formContact: FormInstance;
    travellerId?: string;
}

export const PersonContact: React.FC<PersonContactProps> = props => {
    const { form, formContact, travellerId } = props;

    const travellerIdWatch = Form.useWatch('travellerId', form);
    const customerIdWatch = Form.useWatch('customerId', form);

    useEffect(() => {
        formContact.setFieldsValue({ travellerId: travellerIdWatch });
    }, [formContact, travellerIdWatch])

    useEffect(() => {
        if (travellerId) {
            form.setFieldsValue({ travellerId: travellerId });
        }
    }, [form, travellerId])

    return (
        <Col className="px-5 py-2">
            <Form form={formContact}>
                <BaseInput name={'travellerId'} isHidden isForm rules={[
                    {
                        required: true,
                    },
                ]}
                />
            </Form>
            <ContactPersonComponent
                travellerId={travellerId ?? undefined}
                customerId={customerIdWatch ?? undefined}
                canSearch={!!customerIdWatch}
                form={form}
                showCustomer={false}
                showTitle={false}
                showFullInfo
            />
        </Col>
    );
};
