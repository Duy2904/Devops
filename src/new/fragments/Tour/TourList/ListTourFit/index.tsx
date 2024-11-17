import 'dayjs/locale/vi';

import { ColumnProps, ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useCallback, useEffect, useState } from 'react';

import { ActionBtn } from './ActionBtn';
import { AppConfig } from '@utils/config';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import { DrawerListSO } from './DrawerListSO';
import Format from '@utils/format';
import { GridTableComponent } from '@components/ui/GridTable';
import { Link } from 'react-router-dom';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { PageName } from '@src/types/TypeEnum';
import { TagStatus } from '@src/new/components/ui/Tag/TagStatus';
import { TourScheduleDto } from '@sdk/tour-operations';
import clsx from 'clsx';
import dayjs from 'dayjs';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';
import { t } from 'i18next';
import { useGetListTourFit } from '../../hooks/useTourFit';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { useSearchTableStoreNew } from '@src/new/shared/stores/SearchTableStore';

export const FitTours: React.FC = () => {
    const hasModifyTourFITPermission = useHasAnyPermission([MyPermissions.TourFitView]);
    const isPermissionOnTour = useHasAnyPermission([
        MyPermissions.TourFitUpdate,
        MyPermissions.TourFitView,
        MyPermissions.AgencyTourFitView,
    ]);
    const isPermissionSaleOrderView = useHasAnyPermission([MyPermissions.SaleOrderView, MyPermissions.AgencySaleOrderView]);
    const tourFormPath = (tourCode: string) => {
        return `${rootPaths.fitTourForm}/${tourCode}`;
    };
    const [isChangeStatus, setIsChangeStatus] = useState<boolean>(false);
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStoreNew(state => state);

    const { data: listTourFit, isLoading, refetch } = useGetListTourFit(tableParams);
    if (tableParams.pagination) {
        tableParams.pagination.total = listTourFit?.totalCount;
    }

    const refetchList = useCallback(() => {
        refetch();
    }, [refetch]);

    const code: ColumnProps<TourScheduleDto> = {
        title: i18n.t('tour.tourList.tourCode'),
        dataIndex: 'tourCode',
        key: 'TourCode',
        width: 200,
        fixed: 'left',
        render: (value: string) => (
            <Link className="font-medium text-sm" to={isPermissionOnTour ? tourFormPath(value ?? '') : '#'}>
                {value}
            </Link>
        ),
    };

    const name: ColumnProps<TourScheduleDto> = {
        title: i18n.t('tour.tourList.tourName'),
        dataIndex: 'name',
        key: 'Name',
        width: 320,
        render: (_, record: TourScheduleDto) => <p className={clsx('text-sm', Color.text_black_87)}>{record?.name}</p>,
    };

    const status: ColumnProps<TourScheduleDto> = {
        title: i18n.t('tour.tourList.status'),
        dataIndex: 'status',
        key: 'Status',
        width: 180,
        align: 'center',
        render: (_, record: TourScheduleDto) => (
            <TagStatus
                className="text-sm"
                text={t(`tour.status.${record.status}`)}
                page={PageName.Tour}
                status={`${record.status}`}
            />
        ),
    };

    const trip: ColumnProps<TourScheduleDto> = {
        title: i18n.t('tour.tourDetail.trip'),
        dataIndex: 'departureLocationName',
        key: 'DepartureLocation.name',
        width: 320,
        render: (_, record: TourScheduleDto) => (
            <p className={clsx('text-sm', Color.text_black_87)}>
                {record.departureLocationName} - {record.destinationLocationName}
            </p>
        ),
    };

    const time: ColumnProps<TourScheduleDto> = {
        title: `${i18n.t('Ngày đi/về')}`,
        dataIndex: 'departureDate',
        key: 'DepartureDate',
        width: 200,
        render: (_, record: TourScheduleDto) => (
            <>
                <p className={clsx('text-sm', Color.text_black_87)}>
                    {dayjs(record.departureDate).format(AppConfig.DateTimeFormat)}
                </p>
                <p className={clsx('text-sm pt-1', Color.text_black_87)}>
                    {dayjs(record.endDate).format(AppConfig.DateTimeFormat)}
                </p>
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
            return (
                <p className={clsx('text-sm', Color.text_black_87)}>{price ? `${Format.formatNumber(price)}` : ''}</p>
            );
        },
    };

    const capacity: ColumnProps<TourScheduleDto> = {
        title: i18n.t('tour.tourList.totalCapacity'),
        dataIndex: 'capacity',
        key: 'capacity',
        width: 80,
        align: 'right',
        render(_, record: TourScheduleDto) {
            return <p className={clsx('text-sm font-semibold', Color.text_black_87)}>{record.capacity}</p>;
        },
    };

    const capacitySaled: ColumnProps<TourScheduleDto> = {
        title: i18n.t('tour.tourList.soldCapacity'),
        dataIndex: 'bookedQuantity',
        key: 'bookedQuantity',
        width: 90,
        align: 'right',
        render(value, record: TourScheduleDto) {
            return value > 0 && isPermissionSaleOrderView ? (
                <DrawerListSO
                    typeList="bookedQuantity"
                    tourScheduleId={record.id ?? ''}
                    value={value}
                    record={record}
                    className="text-sm font-semibold text-[#0958D9]"
                />
            ) : (
                <p className="text-sm font-semibold text-[#0958D9]">{value}</p>
            );
        },
    };

    const keepSeat: ColumnProps<TourScheduleDto> = {
        title: i18n.t('tour.tourList.keepSeat'),
        dataIndex: 'reserveQuantity',
        key: 'reserveQuantity',
        width: 90,
        align: 'right',
        render(value, record: TourScheduleDto) {
            return value > 0 && isPermissionSaleOrderView ? (
                <DrawerListSO
                    typeList="reserveQuantity"
                    tourScheduleId={record.id ?? ''}
                    value={value}
                    record={record}
                    className="text-sm font-semibold text-[#FA8C16]"
                />
            ) : (
                <p className="text-sm font-semibold text-[#FA8C16]">{value}</p>
            );
        },
    };

    const remaining: ColumnProps<TourScheduleDto> = {
        title: i18n.t('tour.tourList.freeSeat'),
        dataIndex: 'remainingCapacity',
        key: 'remainingCapacity',
        align: 'right',
        width: 100,
        render(_, record: TourScheduleDto) {
            return <p className="text-sm font-semibold text-[#389E0D]">{record.remainingCapacity}</p>;
        },
    };

    const action: ColumnProps<TourScheduleDto> = {
        title: i18n.t('action.action'),
        key: 'operation',
        fixed: 'right',
        align: 'left',
        width: 180,
        render: (_, record: TourScheduleDto) => (
            <ActionBtn data={record} refetchList={refetchList} setIsChangeStatus={setIsChangeStatus} />
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

    useEffect(() => {
        if (isChangeStatus) {
            refetchList();
            setIsChangeStatus(false);
        }
    }, [isChangeStatus, refetchList]);

    const getTourFitColumns = () =>
        hasModifyTourFITPermission ? columnTourFit : columnTourFit.filter(x => x.key != 'capacity');

    return (
        <GridTableComponent
            columns={getTourFitColumns()}
            tableParams={tableParams}
            dataSource={listTourFit?.data}
            onChange={handleTableChange}
            scrollX={1200}
            scrollY={window.innerWidth > 1200 ? window.innerHeight - 375 : undefined}
            showReport={true}
            loading={isLoading}
            tableName={i18n.t('tour.tourFit')}
            showAction
            isStriped
        />
    );
};
