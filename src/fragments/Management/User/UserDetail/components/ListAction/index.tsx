import { FieldTimeOutlined, SaveOutlined } from '@ant-design/icons';

import { Button } from 'antd';
import Can from '@components/common/Can';
import { ConfirmBackModal } from '@components/ui/Modal/ConfirmBackModal';
import { MyPermissions } from '@utils/Permissions';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface ListActionProps {
    loadingSubmit: boolean;
    isEnableEdit: boolean;
    isOwner?: boolean;
    userId?: string;
    onSubmit: () => void;
    setIsOpenHistory: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ListAction: React.FC<ListActionProps> = props => {
    const { loadingSubmit, isEnableEdit, isOwner, userId, onSubmit, setIsOpenHistory } = props;

    const navigate = useNavigate();

    // State
    const [isOpenConfirmBack, setIsOpenConfirmBack] = useState<boolean>(false);

    const handleClickBackBtn = () => {
        if (isEnableEdit) {
            setIsOpenConfirmBack(true);
        } else {
            handleBack();
        }
    };

    const handleBack = () => {
        navigate(isOwner ? rootPaths.userOwnerList : rootPaths.userList);
    };

    return (
        <>
            <div className="flex flex-wrap gap-2">
                <Can
                    permissions={[
                        MyPermissions.OwnerAccountCreate,
                        MyPermissions.OwnerAccountUpdate,
                        MyPermissions.AgentAccountCreate,
                        MyPermissions.AgentAccountUpdate,
                    ]}
                >
                    <Button
                        className="text-xs"
                        type="primary"
                        icon={<SaveOutlined />}
                        onClick={onSubmit}
                        loading={loadingSubmit}
                        disabled={!isEnableEdit}
                    >
                        {i18n.t(`action.save`)}
                    </Button>
                </Can>
                {userId && (
                    <Button className="text-xs" icon={<FieldTimeOutlined />} onClick={() => setIsOpenHistory(true)}>
                        {i18n.t('Lịch sử')}
                    </Button>
                )}
                <Button className="text-xs" onClick={handleClickBackBtn}>
                    {i18n.t(`action.back`)}
                </Button>
            </div>
            <ConfirmBackModal
                title={i18n.t(`quote.modal.backModal.title`)}
                content={i18n.t(`quote.modal.backModal.content`)}
                isOpenModal={isOpenConfirmBack}
                setIsModalOpen={setIsOpenConfirmBack}
                handleBack={handleBack}
            />
        </>
    );
};
