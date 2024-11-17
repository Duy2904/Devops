import 'dayjs/locale/vi';

import { ColumnProps, ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { Link, useNavigate } from 'react-router-dom';
import { TourGitDto, TourScheduleStatus } from '@sdk/tour-operations';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDeleteTourGit, useGetListTourGit } from '@fragments/Tour/hooks/useTourGit';

import { AnyObject } from 'antd/es/_util/type';
import { AppConfig } from '@utils/config';
import Can from '@components/common/Can';
import { CloneButton } from '@components/customizes/Button/CloneButton';
import { DeleteButton } from '@components/customizes/Button/DeleteButton';
import { Flex } from 'antd';
import { GridTableComponent } from '@components/ui/GridTable';
import { ListAction } from './ListAction';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { RouteCloneState } from '@fragments/Tour/TourDetail/TourGit';
import { StaticTag } from '@components/customizes/StaticTag';
import dayjs from 'dayjs';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';
import { setColorStatusTour } from '@utils/colorStatus';
import { toastSuccess } from '@components/ui/Toast/Toast';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { useSearchTableStore } from '@store/searchTableStore';

export const GitTours: React.FC = () => {
    const navigate = useNavigate();
    const isPermissionOnTour = useHasAnyPermission([MyPermissions.TourGitView]);
    const tourFormPath = (tourCode: string) => {
        return `${rootPaths.gitTourForm}/${tourCode}`;
    };

    const [rowSelected, setRowSelected] = useState<React.Key[]>([]);
    const [isChangeStatus, setIsChangeStatus] = useState<boolean>(false);

    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    const { mutateAsync: deleteTourGit } = useDeleteTourGit();
    const { data: listTourGit, isLoading, refetch } = useGetListTourGit(tableParams);
    if (tableParams.pagination) {
        tableParams.pagination.total = listTourGit?.totalCount;
    }

    const code: ColumnProps<TourGitDto> = {
        title: i18n.t('tour.tourList.tourCode'),
        dataIndex: 'tourCode',
        key: 'TourCode',
        width: 150,
        fixed: 'left',
        sorter: true,
        render: (value: string) => (
            <Link className="font-medium" to={isPermissionOnTour ? tourFormPath(value ?? '') : '#'}>
                {value}
            </Link>
        ),
    };

    const name: ColumnProps<TourGitDto> = {
        title: i18n.t('tour.tourList.tourName'),
        dataIndex: 'name',
        key: 'Name',
        width: 250,
        sorter: true,
        render: (_, record: TourGitDto) => <p>{record?.name}</p>,
    };

    const status: ColumnProps<TourGitDto> = {
        title: i18n.t('tour.tourList.status'),
        dataIndex: 'status',
        key: 'Status',
        width: 120,
        align: 'center',
        render: (_, record: TourGitDto) => (
            <StaticTag
                type={i18n.t(`tour.status.${record.status}`) || ''}
                color={`${setColorStatusTour(record.status ?? '')}`}
            />
        ),
    };

    const tourCategoryName: ColumnProps<TourGitDto> = {
        title: i18n.t('tour.tourList.category'),
        dataIndex: 'tourCategoryName',
        key: 'TourCategory.name',
        width: 130,
        sorter: true,
    };

    const trip: ColumnProps<TourGitDto> = {
        title: i18n.t('tour.tourDetail.trip'),
        dataIndex: 'departureLocationName',
        key: 'DepartureLocation.name',
        width: 220,
        sorter: true,
        render: (_, record: TourGitDto) => (
            <>
                {record.departureLocationName} - {record.destinationLocationName}
            </>
        ),
    };

    const customer: ColumnProps<TourGitDto> = {
        title: i18n.t('tour.tourList.customerType'),
        dataIndex: 'customerName',
        key: 'Customer.name',
        width: 200,
        sorter: true,
        render: (_, record: TourGitDto) => (
            <p>
                {record.customerCustomerNo} - {record.customerName}
            </p>
        ),
    };

    const time: ColumnProps<TourGitDto> = {
        title: `${i18n.t('tour.tourList.startDate')} - ${i18n.t('tour.tourList.endDate')}`,
        dataIndex: 'departureDate',
        key: 'DepartureDate',
        width: 150,
        sorter: true,
        render: (_, record: TourGitDto) => (
            <>
                <p>{dayjs(record.departureDate).format(AppConfig.DateFormat)}</p>
                <p className="pt-1">{dayjs(record.endDate).format(AppConfig.DateFormat)}</p>
            </>
        ),
    };

    const capacity: ColumnProps<TourGitDto> = {
        title: i18n.t('tour.tourList.totalQuantity'),
        dataIndex: 'capacity',
        key: 'capacity',
        width: 80,
        align: 'right',
        render(_, record: TourGitDto) {
            return (
                <p className="font-semibold">
                    {record?.passengerTypeSeats?.reduce((acc, passenger) => acc + (passenger?.seatCount ?? 0), 0)}
                </p>
            );
        },
    };

    const contactPerson: ColumnProps<TourGitDto> = {
        title: i18n.t('tour.tourList.personContact'),
        dataIndex: 'traveller.firstName',
        key: 'Traveller.firstName',
        width: 200,
        sorter: true,
        render: (_, record: TourGitDto) => (
            <>
                <p>{`${record.traveller?.lastName ?? ''} ${record.traveller?.firstName ?? ''}`}</p>
                <p>{record.traveller?.phone}</p>
            </>
        ),
    };

    const nameGroup: ColumnProps<TourGitDto> = {
        title: i18n.t('tour.tourList.groupName'),
        dataIndex: 'groupName',
        key: 'GroupName',
        width: 350,
        sorter: true,
        render: a => <p className="line-clamp-2">{a}</p>,
    };

    const seller: ColumnProps<TourGitDto> = {
        title: i18n.t('tour.tourList.sellerApproved'),
        dataIndex: 'sellerName',
        key: 'Seller.name',
        width: 200,
        sorter: true,
        render: (_, record: TourGitDto) => (
            <>
                <p>{record.sellerName}</p>
                <p>{record.sellerPhone}</p>
            </>
        ),
    };

    const action: ColumnProps<TourGitDto> = {
        title: i18n.t('action.action'),
        key: 'operation',
        fixed: 'right',
        align: 'left',
        width: 90,
        render: (_, record: AnyObject) => (
            <Flex className="flex-wrap" justify="end" gap={9}>
                {record.status === TourScheduleStatus.New && !record?.hasAnyQuote && (
                    <Can permissions={[MyPermissions.TourGitDelete]}>
                        <DeleteButton
                            titleName={i18n.t('tour.tourGit')}
                            content={`(${record.tourCode}) ${record.name}`}
                            onOk={async () => {
                                await deleteTourGit(record.id ?? '');
                                toastSuccess(
                                    i18n.t('message.default.deleteContentSuccess'),
                                    `(${record.tourCode}) ${record.name}`,
                                );
                                refetch();
                            }}
                        />
                    </Can>
                )}
                <Can permissions={[MyPermissions.TourGitCreate]}>
                    <CloneButton
                        tooltip={i18n.t('action.clone')}
                        onClick={() =>
                            navigate(`${rootPaths.gitTourForm}`, {
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

    const columnTourGit: ColumnsType<TourGitDto> = [
        code,
        name,
        status,
        tourCategoryName,
        trip,
        customer,
        time,
        capacity,
        contactPerson,
        nameGroup,
        seller,
        action,
    ];

    const isSelectedOneRow = useMemo(() => rowSelected.length === 1, [rowSelected.length]);
    const isTourAvailableCreateQuote = useMemo(() => {
        let result = true;
        if (rowSelected.length === 1) {
            const id = rowSelected[0];
            const tourDetail = listTourGit?.data?.find(item => item.id === id);
            result = !tourDetail?.hasConfirmedQuote;
        }
        return result;
    }, [listTourGit?.data, rowSelected]);

    const handleTableChange = async (
        pagination: TablePaginationConfig,
        advancedFilter: Record<string, FilterValue | null>,
        sorter: SorterResult<TourGitDto> | SorterResult<TourGitDto>[],
    ) => {
        setSearchParams({
            ...tableParams,
            pagination,
            advancedFilter,
            sorter,
        });
    };

    // condition show button action
    const numberOfValueStatusApproval = useCallback(
        (listStatus: TourScheduleStatus[]) => {
            const listData = listTourGit?.data?.filter(item => item.id && rowSelected.includes(item.id));
            return listData?.filter(item => !listStatus.includes(item.status!)).length ?? 0;
        },
        [listTourGit?.data, rowSelected],
    );

    const isOnlyOneValueStatus = useCallback(
        (status: TourScheduleStatus) => {
            return (
                listTourGit?.data?.filter(item => item.id && rowSelected.includes(item.id) && item.status === status)
                    .length ?? 0
            );
        },
        [listTourGit?.data, rowSelected],
    );

    const isShowRequestApproveButton = useMemo(
        () =>
            numberOfValueStatusApproval([TourScheduleStatus.New, TourScheduleStatus.Rejected]) === 0 &&
            rowSelected.length > 0,
        [numberOfValueStatusApproval, rowSelected.length],
    );
    const isShowApprovePopup = useMemo(
        () => isOnlyOneValueStatus(TourScheduleStatus.WaitingForApproval) === 1,
        [isOnlyOneValueStatus],
    );

    useEffect(() => {
        if (isChangeStatus) {
            refetch();
            setIsChangeStatus(false);
        }
    }, [isChangeStatus, refetch]);

    return (
        <GridTableComponent
            columns={columnTourGit}
            tableParams={tableParams}
            dataSource={listTourGit?.data}
            onChange={handleTableChange}
            bordered={true}
            scrollX={1000}
            scrollY={window.innerWidth > 1200 ? window.innerHeight - 455 : undefined}
            showReport={true}
            loading={isLoading}
            setRowSelected={setRowSelected}
            tableName={i18n.t('tour.tourGit')}
            showAction
            listAction={
                <ListAction
                    rowSelected={rowSelected}
                    isShowRequestApproveButton={isShowRequestApproveButton}
                    isShowApprovePopup={rowSelected.length == 1 && isShowApprovePopup}
                    setIsChangeStatus={setIsChangeStatus}
                    isShowCreateQE={isSelectedOneRow && isTourAvailableCreateQuote} // can create with all tour's status, except tour has quote confirmed
                />
            }
        />
    );
};
