import { Checkbox, Col, Flex, Form } from 'antd';
import isNil from 'lodash/isNil';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { SaleOrderDto } from '@sdk/tour-operations';

interface ContactPersonProps {
    data?: SaleOrderDto;
}

export const ContactPerson: React.FC<ContactPersonProps> = ({ data }) => {
    const { t } = useTranslation();

    return (
        <Col className="p-5">
            <Form layout="vertical" className="grid grid-cols-2 gap-x-5">
                <Form.Item className="mb-3" label={<p className="text-sm">{t('Số điện thoại')}</p>}>
                    <p className="text-sm font-bold">{data?.contactPhone ?? '-'}</p>
                </Form.Item>
                <Form.Item className="mb-3" label={<p className="text-sm">{t('Họ và tên')}</p>}>
                    <p className="text-sm font-bold">{data?.contactName ?? '-'}</p>
                </Form.Item>
                <Form.Item className="mb-3" label={<p className="text-sm">{t('Thư điện tử')}</p>}>
                    <p className="text-sm font-bold">{data?.contactEmail ?? '-'}</p>
                </Form.Item>
                <Form.Item className="mb-3" label={<p className="text-sm">{t('Địa chỉ')}</p>}>
                    <p className="text-sm font-bold">{data?.contactAddress ?? '-'}</p>
                </Form.Item>
                <Form.Item className="mb-3" label={<p className="text-sm">{t('Ghi chú')}</p>}>
                    <p className="text-sm font-bold">{data?.description ?? '-'}</p>
                </Form.Item>
            </Form>
            {!isNil(data?.hasInvoice) && data?.hasInvoice && (
                <Fragment>
                    <Flex align="center" gap={10} className="my-4">
                        <p className="text-sm font-bold">{t('Xuất hoá đơn')}</p>
                        <Checkbox checked={data?.hasInvoice ?? false} />
                    </Flex>
                    <Form layout="vertical" className="grid grid-cols-2 gap-x-5">
                        <Form.Item className="mb-3" label={<p className="text-sm">{t('Tên công ty')}</p>}>
                            <p className="text-sm font-bold">{data?.companyName ?? '-'}</p>
                        </Form.Item>
                        <Form.Item className="mb-3" label={<p className="text-sm">{t('Mã số thuế')}</p>}>
                            <p className="text-sm font-bold">{data?.companyTaxCode ?? '-'}</p>
                        </Form.Item>
                        <Form.Item className="mb-3" label={<p className="text-sm">{t('Địa chỉ công ty')}</p>}>
                            <p className="text-sm font-bold">{data?.companyAddress ?? '-'}</p>
                        </Form.Item>
                        <Form.Item className="mb-3" label={<p className="text-sm">{t('Email công ty')}</p>}>
                            <p className="text-sm font-bold">{data?.companyEmail ?? '-'}</p>
                        </Form.Item>
                    </Form>
                </Fragment>
            )}
        </Col>
    );
};
