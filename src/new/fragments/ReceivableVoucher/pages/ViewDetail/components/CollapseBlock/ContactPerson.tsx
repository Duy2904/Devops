import { ReceivableVoucherDto } from '@sdk/tour-operations';
import { useGetTraveller } from '@src/new/components/customs/PersonContact/usePersonContact';
import { useFetchCustomers } from '@src/new/components/customs/Selects/Customers/useCustomers';
import { Col, Form, Input } from 'antd';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
interface ContactPersonProps {
    data?: ReceivableVoucherDto;
}

export const ContactPerson: React.FC<ContactPersonProps> = ({ data }) => {
    const { t } = useTranslation();
    const { data: fetchCustomer } = useFetchCustomers();
    const { data: dataTravellerDefault } = useGetTraveller(data?.travellerId ?? '');

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
        </Col>
    );
};
