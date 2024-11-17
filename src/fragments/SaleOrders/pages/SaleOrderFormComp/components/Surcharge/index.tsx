import { Button, Form, FormInstance, Input, InputNumber, Table } from 'antd';
import { OrderStatus, SaleOrderLineDto, SearchTourScheduleSurchargesRequest } from '@sdk/tour-operations';
import { RouteChangeTourSOState, RouteCloneSOState, removeDefaultID } from '@fragments/SaleOrders/features';
import { removeID, transformDataForm } from '@utils/formHelper';
import { useCallback, useEffect, useState } from 'react';

import { AnyObject } from 'antd/es/_util/type';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import Can from '@components/common/Can';
import { ColumnsType } from 'antd/es/table';
import { DeleteButton } from '@components/customizes/Button/DeleteButton';
import { DeleteOutlined } from '@ant-design/icons';
import Format from '@utils/format';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { ProductSelect } from '@components/customizes/Select/ProductSelect';
import { defaultID } from '../../type/enum';
import i18n from '@src/i18n';
import isInteger from 'lodash/isInteger';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { useCheckSOTN } from '@fragments/SaleOrders/hooks/useCheckSOTN';
import { useDebouncedCallback } from 'use-debounce';
import { useDeleteProductSaleOrderLine } from '@hooks/queries/useProductSaleOrderLines1';
import { useLocation } from 'react-router-dom';
import { useSaleOrderDetailStore } from '@fragments/SaleOrders/store/saleOrderDetailStore';
import { useSaleOrderFormStore } from '@fragments/SaleOrders/store/saleOrderFormStore';
import { useSaleOrderStore } from '@store/saleOrderStore';
import { useTourScheduleSurchargeInfos } from '@hooks/queries/useTourScheduleSurcharge';
import { useTourSurchargeStore } from '@store/tourSurchargeStore';

export interface TotalServiceProductProps {
    readonly form: FormInstance;
    readonly isEnableEdit: boolean;
    readonly isFirstTimeDirty: boolean;
    soId: string | undefined;
    setIsEnableEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setIsFirstTimeDirty: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SurchargeComponent: React.FC<TotalServiceProductProps> = props => {
    const { form, setIsEnableEdit, isFirstTimeDirty, setIsFirstTimeDirty, soId } = props;

    const { clonedId } = (useLocation().state ?? { cloneId: false }) as RouteCloneSOState;
    const { changeTourSOId } = (useLocation().state ?? { changeTourSOId: false }) as RouteChangeTourSOState;
    const isSOTN = useCheckSOTN();

    const { mutateAsync: deleteProductSaleOrderLine } = useDeleteProductSaleOrderLine();
    const { mutateAsync: getTourScheduleSurchares } = useTourScheduleSurchargeInfos();

    // Store
    const {
        tourSurcharges,
        selectTourSurcharges,
        actions: { setTourSurcharge },
    } = useTourSurchargeStore(state => state);
    const {
        actions: { setSurchargeTotalAmount },
    } = useSaleOrderFormStore(state => state);

    const { saleOrder, saleOrderFormStatus } = useSaleOrderStore(state => state);
    const {
        tourId,
        actions: { setSaleOrderLines },
    } = useSaleOrderDetailStore(state => state);

    // State
    const [count, setCount] = useState(1);
    const [data, setData] = useState<SaleOrderLineDto[]>([]);
    const [disableFields, setDisableFields] = useState<string[]>([]);
    const [currentTourId, setCurrentTourId] = useState<string>();

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
                    dataSelect={selectTourSurcharges}
                    onChange={(value: string) => onTourSurchargeChange(value, record.id!)}
                    disabled={disableFields.includes('productId') || !record.id?.includes(defaultID.surcharge)}
                />
            ),
        },
        {
            title: i18n.t(`saleorder.surcharge.quantity`),
            dataIndex: 'quantity',
            width: 100,
            render: (value: number, record: SaleOrderLineDto) => (
                <Form.Item
                    className="mb-0"
                    name={['quantity', record.id!]}
                    rules={[{ required: true, message: i18n.t(`saleorder.surcharge.require.requireQuantity`) }]}
                    initialValue={value}
                >
                    <InputNumber
                        onChange={() => calculateAmount(record.id!)}
                        disabled={disableFields.includes('quantity')}
                    />
                </Form.Item>
            ),
        },
        {
            title: i18n.t(`saleorder.surcharge.salesPrice`),
            dataIndex: 'salesPrice',
            width: 200,
            render: (value: number, record: SaleOrderLineDto) => (
                <BaseInput
                    className="mb-0"
                    isForm
                    type="number"
                    name={['salesPrice', record.id!]}
                    initialValue={value}
                    disable
                />
            ),
        },
        {
            title: i18n.t(`saleorder.surcharge.amount`),
            dataIndex: 'amount',
            width: 200,
            render: (value: number, record: SaleOrderLineDto) => (
                <BaseInput
                    className="mb-0"
                    isForm
                    type="number"
                    name={['amount', record.id!]}
                    initialValue={value}
                    disable
                />
            ),
        },
        {
            title: i18n.t(`saleorder.surcharge.description`),
            dataIndex: 'description',
            width: 300,
            render: (value: number, record: SaleOrderLineDto) => (
                <BaseInput className="mb-0" isForm name={['description', record.id!]} initialValue={value} disable />
            ),
        },
        {
            title: i18n.t(`action.action`),
            key: 'operation',
            fixed: disableFields.includes('delete') ? false : 'right',
            align: 'center',
            width: 80,
            render: (_, record: SaleOrderLineDto) => (
                <div className="gap-4 justify-center">
                    {record?.id && !record?.id.startsWith(defaultID.surcharge) ? (
                        <Can permissions={[MyPermissions.SaleOrderUpdate, MyPermissions.AgencySaleOrderUpdate]}>
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
                        </Can>
                    ) : (
                        <DeleteOutlined onClick={() => onDelete(record)} />
                    )}
                </div>
            ),
        },
    ];

    const onDelete = async (record: SaleOrderLineDto) => {
        if (!record.id || disableFields.includes('delete')) return;

        if (!record.id.startsWith(defaultID.surcharge)) {
            await deleteProductSaleOrderLine(record.id);
            toastSuccess(i18n.t('message.default.deleteContentSuccess'), '');
        }

        const dataList = transformDataForm(form);
        setData(data.filter(x => x.id != record.id));
        setSaleOrderLines(
            removeID(
                dataList.filter(x => x.id != record.id),
                defaultID.surcharge,
            ),
        );
    };

    const onTourSurchargeChange = (value: string, id: string) => {
        const newData = data.map(item => {
            if (item.id != id) return item;

            const tourSurcharge = tourSurcharges.filter(x => x.productId == value)[0];
            if (!tourSurcharge) return item;

            form.setFieldValue(['salesPrice', id], tourSurcharge.taxInclusivePrice);
            form.setFieldValue(['description', id], tourSurcharge.description);
            return {
                ...item,
                salesPrice: tourSurcharge.taxInclusivePrice,
                description: tourSurcharge.description,
            };
        });
        setData(newData);
        calculateAmount(id);
    };

    const calculateAmount = (id: string) => {
        const quantity = form.getFieldValue(['quantity', id]);
        const salePrice = form.getFieldValue(['salesPrice', id]);

        const newData = data.map(item => {
            if (item.id != id) return item;

            if (quantity && isNumber(salePrice)) {
                const amount = Number(quantity) * Number(salePrice);
                form.setFieldValue(['amount', id], amount);

                return {
                    ...item,
                    amount: amount,
                };
            }

            form.setFieldValue(['amount', id], undefined);
            return {
                ...item,
                salesPrice: undefined,
            };
        });
        setData(newData);
    };

    // Get list SaleOrderLine
    const fetchData = useCallback(async () => {
        if (saleOrder?.saleOrderLines) {
            const response = saleOrder?.saleOrderLines ?? [];
            setData(Format.formatSortListByOrder(response));
            const numArray = (response ?? []).map(item => item.order ?? 0);
            setCount(isInteger(Math.max(...numArray)) ? Math.max(...numArray) : 1);
            setSaleOrderLines(response ?? []);
        }
    }, [saleOrder?.saleOrderLines, setSaleOrderLines]);

    const fetchTourScheduleSurcharges = useCallback(
        async (tourScheduleId: string) => {
            if (!tourScheduleId) return;

            const request: SearchTourScheduleSurchargesRequest = {
                advancedSearch: {
                    fields: ['tourScheduleId'],
                    keyword: tourScheduleId,
                },
            };
            const response = await getTourScheduleSurchares(request);
            setTourSurcharge(response.data ?? []);
        },
        [getTourScheduleSurchares, setTourSurcharge],
    );

    useEffect(() => {
        if (isString(soId) && soId !== '') {
            fetchData();
        }
    }, [soId, fetchData, saleOrderFormStatus.soId]);

    useEffect(() => {
        fetchTourScheduleSurcharges(tourId ?? '');
    }, [tourId, fetchTourScheduleSurcharges]);

    useEffect(() => {
        const surchargeTotalAmount = data.reduce((total, record) => total + (record.amount ?? 0), 0);
        setSurchargeTotalAmount(surchargeTotalAmount);
    }, [data, setSurchargeTotalAmount]);

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
        const paymentAmt = saleOrder?.paymentAmt ?? 0;

        if (isSOTN) {
            setDisableFields(['productId', 'quantity', 'btnAdd', 'delete']);
            return;
        }

        if (saleOrder?.status) {
            if (
                statusShouldDisableFields.includes(saleOrder.status) ||
                (saleOrder.status == OrderStatus.Confirming && paymentAmt > 0)
            ) {
                setDisableFields(['productId', 'quantity', 'btnAdd', 'delete']);
            } else {
                setDisableFields([]);
            }
        }
    }, [isSOTN, saleOrder?.paymentAmt, saleOrder.status]);

    useEffect(() => {
        handleDisableFields();
    }, [handleDisableFields]);

    const handleAdd = () => {
        const newItem: SaleOrderLineDto = {
            id: `${defaultID.surcharge}-${count}`,
            order: count + 1,
        };
        setData([...data, newItem]);
        setCount(count + 1);
    };

    const debounceSetSurcharge = useDebouncedCallback(values => {
        const dataList = removeDefaultID(values, defaultID.surcharge);
        setSaleOrderLines(dataList);
    }, 500);

    const onValuesChange = (_value: AnyObject, values: AnyObject) => {
        if (isFirstTimeDirty && !props.isEnableEdit) {
            setIsFirstTimeDirty(false);
            setIsEnableEdit(true);
        }
        debounceSetSurcharge(values);
    };

    // check clear surcharge when change tour for changeTour/CloneSO
    useEffect(() => {
        const isDifferentTour =
            (currentTourId && currentTourId !== tourId) || (!currentTourId && (!!clonedId || !!changeTourSOId));

        if (isDifferentTour) {
            setData([]);
            setCurrentTourId(tourId);
        }
    }, [changeTourSOId, clonedId, currentTourId, tourId]);

    return (
        <Form form={form} onValuesChange={onValuesChange} className="p-6">
            <div className="flex mb-2 justify-between align-center">
                <p>{i18n.t('saleorder.surcharge.subtitle')}</p>
                <Button
                    disabled={!tourId || selectTourSurcharges.length <= 0 || disableFields.includes('btnAdd')}
                    onClick={handleAdd}
                >
                    {i18n.t('action.create')}
                </Button>
            </div>
            <Table
                className="w-max-[1366px] text-center overflow-x-auto block"
                size="small"
                bordered
                columns={columnsSaleOrderline}
                rowKey="id"
                dataSource={data}
                pagination={false}
                scroll={{ x: 1000 }}
            />
        </Form>
    );
};
