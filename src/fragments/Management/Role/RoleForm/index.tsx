import { Form } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

import { toastWarning } from '@components/ui/Toast/Toast';
import i18n from '@src/i18n';
import { RoleType } from '@src/types/TypeEnum';

import { useGetRole } from '../hooks/queries';
import { FormDetail } from './components/Form';
import { Header } from './components/Header';
import { ListAction } from './components/ListAction';

interface RoleFormProps {
    type: RoleType;
}

export const RoleForm: React.FC<RoleFormProps> = props => {
    const { type } = props;
    const { roleId } = useParams<string>();
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const [isEnableEdit, setIsEnableEdit] = useState<boolean>(false);
    const [includeGroupIds, setIncludeGroupIds] = useState<string[]>([]);

    const { data } = useGetRole(roleId ?? '');

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
            setIsDirty(false);
        },
        2000,
        { leading: true, trailing: false },
    );

    useEffect(() => {
        if (!isEmpty(data)) {
            const permissions: {
                [key: string]: boolean;
            } = {};

            const agentActive: {
                [key: string]: boolean;
            } = {};

            data?.permissions?.forEach((item: string) => (permissions[item] = true));
            data?.includeGroupIds?.forEach((item: string) => (agentActive[item] = true));

            setIncludeGroupIds(data?.includeGroupIds ?? []);
            form.setFieldsValue({
                ...data,
                permissions: permissions,
                agentActive: agentActive,
            });
        }
    }, [data, form]);

    return (
        <>
            <Header
                type={type}
                listAction={
                    <ListAction
                        onSubmit={onSubmit}
                        isSubmitting={isSubmitting}
                        isEnableEdit={isEnableEdit}
                        isDirty={isDirty}
                        type={type}
                    />
                }
            />
            <div className="h-[calc(100vh_-_177px)] bg-white gap-6">
                <FormDetail
                    form={form}
                    isEnableEdit={isEnableEdit}
                    setIsEnableEdit={setIsEnableEdit}
                    isDirty={isDirty}
                    setIsDirty={setIsDirty}
                    setIsSubmitting={setIsSubmitting}
                    type={type}
                    includeGroupIds={includeGroupIds}
                    setIncludeGroupIds={setIncludeGroupIds}
                />
            </div>
        </>
    );
};
