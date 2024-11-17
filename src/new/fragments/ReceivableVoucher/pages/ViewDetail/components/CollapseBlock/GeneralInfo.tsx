import { ReceivableVoucherDto } from '@sdk/tour-operations';
import { useGetCurrencies } from '@src/new/components/customs/Selects/Currency/useCurrencies';
import { useGetPaymentMethods } from '@src/new/components/customs/Selects/PaymentMethod/usePaymentMethod';
import { Col, Flex, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react'
import { useTranslation } from 'react-i18next';

interface GeneralInfoProps {
    data?: ReceivableVoucherDto;
}


export const GeneralInfo: React.FC<GeneralInfoProps> = (props) => {
    const { data } = props;
    const { t } = useTranslation();
    const { data: dataPaymentMethod } = useGetPaymentMethods();
    const { data: dataCurrency } = useGetCurrencies(false);

    return (
        <Col className='p-4'>
            <Flex className='mb-4' align='center' justify='space-between'>
                <p><span className='text-red-500 text-[10px] pr-1'>*</span>{t('Mã phiếu thu')}</p>
                <p className='font-bold'>{data?.voucherNo}</p>
            </Flex>
            <Form layout="vertical" className="grid grid-cols-2 gap-4">
                <Form.Item className="mb-0" label={<p className="text-sm"><span className='text-red-500 text-[10px] pr-1'>*</span>{t('Phương thức thanh toán')}</p>}>
                    <Input readOnly value={dataPaymentMethod?.data?.find(item => item.id === data?.paymentMethodId)?.name ?? '-'} />
                </Form.Item>
                <Form.Item className="mb-0" label={<p className="text-sm"><span className='text-red-500 text-[10px] pr-1'>*</span>{t('Loại tiền')}</p>}>
                    <Input readOnly value={dataCurrency?.data?.find(item => item.id === data?.currencyId)?.name ?? '-'} />
                </Form.Item>
                <Form.Item className="col-span-2" label={<p className="text-sm"><span className='text-red-500 text-[10px] pr-1'>*</span>{t('Diễn giải')}</p>}>
                    <TextArea value={data?.description ?? '-'} readOnly rows={5} placeholder="Thông tin mô tả" showCount maxLength={500}
                    />
                </Form.Item>
            </Form>
        </Col>
    )
}
