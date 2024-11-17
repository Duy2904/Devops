import { Button, Col, Form, FormInstance } from 'antd';
import { Dispatch, Fragment, SetStateAction, useEffect, useMemo, useState } from 'react';
import { ReceivableVoucherDto, ReceivableVoucherLineDto } from '@sdk/tour-operations';
import Table, { ColumnProps, ColumnsType } from 'antd/es/table';

import { AnyObject } from 'antd/es/_util/type';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import { CreateActionButton } from '@components/customizes/Button/CreateActionButton';
import Format from '@utils/format';
import { Pattern } from '@utils/formHelper';
import i18n from '@src/i18n';
import isEmpty from 'lodash/isEmpty';
import { useSaleOrderStore } from '@store/saleOrderStore';
import { canAddRemoveRow, canChangeAmount, validateAmount } from '../../../Features';
import clsx from 'clsx';
import { DeleteFilled } from '@ant-design/icons';
import { SOSearch } from './SOSearch';

interface TableDataProps {
    data: ReceivableVoucherLineDto[];
    form: FormInstance;
    refundId: string;
    dataRefund: ReceivableVoucherDto;
    setIsEnableEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setTravellerId: Dispatch<SetStateAction<string | undefined>>;
}

export type SaleOrderSelected = { id: string; orderId: string; orderNo: string };

export const TableData: React.FC<TableDataProps> = props => {
    const { data, form, refundId, dataRefund, setIsEnableEdit, setTravellerId } = props;
    const dataAmount = Form.useWatch('amountLines', form);
    const dataRemainingAmount = Form.useWatch('totalIncludeVatAmtLines', form);
    const [count, setCount] = useState<number>(0);
    const [dataForm, setDataForm] = useState<AnyObject[]>([]);
    const [listSaleOrderSelected, setListSaleOrderSelected] = useState<SaleOrderSelected[]>([]);

    const { itemReceivable, actions: { setItemReceivable } } = useSaleOrderStore(state => state);

    const commonColumns: ColumnsType<ReceivableVoucherLineDto> = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            width: 30,
            align: 'center',
            render: (_, record: AnyObject, index: number) => (
                <Fragment>
                    <BaseInput
                        isForm
                        isHidden
                        type="text"
                        name={['receivableVoucherLineIdLines', record.id!]}
                        initialValue={record.id}
                    />
                    <BaseInput
                        isForm
                        isHidden
                        type="text"
                        name={['receivableVoucherIdLines', record.id!]}
                        initialValue={record.receivableVoucherId}
                    />
                    <BaseInput
                        isForm
                        isHidden
                        type="text"
                        name={['tourScheduleIdLines', record.id!]}
                        initialValue={record.tourScheduleId}
                    />
                    <>{index + 1}</>
                </Fragment>
            ),
        },
        {
            title: 'Chứng từ',
            dataIndex: 'saleOrderId',
            key: 'saleOrderId',
            render: (_, record: ReceivableVoucherLineDto) => (
                <Col>
                    <SOSearch
                        form={form}
                        name={['saleOrderIdLines', record.id!]}
                        recordId={record.id!}
                        arrDataLines={data}
                        listSaleOrderSelected={listSaleOrderSelected}
                        inititalValue={record.saleOrderId!}
                        disabled={(!canChangeAmount(dataRefund) && !!refundId) || (!!record.amount && !record.saleOrderId)}
                        itemReceivable={itemReceivable}
                        setListSaleOrderSelected={setListSaleOrderSelected}
                        setTravellerId={setTravellerId}
                    />
                </Col>
            ),
        },
        {
            title: 'Phải trả',
            dataIndex: 'totalIncludeVatAmt',
            key: 'totalIncludeVatAmt',
            width: 200,
            align: 'right',
            render: (_, record: ReceivableVoucherLineDto) => (
                <>
                    <BaseInput
                        isForm
                        isHidden
                        name={['totalIncludeVatAmtLines', record.id!]}
                        initialValue={record.remainingAmount}
                    />
                    <p className='text-sm text-right'>{record.remainingAmount || form.getFieldValue(['totalIncludeVatAmtLines', record.id!])
                        ? Format.formatNumber(
                            record.remainingAmount ?? form.getFieldValue(['totalIncludeVatAmtLines', record.id!]),
                        )
                        : '-'}</p>
                </>
            ),
        },
        {
            title: 'Chi trả',
            dataIndex: 'amount',
            key: 'amount',
            width: 200,
            align: 'right',
            render: (_, record: ReceivableVoucherLineDto) => (
                <BaseInput
                    className="mb-0"
                    isForm
                    name={['amountLines', record.id!]}
                    initialValue={record.amount}
                    type="number"
                    rules={[
                        {
                            validator(_, value) {
                                return validateAmount(value, record, dataRefund, form);
                            },
                        },
                        {
                            pattern: Pattern.decimal3,
                            message: 'Giá trị không hợp lệ',
                        },
                    ]}
                    disable={(!canChangeAmount(dataRefund) && !!refundId)}
                />
            ),
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note',
            width: 300,
            render: (_, record: ReceivableVoucherLineDto) => (
                <>
                    <BaseInput
                        className="mb-0"
                        isForm
                        name={['noteLines', record.id!]}
                        initialValue={record.note}
                        showCount
                        maxCountNumber={500}
                    />
                </>
            ),
        },
    ];

    const columnAction: ColumnProps<ReceivableVoucherLineDto> = {
        key: 'operation',
        fixed: 'right',
        align: 'center',
        width: 70,
        render: (_, record: ReceivableVoucherLineDto) => <Button className={clsx(
            'flex items-center justify-center !w-7 !h-7 cursor-pointer font-bold transition-all ease-in-out rounded-md bg-[#FF4D4F]/[.1] text-[#FF4D4F] border border-solid border-[#FF4D4F] hover:!text-[#FF4D4F] hover:!bg-[#FF4D4F]/[.1] hover:opacity-80',
        )}
            icon={<DeleteFilled />} onClick={() => handleDelete(record)} />,
    };

    const columns: ColumnsType<ReceivableVoucherLineDto> = [...commonColumns];
    if (canAddRemoveRow(dataRefund) || !refundId) {
        columns.push(columnAction);
    }

    const totalSummary = useMemo(() => {
        return dataAmount ? Object.values(dataAmount).reduce(
            (acc, curr) => (acc as number) + (curr as number),
            0,
        ) as number : 0;
    }, [dataAmount])

    const totalRemainingAmount = useMemo(() => {
        return dataRemainingAmount ? Object.values(dataRemainingAmount).reduce(
            (acc, curr) => (acc as number) + (curr as number),
            0,
        ) as number : 0;
    }, [dataRemainingAmount])

    const handleSummary = () => {
        return (
            <Table.Summary>
                <Table.Summary.Row>
                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                    <Table.Summary.Cell index={2} className="text-right font-bold">
                        {Format.formatNumber(totalRemainingAmount)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3} className="text-right font-bold">
                        {Format.formatNumber(totalSummary)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={4}></Table.Summary.Cell>
                    {(canAddRemoveRow(dataRefund) || !refundId) && <Table.Summary.Cell index={5}></Table.Summary.Cell>}
                </Table.Summary.Row>
            </Table.Summary>
        );
    };

    const handleAdd = () => {
        const data = {
            id: `voucher-${count}`,
            receivableVoucherId: form.getFieldValue('id'),
        };
        const newData = data ?? [];
        setCount(count + 1);
        setDataForm([...dataForm, newData]);
        setIsEnableEdit(true);
    };

    const handleDelete = (record: ReceivableVoucherLineDto) => {
        const newArray = dataForm.filter(item => item.id !== record.id);
        const saleOrderSelectedRemove = form.getFieldValue(['saleOrderIdLines', record.id]);
        const newListSaleOrderSelected = listSaleOrderSelected.filter(
            item => item.orderId !== saleOrderSelectedRemove,
        );
        setDataForm(newArray);
        setListSaleOrderSelected(newListSaleOrderSelected);
        if (newArray.length == 0) {
            setIsEnableEdit(false);
            setTravellerId(undefined);
            form.setFieldValue('travellerId', undefined);
        }
    };

    useEffect(() => {
        if (data) {
            setDataForm(data);
            const fetchListSaleOrderSelected = data.map(item => {
                return { id: item.id ?? '', orderId: item.saleOrderId ?? '', orderNo: item.saleOrderOrderNo ?? '' };
            });
            setListSaleOrderSelected(fetchListSaleOrderSelected ?? []);
        }
    }, [data]);

    useEffect(() => {
        if (!isEmpty(itemReceivable.orderData) && data.length == 0) {
            const data = {
                id: `voucher-autoGen`,
                saleOrderId: itemReceivable.orderData.id,
                tourScheduleId: itemReceivable.orderData.tourScheduleId,
                remainingAmount: Math.abs(itemReceivable.orderData.remainingAmt!),
                amount: Math.abs(itemReceivable.orderData.remainingAmt!)
            };
            const newData = data ?? [];
            setDataForm([newData]);
            setTravellerId(itemReceivable.orderData.travellerId!);
            form.setFieldValue('travellerId', itemReceivable.orderData.travellerId);
            setListSaleOrderSelected([
                {
                    id: `voucher-autoGen`,
                    orderId: itemReceivable.orderData.id,
                    orderNo: itemReceivable.orderData.orderNo,
                },
            ] as {
                id: string;
                orderId: string;
                orderNo: string;
            }[]);
            setTimeout(() => {
                setItemReceivable({ orderData: {} });
                setIsEnableEdit(true);
            }, 500);
        }
    }, [data, form, itemReceivable, setIsEnableEdit, setItemReceivable, setTravellerId]);

    useEffect(() => {
        if (!isEmpty(listSaleOrderSelected)) {
            form.setFieldValue('description', `${i18n.t('Hoàn tiền cho khách')} ${listSaleOrderSelected.filter(data => !isEmpty(data.orderNo)).map(item => item.orderNo).join(', ')}`);
        } else {
            form.setFieldValue('description', i18n.t('Hoàn tiền cho khách'));
        }
    }, [form, listSaleOrderSelected]);

    return (
        <div className="p-4">
            {(canAddRemoveRow(dataRefund) || !refundId) && <CreateActionButton title='' handleAdd={handleAdd} />}
            <Table
                className="table-striped-rows"
                columns={columns}
                dataSource={dataForm}
                rowKey="id"
                bordered
                pagination={false}
                size="small"
                scroll={{ x: 1200 }}
                summary={handleSummary}
            />
        </div>
    );
};
