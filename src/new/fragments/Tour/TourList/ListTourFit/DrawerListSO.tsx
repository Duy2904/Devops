import { Button, Col, Drawer, Flex } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import Table, { ColumnsType } from 'antd/es/table';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { t } from 'i18next';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { CloseOutlined } from '@ant-design/icons';
import { GridTableComponent } from '@components/ui/GridTable';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetListSOBookedTourFit, useGetListSOReservedTourFit } from '@hooks/queries/useSaleOrders';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { SaleOrderSearchDto, TourScheduleDto, TourScheduleStatus } from '@sdk/tour-operations';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import { TagStatus } from '@src/new/components/ui/Tag/TagStatus';
import { TagTourID } from '@src/new/components/ui/Tag/TagTourID';
import { AppConfig } from '@src/new/shared/utils/config';
import { rootPathsNew } from '@src/routers/newRoute';
import { PageName } from '@src/types/TypeEnum';
import { paramsDefaultSearch } from '@store/searchTableStore';
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
    const { record, tourScheduleId, typeList } = props;

    const isActiveStatus = record?.status !== TourScheduleStatus.New;
    const isPermissionRedirect = useHasAnyPermission([
        MyPermissions.SaleOrderView, MyPermissions.AgencySaleOrderView
    ]);

    const [open, setOpen] = useState(false);
    const [saleOrderSummary, setSaleOrderSummary] = useState<AnyObject>();
    const [dataDrawer, setDataDrawer] = useState<SaleOrderSearchDto[]>([]);

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
                    className="font-medium text-sm"
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
                    <p className="text-sm">{record.contactName}</p>
                    <p className="text-sm">{record.contactPhone}</p>
                </>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            align: 'center',
            render(text) {
                return <TagStatus text={t(`OrderStatus.${text}`)} page={PageName.SaleOrder} status={`${text}`} />;
            },
        },
        {
            title: 'Số chỗ',
            dataIndex: 'seats',
            key: 'seats',
            width: 90,
            sorter: (aNumber, bNumber) => ((aNumber.seats ?? 0) > (bNumber.seats ?? 0) ? 1 : -1),
            render: (_, record) => <p className="font-bold text-center text-sm">{record.seats}</p>,
        },
        {
            title: 'Số tiền thanh toán',
            dataIndex: 'totalIncludeVatAmt',
            key: 'totalIncludeVatAmt',
            width: 150,

            sorter: (aAmount, bAmount) => ((aAmount.totalIncludeVatAmt ?? 0) > (bAmount.totalIncludeVatAmt ?? 0) ? 1 : -1),
            render: (_, record) => <p className="text-right text-sm">{Format.formatNegativeNumber(record.totalIncludeVatAmt)}</p>,
        },
        {
            title: 'Số tiền đã trả',
            dataIndex: 'paymentAmt',
            key: 'paymentAmt',
            width: 150,

            sorter: (aAmount, bAmount) => ((aAmount.paymentAmt ?? 0) > (bAmount.paymentAmt ?? 0) ? 1 : -1),
            render: (_, record) => (
                <p className="text-right text-sm">{Format.formatNegativeNumber(record.paymentAmt)}</p>
            ),
        },
        {
            title: 'Số tiền còn lại',
            width: 150,
            sorter: (aAmount, bAmount) => (calTotalRemainAmt(aAmount) > calTotalRemainAmt(bAmount) ? 1 : -1),
            render: (_, record) => (
                <p className="text-right text-sm">{Format.formatNegativeNumber(record.remainingAmt)}</p>
            ),
        },
    ];

    const fetchListData = async () => {
        if (tourScheduleId) {
            const response =
                typeList == 'bookedQuantity'
                    ? await getListSOBookedTourFit(tourScheduleId)
                    : await getListSOReservedTourFit(tourScheduleId);
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

    const CustomHeader = (
        <Flex className="h-[50px] px-3 shadow relative" align="center" justify="center">
            <h1 className={`${Color.text_2A2A2A} font-bold uppercase text-[18px]`}>{t('tour.saleOrder.list')}</h1>
            <Button
                className="absolute right-5"
                icon={<CloseOutlined className="h-4 w-4" />}
                onClick={onClose}
                type="text"
            />
        </Flex>
    );

    return (
        <Col>
            <Col
                className={`text-sm font-semibold ${props.className} ${isActiveStatus && 'cursor-pointer'
                    } flex items-center justify-end gap-1`}
                onClick={onOpen}
            >
                {props.value}{' '}
                <Flex
                    align="center"
                    justify="center"
                    className={clsx('cursor-pointer w-5 h-5 rounded', Color.bg_DFE2E6)}
                >
                    <FontAwesomeIcon icon={faCircleInfo} fontSize={10} className={clsx(Color.text_black_45)} />
                </Flex>
            </Col>
            <Drawer
                title={CustomHeader}
                width={1200}
                open={open}
                closeIcon={false}
                styles={{
                    header: {
                        padding: 0,
                    },
                }}
                maskClosable={true}
                onClose={onClose}
                mask={true}
            >
                <Col className={clsx(Color.bg_F2F3F7, 'rounded-xl py-3 px-4 mb-6')}>
                    <p className={clsx(Color.text_2F80ED, 'text-lg font-bold')}>{record?.name}</p>
                    <Flex className="mt-3" align="center" justify="space-between">
                        <Flex align="center" gap={4}>
                            <p className="text-xs">{t('Mã tour')}</p>
                            <TagTourID text={record?.tourCode ?? ''} className="text-xs" />
                        </Flex>
                        <Flex className="flex-wrap" align="center" justify="end" gap={6}>
                            <Flex className="mr-2" align="center" gap={4}>
                                <span className={clsx(`text-xs/[22px]`, Color.text_black_45)}>Mở bán từ</span>
                                <span className={`font-bold text-xs/[22px]`}>
                                    {dayjs(record?.saleStartDate).format(AppConfig.DateFormat)}
                                </span>
                                <span className={clsx(`text-xs/[22px]`, Color.text_black_45)}>-</span>
                                <span className={`font-bold text-xs/[22px]`}>
                                    {dayjs(record?.saleEndDate).format(AppConfig.DateFormat)}
                                </span>
                            </Flex>
                            {record?.status && (
                                <TagStatus
                                    text={t(`tour.status.${record.status}`)}
                                    page={PageName.Tour}
                                    status={`${record.status}`}
                                />
                            )}
                        </Flex>
                    </Flex>
                </Col>
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
                    isStriped
                    scrollX={1000}
                />
            </Drawer>
        </Col>
    );
};
