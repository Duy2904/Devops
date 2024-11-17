import { Col, Form } from 'antd';
import { useEffect, useState } from 'react';

import { AgentManagementFormDetail } from './FormDetail';
import { ButtonAgentManagementForm } from './components/Button';
import { HeadContent } from '@components/ui/HeadContent';
import { HeaderAgentManagementForm } from './components/Header';
import { History } from '@fragments/History';
import { LoadingSubmit } from '@components/customizes/Loading/LoadingSubmit';
import { TitleHeader } from '@components/ui/TitleHeader';
import dayjs from 'dayjs';
import i18n from '@src/i18n';
import isEmpty from 'lodash/isEmpty';
import { useFetchPersonalIdentityInfo } from '@hooks/identity-next/queries/usePersonal';
import { useGetGroupAgent } from '@hooks/identity-next/queries/useGroup';

export const AgentDetail: React.FC = () => {
    const [form] = Form.useForm();
    const [formPaymentLimit] = Form.useForm();

    const [submittable, setSubmittable] = useState<boolean>(false);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const [isEnableEdit, setIsEnableEdit] = useState<boolean>(false);
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
    const [isOpenHistory, setIsOpenHistory] = useState<boolean>(false);

    // Store
    const { data: personInfo } = useFetchPersonalIdentityInfo();
    const agentId = personInfo?.groups?.[0]?.groupId ?? '';
    // Query
    const { data } = useGetGroupAgent(agentId);

    useEffect(() => {
        if (!isEmpty(data)) {
            const permissions: {
                [key: string]: boolean;
            } = {};

            data?.permissions?.forEach((item: string) => (permissions[item] = true));

            form.setFieldsValue({
                ...data,
                effectiveDate: data?.effectiveDate && dayjs(data?.effectiveDate),
                expirationDate: data?.expirationDate && dayjs(data?.expirationDate),
                permissions: permissions,
            });
        }
    }, [data, form]);

    return (
        <Col className="relative">
            {loadingSubmit && <LoadingSubmit contentLoading={i18n.t('default.processing')} />}
            <HeadContent
                slugContent={<HeaderAgentManagementForm agentId={agentId} />}
                titleContent={
                    <TitleHeader
                        title={
                            agentId
                                ? `${i18n.t('action.edit')} ${i18n.t('menu.agent')}`
                                : `${i18n.t('action.create')} ${i18n.t('menu.agent')}`
                        }
                    />
                }
                buttonActionList={
                    <ButtonAgentManagementForm
                        form={form}
                        agentId={agentId}
                        submittable={submittable}
                        isEnableEdit={isEnableEdit}
                        setIsOpenHistory={setIsOpenHistory}
                    />
                }
            />
            {/* Thông tin chung */}
            <AgentManagementFormDetail
                form={form}
                formPaymentLimit={formPaymentLimit}
                agentId={agentId}
                setSubmittable={setSubmittable}
                isEnableEdit={isEnableEdit}
                setIsEnableEdit={setIsEnableEdit}
                isDirty={isDirty}
                setIsDirty={setIsDirty}
                setLoadingSubmit={setLoadingSubmit}
                data={data}
            />
            {/* Lịch sử thao tác */}
            {agentId && (
                <History
                    tableName="AgentDetail"
                    title={i18n.t('Lịch sử thao tác')}
                    id={agentId}
                    isOpenHistory={isOpenHistory}
                    setIsOpenHistory={setIsOpenHistory}
                />
            )}
        </Col>
    );
};
