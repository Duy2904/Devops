import { LoadingSubmit } from '@components/customizes/Loading/LoadingSubmit';
import { Col, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from './components/Header';
import { useParams } from 'react-router-dom';
import { useFetchRCDetail } from '../../hooks/useRCDetail';
import { SkeletonPage } from '../../components/SkeletonPage';
import LayoutContentBlock from '@src/new/components/common/LayoutContentBlock';
import { CollapseBlock } from './components/CollapseBlock';
import { useGetCurrencies } from '@src/new/components/customs/Selects/Currency/useCurrencies';
import isEmpty from 'lodash/isEmpty';

export const FormDetailIndex: React.FC = () => {
    const { t } = useTranslation();
    const { recId } = useParams<string>();

    const [infoForm] = Form.useForm();

    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
    const [isEnableEdit, setIsEnableEdit] = useState<boolean>(false);
    const [travellerId, setTravellerId] = useState<string | undefined>();

    const { data, isLoading } = useFetchRCDetail(recId!);
    const { data: dataCurrencies } = useGetCurrencies();

    const onSubmit = async () => {
        let isSuccess = true;

        await infoForm.validateFields().catch(() => {
            isSuccess = false;
        });

        if (isSuccess) {
            infoForm.submit();
        }
    };

    useEffect(() => {
        if (data && isEmpty(infoForm.getFieldValue('id'))) {
            infoForm.setFieldsValue({ ...data });
            !travellerId && setTravellerId(data.travellerId!);
        } else {
            infoForm.setFieldsValue({
                currencyId: dataCurrencies?.data?.find(item => item.name === 'VND')?.id,
            });
        }
    }, [data, dataCurrencies, infoForm, travellerId]);

    if (isLoading) {
        return <SkeletonPage />;
    }

    return (
        <Col className="h-full">
            {loadingSubmit && <LoadingSubmit contentLoading={t('default.processing')} />}
            <Header data={data} handleSubmit={onSubmit} isEnableEdit={isEnableEdit} />
            <LayoutContentBlock className="max-h-[calc(100vh_-_220px)] px-1">
                <CollapseBlock
                    data={data}
                    form={infoForm}
                    travellerId={travellerId}
                    isEnableEdit={isEnableEdit}
                    setIsEnableEdit={setIsEnableEdit}
                    setLoadingSubmit={setLoadingSubmit}
                    setTravellerId={setTravellerId}
                />
            </LayoutContentBlock>
        </Col>
    );
};
