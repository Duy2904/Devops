import { Button, Col, Drawer, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { DiffOutlined } from '@ant-design/icons';
import { StaticTag } from '@components/customizes/StaticTag';
import { GridTableComponent } from '@components/ui/GridTable';
import { useGetSaleOrderOfDiscount } from '@fragments/PromotionProgram/hook/usePromoteProgram';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { SaleOrderByDiscountIdDto } from '@sdk/tour-operations';
import i18n from '@src/i18n';
import { rootPathsNew } from '@src/routers/newRoute';
import { setSaleOrderColor } from '@utils/colorStatus';
import Format from '@utils/format';
import { localeCompare } from '@utils/localeHelper';
import { MyPermissions } from '@utils/Permissions/index.ts';

interface DrawerSaleOrderListProps {
    discountId: string;
}

export const DrawerSaleOrderList: React.FC<DrawerSaleOrderListProps> = props => {
    const { discountId } = props;
    const isPermissionRedirect = useHasAnyPermission([MyPermissions.SaleOrderView, MyPermissions.AgencySaleOrderView]);

    const [open, setOpen] = useState(false);
    const [saleOrderOfDiscount, setSaleOrderOfDiscount] = useState<SaleOrderByDiscountIdDto[]>([]);

    const { mutateAsync: getSaleOrderOfDiscount, isLoading } = useGetSaleOrderOfDiscount();

    const onOpen = async () => {
        setOpen(true);
        const res = await getSaleOrderOfDiscount(discountId);
        setSaleOrderOfDiscount(res);
    };

    const onClose = () => {
        setOpen(false);
    };

    const columnsData: ColumnsType<SaleOrderByDiscountIdDto> = [
        {
            title: i18n.t('Mã đơn hàng'),
            dataIndex: 'orderNo',
            key: 'orderNo',
            width: 80,
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
            title: i18n.t('Trạng thái'),
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            width: 80,
            sorter: (aStatus, bStatus) => (aStatus.status ?? '' > (bStatus.status ?? '') ? 1 : -1),
            render(text) {
                return (
                    <StaticTag type={i18n.t(`OrderStatus.${text}`) || ''} color={`${setSaleOrderColor(text ?? '')}`} />
                );
            },
        },
        {
            title: i18n.t('Khách hàng'),
            width: 200,
            render: (_, record) => <p className="line-clamp-2">{`${record.contactName} - ${record.contactPhone}`}</p>,
        },
        {
            title: i18n.t('Số tiền'),
            dataIndex: 'totalIncludeVatAmt',
            key: 'totalIncludeVatAmt',
            width: 130,

            sorter: (aAmount, bAmount) =>
                aAmount.totalIncludeVatAmt ?? 0 > (bAmount.totalIncludeVatAmt ?? 0) ? 1 : -1,
            render: (_, record) => <p className="text-right">{Format.formatNumber(record.totalIncludeVatAmt)}</p>,
        },
    ];

    const renderButton = (
        <Col onClick={onOpen}>
            <Button className="text-xs" icon={<DiffOutlined />}>
                {i18n.t(`Đơn hàng đã áp dụng`)}
            </Button>
        </Col>
    );

    return (
        <Col>
            {renderButton}
            <Drawer
                title={i18n.t('Danh sách đơn hàng bán')}
                width={1000}
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
                onClose={() => setOpen(false)}
                closeIcon={false}
            >
                <GridTableComponent
                    columns={columnsData}
                    dataSource={saleOrderOfDiscount}
                    scrollY={window.innerHeight - 100}
                    bordered={true}
                    loading={isLoading}
                    isHidePagination
                    isHideSelectColumn
                    tableParams={{}}
                />
            </Drawer>
        </Col>
    );
};
