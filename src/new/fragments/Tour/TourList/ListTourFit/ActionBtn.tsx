import { SetStateAction, useMemo } from 'react';
import { TourScheduleDto, TourScheduleStatus, TourSearchFitDto } from '@sdk/tour-operations';
import {
    useDeleteTourSchedule,
    useGetTourScheduleUseCode,
    useTourFitRequestApprove,
    useUpdateTourSheduleCancelStatus,
} from '../../hooks/useTourFit';

import Can from '@src/new/components/common/Can';
import { CancelButton } from '@src/new/components/customs/Buttons/CancelButton';
import { CloneButton } from '@src/new/components/customs/Buttons/CloneButton';
import { CreateQuoteBtn } from '@src/new/components/customs/Buttons/CreateQuoteBtn';
import { CreateSOFromTour } from '@src/new/components/customs/Buttons/CreateSOFromTour';
import { DeleteButton } from '@src/new/components/customs/Buttons/DeleteButton';
import { Flex } from 'antd';
import { MyPermissions } from '@src/new/shared/utils/Permissions';
import { RequestApproveBtn } from '@src/new/components/customs/Buttons/RequestApproveBtn';
import { RequestApproveModal } from '../Modal/RequestApproveModal';
import { RoomListBtn } from '@src/new/components/customs/Buttons/RoomListBtn';
import { RouteCloneState } from '@fragments/Tour/TourDetail/TourGit';
import { RouteCreateSOFromTourState } from '@src/new/fragments/SaleOrders/features';
import { TourType } from '@src/types/TypeEnum';
import dayjs from 'dayjs';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';
import { rootPathsNew } from '@src/routers/newRoute';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { useDebouncedCallback } from 'use-debounce';
import { useNavigate } from 'react-router-dom';
import { useSearchTableStore } from '@store/searchTableStore';
import { useTourScheduleStore } from '@store/tourScheduleStore';

interface ActionBtnProps {
    data: TourSearchFitDto | TourScheduleDto;
    refetchList: () => void;
    // eslint-disable-next-line no-unused-vars
    setIsChangeStatus: (value: SetStateAction<boolean>) => void;
}

export const ActionBtn: React.FC<ActionBtnProps> = props => {
    const { data, refetchList, setIsChangeStatus } = props;
    const navigate = useNavigate();

    const { mutateAsync: getTourScheduleCode } = useGetTourScheduleUseCode();
    const { mutateAsync: updateTourScheduleCancelStatus } = useUpdateTourSheduleCancelStatus();
    const { mutateAsync: deleteTourSchedule } = useDeleteTourSchedule();
    const { mutateAsync: tourFitRequestApprove, isLoading: loadingFitRequestApprove } = useTourFitRequestApprove();

    const {
        actions: { setTourSchedule },
    } = useTourScheduleStore(state => state);
    const {
        actions: { resetParams },
    } = useSearchTableStore(state => state);

    const id = data?.id ?? ';';
    const statusCanCancelTour = [
        TourScheduleStatus.SalesOpen,
        TourScheduleStatus.NoSeatsAvailable,
        TourScheduleStatus.SaleTimeExpired,
    ];
    const isShowApprovePopup = useMemo(() => data.status === TourScheduleStatus.WaitingForApproval, [data.status]);
    const isShowCreateSOBtn = useMemo(
        () =>
            data.status === TourScheduleStatus.SalesOpen ||
            (data.status === TourScheduleStatus.NoSeatsAvailable &&
                dayjs(data?.saleEndDate).isAfter(dayjs()) &&
                !data?.hasTourThienNhien),
        [data?.hasTourThienNhien, data?.saleEndDate, data.status],
    );

    const isShowRequestApproveButton = useMemo(
        () => data.status === TourScheduleStatus.New || data.status === TourScheduleStatus.Rejected,
        [data.status],
    );

    const isTourAvailableCreateQuote = useMemo(() => {
        return !(data as TourSearchFitDto)?.hasConfirmedQuote;
    }, [data]);

    // handle click Create QE
    const enableCreateQE = async () => {
        const response = await getTourScheduleCode(id);
        if (response) {
            setTourSchedule(response);
            navigate(`${rootPaths.quoteFitForm}`);
            resetParams();
        }
    };

    const enableBooking = async () => {
        const response = await getTourScheduleCode(id);
        if (response) {
            setTourSchedule(response);
            navigate(`${rootPathsNew.saleOrderFormDetail}`, {
                state: {
                    createSOFromTourId: id,
                } as RouteCreateSOFromTourState,
            });
            resetParams();
        }
    };

    const requestApprove = useDebouncedCallback(async () => {
        const response = await getTourScheduleCode(data.id ?? '');
        if (response) {
            const data = { tourScheduleId: id };
            await tourFitRequestApprove({ id: id, data });
            setIsChangeStatus(true);
            toastSuccess(i18n.t('message.updateStatus.title'), i18n.t('message.updateStatus.sentApproveSuccess'));
        }
    }, 500);

    return (
        <Flex className="flex-wrap" justify="end" gap={9}>
            {isShowCreateSOBtn && (
                <Can permissions={[MyPermissions.SaleOrderCreate, MyPermissions.AgencySaleOrderCreate]}>
                    <CreateSOFromTour onClick={enableBooking} isSmall />
                </Can>
            )}
            {isShowRequestApproveButton && (
                <Can permissions={[MyPermissions.TourFitUpdate]}>
                    <RequestApproveBtn onClick={requestApprove} disabled={loadingFitRequestApprove} isSmall />
                </Can>
            )}
            {isShowApprovePopup && (
                <Can permissions={[MyPermissions.TourFitApprove]}>
                    <RequestApproveModal
                        dataApprove={id}
                        setIsChangeStatus={setIsChangeStatus}
                        isSmall
                        tourType={TourType.FIT}
                    />
                </Can>
            )}
            {data.status &&
                [
                    TourScheduleStatus.SaleTimeExpired,
                    TourScheduleStatus.SalesOpen,
                    TourScheduleStatus.NoSeatsAvailable,
                ].includes(data.status) && (
                    <Can permissions={[MyPermissions.RoomListView]}>
                        <RoomListBtn
                            isSmall
                            onClick={() => navigate(`${rootPaths.fitTourForm}/${data.tourCode}${rootPaths.roomList}`)}
                        />
                    </Can>
                )}
            <Can permissions={[MyPermissions.TourFitCreate]}>
                <CloneButton
                    tooltip={i18n.t('action.clone')}
                    onClick={() =>
                        navigate(`${rootPaths.fitTourForm}`, {
                            state: {
                                clonedCode: data.tourCode,
                            } as RouteCloneState,
                        })
                    }
                />
            </Can>
            {isTourAvailableCreateQuote && (
                <Can permissions={[MyPermissions.QuoteCreate]}>
                    <CreateQuoteBtn onClick={enableCreateQE} isSmall />
                </Can>
            )}
            {statusCanCancelTour.includes(data.status!) && !data.hasTourThienNhien && (
                <Can permissions={[MyPermissions.TourFitCancel]}>
                    <CancelButton
                        titleName={i18n.t('tour.tourFit')}
                        content={`(${data.tourCode}) ${data.name}`}
                        onOk={async () => {
                            const res = await updateTourScheduleCancelStatus(data.id ?? '');
                            if (res) {
                                refetchList();
                                toastSuccess(
                                    i18n.t('message.default.cancelContentSuccess'),
                                    `(${data.tourCode}) ${data.name}`,
                                );
                            }
                        }}
                        tooltip={i18n.t('action.cancel')}
                    />
                </Can>
            )}
            <Can permissions={[MyPermissions.TourFitDelete]}>
                <>
                    {(data.status === TourScheduleStatus.New ||
                        data.status === TourScheduleStatus.WaitingForApproval) && (
                            <DeleteButton
                                titleName={i18n.t('tour.tourFit')}
                                content={`(${data.tourCode}) ${data.name}`}
                                onOk={async () => {
                                    const res = await deleteTourSchedule(data.id ?? '');
                                    if (res) {
                                        refetchList();
                                        toastSuccess(
                                            i18n.t('message.default.deleteContentSuccess'),
                                            `(${data.tourCode}) ${data.name}`,
                                        );
                                    }
                                }}
                            />
                        )}
                </>
            </Can>
        </Flex>
    );
};
