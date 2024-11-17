import { FieldTimeOutlined, SaveOutlined } from '@ant-design/icons';

import { Button } from 'antd';
import Can from '@components/common/Can';
import { ConfirmBackModal } from '@components/ui/Modal/ConfirmBackModal';
import { History } from '@fragments/History';
import { MyPermissions } from '@utils/Permissions';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface ListActionProps {
    isSubmitting: boolean;
    isEnableEdit: boolean;
    branchId?: string;
    onSubmit: () => void;
}

export const ListAction: React.FC<ListActionProps> = props => {
    const { isSubmitting, isEnableEdit, onSubmit, branchId } = props;

    const navigate = useNavigate();

    // State
    const [isOpenConfirmBack, setIsOpenConfirmBack] = useState<boolean>(false);
    const [isOpenHistory, setIsOpenHistory] = useState<boolean>(false);

    const handleClickBackBtn = () => {
        if (isEnableEdit) {
            setIsOpenConfirmBack(true);
        } else {
            handleBack();
        }
    };

    const handleBack = () => {
        navigate(rootPaths.branchList);
    };

    return (
        <>
            <Can permissions={[MyPermissions.BranchCreate, MyPermissions.BranchUpdate]}>
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
            {branchId && (
                <History
                    tableName="BranchDetail"
                    title={i18n.t('Lịch sử thao tác')}
                    id={branchId}
                    isOpenHistory={isOpenHistory}
                    setIsOpenHistory={setIsOpenHistory}
                />
            )}
        </>
    );
};
