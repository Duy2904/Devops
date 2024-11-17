import { ReceivableVoucherDto } from '@sdk/tour-operations';
import { useFetchCustomers } from '@src/new/components/customs/Selects/Customers/useCustomers';
import { useGetPaymentMethods } from '@src/new/components/customs/Selects/PaymentMethod/usePaymentMethod';
import { Col, Form, Input } from 'antd';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetTraveller } from '@src/new/components/customs/PersonContact/usePersonContact';
import isEmpty from 'lodash/isEmpty';


interface ContactPersonProps {
    data?: ReceivableVoucherDto;
}

export const ContactPerson: React.FC<ContactPersonProps> = ({ data }) => {
    const { t } = useTranslation();
    const labelTranferPaymentMethod = 'Chuyển khoản';

    const { data: fetchCustomer } = useFetchCustomers();
    const { data: dataTravellerDefault } = useGetTraveller(data?.travellerId ?? '');
    const { data: dataPaymentMethod } = useGetPaymentMethods();

    return (
        <Col className="p-4">
            <Col>
                <p className='flex items-start mb-1'><span className='text-red-500 text-[10px] pr-1'>*</span>{t('Khách hàng')}</p>
                <Input readOnly value={fetchCustomer?.data?.find(item => item.id === dataTravellerDefault?.customerId)?.name ?? '-'} />
            </Col>
            <p className='text-base font-semibold my-4'>{t('Người liên lạc')}</p>
            <Form layout="vertical" className="grid grid-cols-2 gap-x-5">
                {
                    dataTravellerDefault?.phone &&
                    <Form.Item className="mb-3" label={<p className="text-sm"><span className='text-red-500 text-[10px] pr-1'>*</span>{t('Số điện thoại')}</p>}>
                        <Input addonBefore="+84" value={dataTravellerDefault?.phone?.startsWith('+84')
                            ? dataTravellerDefault?.phone.slice(4)
                            : dataTravellerDefault?.phone} readOnly />
                    </Form.Item>
                }
                <Form.Item className="mb-3" label={<p className="text-sm"><span className='text-red-500 text-[10px] pr-1'>*</span>{t('Họ và tên')}</p>}>
                    <Input readOnly value={dataTravellerDefault?.lastName || dataTravellerDefault?.firstName ? `${dataTravellerDefault?.lastName} ${dataTravellerDefault?.firstName}` : '-'} />
                </Form.Item>
                <Form.Item className="mb-3" label={<p className="text-sm">{t('Thư điện tử')}</p>}>
                    <Input readOnly value={dataTravellerDefault?.email && !isEmpty(dataTravellerDefault?.email) ? dataTravellerDefault?.email : '-'} />
                </Form.Item>
                <Form.Item className="mb-3" label={<p className="text-sm">{t('Địa chỉ')}</p>}>
                    <Input readOnly value={dataTravellerDefault?.address && !isEmpty(dataTravellerDefault?.address) ? dataTravellerDefault?.address : '-'} />
                </Form.Item>
            </Form>
            {dataPaymentMethod?.data?.find(item => item.id === data?.paymentMethodId)?.name === labelTranferPaymentMethod && (
                <Fragment>
                    <p className='text-base font-semibold mt-2 mb-4'>{t('Thông tin ngân hàng')}</p>
                    <Form layout="vertical" className="grid grid-cols-2 gap-x-5">
                        <Form.Item className="mb-3" label={<p className="text-sm">{t('Tên tài khoản')}</p>}>
                            <Input readOnly value={data?.contactBankAccount && !isEmpty(data?.contactBankAccount) ? data?.contactBankAccount : '-'} />
                        </Form.Item>
                        <Form.Item className="mb-3" label={<p className="text-sm">{t('Số tài khoản')}</p>}>
                            <Input readOnly value={data?.contactBankNumber && !isEmpty(data?.contactBankNumber) ? data?.contactBankNumber : '-'} />
                        </Form.Item>
                        <Form.Item className="col-span-2 mb-3" label={<p className="text-sm">{t('Tên ngân hàng - Chi nhánh')}</p>}>
                            <Input readOnly value={data?.contactBankName && !isEmpty(data?.contactBankName) ? data?.contactBankName : '-'} />
                        </Form.Item>
                    </Form>
                </Fragment>
            )}
        </Col>
    );
};
