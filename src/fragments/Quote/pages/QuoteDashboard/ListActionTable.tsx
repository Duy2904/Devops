import { Button, Space } from 'antd';
import { MouseEventHandler, ReactNode } from 'react';

import { ButtonRequestApproveFit } from '@fragments/Quote/components/TourFit/ButtonRequestApproveFit';
import { ButtonRequestApproveGit } from '@fragments/Quote/components/TourGit/ButtonRequestApproveGit';
import Can from '@components/common/Can';
import { DiffOutlined } from '@ant-design/icons';
import { PermissionType } from '@src/types/TypeEnum';
import { TourType } from '@src/types/TypeEnum';
import { getPermission } from '@fragments/Quote/features/getPermission';
import i18n from '@src/i18n';
import { useQuoteStore } from '@fragments/Quote/store/quoteStore';

interface ListActionTableProps {
    isSendRequest: boolean;
    isApproveRequest: boolean;
    quoteId: string;
    setIsOpenConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ButtonProps {
    handleButton: MouseEventHandler<HTMLElement> | undefined;
    icon: ReactNode;
    content: string;
    isLoading: boolean;
}

const ButtonAction: React.FC<ButtonProps> = props => {
    return (
        <Button
            className="!text-xs"
            type="default"
            size="small"
            icon={props.icon}
            onClick={props.handleButton}
            loading={props.isLoading}
        >
            {props.content}
        </Button>
    );
};

export const ListActionTable = (props: ListActionTableProps) => {
    const { isSendRequest, isApproveRequest, quoteId, setIsOpenConfirmationModal } = props;
    // Store
    const { tourType } = useQuoteStore(state => state);

    return (
        <Space className="h-6">
            {isSendRequest && tourType === TourType.GIT && <ButtonRequestApproveGit isSmall quoteId={quoteId} />}
            {isSendRequest && tourType === TourType.FIT && <ButtonRequestApproveFit isSmall quoteId={quoteId} />}
            {isApproveRequest && (
                <Can permissions={getPermission(tourType, [PermissionType.Approve])}>
                    <ButtonAction
                        handleButton={() => setIsOpenConfirmationModal(true)}
                        icon={<DiffOutlined />}
                        content={i18n.t('action.approve')}
                        isLoading={false}
                    />
                </Can>
            )}
        </Space>
    );
};
