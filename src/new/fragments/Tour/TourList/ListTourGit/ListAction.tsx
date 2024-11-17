import { Button, Space } from 'antd';
import { ClockCircleOutlined, DiffOutlined, IssuesCloseOutlined } from '@ant-design/icons';
import { MouseEventHandler, ReactNode } from 'react';
import { useGetTourGitUseCode, useTourGitRequestApprove } from '@fragments/Tour/hooks/useTourGit';

import Can from '@components/common/Can';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { RequestApproveModal } from '@components/ui/Modal/RequestApproveModal';
import { TourType } from '@src/types/TypeEnum';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { useDebouncedCallback } from 'use-debounce';
import { useNavigate } from 'react-router-dom';
import { useSearchTableStore } from '@store/searchTableStore';
import { useTourScheduleStore } from '@store/tourScheduleStore';

interface ListActionProps {
    rowSelected: React.Key[];
    isShowCreateQE?: boolean;
    isShowRequestApproveButton?: boolean;
    isShowApprovePopup?: boolean;
    setIsChangeStatus: React.Dispatch<React.SetStateAction<boolean>>;
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

export const ListAction: React.FC<ListActionProps> = props => {
    const { rowSelected, isShowCreateQE, isShowRequestApproveButton, isShowApprovePopup, setIsChangeStatus } = props;

    const navigate = useNavigate();
    const { mutateAsync: getTourGitCode } = useGetTourGitUseCode();
    const { mutateAsync: tourGitRequestApprove, isLoading: loadingGitRequestApprove } = useTourGitRequestApprove();

    const {
        actions: { setTourSchedule },
    } = useTourScheduleStore(state => state);
    const {
        actions: { resetParams },
    } = useSearchTableStore(state => state);

    // handle click Create QE
    const enableCreateQE = async () => {
        const response = await getTourGitCode(rowSelected[0]?.toString());
        if (response) {
            setTourSchedule(response);
            navigate(`${rootPaths.quoteGitForm}`);
            resetParams();
        }
    };

    // request approval
    const requestApprove = useDebouncedCallback(async () => {
        const dataRequest = rowSelected.map(item => {
            const dataObj = {
                id: item?.toString(),
                data: {
                    tourScheduleId: item?.toString(),
                },
            };
            return tourGitRequestApprove(dataObj);
        });
        await Promise.all(dataRequest);
        toastSuccess(i18n.t('message.updateStatus.title'), i18n.t('message.updateStatus.sentApproveSuccess'));
    }, 500);

    return (
        <Space className="h-6">
            {isShowApprovePopup && (
                <Can permissions={[MyPermissions.TourGitApprove]}>
                    <RequestApproveModal
                        dataApprove={rowSelected[0]?.toString()}
                        icon={<IssuesCloseOutlined />}
                        content={i18n.t('action.acceptOpenSale')}
                        setIsChangeStatus={setIsChangeStatus}
                        size="small"
                        tourType={TourType.GIT}
                    />
                </Can>
            )}
            {isShowCreateQE && (
                <Can permissions={[MyPermissions.QuoteCreate]}>
                    <ButtonAction
                        handleButton={enableCreateQE}
                        icon={<DiffOutlined />}
                        content={i18n.t('action.createQE')}
                        isLoading={false}
                    />
                </Can>
            )}
            {isShowRequestApproveButton && (
                <Can permissions={[MyPermissions.TourFitUpdate]}>
                    <ButtonAction
                        handleButton={requestApprove}
                        icon={<ClockCircleOutlined />}
                        content={i18n.t('action.sentRequest')}
                        isLoading={loadingGitRequestApprove}
                    />
                </Can>
            )}
        </Space>
    );
};
