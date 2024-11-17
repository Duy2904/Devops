import { ButtonDocumentReceiptDetail } from './Button';
import { Form } from 'antd';
import { FormDetail } from './FormDetail';
import { HeaderDocumentReceiptForm } from './HeaderForm';
import { History } from '@fragments/History';
import { LoadingSubmit } from '@components/customizes/Loading/LoadingSubmit';
import { StatusHeader } from './StatusHeader';
import i18n from '@src/i18n';
import { useFetchDocumentReceiptVisaDetail } from '../hook/useDocumentReceiptVisa';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSaleOrderStore } from '@store/saleOrderStore';

export const IndexDocumentReceiptDetail: React.FC = () => {
    const { documentReceiptId } = useParams<string>();
    const [infoForm] = Form.useForm();

    const [submittable, setSubmittable] = useState<boolean>(false);
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
    const [isOpenHistory, setIsOpenHistory] = useState<boolean>(false);

    const { data } = useFetchDocumentReceiptVisaDetail(documentReceiptId!);
    const { actions: { setItemReceivable } } = useSaleOrderStore(state => state);

    useEffect(() => {
        if (documentReceiptId) {
            setItemReceivable({ orderData: {} })
        }
    }, [documentReceiptId, setItemReceivable])

    return (
        <div className="relative">
            {loadingSubmit && <LoadingSubmit contentLoading={i18n.t('default.processing')} />}
            <HeaderDocumentReceiptForm
                documentReceiptId={documentReceiptId}
                statusHeader={
                    data && (
                        <StatusHeader
                            documentReceiptStatus={data?.tourVisaStatus}
                            setIsOpenHistory={setIsOpenHistory}
                        />
                    )
                }
                buttonList={
                    <ButtonDocumentReceiptDetail
                        infoForm={infoForm}
                        documentReceiptId={documentReceiptId}
                        submittable={submittable}
                        data={data}
                    />
                }
            />
            <div className="h-[calc(100vh_-_186px)] bg-white gap-6 pb-10 overflow-auto">
                {/* Thông tin chung */}
                <FormDetail
                    form={infoForm}
                    documentReceiptId={documentReceiptId ?? ''}
                    data={data!}
                    setSubmittable={setSubmittable}
                    setLoadingSubmit={setLoadingSubmit}
                    submittable={submittable}
                />
            </div>
            {/* Lịch sử thao tác */}
            {documentReceiptId && (
                <History
                    tableName="TourVisa"
                    title={i18n.t('Lịch sử thao tác')}
                    id={documentReceiptId}
                    isOpenHistory={isOpenHistory}
                    setIsOpenHistory={setIsOpenHistory}
                />
            )}
        </div>
    );
};
