import { ExclamationCircleOutlined, FieldTimeOutlined, SaveOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from 'antd';
import Can from '@components/common/Can';
import { ConfirmBackModal } from '@components/ui/Modal/ConfirmBackModal';
import { History } from '@fragments/History';
import { MyPermissions } from '@utils/Permissions';
import { RoleType } from '@src/types/TypeEnum';
import { getURLListNavigate } from '@fragments/Management/Role/features';
import i18n from '@src/i18n';
import modal from 'antd/es/modal';
import { useGetRole } from '@fragments/Management/Role/hooks/queries';
import { useState } from 'react';

interface ListActionProps {
    isSubmitting: boolean;
    isEnableEdit: boolean;
    isDirty: boolean;
    type: RoleType;
    onSubmit: () => void;
}

export const ListAction: React.FC<ListActionProps> = props => {
    const { isSubmitting, onSubmit, isEnableEdit, isDirty, type } = props;
    const { roleId } = useParams<string>();
    const navigate = useNavigate();

    const { data: dataRole } = useGetRole(roleId ?? '');

    // State
    const [isOpenConfirmBack, setIsOpenConfirmBack] = useState<boolean>(false);
    const [isOpenHistory, setIsOpenHistory] = useState<boolean>(false);

    const handleClickBackBtn = () => {
        if (isDirty) {
            modal.confirm({
                title: `${i18n.t('message.default.warning')}`,
                icon: <ExclamationCircleOutlined />,
                content: i18n.t('Bạn chưa lưu dữ liệu, bạn có muốn thoát không?'),
                cancelText: i18n.t('action.back'),
                onOk: () => {
                    handleBack();
                },
            });
        } else {
            handleBack();
        }
    };

    const handleBack = () => {
        navigate(getURLListNavigate(type));
    };

    const needPermissions =
        type === RoleType.Company
            ? [roleId ? MyPermissions.OwnerRoleUpdate : MyPermissions.OwnerRoleCreate]
            : [roleId ? MyPermissions.AgentRoleUpdate : MyPermissions.AgentRoleCreate];

    return (
        <>
            {!dataRole?.isSystemDefault && (
                <Can permissions={needPermissions}>
                    <Button
                        className="text-xs"
                        type="primary"
                        icon={<SaveOutlined />}
                        onClick={onSubmit}
                        loading={isSubmitting}
                        disabled={!isEnableEdit}
                    >
                        {i18n.t(`action.save`)}
                    </Button>
                </Can>
            )}
            <Button className="text-xs" icon={<FieldTimeOutlined />} onClick={() => setIsOpenHistory(true)}>
                {i18n.t('Lịch sử')}
            </Button>
            <Button className="text-xs" onClick={handleClickBackBtn}>
                {i18n.t(`action.back`)}
            </Button>
            <ConfirmBackModal
                title={i18n.t(`quote.modal.backModal.title`)}
                content={i18n.t(`quote.modal.backModal.content`)}
                isOpenModal={isOpenConfirmBack}
                setIsModalOpen={setIsOpenConfirmBack}
                handleBack={handleBack}
            />
            {/* Lịch sử thao tác */}
            {roleId && (
                <History
                    tableName="RoleDetail"
                    title={i18n.t('Lịch sử thao tác')}
                    id={roleId}
                    isOpenHistory={isOpenHistory}
                    setIsOpenHistory={setIsOpenHistory}
                />
            )}
        </>
    );
};
