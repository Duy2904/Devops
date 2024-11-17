import { Col, Form } from 'antd';
import { useEffect, useState } from 'react';

import { ButtonReceivableVoucherDetail } from './Button';
import { FormDetail } from './FormDetail';
import { HeadContent } from '@components/ui/HeadContent';
import { HeaderReceiptFormComponent } from './HeaderForm';
import { History } from '@fragments/History';
import { LoadingSubmit } from '@components/customizes/Loading/LoadingSubmit';
import { SlugTitle } from './SlugTitle';
import { StatusHeader } from './StatusHeader';
import i18n from '@src/i18n';
import { useGetCurrencies } from '@components/customizes/Select/Currency/useCurrencies';
import { useGetReceivable } from '../hook/useReceivableVoucher';
import { useParams } from 'react-router-dom';

export const IndexReceivableVoucherDetail: React.FC = () => {
    const { recId } = useParams<string>();
    const [infoForm] = Form.useForm();
    const [personContactForm] = Form.useForm();

    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
    const [isOpenHistory, setIsOpenHistory] = useState<boolean>(false);
    const [submittable, setSubmittable] = useState<boolean>(false);

    const { data, isLoading } = useGetReceivable(recId ?? '');
    const { data: dataCurrencies } = useGetCurrencies();

    useEffect(() => {
        if (data) {
            infoForm.setFieldsValue({ ...data });
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
                slugContent={<SlugTitle recId={recId} />}
                titleContent={
                    <Col>
                        <HeaderReceiptFormComponent recId={recId} />
                        {data && <StatusHeader voucherStatus={data?.status} setIsOpenHistory={setIsOpenHistory} />}
                    </Col>
                }
                buttonActionList={
                    <ButtonReceivableVoucherDetail
                        infoForm={infoForm}
                        personContactForm={personContactForm}
                        recId={recId}
                        submittable={submittable}
                    />
                }
            />
            <div className="h-[calc(100vh_-_186px)] bg-white gap-6 overflow-auto">
                {/* Thông tin chung */}
                <FormDetail
                    form={infoForm}
                    personContactForm={personContactForm}
                    recId={recId ?? ''}
                    data={data!}
                    isLoadingData={isLoading}
                    setLoadingSubmit={setLoadingSubmit}
                    setSubmittable={setSubmittable}
                    submittable={submittable}
                />
            </div>
            {/* Lịch sử thao tác */}
            {recId && (
                <History
                    tableName="ReceivableVoucher"
                    title={i18n.t('Lịch sử thao tác')}
                    id={recId}
                    isOpenHistory={isOpenHistory}
                    setIsOpenHistory={setIsOpenHistory}
                />
            )}
        </Col>
    );
};
