import { Form, FormInstance, Input, Table } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { ColumnsType } from 'antd/es/table';
import isEmpty from 'lodash/isEmpty';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { BaseInput } from '@components/customizes/Input/BaseInput';
import { OrderStatus, SaleOrderDto } from '@sdk/tour-operations';
import { Price } from '@src/new/fragments/SaleOrders/components/Price';
import { convertValues } from '@utils/formHelper';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import i18n from '@src/i18n';

import { useQueryGetTourScheduleUseId } from '../../../hooks/queries';
import { useGetSummaryTraveller } from '../../../hooks/useGetSummaryTraveller';
import { RouteChangeTourSOState, RouteCloneSOState } from '../../../features';

interface ReduceAmountProps {
    dataSO?: SaleOrderDto;
    totalTravellerForm: FormInstance;
    reduceForm: FormInstance;
    tourInfoForm: FormInstance;
    isEnableEdit: boolean;
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
}

export const ReduceAmount: React.FC<ReduceAmountProps> = props => {
    const { dataSO, reduceForm, totalTravellerForm, tourInfoForm, isEnableEdit, setIsEnableEdit } = props;

    const { soId } = useParams<string>();
    const { clonedId } = (useLocation().state ?? { cloneId: false }) as RouteCloneSOState;
    const { changeTourSOId } = (useLocation().state ?? { changeTourSOId: false }) as RouteChangeTourSOState;

    const tourIdWatch = Form.useWatch('tourScheduleId', tourInfoForm);
    const dataFormWatch = Form.useWatch([], reduceForm);
    const dataConvert: AnyObject[] = convertValues(dataFormWatch);
    const listSummaryTraveller = useGetSummaryTraveller(totalTravellerForm);

    const totalQuantity = useMemo(
        () => listSummaryTraveller?.reduce((acc, obj) => acc + Number(obj?.quantity ?? 0), 0),
        [listSummaryTraveller],
    );

    // State
    const [dataSource, setDataSource] = useState<AnyObject[]>([]);
    const [disableFields, setDisableFields] = useState<string[]>([]);
    const [isFirstTimeInitData, setIsFirstTimeInitData] = useState<boolean>(true);

    // Query
    const { data: dataTourSchedule, isLoading: isLoadingTourData } = useQueryGetTourScheduleUseId(tourIdWatch);

    const calculateTotal = useCallback(
        (id: string) => {
            const item = dataConvert?.find(x => x.id === id);
            if (isEmpty(item)) {
                return 0;
            }

            return (item?.['quantity'] ?? 0) * (item?.['price'] ?? 0);
        },
        [dataConvert],
    );

    const calculateTotalAll = useMemo(() => {
        return dataConvert.length > 0
            ? dataConvert.reduce((total, record) => total + (record.price ?? 0) * (record.quantity ?? 0), 0)
            : 0;
    }, [dataConvert]);

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
                setDisableFields(['numberOfVisas']);
            } else {
                setDisableFields([]);
            }
        }
    }, [dataSO?.paymentAmt, dataSO?.status]);

    const initData = useCallback(
        (quantity: number) => {
            const newData = [
                {
                    id: 'numberOfVisas',
                    price: dataTourSchedule?.visaTourService?.reducedVisaFees,
                    quantity: quantity,
                    title: 'Đã có VISA',
                },
            ];
            setDataSource(newData);
            setIsFirstTimeInitData(false);
        },
        [dataTourSchedule?.visaTourService?.reducedVisaFees],
    );

    const onValuesChange = () => {
        if (!isEnableEdit) {
            setIsEnableEdit(true);
        }
    };

    useEffect(() => {
        handleDisableFields();
    }, [handleDisableFields]);

    useEffect(() => {
        if (isFirstTimeInitData && !isEmpty(dataTourSchedule)) {
            if (!soId && !clonedId && !changeTourSOId) {
                initData(0);
            } else if ((soId || clonedId || changeTourSOId) && !isEmpty(dataSO)) {
                initData(dataSO?.numberOfVisas ?? 0);
            }
        }
    }, [changeTourSOId, clonedId, dataSO, dataTourSchedule, initData, isFirstTimeInitData, soId]);

    // Table Column
    const columnsData: ColumnsType<AnyObject> = [
        {
            title: i18n.t('SL khách'),
            dataIndex: 'quantity',
            key: 'quantity',
            width: 100,
            render: (value: number, record: AnyObject) => (
                <>
                    <BaseInput isForm isHidden name={['id', record.id!]} initialValue={record.passengerTypeId} />
                    <BaseInput isForm isHidden name={['id', record.id!]} initialValue={record.id} />
                    <Form.Item
                        className="quantity mb-0 text-center"
                        name={['quantity', record.id!]}
                        initialValue={value}
                        rules={[
                            {
                                validator(_, value) {
                                    if (value > totalQuantity || value < 0) {
                                        return Promise.reject(
                                            new Error(
                                                `${i18n.t('validation.default.errorValue')} (${i18n.t(
                                                    'Số lượng hành khách không hợp lệ',
                                                )})`,
                                            ),
                                        );
                                    }
                                    return Promise.resolve();
                                },
                            },
                        ]}
                    >
                        <Input
                            className={`text-center h-10 w-11 text-[20px] font-medium rounded-lg border border-solid p-1 ${Color.border_DBDBDB}`}
                            type="number"
                            disabled={disableFields.includes('numberOfVisas')}
                        />
                    </Form.Item>
                </>
            ),
        },
        {
            title: i18n.t('Nội dung'),
            dataIndex: 'title',
            key: 'title',
            width: 200,
            render: (_, record) => <p className="text-sm font-bold">{record?.title}</p>,
        },
        {
            title: <p className="text-center">{i18n.t('Đơn giá')}</p>,
            dataIndex: 'price',
            key: 'price',
            width: 200,
            render: (value: number, record: AnyObject) => (
                <>
                    <BaseInput
                        isForm
                        isHidden
                        type="text"
                        name={['price', record.id!]}
                        initialValue={value}
                        value={value}
                    />
                    <Price value={value} className="font-bold" />
                </>
            ),
        },
        {
            title: <p className="text-center">{i18n.t('Thành tiền')}</p>,
            key: 'totalPrice',
            width: 200,
            render: (_, record: AnyObject) => (
                <>
                    <Price value={calculateTotal(record.id!)} isHighlight />
                </>
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
                    <Table.Summary.Cell index={3}>
                        <Price className="font-bold text-center" value={calculateTotalAll} isHighlight />
                    </Table.Summary.Cell>
                </Table.Summary.Row>
            </Table.Summary>
        );
    };

    return (
        <Form
            form={reduceForm}
            onValuesChange={onValuesChange}
            disabled={disableFields.includes('form')}
            className="p-5"
        >
            <Table
                rowKey="id"
                className="!overflow-auto table-striped-rows"
                loading={isLoadingTourData}
                columns={columnsData}
                scroll={{ x: 800, y: '100%' }}
                summary={handleSummary}
                dataSource={dataSource}
                pagination={false}
            />
        </Form>
    );
};
