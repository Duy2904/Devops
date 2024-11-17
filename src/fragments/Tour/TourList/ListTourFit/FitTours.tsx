import 'dayjs/locale/vi';

import { ColumnProps, ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { Link, useNavigate } from 'react-router-dom';
import { TourScheduleDto, TourScheduleStatus } from '@sdk/tour-operations';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    useDeleteTourSchedule,
    useGetListTourFit,
    useUpdateTourSheduleCancelStatus,
} from '@fragments/Tour/hooks/useTourFit';

import { AppConfig } from '@utils/config';
import Can from '@components/common/Can';
import { CancelButton } from '@components/customizes/Button/CancelButton';
import { CloneButton } from '@components/customizes/Button/CloneButton';
import { DeleteButton } from '@components/customizes/Button/DeleteButton';
import { DrawerListSO } from './DrawerListSO';
import { Flex } from 'antd';
import Format from '@utils/format';
import { GridTableComponent } from '@components/ui/GridTable';
import { ListAction } from './ListAction';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { RoomListButton } from '@components/customizes/Button/RoomListButton';
import { RouteCloneState } from '@fragments/Tour/TourDetail/TourGit';
import { StaticTag } from '@components/customizes/StaticTag';
import { ViewButton } from '@components/customizes/Button/ViewButton';
import dayjs from 'dayjs';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';
import { setColorStatusTour } from '@utils/colorStatus';
import { toastSuccess } from '@components/ui/Toast/Toast';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { useSearchTableStore } from '@store/searchTableStore';

export const FitTours: React.FC = () => {
    const navigate = useNavigate();
    const hasModifyTourFITPermission = useHasAnyPermission([MyPermissions.TourFitView]);
    const isPermissionOnTour = useHasAnyPermission([
        MyPermissions.TourFitUpdate,
        MyPermissions.TourFitView,
        MyPermissions.AgencyTourFitView,
    ]);
    const tourFormPath = (tourCode: string) => {
        return `${rootPaths.fitTourForm}/${tourCode}`;
    };
    const statusCanCancelTour = [
        TourScheduleStatus.SalesOpen,
        TourScheduleStatus.NoSeatsAvailable,
        TourScheduleStatus.SaleTimeExpired,
    ];
    const [rowSelected, setRowSelected] = useState<React.Key[]>([]);
    const [isChangeStatus, setIsChangeStatus] = useState<boolean>(false);

    const { mutateAsync: deleteTourSchedule } = useDeleteTourSchedule();
    const { mutateAsync: updateTourScheduleCancelStatus } = useUpdateTourSheduleCancelStatus();
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    const { data: listTourFit, isLoading, refetch } = useGetListTourFit(tableParams);
    if (tableParams.pagination) {
        tableParams.pagination.total = listTourFit?.totalCount;
    }

    const code: ColumnProps<TourScheduleDto> = {
        title: i18n.t('tour.tourList.tourCode'),
        dataIndex: 'tourCode',
        key: 'TourCode',
        width: 175,
        fixed: 'left',
        sorter: true,
        render: (value: string) => (
            <Link className="font-medium" to={isPermissionOnTour ? tourFormPath(value ?? '') : '#'}>
                {value}
            </Link>
        ),
    };

    const name: ColumnProps<TourScheduleDto> = {
        title: i18n.t('tour.tourList.tourName'),
        dataIndex: 'name',
        key: 'Name',
        width: 250,
        sorter: true,
        render: (_, record: TourScheduleDto) => <p>{record?.name}</p>,
    };

    const status: ColumnProps<TourScheduleDto> = {
        title: i18n.t('tour.tourList.status'),
        dataIndex: 'status',
        key: 'Status',
        width: 120,
        align: 'center',
        render: (_, record: TourScheduleDto) => (
            <StaticTag
                type={i18n.t(`tour.status.${record.status}`) || ''}
                color={`${setColorStatusTour(record.status ?? '')}`}
            />
        ),
    };

    const trip: ColumnProps<TourScheduleDto> = {
        title: i18n.t('tour.tourDetail.trip'),
        dataIndex: 'departureLocationName',
        key: 'DepartureLocation.name',
        width: 220,
        sorter: true,
        render: (_, record: TourScheduleDto) => (
            <>
                {record.departureLocationName} - {record.destinationLocationName}
            </>
        ),
    };

    const time: ColumnProps<TourScheduleDto> = {
        title: `${i18n.t('tour.tourList.startDate')} - ${i18n.t('tour.tourList.endDate')}`,
        dataIndex: 'departureDate',
        key: 'DepartureDate',
        width: 150,
        sorter: true,
        render: (_, record: TourScheduleDto) => (
            <>
                <p>{dayjs(record.departureDate).format(AppConfig.DateTimeFormat)}</p>
                <p className="pt-1">{dayjs(record.endDate).format(AppConfig.DateTimeFormat)}</p>
            </>
        ),
    };

    const priceTour: ColumnProps<TourScheduleDto> = {
        title: i18n.t('tour.tourList.tourAmount'),
        dataIndex: 'tourAmount',
        key: 'tourAmount',
        width: 150,
        align: 'right',
        render(_, record: TourScheduleDto) {
            const price = record?.tourScheduleFares?.filter(item => item.passengerTypeCode === 'ADT')[0]
                ?.taxInclusivePrice;
            return <>{price ? `${Format.formatNumber(price)}` : ''}</>;
        },
    };

    const capacity: ColumnProps<TourScheduleDto> = {
        title: i18n.t('tour.tourList.totalCapacity'),
        dataIndex: 'capacity',
        key: 'capacity',
        width: 80,
        align: 'right',
        render(_, record: TourScheduleDto) {
            return <p className="font-semibold">{record.capacity}</p>;
        },
    };

    const capacitySaled: ColumnProps<TourScheduleDto> = {
        title: i18n.t('tour.tourList.soldCapacity'),
        dataIndex: 'bookedQuantity',
        key: 'bookedQuantity',
        width: 60,
        align: 'right',
        render(value, record: TourScheduleDto) {
            return value > 0 ? (
                <DrawerListSO
                    typeList="bookedQuantity"
                    tourScheduleId={record.id ?? ''}
                    value={value}
                    record={record}
                    className="text-red-500"
                />
            ) : (
                <p className="text-red-500 font-semibold">{value}</p>
            );
        },
    };

    const keepSeat: ColumnProps<TourScheduleDto> = {
        title: i18n.t('tour.tourList.keepSeat'),
        dataIndex: 'reserveQuantity',
        key: 'reserveQuantity',
        width: 70,
        align: 'right',
        render(value, record: TourScheduleDto) {
            return value > 0 ? (
                <DrawerListSO
                    typeList="reserveQuantity"
                    tourScheduleId={record.id ?? ''}
                    value={value}
                    record={record}
                    className=" text-blue-700"
                />
            ) : (
                <p className="text-blue-500 font-semibold">{value}</p>
            );
        },
    };

    const remaining: ColumnProps<TourScheduleDto> = {
        title: i18n.t('tour.tourList.freeSeat'),
        dataIndex: 'remainingCapacity',
        key: 'remainingCapacity',
        align: 'right',
        width: 80,
        render(_, record: TourScheduleDto) {
            return <p className="font-semibold text-green-500">{record.remainingCapacity}</p>;
        },
    };

    const action: ColumnProps<TourScheduleDto> = {
        title: i18n.t('action.action'),
        key: 'operation',
        fixed: 'right',
        align: 'left',
        width: 120,
        render: (_, record: TourScheduleDto) => (
            <Flex className="flex-wrap" justify="end" gap={9}>
                {!hasModifyTourFITPermission && (
                    <Can permissions={[MyPermissions.TourFitView, MyPermissions.AgencyTourFitView]}>
                        <ViewButton onClick={() => navigate(`${rootPaths.fitTourForm}/${record.tourCode}`)} />
                    </Can>
                )}
                {record.status &&
                    [
                        TourScheduleStatus.SaleTimeExpired,
                        TourScheduleStatus.SalesOpen,
                        TourScheduleStatus.NoSeatsAvailable,
                    ].includes(record.status) && (
                        <Can permissions={[MyPermissions.RoomListView]}>
                            <RoomListButton
                                tooltip={i18n.t('Danh sách phòng')}
                                onClick={() =>
                                    navigate(`${rootPaths.fitTourForm}/${record.tourCode}${rootPaths.roomList}`)
                                }
                            />
                        </Can>
                    )}
                <Can permissions={[MyPermissions.TourFitDelete]}>
                    <>
                        {(record.status === TourScheduleStatus.New ||
                            record.status === TourScheduleStatus.WaitingForApproval) && (
                            <DeleteButton
                                titleName={i18n.t('tour.tourFit')}
                                content={`(${record.tourCode}) ${record.name}`}
                                onOk={async () => {
                                    const res = await deleteTourSchedule(record.id ?? '');
                                    if (res) {
                                        refetch();
                                        toastSuccess(
                                            i18n.t('message.default.deleteContentSuccess'),
                                            `(${record.tourCode}) ${record.name}`,
                                        );
                                    }
                                }}
                            />
                        )}
                    </>
                </Can>
                {statusCanCancelTour.includes(record.status!) && !record.hasTourThienNhien && (
                    <Can permissions={[MyPermissions.TourFitCancel]}>
                        <CancelButton
                            titleName={i18n.t('tour.tourFit')}
                            content={`(${record.tourCode}) ${record.name}`}
                            onOk={async () => {
                                const res = await updateTourScheduleCancelStatus(record.id ?? '');
                                if (res) {
                                    refetch();
                                    toastSuccess(
                                        i18n.t('message.default.cancelContentSuccess'),
                                        `(${record.tourCode}) ${record.name}`,
                                    );
                                }
                            }}
                            tooltip={i18n.t('action.cancel')}
                        />
                    </Can>
                )}
                <Can permissions={[MyPermissions.TourFitCreate]}>
                    <CloneButton
                        tooltip={i18n.t('action.clone')}
                        onClick={() =>
                            navigate(`${rootPaths.fitTourForm}`, {
                                state: {
                                    clonedCode: record.tourCode,
                                } as RouteCloneState,
                            })
                        }
                    />
                </Can>
            </Flex>
        ),
    };

    const commonColumns: ColumnsType<TourScheduleDto> = [
        code,
        name,
        status,
        trip,
        time,
        priceTour,
        capacitySaled,
        keepSeat,
        remaining,
        action,
    ];

    const columnTourFit: ColumnsType<TourScheduleDto> = [...commonColumns];
    if (hasModifyTourFITPermission) {
        columnTourFit.splice(6, 0, capacity);
    }

    const handleTableChange = async (
        pagination: TablePaginationConfig,
        advancedFilter: Record<string, FilterValue | null>,
        sorter: SorterResult<TourScheduleDto> | SorterResult<TourScheduleDto>[],
    ) => {
        setSearchParams({
            ...tableParams,
            pagination,
            advancedFilter,
            sorter,
        });
    };

    const isOnlyOneValueStatus = useCallback(
        (status: TourScheduleStatus) => {
            return (
                listTourFit?.data?.filter(item => item.id && rowSelected.includes(item.id) && item.status === status)
                    .length ?? 0
            );
        },
        [listTourFit?.data, rowSelected],
    );

    useEffect(() => {
        if (isChangeStatus) {
            refetch();
            setIsChangeStatus(false);
        }
    }, [isChangeStatus, refetch]);

    const getTourFitColumns = () =>
        hasModifyTourFITPermission ? columnTourFit : columnTourFit.filter(x => x.key != 'capacity');

    // condition show button action
    const isSelectedOneRow = useMemo(() => rowSelected.length === 1, [rowSelected.length]);
    const isShowApprovePopup = useMemo(
        () => isOnlyOneValueStatus(TourScheduleStatus.WaitingForApproval) === 1,
        [isOnlyOneValueStatus],
    );
    const isShowCreateSOBtn = useMemo(
        () =>
            isOnlyOneValueStatus(TourScheduleStatus.SalesOpen) === 1 ||
            (isOnlyOneValueStatus(TourScheduleStatus.NoSeatsAvailable) === 1 &&
                dayjs(listTourFit?.data?.find(item => item.id == rowSelected[0])?.saleEndDate).isAfter(dayjs())),
        [isOnlyOneValueStatus, listTourFit?.data, rowSelected],
    );
    const isShowRequestApproveButton = useMemo(
        () =>
            isOnlyOneValueStatus(TourScheduleStatus.New) === 1 ||
            isOnlyOneValueStatus(TourScheduleStatus.Rejected) === 1,
        [isOnlyOneValueStatus],
    );
    const isTourAvailableCreateQuote = useMemo(() => {
        let result = true;
        if (rowSelected.length === 1) {
            const id = rowSelected[0];
            const tourDetail = listTourFit?.data?.find(item => item.id === id);
            result = !tourDetail?.hasConfirmedQuote;
        }
        return result;
    }, [listTourFit?.data, rowSelected]);

    return (
        <GridTableComponent
            columns={getTourFitColumns()}
            tableParams={tableParams}
            dataSource={listTourFit?.data}
            onChange={handleTableChange}
            bordered={true}
            scrollX={1000}
            scrollY={window.innerHeight - 455}
            showReport={true}
            loading={isLoading}
            tableName={i18n.t('tour.tourFit')}
            setRowSelected={setRowSelected}
            showAction
            listAction={
                <ListAction
                    isShowRequestApproveButton={isSelectedOneRow && isShowRequestApproveButton}
                    isShowApprovePopup={isSelectedOneRow && isShowApprovePopup}
                    isShowBooking={isSelectedOneRow && isShowCreateSOBtn}
                    isShowCreateQE={isSelectedOneRow && isTourAvailableCreateQuote} // can create with all tour's status, except tour has quote confirmed
                    rowSelected={rowSelected}
                    setIsChangeStatus={setIsChangeStatus}
                />
            }
        />
    );
};
