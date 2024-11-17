import { Checkbox, Col, Flex } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { ColumnsType } from 'antd/es/table';
import clsx from 'clsx';
import dayjs from 'dayjs';
import isNil from 'lodash/isNil';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { GridTableComponent } from '@components/ui/GridTable';
import { SaleOrderDto, SaleOrderLineTravellerDto } from '@sdk/tour-operations';
import { TagStatus } from '@src/new/components/ui/Tag/TagStatus';
import { splitNamePassengerType, TitleSplitPassengerType } from '@src/new/fragments/SaleOrders/features';
import { PageName } from '@src/types/TypeEnum';
import { AppConfig } from '@utils/config';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import i18n from '@src/i18n';

interface GuessInfoProps {
    data?: SaleOrderDto;
}

export const GuessInfo: React.FC<GuessInfoProps> = ({ data }) => {
    // hooks
    const { t } = useTranslation();
    const dataTravellers = useMemo(() => {
        const countItemPassengerType = new Map();

        const dataChangePassengerTypeName = data?.saleOrderLineTravellers?.map(item => {
            const passengerTypeCode = item.passengerType?.code ?? '';
            const passengerTypeName = item.passengerType?.name ?? '';
            const dataNameSplit: TitleSplitPassengerType = splitNamePassengerType(passengerTypeName);

            const existingItemCount = countItemPassengerType.get(passengerTypeCode) ?? 0;
            countItemPassengerType.set(passengerTypeCode, existingItemCount + 1);

            return {
                ...item,
                passengerType: {
                    ...item.passengerType,
                    customTypeTravellerName: `${dataNameSplit.title}${existingItemCount + 1}`,
                },
            };
        });

        const dataTravellerMergeSort = dataChangePassengerTypeName?.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

        return dataTravellerMergeSort;
    }, [data?.saleOrderLineTravellers]);

    const quantityHasVisa = useMemo(
        () => dataTravellers?.reduce((count, x) => count + (x.hasVisa ? 1 : 0), 0) ?? 0,
        [dataTravellers],
    );

    const columnsData: ColumnsType<AnyObject> = [
        {
            title: '',
            dataIndex: 'id',
            key: 'id',
            width: 120,
            align: 'center',
            hidden: true,
            render: (_, __, index: number) => <span className="text-sm">{index + 1}</span>,
        },
        {
            title: t('Loại HK'),
            width: 400,
            render: (_, record) => {
                return <p className="text-sm font-bold">{record.passengerType?.customTypeTravellerName}</p>;
            },
        },
        {
            title: t('Họ và tên'),
            dataIndex: 'fullName',
            width: 400,
            render: value => <p className="text-sm">{value}</p>,
        },
        {
            title: t('Ngày sinh'),
            dataIndex: 'dateOfBirth',
            width: 220,
            render: value => <p className="text-sm">{value ? dayjs(value).format(AppConfig.DateFormat) : undefined}</p>,
        },
        {
            title: t('Giới tính'),
            dataIndex: 'gender',
            width: 220,
            render: value => <p className="text-sm">{!isNil(value) && t(`GenderType.${value}`)}</p>,
        },
        {
            title: t('SĐT'),
            dataIndex: 'phone',
            width: 220,
            render: value => <p className="text-sm">{value}</p>,
        },
        {
            title: <>{data?.tourSchedule?.tourCategoryName == 'Domestic' ? t('CCCD') : t('Hộ chiếu')}</>,
            width: 220,
            render: (_, record: SaleOrderLineTravellerDto) => (
                <p className="text-sm">
                    {data?.tourSchedule?.tourCategoryName == 'Domestic' ? record.identityId : record.passport}
                </p>
            ),
        },
        {
            title: t('Quốc tịch'),
            dataIndex: 'country',
            width: 220,
            render: (_, record: SaleOrderLineTravellerDto) => <p className="text-sm">{record.country?.name}</p>,
        },
        {
            title: t('Đã có VISA'),
            dataIndex: 'hasVisa',
            key: 'hasVisa',
            width: 220,
            align: 'center',
            render: value => <Checkbox checked={value} />,
        },
        {
            title: t('Loại phòng'),
            dataIndex: 'roomType',
            width: 220,
            align: 'center',
            render: value => <p className="text-sm">{!isNil(value) && t(`saleorder.roomContent.${value}`)}</p>,
        },
        {
            title: t('Số phòng'),
            dataIndex: 'roomNumber',
            width: 220,
            align: 'center',
            render: value => <p className="text-sm">{value}</p>,
        },
        {
            title: t('Ghi chú'),
            dataIndex: 'description',
            width: 500,
            render: value => <p className="text-sm">{value}</p>,
        },
        {
            title: t('Trạng thái'),
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            width: 300,
            render(text, record: SaleOrderLineTravellerDto) {
                return (
                    <TagStatus
                        page={PageName.SaleOrder}
                        status={`${record.orderStatus}`}
                        text={i18n.t(`TravellerOrderStatus.${text}`)}
                    />
                );
            },
        },
        {
            title: t('Loại HK'),
            width: 600,
            render: (_, record: SaleOrderLineTravellerDto) => {
                const dataNameSplit: TitleSplitPassengerType = splitNamePassengerType(record.passengerType?.name ?? '');
                return (
                    <>
                        <p className="text-sm font-bold">{dataNameSplit.title}</p>
                        <p className="text-xs text-black/40">{dataNameSplit.subTitle}</p>
                    </>
                );
            },
        },
    ];

    return (
        <>
            <Flex justify="space-between">
                <h2 className="text-black text-[15px]/[22px] font-bold">{t('Thông tin khách')}</h2>
                {(data?.numberOfVisas ?? 0) > 0 && (
                    <p
                        className={clsx(
                            'py-0.5 px-1.5 bg-[#1677FF]/[.2] rounded-md text-sm',
                            quantityHasVisa < (data?.numberOfVisas ?? 0)
                                ? `${Color.text_FF4D4F} bg-[#FF4D4F]/[.2]`
                                : `${Color.text_1677FF} bg-[#1677FF]/[.2]`,
                        )}
                    >
                        Số khách đã có VISA {quantityHasVisa}/{data?.numberOfVisas ?? 0}
                    </p>
                )}
            </Flex>
            <Col className="mt-[10px] form-travellers">
                <GridTableComponent
                    isStriped
                    columns={data?.isTourServiceVisa ? columnsData : columnsData.filter(x => x.key != 'hasVisa')}
                    scrollX={1900}
                    dataSource={dataTravellers}
                    tableParams={{}}
                    isHideSelectColumn
                    isHidePagination
                />
            </Col>
        </>
    );
};
