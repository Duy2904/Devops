import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import {
    DocumentType,
    ReceivableVoucherDto,
    SearchReceivableVouchersRequest,
    VoucherStatus,
} from '@sdk/tour-operations';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useCallback, useEffect, useState } from 'react';
import { useDownloadFile, useGetReceivables } from '../hook/useReceivableVoucher';

import { AppConfig } from '@utils/config';
import Can from '@components/common/Can';
import { Flex } from 'antd';
import Format from '@utils/format';
import { GridTableComponent } from '@components/ui/GridTable';
import { Link } from 'react-router-dom';
import { ListAction } from './ListAction';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { PrintButton } from '@components/customizes/Button/PrintButton';
import { StaticTag } from '@components/customizes/StaticTag';
import dayjs from 'dayjs';
import i18n from '@src/i18n';
import { localeCompare } from '@utils/localeHelper';
import { rootPaths } from '@src/routers/route';
import { setVoucherColor } from '@utils/colorStatus';
import { useSearchTableStore } from '@store/searchTableStore';

export const TableDataVoucherReceivable: React.FC = () => {
    const [rowSelected, setRowSelected] = useState<React.Key[]>([]);
    const [sentRequestApprove, setSentRequestApprove] = useState<boolean>(false);
    const [sentApproval, setSentApproval] = useState<boolean>(false);
    const [isRefectData, setIsRefectData] = useState<boolean>(false);
    const [checkedId, setCheckedId] = useState<string | undefined>();

    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    // query data
    const { mutateAsync: downloadFile, isLoading: loadingDownload } = useDownloadFile();
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

    const handleDownload = async (recId: string) => {
        const request = {
            id: recId ?? '',
            type: DocumentType.Pdf,
        };
        const res = await downloadFile(request);
        window.open(res, '_blank');
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
            title: 'Mã',
            dataIndex: 'voucherNo',
            key: 'VoucherNo',
            width: 150,
            sorter: (a, b) => localeCompare(a.voucherNo, b.voucherNo),
            render: (value: string, record: ReceivableVoucherDto) => {
                return (
                    <Can permissions={[MyPermissions.ReceivableVoucherView, MyPermissions.AgencyReceivableVoucherView]}>
                        <Link className="font-medium" to={`${rootPaths.receivableVoucherForm}/${record.id}`}>
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
            width: 150,
            render(text) {
                return (
                    <StaticTag type={i18n.t(`voucher.status.${text}`) || ''} color={`${setVoucherColor(text ?? '')}`} />
                );
            },
        },
        {
            title: 'Diễn giải',
            dataIndex: 'description',
            key: 'Description',
            width: 230,
            sorter: (a, b) => localeCompare(a.description, b.description),
            render: value => <p className="line-clamp-2">{value}</p>,
        },
        {
            title: 'Số tiền',
            dataIndex: 'totalAmtExchange',
            key: 'TotalAmtExchange',
            width: 150,
            align: 'right',
            sorter: true,
            render: (_, record: ReceivableVoucherDto) => <>{Format.formatNumber(record.totalAmtExchange)}</>,
        },
        {
            title: 'Khách hàng',
            dataIndex: 'customerId',
            width: 200,
            render: (_, record: ReceivableVoucherDto) => {
                return (
                    <>
                        <p>{record.contactName}</p>
                        <p>{record.contactPhone}</p>
                    </>
                );
            },
        },
        {
            title: 'Ngày tạo phiếu',
            dataIndex: 'receivableDate',
            key: 'ReceivableDate',
            width: 150,
            sorter: (a, b) =>
                (a.receivableDate ? new Date(a.receivableDate) : new Date()).getTime() -
                (b.receivableDate ? new Date(b.receivableDate) : new Date()).getTime(),
            render: a => <>{dayjs(a).format(AppConfig.DateFormat)}</>,
        },
        {
            title: 'Thao tác',
            key: 'action',
            fixed: 'right',
            align: 'center',
            width: 70,
            render: (_, record: ReceivableVoucherDto) => (
                <Flex className="gap-2" justify="center">
                    <Can permissions={[MyPermissions.ReceivableVoucherView, MyPermissions.AgencyReceivableVoucherView]}>
                        <PrintButton
                            onClick={() => {
                                handleDownload(record.id!);
                                setCheckedId(record.id);
                            }}
                            isLoading={loadingDownload && record.id === checkedId}
                        />
                    </Can>
                </Flex>
            ),
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
            columns={columns}
            tableParams={tableParams}
            dataSource={receivableVoucherData}
            onChange={handleTableChange}
            bordered={true}
            scrollX={1000}
            scrollY={window.innerWidth > 1200 ? window.innerHeight - 393 : undefined}
            showReport={true}
            tableName={'Phiếu Thu'}
            loading={isLoading}
            setRowSelected={setRowSelected}
            showAction
            listAction={
                <ListAction
                    isShowRequestApproveButton={sentRequestApprove}
                    isShowApprovalButton={sentApproval}
                    rowSelected={rowSelected}
                    setIsRefectData={setIsRefectData}
                />
            }
        />
    );
};
