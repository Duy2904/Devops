import { Button, Flex, Form, FormInstance, Input, InputNumber, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import isEmpty from 'lodash/isEmpty';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { BaseInput } from '@components/customizes/Input/BaseInput';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { defaultID } from '@fragments/SaleOrders/pages/SaleOrderFormComp/type/enum';
import { OrderStatus, SaleOrderDto, SaleOrderLineDto } from '@sdk/tour-operations';
import i18n from '@src/i18n';
import Can from '@src/new/components/common/Can';
import { DeleteButton } from '@src/new/components/customs/Buttons/DeleteButton';
import { Price } from '@src/new/fragments/SaleOrders/components/Price';
import Format from '@src/new/shared/utils/format';
import { convertValues } from '@utils/formHelper';
import { MyPermissions } from '@utils/Permissions';

import { RouteCloneSOState } from '../../../features';
import { useQueryGetTourScheduleUseId } from '../../../hooks/queries';
import { ProductSelect } from '../../Select/ProductSelect';

interface SurchargeProps {
    dataSO?: SaleOrderDto;
    surchargeForm: FormInstance;
    tourInfoForm: FormInstance;
    isEnableEdit: boolean;
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
}

export const Surcharge: React.FC<SurchargeProps> = props => {
    const { dataSO, surchargeForm, tourInfoForm, isEnableEdit, setIsEnableEdit } = props;

    const { clonedId } = (useLocation().state ?? { cloneId: false }) as RouteCloneSOState;

    const tourIdWatch = Form.useWatch('tourScheduleId', tourInfoForm);
    const dataFormWatch = Form.useWatch([], surchargeForm);
    const dataConvert: SaleOrderLineDto[] = convertValues(dataFormWatch);

    // State
    const [count, setCount] = useState(1);
    const [data, setData] = useState<SaleOrderLineDto[]>([]);
    const [dataSelectSurcharge, setDataSelectSurcharge] = useState<
        {
            value: string;
            label: string;
        }[]
    >([]);
    const [disableFields, setDisableFields] = useState<string[]>([]);
    const [isFirstTimeInitData, setIsFirstTimeInitData] = useState<boolean>(true);

    // Query
    const { data: dataTourSchedule, isLoading } = useQueryGetTourScheduleUseId(tourIdWatch);

    const handleAdd = () => {
        const newItem: SaleOrderLineDto = {
            id: `${defaultID.surcharge}-${count}`,
            order: count + 1,
        };
        setData([...data, newItem]);
        setCount(count + 1);
    };

    const onDelete = async (record: SaleOrderLineDto) => {
        if (!record.id || disableFields.includes('delete')) return;

        if (!record.id.startsWith(defaultID.surcharge)) {
            toastSuccess(i18n.t('message.default.deleteContentSuccess'), '');
        }

        setData(data.filter(x => x.id != record.id));

        if (!isEnableEdit) {
            setIsEnableEdit(true);
        }
    };

    const calculateAmount = useCallback(
        (id: string, value: number, salesPrice: number) => {
            const newData = data?.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        amount: value * salesPrice,
                    };
                }

                return item;
            });

            setData(newData);
        },
        [data],
    );

    const onTourSurchargeChange = (value: string, id: string) => {
        const newData = data.map(item => {
            if (item.id != id) return item;

            const tourSurcharge = dataTourSchedule?.tourScheduleSurcharges?.filter(x => x.productId == value)[0];
            if (!tourSurcharge) return item;

            surchargeForm.setFieldValue(['salesPrice', id], tourSurcharge.taxInclusivePrice);
            surchargeForm.setFieldValue(['description', id], tourSurcharge.description);
            return {
                ...item,
                productId: tourSurcharge.productId,
                salesPrice: tourSurcharge.taxInclusivePrice,
                description: tourSurcharge.description,
            };
        });
        setData(newData);
    };

    const calculateTotalAll = useMemo(() => {
        return dataConvert.length > 0
            ? dataConvert.reduce((total, record) => total + (record.salesPrice ?? 0) * (record.quantity ?? 0), 0)
            : 0;
    }, [dataConvert]);

    const onValuesChange = () => {
        if (!isEnableEdit) {
            setIsEnableEdit(true);
        }
    };

    const handleDisableFields = useCallback(() => {
        const statusShouldDisableFields = [
            OrderStatus.Canceled,
            OrderStatus.Paid,
            OrderStatus.Confirmed,
            OrderStatus.Deposited,
            OrderStatus.WaitRefund,
            OrderStatus.SendRefund,
            OrderStatus.CompletedRefund,
        ];
        const paymentAmt = dataSO?.paymentAmt ?? 0;

        if (dataSO?.status) {
            if (
                statusShouldDisableFields.includes(dataSO.status) ||
                (dataSO.status == OrderStatus.Confirming && paymentAmt > 0)
            ) {
                setDisableFields(['productId', 'quantity', 'btnAdd', 'delete']);
            } else {
                setDisableFields([]);
            }
        }
    }, [dataSO?.paymentAmt, dataSO?.status]);

    useEffect(() => {
        handleDisableFields();
    }, [handleDisableFields]);

    useEffect(() => {
        if (!isEmpty(dataTourSchedule?.tourScheduleSurcharges)) {
            const listSelect =
                dataTourSchedule?.tourScheduleSurcharges?.map(tourSchedule => ({
                    label: tourSchedule.productName ?? '',
                    value: tourSchedule.productId ?? '', // Used for Sale order
                })) ?? [];
            setDataSelectSurcharge(listSelect);
        } else {
            setDataSelectSurcharge([]);
        }
    }, [dataTourSchedule?.tourScheduleSurcharges]);

    useEffect(() => {
        if (isFirstTimeInitData && !isEmpty(dataSO) && !clonedId) {
            const dataSort = Format.formatSortListByOrder(dataSO?.saleOrderLines);
            setData(dataSort);
            setIsFirstTimeInitData(false);
        }
    }, [clonedId, dataSO, isFirstTimeInitData]);

    // Table Column
    const columnsSaleOrderline: ColumnsType<SaleOrderLineDto> = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            width: 50,
            align: 'center',
            render: (value: string, record: SaleOrderLineDto, index: number) => (
                <>
                    <Form.Item className="ignore-duplicate" name={['id', record.id!]} initialValue={value} hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        className="ignore-duplicate"
                        name={['saleOrderId', record.id!]}
                        initialValue={record.saleOrderId}
                        hidden
                    >
                        <Input />
                    </Form.Item>
                    <BaseInput isForm isHidden type="text" name={['order', record.id!]} initialValue={record.order} />
                    <>{index + 1}</>
                </>
            ),
        },
        {
            title: i18n.t(`saleorder.surcharge.product`),
            dataIndex: 'productId',
            key: 'productId',
            width: 300,
            render: (_, record: SaleOrderLineDto) => (
                <ProductSelect
                    isForm
                    className="mb-0"
                    name={['productId', record.id!]}
                    initialValue={record.productId}
                    rules={[{ required: true, message: i18n.t(`saleorder.surcharge.require.requireProduct`) }]}
                    dataSelect={dataSelectSurcharge}
                    onChange={(value: string) => onTourSurchargeChange(value, record.id!)}
                    disabled={disableFields.includes('productId') || !record.id?.includes(defaultID.surcharge)}
                />
            ),
        },
        {
            title: i18n.t(`saleorder.surcharge.quantity`),
            dataIndex: 'quantity',
            key: 'quantity',
            width: 120,
            render: (value: number, record: SaleOrderLineDto) => (
                <Form.Item
                    className="mb-0"
                    name={['quantity', record.id!]}
                    rules={[{ required: true, message: i18n.t(`saleorder.surcharge.require.requireQuantity`) }]}
                    initialValue={value}
                >
                    <InputNumber
                        onChange={e => calculateAmount(record.id!, Number(e ?? 0), Number(record.salesPrice ?? 0))}
                        disabled={disableFields.includes('quantity')}
                    />
                </Form.Item>
            ),
        },
        {
            title: i18n.t(`saleorder.surcharge.price`),
            dataIndex: 'salesPrice',
            key: 'salesPrice',
            width: 200,
            render: (value: number, record: SaleOrderLineDto) => (
                <>
                    <BaseInput isForm isHidden type="number" name={['salesPrice', record.id!]} initialValue={value} />
                    <Price value={value} className="font-bold" />
                </>
            ),
        },
        {
            title: i18n.t(`saleorder.surcharge.amount`),
            width: 200,
            render: (_, record: SaleOrderLineDto) => (
                <>
                    <Price value={record.amount} isHighlight />
                </>
            ),
        },
        {
            title: i18n.t(`saleorder.surcharge.description`),
            dataIndex: 'description',
            key: 'description',
            width: 300,
            render: (value: number, record: SaleOrderLineDto) => (
                <BaseInput className="mb-0" isForm name={['description', record.id!]} initialValue={value} />
            ),
        },
        {
            key: 'operation',
            fixed: disableFields.includes('delete') ? false : 'right',
            align: 'center',
            width: 80,
            render: (_, record: SaleOrderLineDto) => (
                <div className="gap-4 justify-center">
                    <Can permissions={[MyPermissions.SaleOrderUpdate, MyPermissions.AgencySaleOrderUpdate]}>
                        {!disableFields.includes('delete') ? (
                            <DeleteButton
                                titleName={i18n.t(`saleorder.surcharge.title`)}
                                content={
                                    record?.product?.name ? (
                                        <p>
                                            {i18n.t(`saleorder.surcharge.delete.pre`)}{' '}
                                            <span className="font-semibold">{record?.product?.name}</span>{' '}
                                            {i18n.t(`saleorder.surcharge.delete.after`)}
                                        </p>
                                    ) : (
                                        ''
                                    )
                                }
                                onOk={() => {
                                    onDelete(record);
                                }}
                                disabled={disableFields.includes('delete')}
                            />
                        ) : (
                            <></>
                        )}
                    </Can>
                </div>
            ),
        },
    ];

    const handleSummary = () => {
        return (
            <Table.Summary>
                <Table.Summary.Row>
                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                    <Table.Summary.Cell index={2}></Table.Summary.Cell>
                    <Table.Summary.Cell index={3}></Table.Summary.Cell>
                    <Table.Summary.Cell index={4}>
                        <Price className="font-bold text-center" value={calculateTotalAll} isHighlight />
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={5}></Table.Summary.Cell>
                    <Table.Summary.Cell index={6}></Table.Summary.Cell>
                </Table.Summary.Row>
            </Table.Summary>
        );
    };

    return (
        <div className="p-5">
            <Flex justify="space-between" align="center" className="mb-5">
                <p className="font-bold">{i18n.t('saleorder.surcharge.subtitle')}</p>
                {!disableFields.includes('btnAdd') &&
                    tourIdWatch &&
                    (dataTourSchedule?.tourScheduleSurcharges?.length ?? 0) > 0 && (
                        <Button disabled={isLoading} onClick={handleAdd}>
                            {i18n.t('action.create')}
                        </Button>
                    )}
            </Flex>
            <Form form={surchargeForm} onValuesChange={onValuesChange}>
                <Table
                    className="w-max-[1366px] text-center overflow-x-auto block table-striped-rows"
                    size="small"
                    bordered
                    columns={columnsSaleOrderline}
                    rowKey="id"
                    dataSource={data}
                    pagination={false}
                    scroll={{ x: 1000 }}
                    loading={isLoading}
                    summary={handleSummary}
                />
            </Form>
        </div>
    );
};
