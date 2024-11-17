import { Col, Form, FormInstance } from 'antd';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ReceivableVoucherDto, ReceivableVoucherLineDto } from '@sdk/tour-operations';
import Table, { ColumnProps, ColumnsType } from 'antd/es/table';
import { TourSaleOrder, canAddRemoveRow, canChangeAmount, validateAmount, valuesLabelSelected } from '../Features';

import { AnyObject } from 'antd/es/_util/type';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import { CreateActionButton } from '@components/customizes/Button/CreateActionButton';
import { DeleteOutlined } from '@ant-design/icons';
import Format from '@utils/format';
import { Pattern } from '@utils/formHelper';
import { SaleOrderSearch } from './SaleOrderSearch';
import { TourSearch } from './TourSearch';
import i18n from '@src/i18n';
import isEmpty from 'lodash/isEmpty';
import { useSaleOrderStore } from '@store/saleOrderStore';

interface TableDataProps {
    data: ReceivableVoucherLineDto[];
    form: FormInstance;
    refundId: string;
    dataRefund: ReceivableVoucherDto;
    isLoading?: boolean;
    canChangeData?: boolean;
    setSubmittable: React.Dispatch<React.SetStateAction<boolean>>;
    setTravellerId: Dispatch<SetStateAction<string | undefined>>;
}

export const TableData: React.FC<TableDataProps> = props => {
    const { data, form, refundId, dataRefund, isLoading, canChangeData, setSubmittable, setTravellerId } = props;
    const dataAmount = Form.useWatch('amountLines', form);

    const [count, setCount] = useState<number>(0);
    const [dataForm, setDataForm] = useState<AnyObject[]>([]);
    const [dataTourSale, setDataTourSale] = useState<TourSaleOrder[]>([]);
    const [listSaleOrderSelected, setListSaleOrderSelected] = useState<{ id: string; saleOrderSelected: string }[]>([]);
    const [totalSummary, setTotalSummary] = useState<number>(0);

    const { itemReceivable } = useSaleOrderStore(state => state);

    const commonColumns: ColumnsType<ReceivableVoucherLineDto> = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
            width: 30,
            align: 'center',
            render: (_, record: AnyObject, index: number) => (
                <>
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
                    <>{index + 1}</>
                </>
            ),
        },
        {
            title: 'Tour',
            dataIndex: 'tourScheduleId',
            key: 'tourScheduleId',
            width: 384,
            render: (_, record: ReceivableVoucherLineDto) => (
                <Col className="w-96">
                    <TourSearch
                        name={['tourScheduleIdLines', record.id!]}
                        form={form}
                        setDataTourSale={setDataTourSale}
                        recordId={record.id!}
                        initialValue={record.tourScheduleId ?? ''}
                        disabled={(!canChangeAmount(dataRefund) && !!refundId) || !canChangeData}
                        dataRefundDetail={dataRefund}
                    />
                </Col>
            ),
        },
        {
            title: 'Chứng từ',
            dataIndex: 'saleOrderId',
            key: 'saleOrderId',
            width: 256,
            render: (_, record: ReceivableVoucherLineDto) => (
                <Col className="w-64">
                    <SaleOrderSearch
                        name={['saleOrderIdLines', record.id!]}
                        form={form}
                        recordId={record.id!}
                        optionData={
                            dataTourSale.find(
                                item => item.tourId === form.getFieldValue(['tourScheduleIdLines', record.id]),
                            )?.listSaleOrder ?? []
                        }
                        setListSaleOrderSelected={setListSaleOrderSelected}
                        listSaleOrderSelected={listSaleOrderSelected}
                        initialValue={record.saleOrderId ?? ''}
                        disabled={(!canChangeAmount(dataRefund) && !!refundId) || !canChangeData}
                        dataRefundDetail={dataRefund}
                        setTravellerId={setTravellerId}
                    />
                </Col>
            ),
        },
        {
            title: 'Số tiền phải trả',
            dataIndex: 'totalIncludeVatAmt',
            key: 'totalIncludeVatAmt',
            width: 200,
            render: (_, record: ReceivableVoucherLineDto) => (
                <>
                    <BaseInput
                        className="mb-0"
                        isForm
                        name={['totalIncludeVatAmtLines', record.id!]}
                        initialValue={record.remainingAmount}
                        type="number"
                        disable
                    />
                </>
            ),
        },
        {
            title: 'Số tiền chi trả',
            dataIndex: 'amount',
            key: 'amount',
            width: 200,
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
                    disable={(!canChangeAmount(dataRefund) && !!refundId) || !canChangeData}
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
        width: 50,
        render: (_, record: ReceivableVoucherLineDto) => <DeleteOutlined onClick={() => handleDeleteRowData(record)} />,
    };

    const handleSummary = () => {
        return (
            <Table.Summary>
                <Table.Summary.Row>
                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                    <Table.Summary.Cell index={2}></Table.Summary.Cell>
                    <Table.Summary.Cell index={3} className="text-right font-bold">
                        {i18n.t('Tổng cộng')}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={4} className="text-right font-bold">
                        {Format.formatNumber(totalSummary)}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={5}></Table.Summary.Cell>
                </Table.Summary.Row>
            </Table.Summary>
        );
    };

    const columns: ColumnsType<ReceivableVoucherLineDto> = [...commonColumns];
    if (canAddRemoveRow(dataRefund) || !refundId) {
        columns.push(columnAction);
    }

    const handleAdd = () => {
        const data = {
            id: `voucher-${count}`,
            receivableVoucherId: form.getFieldValue('id'),
        };
        const newData = data ?? [];
        setCount(count + 1);
        setDataForm([...dataForm, newData]);
        setSubmittable(true);
    };

    const handleDeleteRowData = (record: ReceivableVoucherLineDto) => {
        const newArray = dataForm.filter(item => item.id !== record.id);
        const saleOrderSelectedRemove = form.getFieldValue(['saleOrderIdLines', record.id]);
        const newListSaleOrderSelected = listSaleOrderSelected.filter(
            item => item.saleOrderSelected !== saleOrderSelectedRemove,
        );
        setDataForm(newArray);
        setListSaleOrderSelected(newListSaleOrderSelected);
        setSubmittable(!(newArray.length == 0));
    };

    useEffect(() => {
        if (data) {
            setDataForm(data);
            const fetchListSaleOrderSelected = data.map(item => {
                return { id: item.id, saleOrderSelected: item.saleOrderId };
            }) as { id: string; saleOrderSelected: string }[];
            setListSaleOrderSelected(fetchListSaleOrderSelected);
        }
    }, [data]);

    useEffect(() => {
        if (dataAmount) {
            const tempAmount = Object.values(dataAmount).reduce(
                (acc, curr) => (acc as number) + (curr as number),
                0,
            ) as number;
            setTotalSummary(tempAmount);
        }
    }, [dataAmount]);

    useEffect(() => {
        if (!isEmpty(itemReceivable.orderData) && data.length == 0) {
            const data = {
                id: `voucher-autoGen`,
                tourScheduleId: itemReceivable.orderData.tourScheduleId,
                saleOrderId: itemReceivable.orderData.id,
            };
            const newData = data ?? [];
            setDataForm([newData]);
            setListSaleOrderSelected([{ id: 'voucher-autoGen', saleOrderSelected: itemReceivable.orderData.id }] as {
                id: string;
                saleOrderSelected: string;
            }[]);
        }
    }, [data, itemReceivable]);

    useEffect(() => {
        const dataLabelReturn = valuesLabelSelected(dataTourSale, listSaleOrderSelected);
        form.setFieldValue('description', `${i18n.t('Hoàn tiền cho khách')} ${dataLabelReturn.join(', ')}`);
    }, [dataTourSale, form, listSaleOrderSelected]);

    return (
        <div className="px-5 my-3">
            {(canAddRemoveRow(dataRefund) || !refundId) && (
                <CreateActionButton title={i18n.t('Thông tin chứng từ')} handleAdd={handleAdd} />
            )}
            <Table
                columns={columns}
                dataSource={dataForm}
                rowKey="id"
                bordered
                pagination={false}
                size="small"
                scroll={{ x: 1200 }}
                summary={handleSummary}
                loading={isLoading}
            />
        </div>
    );
};
