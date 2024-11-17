import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import {
    DocumentType,
    ReceivableVoucherDto,
    SearchReceivableVouchersRequest,
    VoucherStatus,
} from '@sdk/tour-operations';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { useCallback, useEffect, useState } from 'react';
import { useDeleteRefund, useDownloadFile, useGetRefundList } from '../hook/useRefundVoucher';

import { AnyObject } from 'antd/es/_util/type';
import { AppConfig } from '@utils/config';
import Can from '@components/common/Can';
import { DeleteButton } from '@components/customizes/Button/DeleteButton';
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
import { rootPaths } from '@src/routers/route';
import { setVoucherColor } from '@utils/colorStatus';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { useQueryClient } from 'react-query';
import { useSearchTableStore } from '@store/searchTableStore';

export const TableRefundVoucher: React.FC = () => {
    const queryClient = useQueryClient();

    const [checkedId, setCheckedId] = useState<string | undefined>();
    const [rowSelected, setRowSelected] = useState<React.Key[]>([]);
    const [isRefectData, setIsRefectData] = useState<boolean>(false);
    const [sentRequestApprove, setSentRequestApprove] = useState<boolean>(false);
    const [sentApprove, setSentApprove] = useState<boolean>(false);
    const [sentRequestConfirm, setSentRequestConfirm] = useState<boolean>(false);
    const [sentConfirm, setSentConfirm] = useState<boolean>(false);

    // store
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    // query
    const { data, isLoading, refetch } = useGetRefundList(tableParams);
    const { mutateAsync: downloadFile, isLoading: loadingDownload } = useDownloadFile();
    const { mutateAsync: deleteRefund } = useDeleteRefund();

    const receivableVoucherData: AnyObject[] = data?.data ?? [];
    if (tableParams.pagination) {
        tableParams.pagination.total = data?.totalCount;
    }

    const setInvalidQuery = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ['fetchRefundList'] });
    }, [queryClient]);

    const handleDownload = async (recId: string) => {
        const request = {
            id: recId ?? '',
            type: DocumentType.Pdf,
        };
        const res = await downloadFile(request);
        window.open(res, '_blank');
    };

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
            title: 'Mã',
            dataIndex: 'voucherNo',
            key: 'VoucherNo',
            width: 150,
            sorter: true,
            render: (value: string, record: ReceivableVoucherDto) => {
                return (
                    <Can
                        permissions={[
                            MyPermissions.RefundVoucherView,
                            MyPermissions.RefundVoucherUpdate,
                            MyPermissions.AgencyRefundVoucherView,
                            MyPermissions.AgencyRefundVoucherUpdate,
                        ]}
                    >
                        <Link className="font-medium" to={`${rootPaths.refundVoucherForm}/${record.id}`}>
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
            sorter: true,
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
            sorter: true,
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
                    <Can permissions={[MyPermissions.RefundVoucherView, MyPermissions.AgencyRefundVoucherView]}>
                        <PrintButton
                            onClick={() => {
                                handleDownload(record.id!);
                                setCheckedId(record.id);
                            }}
                            isLoading={loadingDownload && record.id === checkedId}
                        />
                    </Can>
                    {record.status === VoucherStatus.Draft && (
                        <Can permissions={[MyPermissions.RefundVoucherDelete, MyPermissions.AgencyRefundVoucherDelete]}>
                            <DeleteButton
                                titleName={i18n.t('menu.refundVoucher')}
                                content={`Mã ${i18n.t('menu.refundVoucher')}: ${record.voucherNo}`}
                                onOk={async () => {
                                    await deleteRefund(record.id ?? '');
                                    toastSuccess('', i18n.t('Xoá Phiếu hoàn thành công!'));
                                    setInvalidQuery();
                                }}
                            />
                        </Can>
                    )}
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

    const canRequestApprove = useCallback(() => {
        const listData = data?.data?.filter(item => item.id && rowSelected.includes(item.id)) ?? [];
        return listData?.length > 0
            ? listData?.filter(
                  item => item.status && ![VoucherStatus.Draft, VoucherStatus.Rejected].includes(item.status),
              ).length
            : 1;
    }, [data?.data, rowSelected]);

    const controlAction = useCallback(() => {
        if (rowSelected) {
            const isSentApprove = rowSelected.length >= 1 && canRequestApprove() == 0;
            const isApprove = rowSelected.length == 1 && isOnlyStatus(VoucherStatus.WaitingForApproval) == 0;
            const isSentRequestConfirm = rowSelected.length >= 1 && isOnlyStatus(VoucherStatus.Refunded) == 0;
            const isConfirmRefund = rowSelected.length >= 1 && isOnlyStatus(VoucherStatus.WaitingForConfirmation) == 0;
            setSentRequestApprove(isSentApprove);
            setSentApprove(isApprove);
            setSentRequestConfirm(isSentRequestConfirm);
            setSentConfirm(isConfirmRefund);
        }
    }, [canRequestApprove, isOnlyStatus, rowSelected]);

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
            tableName={i18n.t('menu.refundVoucher')}
            loading={isLoading}
            setRowSelected={setRowSelected}
            showAction
            listAction={
                <ListAction
                    isShowRequestApproveButton={sentRequestApprove}
                    isShowApprovalButton={sentApprove}
                    isShowRequestConfirm={sentRequestConfirm}
                    isShowConfirm={sentConfirm}
                    rowSelected={rowSelected}
                    setIsRefectData={setIsRefectData}
                />
            }
        />
    );
};
