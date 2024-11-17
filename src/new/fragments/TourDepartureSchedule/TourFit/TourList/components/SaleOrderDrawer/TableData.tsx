import { Col, Table } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useGetListSOBookedTourFit, useGetListSOReservedTourFit } from '../../hooks/mutates';

import { AnyObject } from 'antd/es/_util/type';
import { ColumnsType } from 'antd/es/table';
import Format from '@utils/format';
import { GridTableComponent } from '@components/ui/GridTable';
import { Link } from 'react-router-dom';
import { MyPermissions } from '@utils/Permissions';
import { PageName } from '@src/types/TypeEnum';
import { SaleOrderSearchDto } from '@sdk/tour-operations';
import { TagStatus } from '@src/new/components/ui/Tag/TagStatus';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { rootPathsNew } from '@src/routers/newRoute';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { useTranslation } from 'react-i18next';

export declare type TypeList = 'bookedQuantity' | 'reserveQuantity';

interface TableDataProps {
    idTour: string;
    typeList?: TypeList;
    openDrawer?: boolean;
}

export const TableData: React.FC<TableDataProps> = props => {
    const { idTour, typeList, openDrawer } = props;

    const { t } = useTranslation();
    const [dataDrawer, setDataDrawer] = useState<SaleOrderSearchDto[]>([]);
    const [saleOrderSummary, setSaleOrderSummary] = useState<AnyObject>();

    const isPermissionRedirect = useHasAnyPermission([MyPermissions.SaleOrderView, MyPermissions.AgencySaleOrderView]);
    // mutateAsync
    const { mutateAsync: getListSOBookedTourFit, isLoading: loadingGetListSOBookedTourFit } =
        useGetListSOBookedTourFit();
    const { mutateAsync: getListSOReservedTourFit, isLoading: loadingGetListSOReservedTourFit } =
        useGetListSOReservedTourFit();

    const columnsData: ColumnsType<SaleOrderSearchDto> = [
        {
            title: t('Mã đơn'),
            dataIndex: 'orderNo',
            key: 'orderNo',
            width: 180,
            render: (_, record) => (
                <Link
                    className="font-medium text-sm"
                    to={isPermissionRedirect ? `${rootPathsNew.saleOrderViewDetail}/${record.id}` : '#'}
                >
                    {record.orderNo}
                </Link>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 200,
            align: 'center',
            render(_, record) {
                return (
                    <TagStatus
                        text={t(`OrderStatus.${record.status}`)}
                        page={PageName.SaleOrder}
                        status={`${record.status}`}
                    />
                );
            },
        },
        {
            title: 'Khách hàng',
            dataIndex: 'contactName',
            key: 'contactName',
            width: 220,
            render: (_, record) => (
                <>
                    <p className="text-sm">{record.contactName}</p>
                    <p className="text-sm">{record.contactPhone}</p>
                </>
            ),
        },
        {
            title: 'Số chỗ',
            dataIndex: 'seats',
            key: 'seats',
            width: 120,
            align: 'center',
            render: (_, record) => <p className="font-bold text-center text-sm">{record.seats}</p>,
        },
        {
            title: 'Tổng tiền thanh toán',
            dataIndex: 'totalAmt',
            key: 'totalAmt',
            width: 220,
            align: 'right',
            render: (_, record) => <p className="text-right text-sm">{Format.formatNegativeNumber(record.totalAmt)}</p>,
        },
        {
            title: 'Số tiền khách trả',
            dataIndex: 'paymentAmt',
            key: 'paymentAmt',
            width: 200,
            align: 'right',
            render: (_, record) => (
                <p className="text-right text-sm">{Format.formatNegativeNumber(record.paymentAmt)}</p>
            ),
        },
        {
            title: 'Số tiền còn lại',
            width: 200,
            align: 'right',
            render: (_, record) => (
                <p className="text-right text-sm">{Format.formatNegativeNumber(record.remainingAmt)}</p>
            ),
        },
    ];

    const fetchListData = useCallback(async () => {
        if (idTour) {
            const response =
                typeList == 'bookedQuantity'
                    ? await getListSOBookedTourFit(idTour)
                    : await getListSOReservedTourFit(idTour);
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
    }, [getListSOBookedTourFit, getListSOReservedTourFit, idTour, typeList]);

    const sumSeats = useMemo(() => {
        const arrSeats = dataDrawer.map(item => {
            return !isNil(item.seats) ? item.seats : 0;
        });
        return !isEmpty(arrSeats) ? arrSeats.reduce((x, y) => x + y) : 0;
    }, [dataDrawer]);

    const handleSummary = () => {
        return (
            <Table.Summary>
                <Table.Summary.Row>
                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                    <Table.Summary.Cell index={2}></Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-center text-sm" index={3}>
                        {sumSeats}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right text-sm" index={4}>
                        {Format.formatNegativeNumber(saleOrderSummary?.totalAmount)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right text-sm" index={5}>
                        {Format.formatNegativeNumber(saleOrderSummary?.paymentAmount)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="font-bold text-right text-sm" index={6}>
                        {Format.formatNegativeNumber(saleOrderSummary?.remainingAmount)}
                    </Table.Summary.Cell>
                </Table.Summary.Row>
            </Table.Summary>
        );
    };

    const quantityData = useMemo(() => {
        return dataDrawer.length;
    }, [dataDrawer.length]);

    useEffect(() => {
        if (openDrawer) {
            fetchListData();
        }
    }, [fetchListData, openDrawer]);

    return (
        <Col>
            <p className="text-sm mb-2">
                <span className="font-bold">{quantityData}</span>{' '}
                <span className="text-[#2A2A2A]/80">{t('đơn hàng bán')}</span>
            </p>
            <GridTableComponent
                columns={columnsData}
                tableParams={{}}
                dataSource={dataDrawer}
                bordered={false}
                tableName={'Đơn hàng bán'}
                loading={loadingGetListSOBookedTourFit || loadingGetListSOReservedTourFit}
                summary={!isEmpty(dataDrawer) ? handleSummary : undefined}
                isHideSelectColumn
                isHidePagination
                isStriped
            />
        </Col>
    );
};
