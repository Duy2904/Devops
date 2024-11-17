import { Col, Form } from 'antd';
import { useEffect, useState } from 'react';

import { ButtonRefundVoucherDetail } from './Button';
import { FormDetail } from './FormDetail';
import { HeadContent } from '@components/ui/HeadContent';
import { HeaderRefundFormComponent } from './HeaderForm';
import { History } from '@fragments/History';
import { LoadingSubmit } from '@components/customizes/Loading/LoadingSubmit';
import { SlugTitle } from './SlugTitle';
import { StatusHeader } from './StatusHeader';
import i18n from '@src/i18n';
import { useGetCurrencies } from '@components/customizes/Select/Currency/useCurrencies';
import { useGetRefund } from '../hook/useRefundVoucher';
import { useParams } from 'react-router-dom';

export const IndexRefundVoucherDetail: React.FC = () => {
    const { refundId } = useParams<string>();
    const [infoForm] = Form.useForm();
    const [personContactForm] = Form.useForm();

    const [submittable, setSubmittable] = useState<boolean>(false);
    const [isEnableApprove, setIsEnableApprove] = useState<boolean>(true);
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
    const [isOpenHistory, setIsOpenHistory] = useState<boolean>(false);

    const { data, isLoading } = useGetRefund(refundId ?? '');
    const { data: dataCurrencies } = useGetCurrencies();
    useEffect(() => {
        if (data) {
            infoForm.setFieldsValue({
                ...data,
            });
        } else {
            infoForm.setFieldsValue({
                currencyId: dataCurrencies?.data?.find(item => item.name === 'VND')?.id,
            });
        }
    }, [data, dataCurrencies, infoForm]);

    return (
        <Col>
            {loadingSubmit && <LoadingSubmit contentLoading={i18n.t('default.processing')} />}
            <HeadContent
                slugContent={<SlugTitle refundId={refundId} />}
                titleContent={
                    <Col>
                        <HeaderRefundFormComponent refundId={refundId} />
                        {data && <StatusHeader voucherStatus={data?.status} setIsOpenHistory={setIsOpenHistory} />}
                    </Col>
                }
                buttonActionList={
                    <ButtonRefundVoucherDetail
                        data={data}
                        submittable={submittable}
                        isEnableApprove={isEnableApprove}
                        infoForm={infoForm}
                        refundId={refundId}
                        personContactForm={personContactForm}
                    />
                }
            />
            <div className="h-[calc(100vh_-_186px)] bg-white gap-6 overflow-auto">
                <FormDetail
                    form={infoForm}
                    refundId={refundId ?? ''}
                    isLoadingData={isLoading}
                    setLoadingSubmit={setLoadingSubmit}
                    setSubmittable={setSubmittable}
                    setIsEnableApprove={setIsEnableApprove}
                    data={data!}
                    personContactForm={personContactForm}
                    submittable={submittable}
                />
            </div>
            {/* Lịch sử thao tác */}
            {refundId && (
                <History
                    tableName="RefundVoucher"
                    title={i18n.t('Lịch sử thao tác')}
                    id={refundId}
                    isOpenHistory={isOpenHistory}
                    setIsOpenHistory={setIsOpenHistory}
                />
            )}
        </Col>
    );
};
