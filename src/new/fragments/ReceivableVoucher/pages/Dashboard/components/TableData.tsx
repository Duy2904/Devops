import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { ReceivableVoucherDto, SearchReceivableVouchersRequest, VoucherStatus } from '@sdk/tour-operations';
import { useCallback, useEffect, useState } from 'react';

import { ActionBtn } from './ActionBtn';
import { AppConfig } from '@utils/config';
import Can from '@components/common/Can';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import { Flex } from 'antd';
import Format from '@utils/format';
import { GridTableComponent } from '@components/ui/GridTable';
import { Link } from 'react-router-dom';
import { ListAction } from './ListAction';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { PageName } from '@src/types/TypeEnum';
import { PhoneFilled } from '@ant-design/icons';
import { TagStatus } from '@src/new/components/ui/Tag/TagStatus';
import clsx from 'clsx';
import i18n from '@src/i18n';
import { useGetReceivables } from '../../../hooks/useReceivableVoucher';
import { useSearchTableStoreNew } from '@src/new/shared/stores/SearchTableStore';
import { useTranslation } from 'react-i18next';
import { rootPathsNew } from '@src/routers/newRoute';

export const TableDataRC: React.FC = () => {
    const { t } = useTranslation();
    const [rowSelected, setRowSelected] = useState<React.Key[]>([]);
    const [sentRequestApprove, setSentRequestApprove] = useState<boolean>(false);
    const [sentApproval, setSentApproval] = useState<boolean>(false);
    const [isRefectData, setIsRefectData] = useState<boolean>(false);

    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStoreNew(state => state);

    // query data
    const { data, isLoading, refetch } = useGetReceivables(tableParams);
    const receivableVoucherData: ReceivableVoucherDto[] = data?.data ?? [];
    if (tableParams.pagination) {
        tableParams.pagination.total = data?.totalCount;
    }

    const handleTableChange = async (
        pagination: TablePaginationConfig,
        advancedFilter: Record<string, FilterValue | null>,
        sorter: SorterResult<SearchReceivableVouchersRequest> | SorterResult<SearchReceivableVouchersRequest>[],
    ) => {
        setSearchParams({
            ...tableParams,
            pagination,
            advancedFilter,
            sorter,
        });
    };

    const columns: ColumnsType<ReceivableVoucherDto> = [
        {
            title: '',
            dataIndex: '',
            key: '',
            fixed: 'left',
            width: 0,
        },
        {
            title: 'Mã phiếu',
            dataIndex: 'voucherNo',
            key: 'VoucherNo',
            fixed: 'left',
            width: 100,
            render: (value: string, record: ReceivableVoucherDto) => {
                return (
                    <Can permissions={[MyPermissions.ReceivableVoucherView, MyPermissions.AgencyReceivableVoucherView]}>
                        <Link className="font-medium text-sm" to={`${rootPathsNew.receivableViewDetail}/${record.id}`}>
                            {value}
                        </Link>
                    </Can>
                );
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'Status',
            align: 'center',
            width: 100,
            render(_, record) {
                return (
                    <TagStatus
                        className="text-sm"
                        text={t(`voucher.status.${record.status}`)}
                        page={PageName.Voucher}
                        status={`${record.status}`}
                    />
                );
            },
        },
        {
            title: 'Diễn giải',
            dataIndex: 'description',
            key: 'Description',
            width: 160,
            render: value => <p className={clsx('text-sm', Color.text_black_87)}>{value}</p>,
        },
        {
            title: 'Số tiền',
            dataIndex: 'totalAmtExchange',
            key: 'TotalAmtExchange',
            width: 100,
            align: 'right',
            sorter: true,
            render: (_, record: ReceivableVoucherDto) => (
                <p className={clsx('text-sm', Color.text_black_87)}>{Format.formatNumber(record.totalAmtExchange)}</p>
            ),
        },
        {
            title: 'Khách hàng',
            dataIndex: 'customerId',
            width: 120,
            render: (_, record) => (
                <>
                    <p className={clsx('text-sm', Color.text_black_87)}>{record.contactName}</p>
                    <div
                        className={clsx(
                            'inline-block text-sm rounded-lg py-1 px-2',
                            Color.text_666666,
                            Color.bg_EDEDED,
                        )}
                    >
                        <Flex align="center" gap={4}>
                            <PhoneFilled className="text-xs" />
                            <span className="text-xs">{record.contactPhone}</span>
                        </Flex>
                    </div>
                </>
            ),
        },
        {
            title: i18n.t('Ngày tạo phiếu'),
            dataIndex: 'createdOn',
            key: 'CreatedOn',
            width: 140,
            sorter: true,
            defaultSortOrder: 'descend',
            render: (_, record) => (
                <>
                    <p className={clsx('text-sm', Color.text_black_87)}>{record.createName}</p>
                    <p className={clsx('text-sm', Color.text_black_45)}>
                        {Format.formatUTCTime(`${record.receivableDate}`, AppConfig.DateTimeWithSecondsFormat)}
                    </p>
                </>
            ),
        },
        {
            title: i18n.t('action.action'),
            key: 'action',
            fixed: 'right',
            align: 'center',
            width: 85,
            render: (_, record: ReceivableVoucherDto) => <ActionBtn data={record} />,
        },
    ];

    const isOnlyStatus = useCallback(
        (status: VoucherStatus) => {
            const listData = data?.data?.filter(item => item.id && rowSelected.includes(item.id)) ?? [];
            return listData?.length > 0 ? listData?.filter(item => item.status !== status).length : 1;
        },
        [rowSelected, data],
    );

    const controlAction = useCallback(() => {
        if (rowSelected) {
            const isChecked = rowSelected.length >= 1 && isOnlyStatus(VoucherStatus.Received) == 0;
            const isCheckedApproval =
                rowSelected.length >= 1 && isOnlyStatus(VoucherStatus.WaitingForConfirmation) == 0;
            setSentRequestApprove(isChecked);
            setSentApproval(isCheckedApproval);
        }
    }, [isOnlyStatus, rowSelected]);

    useEffect(() => {
        controlAction();
    }, [controlAction]);

    useEffect(() => {
        if (isRefectData) {
            refetch();
            controlAction();
            setIsRefectData(false);
        }
    }, [controlAction, isRefectData, refetch]);

    return (
        <GridTableComponent
            loading={isLoading}
            columns={columns}
            tableParams={tableParams}
            dataSource={receivableVoucherData}
            onChange={handleTableChange}
            bordered={false}
            scrollX={1680}
            scrollY={window.innerWidth > 1200 ? window.innerHeight - 375 : undefined}
            showReport={true}
            tableName={t('Phiếu Thu')}
            listAction={
                <ListAction
                    isShowRequestApproveButton={sentRequestApprove}
                    isShowApprovalButton={sentApproval}
                    rowSelected={rowSelected}
                    setIsRefectData={setIsRefectData}
                />
            }
            setRowSelected={setRowSelected}
            showAction
            isStriped
        />
    );
};
