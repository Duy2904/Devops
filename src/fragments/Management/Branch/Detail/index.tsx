import { Col, Form } from 'antd';
import { useEffect, useState } from 'react';

import { FormDetail } from './components/Form';
import { HeadContent } from '@components/ui/HeadContent';
import { Header } from './components/Header';
import { ListAction } from './components/ListAction';
import { LoadingSubmit } from '@components/customizes/Loading/LoadingSubmit';
import { TitleHeader } from '@components/ui/TitleHeader';
import i18n from '@src/i18n';
import { toastWarning } from '@components/ui/Toast/Toast';
import { useDebouncedCallback } from 'use-debounce';
import { useFetchBranchDetail } from '@hooks/identity-next/queries/useBranch';
import { useParams } from 'react-router-dom';

export const BranchDetailIndex: React.FC = () => {
    const { branchId } = useParams<string>();
    const [form] = Form.useForm();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isEnableEdit, setIsEnableEdit] = useState<boolean>(false);
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

    const { data: fetchDetail } = useFetchBranchDetail(branchId!);

    const onSubmit = useDebouncedCallback(
        () => {
            form.validateFields({ validateOnly: true }).then(
                () => {
                    form.submit();
                },
                () => {
                    form.submit();
                    toastWarning(i18n.t('message.default.warning'), i18n.t('validation.default.validDefault'));
                },
            );
        },
        2000,
        { leading: true, trailing: false },
    );

    useEffect(() => {
        if (fetchDetail) {
            form.setFieldsValue(fetchDetail);
        }
    }, [fetchDetail, form]);

    return (
        <Col className="relative">
            {loadingSubmit && <LoadingSubmit contentLoading={i18n.t('default.processing')} />}
            <HeadContent
                slugContent={<Header branchId={branchId} />}
                titleContent={
                    <TitleHeader
                        title={
                            branchId
                                ? `${i18n.t('action.edit')} ${i18n.t('menu.branch')}`
                                : `${i18n.t('action.create')} ${i18n.t('menu.branch')}`
                        }
                    />
                }
                buttonActionList={
                    <ListAction
                        onSubmit={onSubmit}
                        isSubmitting={isSubmitting}
                        isEnableEdit={isEnableEdit}
                        branchId={branchId}
                    />
                }
            />

            {/* Thông tin chung */}
            <FormDetail
                form={form}
                isEnableEdit={isEnableEdit}
                setIsEnableEdit={setIsEnableEdit}
                branchId={branchId}
                setIsSubmitting={setIsSubmitting}
                setLoadingSubmit={setLoadingSubmit}
                dataBranch={fetchDetail}
            />
        </Col>
    );
};
