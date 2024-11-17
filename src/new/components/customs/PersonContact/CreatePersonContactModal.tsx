import { ExclamationCircleTwoTone } from '@ant-design/icons';
import { AppConfig } from '@src/new/shared/utils/config';
import { Button, Flex, Form, Input, Modal } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { EnumOptionSelect } from '../Selects/EnumOptionSelect';
import { GenderType } from '@sdk/tour-operations';
import { DatePickerForm } from '../../ui/DatePicker/DatePickerForm';
import isEmpty from 'lodash/isEmpty';
import Format from '@src/new/shared/utils/format';
import { CustomersSelect } from '../Selects/Customers';
import { AnyObject } from 'antd/es/_util/type';
import { useCreateTraveller } from './usePersonContact';
import { toastSuccess } from '@components/ui/Toast/Toast';

interface CreatePersonContactModalProps {
    phoneValue?: string;
    customerId?: string;
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setPhoneCreated: React.Dispatch<React.SetStateAction<string>>;
}

export const CreatePersonContactModal: React.FC<CreatePersonContactModalProps> = ({
    phoneValue,
    customerId,
    isModalOpen,
    setIsModalOpen,
    setPhoneCreated
}) => {
    const [formCreateContactPerson] = Form.useForm();
    const { t } = useTranslation();

    const values = Form.useWatch([], formCreateContactPerson);

    const { mutateAsync: createTraveller } = useCreateTraveller();

    const genderTypes = Object.values(GenderType).map((key: string) => ({
        value: key,
        label: t(`GenderType.${key}`),
    }));

    const onFinish = async (values: AnyObject) => {
        const result = await createTraveller(values);
        if (result) {
            setIsModalOpen(false);
            setPhoneCreated(values?.phone);
            formCreateContactPerson.resetFields();
            toastSuccess('', t('Thêm người liên lạc thành công'));
        }
    }

    useEffect(() => {
        if (!isEmpty(values) && values?.fullName) {
            const shortPhone = values?.phone?.slice(-5);
            const valueSplit = values?.fullName?.split(' ');
            const lastName = valueSplit[0] ?? '';
            const firstName = valueSplit?.slice(1).join(' ') ?? '';

            const customerCode = `${shortPhone}.${Format.formatStringNoAccentsUppercase(values?.fullName)}`;

            formCreateContactPerson.setFieldsValue({
                ...values,
                customerCode,
                firstName,
                lastName,
                fullName: values?.fullName,
            });
        }
    }, [formCreateContactPerson, values]);

    return (
        <Modal open={isModalOpen} closeIcon={false} footer={null} width={550} destroyOnClose={true}>
            <Flex className="mb-4" align="center" gap={10}>
                <ExclamationCircleTwoTone className="text-xl" />
                <p className="text-md font-medium">{t('Thêm người liên lạc')}</p>
            </Flex>
            <Form className="grid grid-cols-2 gap-4" form={formCreateContactPerson} onFinish={onFinish} layout="vertical">
                <Form.Item hidden name={'firstName'}>
                    <Input />
                </Form.Item>
                <Form.Item hidden name={'lastName'}>
                    <Input />
                </Form.Item>
                <Form.Item
                    className="mb-0"
                    label={t('personContact.phone')}
                    name={'phone'}
                    initialValue={phoneValue?.slice(4)}
                    rules={[
                        {
                            pattern: AppConfig.PhoneRegex,
                            message: t('validation.default.errorPhone'),
                        },
                        {
                            required: true,
                            message: t('validation.default.validPhone'),
                        },
                    ]}
                >
                    <Input addonBefore="+84" showCount maxLength={10} />

                </Form.Item>
                <Form.Item
                    className="mb-0"
                    name="fullName"
                    label={t('personContact.fullName')}
                    rules={[{ required: true, message: t('validation.default.validFullName') }]}
                >
                    <Input showCount maxLength={40} />
                </Form.Item>
                <Form.Item
                    className="mb-0 col-span-2"
                    name={'email'}
                    label={t('personContact.mail')}
                    rules={[
                        {
                            type: 'email',
                            message: t('validation.default.validMail'),
                        },
                    ]}
                >
                    <Input type={'mail'} showCount maxLength={40} />
                </Form.Item>
                <Form.Item
                    className="mb-0 col-span-2"
                    name={'address'}
                    label={t('personContact.address')}
                >
                    <Input showCount maxLength={500} />
                </Form.Item>
                <EnumOptionSelect
                    isForm
                    className="mb-0"
                    name={'gender'}
                    label={t('GenderType.title')}
                    placeholder={t('GenderType.title')}
                    optionValue={genderTypes}
                />
                <DatePickerForm
                    className="mb-0"
                    label={t('personContact.dateOfBirth')}
                    name={'dateOfBirth'}
                    format="date"
                />
                <Form.Item className="mb-0" name="customerCode" label={t('Mã tự động')}>
                    <Input variant="filled" readOnly />
                </Form.Item>
                <CustomersSelect
                    isForm
                    className="col-span-1 mb-0"
                    name="customerId"
                    rules={[
                        {
                            required: true,
                            message: t('validation.default.validDefault'),
                        },
                    ]}
                    label="Khách hàng"
                    initialValue={customerId}
                    disable={!!customerId}
                />
            </Form>
            <Flex className="mt-6" justify="end" gap={14}>
                <Button
                    onClick={() => {
                        setIsModalOpen(false);
                        formCreateContactPerson.resetFields();
                    }}
                >
                    Huỷ
                </Button>
                <Button type="primary" onClick={() => formCreateContactPerson.submit()}>Lưu</Button>
            </Flex>
        </Modal>
    );
};
