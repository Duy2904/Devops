import { Button, Col, Drawer, Space } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import Table, { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { InfoCircleOutlined } from '@ant-design/icons';
import Can from '@components/common/Can';
import { StaticTag } from '@components/customizes/StaticTag';
import { GridTableComponent } from '@components/ui/GridTable';
import { useGetListSOBookedTourFit, useGetListSOReservedTourFit } from '@hooks/queries/useSaleOrders';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { SaleOrderDto, SaleOrderSearchDto, TourScheduleDto, TourScheduleStatus } from '@sdk/tour-operations';
import i18n from '@src/i18n';
import { rootPathsNew } from '@src/routers/newRoute';
import { paramsDefaultSearch } from '@store/searchTableStore';
import { setSaleOrderColor } from '@utils/colorStatus';
import Format from '@utils/format';
import { localeCompare } from '@utils/localeHelper';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { calTotalRemainAmt } from '@utils/saleOrderHelper';

export declare type TypeList = 'bookedQuantity' | 'reserveQuantity';

interface DrawerListSOProps {
    typeList: TypeList;
    tourScheduleId: string;
    value?: string;
    record?: TourScheduleDto;
    className?: string;
}

export const DrawerListSO: React.FC<DrawerListSOProps> = props => {
    const isActiveStatus = props.record?.status !== TourScheduleStatus.New;
    const isPermissionRedirect = useHasAnyPermission([
        MyPermissions.SaleOrderUpdate,
        MyPermissions.AgencySaleOrderUpdate,
    ]);

    const [open, setOpen] = useState(false);
    const [saleOrderSummary, setSaleOrderSummary] = useState<AnyObject>();
    const [dataDrawer, setDataDrawer] = useState<SaleOrderDto[]>([]);

    // mutateAsync
    const { mutateAsync: getListSOBookedTourFit, isLoading: loadingGetListSOBookedTourFit } =
        useGetListSOBookedTourFit();
    const { mutateAsync: getListSOReservedTourFit, isLoading: loadingGetListSOReservedTourFit } =
        useGetListSOReservedTourFit();

    const columnsData: ColumnsType<SaleOrderSearchDto> = [
        {
            title: 'Mã',
            dataIndex: 'orderNo',
            key: 'orderNo',
            width: 150,
            sorter: (aCode, bCode) => localeCompare(aCode.orderNo, bCode.orderNo),
            render: (_, record) => (
                <Link
                    className="font-medium"
                    to={isPermissionRedirect ? `${rootPathsNew.saleOrderViewDetail}/${record.id}` : '#'}
                >
                    {record.orderNo}
                </Link>
            ),
        },
        {
            title: 'Khách hàng',
            dataIndex: 'contactName',
            key: 'contactName',
            width: 150,
            render: (_, record) => (
                <>
                    <p>{record.contactName}</p>
                    <p>{record.contactPhone}</p>
                </>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            sorter: (aStatus, bStatus) => (aStatus.status ?? '' > (bStatus.status ?? '') ? 1 : -1),
            render(text, record) {
                return (
                    <StaticTag
                        type={i18n.t(`OrderStatus.${text}`) || ''}
                        color={`${setSaleOrderColor(record.status ?? '')}`}
                    />
                );
            },
        },
        {
            title: 'Số chỗ',
            dataIndex: 'seats',
            key: 'seats',
            width: 70,
            sorter: (aNumber, bNumber) => (aNumber.seats ?? 0 > (bNumber.seats ?? 0) ? 1 : -1),
            render: (_, record) => <p className="font-bold text-center">{record.seats}</p>,
        },
        {
            title: 'Số tiền thanh toán',
            dataIndex: 'totalAmt',
            key: 'totalAmt',
            width: 130,

            sorter: (aAmount, bAmount) => (aAmount.totalAmt ?? 0 > (bAmount.totalAmt ?? 0) ? 1 : -1),
            render: (_, record) => <p className="text-right">{Format.formatNegativeNumber(record.totalAmt)}</p>,
        },
        {
            title: 'Số tiền đã trả',
            dataIndex: 'paymentAmt',
            key: 'paymentAmt',
            width: 100,

            sorter: (aAmount, bAmount) => (aAmount.paymentAmt ?? 0 > (bAmount.paymentAmt ?? 0) ? 1 : -1),
            render: (_, record) => <p className="text-right">{Format.formatNegativeNumber(record.paymentAmt)}</p>,
        },
        {
            title: 'Số tiền còn lại',
            width: 100,
            sorter: (aAmount, bAmount) => (calTotalRemainAmt(aAmount) > calTotalRemainAmt(bAmount) ? 1 : -1),
            render: (_, record) => <p className="text-right">{Format.formatNegativeNumber(record.remainingAmt)}</p>,
        },
    ];

    const fetchListData = async () => {
        if (props.tourScheduleId) {
            const response =
                props.typeList == 'bookedQuantity'
                    ? await getListSOBookedTourFit(props.tourScheduleId)
                    : await getListSOReservedTourFit(props.tourScheduleId);
            if (response.data) {
                setDataDrawer(response.data);
                const summary = {
                    totalAmount: response.totalAmount,
                    paymentAmount: response.paymentAmount,
                    remainingAmount: response.remainingAmount,
                };
                setSaleOrderSummary(summary);
            }
        }
    };

    const handleSummary = () => {
        return (
            <Table.Summary>
                <Table.Summary.Row>
                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                    <Table.Summary.Cell index={2}></Table.Summary.Cell>
                    <Table.Summary.Cell index={3}></Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={4}>
                        {Format.formatNegativeNumber(saleOrderSummary?.totalAmount)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={5}>
                        {Format.formatNegativeNumber(saleOrderSummary?.paymentAmount)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right" index={6}>
                        {Format.formatNegativeNumber(saleOrderSummary?.remainingAmount)}
                    </Table.Summary.Cell>
                </Table.Summary.Row>
            </Table.Summary>
        );
    };

    const onOpen = async () => {
        setOpen(true);
        fetchListData();
    };

    const onClose = () => {
        setOpen(false);
        setDataDrawer([]);
        setSaleOrderSummary(undefined);
    };

    return (
        <Col>
            <Col
                className={`text-xs font-semibold ${props.className} ${
                    isActiveStatus && 'cursor-pointer'
                } flex items-center justify-end gap-1`}
                onClick={onOpen}
            >
                {props.value} <InfoCircleOutlined />
            </Col>
            <Can permissions={[MyPermissions.SaleOrderView, MyPermissions.AgencySaleOrderView]}>
                <Drawer
                    title={i18n.t('tour.saleOrder.list')}
                    width={1200}
                    open={open}
                    styles={{
                        body: {
                            paddingBottom: 80,
                        },
                    }}
                    extra={
                        <Space>
                            <Button onClick={onClose}>{i18n.t('action.back')}</Button>
                        </Space>
                    }
                    closeIcon={false}
                >
                    <GridTableComponent
                        columns={columnsData}
                        tableParams={paramsDefaultSearch}
                        dataSource={dataDrawer}
                        bordered={true}
                        tableName={'Đơn hàng bán'}
                        loading={loadingGetListSOBookedTourFit || loadingGetListSOReservedTourFit}
                        summary={handleSummary}
                        isHideSelectColumn
                        isHidePagination
                    />
                </Drawer>
            </Can>
        </Col>
    );
};
