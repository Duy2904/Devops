import { Col, Form } from 'antd';

import { FormDetail } from './components/Form';
import { HeadContent } from '@components/ui/HeadContent';
import { Header } from './components/Header';
import { History } from '@fragments/History';
import { ListAction } from './components/ListAction';
import { LoadingSubmit } from '@components/customizes/Loading/LoadingSubmit';
import { TitleHeader } from '@components/ui/TitleHeader';
import i18n from '@src/i18n';
import { useDebouncedCallback } from 'use-debounce';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface UserDetailProps {
    isOwner?: boolean;
}

export const UserDetail: React.FC<UserDetailProps> = props => {
    const { isOwner } = props;
    const { userId } = useParams<string>();
    const { t } = useTranslation();
    const [form] = Form.useForm();

    const [isEnableEdit, setIsEnableEdit] = useState<boolean>(false);
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
    const [isOpenHistory, setIsOpenHistory] = useState<boolean>(false);

    const onSubmit = useDebouncedCallback(
        () => {
            form.submit();
        },
        2000,
        { leading: true, trailing: false },
    );

    return (
        <Col className="relative">
            {loadingSubmit && <LoadingSubmit contentLoading={t('default.processing')} />}
            <HeadContent
                slugContent={<Header />}
                titleContent={
                    <TitleHeader
                        title={
                            userId
                                ? `${i18n.t('action.edit')} ${i18n.t('menu.account')}`
                                : `${i18n.t('action.create')} ${i18n.t('menu.account')}`
                        }
                    />
                }
                buttonActionList={
                    <ListAction
                        onSubmit={onSubmit}
                        loadingSubmit={loadingSubmit}
                        isEnableEdit={isEnableEdit}
                        isOwner={isOwner}
                        userId={userId}
                        setIsOpenHistory={setIsOpenHistory}
                    />
                }
            />
            <FormDetail
                form={form}
                setIsEnableEdit={setIsEnableEdit}
                setLoadingSubmit={setLoadingSubmit}
                isOwner={isOwner}
                userId={userId}
            />
            {/* Lịch sử thao tác */}
            {userId && (
                <History
                    tableName="UserDetail"
                    title={i18n.t('Lịch sử thao tác')}
                    id={userId}
                    isOpenHistory={isOpenHistory}
                    setIsOpenHistory={setIsOpenHistory}
                />
            )}
        </Col>
    );
};
