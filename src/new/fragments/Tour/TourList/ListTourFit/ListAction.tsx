import { Button, Space } from 'antd';
import { MouseEventHandler, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

import { ClockCircleOutlined, DiffOutlined, IssuesCloseOutlined } from '@ant-design/icons';
import Can from '@components/common/Can';
import { RequestApproveModal } from '@components/ui/Modal/RequestApproveModal';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { RouteCreateSOFromTourState } from '@fragments/SaleOrders/features';
import { useGetTourScheduleUseCode, useTourFitRequestApprove } from '@fragments/Tour/hooks/useTourFit';
import i18n from '@src/i18n';
import { rootPathsNew } from '@src/routers/newRoute';
import { rootPaths } from '@src/routers/route';
import { TourType } from '@src/types/TypeEnum';
import { useSearchTableStore } from '@store/searchTableStore';
import { useTourScheduleStore } from '@store/tourScheduleStore';
import { MyPermissions } from '@utils/Permissions/index.ts';

interface ListActionProps {
    isShowApprovePopup: boolean;
    isShowRequestApproveButton: boolean;
    isShowBooking: boolean;
    isShowCreateQE?: boolean;
    rowSelected: React.Key[];
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
    const navigate = useNavigate();
    const {
        isShowApprovePopup,
        isShowRequestApproveButton,
        rowSelected,
        isShowBooking,
        isShowCreateQE,
        setIsChangeStatus,
    } = props;
    const { mutateAsync: getTourScheduleCode } = useGetTourScheduleUseCode();
    const { mutateAsync: tourFitRequestApprove, isLoading: loadingFitRequestApprove } = useTourFitRequestApprove();

    const {
        actions: { setTourSchedule },
    } = useTourScheduleStore(state => state);
    const {
        actions: { resetParams },
    } = useSearchTableStore(state => state);

    const enableBooking = async () => {
        const response = await getTourScheduleCode(rowSelected[0]?.toString());
        if (response) {
            setTourSchedule(response);
            navigate(`${rootPathsNew.saleOrderFormDetail}`, {
                state: {
                    createSOFromTourId: rowSelected[0]?.toString(),
                } as RouteCreateSOFromTourState,
            });
            resetParams();
        }
    };

    // handle click Create QE
    const enableCreateQE = async () => {
        const response = await getTourScheduleCode(rowSelected[0]?.toString());
        if (response) {
            setTourSchedule(response);
            navigate(`${rootPaths.quoteFitForm}`);
            resetParams();
        }
    };

    const requestApprove = useDebouncedCallback(async () => {
        const response = await getTourScheduleCode(rowSelected[0]?.toString());
        if (response) {
            const data = { tourScheduleId: rowSelected[0]?.toString() };
            await tourFitRequestApprove({ id: rowSelected[0]?.toString(), data });
            props.setIsChangeStatus(true);
            toastSuccess(i18n.t('message.updateStatus.title'), i18n.t('message.updateStatus.sentApproveSuccess'));
        }
    }, 500);

    return (
        <Space className="h-6">
            {isShowRequestApproveButton && (
                <Can permissions={[MyPermissions.TourFitUpdate]}>
                    <ButtonAction
                        handleButton={requestApprove}
                        icon={<ClockCircleOutlined />}
                        content={i18n.t('action.sentRequest')}
                        isLoading={loadingFitRequestApprove}
                    />
                </Can>
            )}
            {isShowApprovePopup && (
                <Can permissions={[MyPermissions.TourFitApprove]}>
                    <RequestApproveModal
                        dataApprove={rowSelected[0]?.toString()}
                        icon={<IssuesCloseOutlined />}
                        content={i18n.t('action.acceptOpenSale')}
                        setIsChangeStatus={setIsChangeStatus}
                        size="small"
                        tourType={TourType.FIT}
                    />
                </Can>
            )}
            {isShowBooking && (
                <Can permissions={[MyPermissions.SaleOrderCreate, MyPermissions.AgencySaleOrderCreate]}>
                    <ButtonAction
                        handleButton={enableBooking}
                        icon={<DiffOutlined />}
                        content={i18n.t('action.createSO')}
                        isLoading={false}
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
        </Space>
    );
};
