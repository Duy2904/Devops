import { Col, Form, FormInstance, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { AutoCompletePhone } from './AutoCompletePhone';
import { TravellerDto } from '@sdk/tour-operations';
import { useTranslation } from 'react-i18next';
import { useGetTraveller } from './usePersonContact';
import { useFetchCustomers } from '../Selects/Customers/useCustomers';
import isEmpty from 'lodash/isEmpty';
import i18n from '@src/i18n';
import dayjs from 'dayjs';
import { AppConfig } from '@utils/config';

interface ContactPersonComponentProps {
    canSearch?: boolean;
    travellerId?: string;
    form?: FormInstance;

    // external customer
    customerId?: string;
    showCustomer?: boolean;
    showTitle?: boolean;
    showFullInfo?: boolean;
}

export const ContactPersonComponent: React.FC<ContactPersonComponentProps> = ({
    canSearch,
    travellerId,
    form,
    customerId,
    showCustomer = true,
    showTitle = true,
    showFullInfo,
}) => {
    const { t } = useTranslation();

    const [personContactData, setPersonContactData] = useState<TravellerDto>({});

    const { data: dataTravellerDefault } = useGetTraveller(travellerId ?? '');
    const { data: fetchCustomer } = useFetchCustomers();

    useEffect(() => {
        if (dataTravellerDefault) {
            setPersonContactData(dataTravellerDefault);
        }
    }, [dataTravellerDefault]);

    useEffect(() => {
        if (!travellerId) {
            setPersonContactData({});
        }
    }, [travellerId]);

    return (
        <Col>
            {!customerId && showCustomer && (
                <Col>
                    <p className="flex items-start mb-1">
                        <span className="text-red-500 text-[10px] pr-1">*</span>
                        {t('Khách hàng')}
                    </p>
                    <Input
                        readOnly
                        value={
                            fetchCustomer?.data?.find(item => item.id === personContactData?.customerId)?.name ?? '-'
                        }
                    />
                </Col>
            )}
            {showTitle && <p className="text-base font-semibold my-4">{t('Người liên lạc')}</p>}
            <Form layout="vertical" className="grid grid-cols-6 gap-x-5">
                <AutoCompletePhone
                    key={personContactData.phone}
                    setPersonContactData={setPersonContactData}
                    canSearch={canSearch}
                    personContactData={personContactData}
                    customerId={customerId}
                    form={form}
                />
                <Form.Item
                    className="mb-3 col-span-3"
                    label={
                        <p className="text-sm">
                            <span className="text-red-500 text-[10px] pr-1">*</span>
                            {t('Họ và tên')}
                        </p>
                    }
                >
                    <Input
                        readOnly
                        value={
                            personContactData?.lastName || personContactData?.firstName
                                ? `${personContactData?.lastName} ${personContactData?.firstName}`
                                : '-'
                        }
                    />
                </Form.Item>
                <Form.Item className="mb-3 col-span-3" label={<p className="text-sm">{t('Thư điện tử')}</p>}>
                    <Input
                        readOnly
                        value={
                            personContactData?.email && !isEmpty(personContactData?.email)
                                ? personContactData?.email
                                : '-'
                        }
                    />
                </Form.Item>
                <Form.Item className="mb-3 col-span-3" label={<p className="text-sm">{t('Địa chỉ')}</p>}>
                    <Input
                        readOnly
                        value={
                            personContactData?.address && !isEmpty(personContactData?.address)
                                ? personContactData?.address
                                : '-'
                        }
                    />
                </Form.Item>
                {showFullInfo && (
                    <>
                        <Form.Item className="mb-3 col-span-2" label={<p className="text-sm">{t('Mã khách hàng')}</p>}>
                            <Input
                                readOnly
                                value={
                                    personContactData?.customerCode && !isEmpty(personContactData?.customerCode)
                                        ? personContactData?.customerCode
                                        : '-'
                                }
                            />
                        </Form.Item>
                        <Form.Item className="mb-3 col-span-2" label={<p className="text-sm">{t('Giới tính')}</p>}>
                            <Input
                                readOnly
                                value={
                                    personContactData?.gender && !isEmpty(personContactData?.gender)
                                        ? `${i18n.t(`GenderType.${personContactData.gender}`)}`
                                        : '-'
                                }
                            />
                        </Form.Item>
                        <Form.Item className="mb-3 col-span-2" label={<p className="text-sm">{t('Ngày sinh')}</p>}>
                            <Input
                                readOnly
                                value={
                                    personContactData?.dateOfBirth && !isEmpty(personContactData?.dateOfBirth)
                                        ? dayjs(personContactData?.dateOfBirth).format(AppConfig.DateFormat)
                                        : '-'
                                }
                            />
                        </Form.Item>
                    </>
                )}
            </Form>
        </Col>
    );
};
