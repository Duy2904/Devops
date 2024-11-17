import { Flex, Form, FormInstance, Input } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { isNumber } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { BaseInput } from '@components/customizes/Input/BaseInput';
import { OrderStatus, SaleOrderDto, TourScheduleDto, TourScheduleFareDto } from '@sdk/tour-operations';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import { Price } from '@src/new/fragments/SaleOrders/components/Price';
import { RouteChangeTourSOState, RouteCloneSOState } from '@src/new/fragments/SaleOrders/features';
import { useCheckTourSendGuest } from '@src/new/fragments/SaleOrders/hooks/useCheckTourSendGuest';
import { convertValues, isEmptyString } from '@utils/formHelper';
import i18n from '@src/i18n';

import { fetchDataTravellerMerge, RouteCreateSOFromTourDepartureSchedule } from '../../../features';
import { TravellerSub } from '../../../type';
import { splitTourFareWithVisa } from './features';

interface FormTotalTravellerProps {
    dataSO?: SaleOrderDto;
    totalTravellerForm: FormInstance;
    travellersForm: FormInstance;
    isEnableEdit: boolean;
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
    dataTourSchedule?: TourScheduleDto;
    isLoadingTourData: boolean;
}

export const FormTotalTraveller: React.FC<FormTotalTravellerProps> = props => {
    const { dataSO, totalTravellerForm, isEnableEdit, setIsEnableEdit, dataTourSchedule, isLoadingTourData } = props;

    const { soId } = useParams<string>();
    const { clonedId } = (useLocation().state ?? { cloneId: false }) as RouteCloneSOState;
    const { changeTourSOId } = (useLocation().state ?? { changeTourSOId: false }) as RouteChangeTourSOState;
    const { quantityOfGuest, createSOFromTourDepartureSchedule } = (useLocation().state ?? {
        quantityOfGuest: false,
        createSOFromTourDepartureSchedule: false,
    }) as RouteCreateSOFromTourDepartureSchedule;

    const dataFormWatch = Form.useWatch([], totalTravellerForm);
    const dataConvert: TravellerSub[] = convertValues(dataFormWatch);

    // State
    const [dataSource, setDataSource] = useState<TravellerSub[]>([]);
    const [currentTourId, setCurrentTourId] = useState<string | undefined>(undefined);
    const [isFirstTimeInitData, setIsFirstTimeInitData] = useState<boolean>(true);
    const [disableFields, setDisableFields] = useState<string[]>([]);

    const isTourSendGuest = useCheckTourSendGuest({ dataSO, dataTourSchedule });

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

    const onValuesChange = () => {
        if (!isEnableEdit) {
            setIsEnableEdit(true);
        }
    };

    const handleDisableFields = useCallback(() => {
        const paymentAmt = dataSO?.paymentAmt ?? 0;
        const isNoSeatLeft = (dataTourSchedule?.remainingCapacity ?? 0) <= 0 && !!(soId || changeTourSOId);

        if (isTourSendGuest && dataSO?.id) {
            setDisableFields(['numberOfTravellers', 'form']);
            return;
        }

        switch (dataSO?.status) {
            case OrderStatus.Confirming:
                if (paymentAmt > 0 || isNoSeatLeft) {
                    setDisableFields(['numberOfTravellers']);
                } else {
                    setDisableFields([]);
                }
                break;
            case OrderStatus.Confirmed:
                setDisableFields(['numberOfTravellers']);
                break;
            case OrderStatus.Paid:
                setDisableFields(['numberOfTravellers']);
                break;
            case OrderStatus.Canceled:
                setDisableFields(['numberOfTravellers', 'form']);
                break;
            case OrderStatus.Deposited:
                setDisableFields(['numberOfTravellers']);
                break;
            case OrderStatus.New:
                if (isNoSeatLeft && !clonedId && !changeTourSOId) {
                    setDisableFields(['numberOfTravellers']);
                } else {
                    setDisableFields([]);
                }
                break;
            case OrderStatus.WaitRefund:
                setDisableFields(['numberOfTravellers', 'form']);
                break;
            case OrderStatus.SendRefund:
                setDisableFields(['numberOfTravellers', 'form']);
                break;
            case OrderStatus.CompletedRefund:
                setDisableFields(['numberOfTravellers', 'form']);
                break;
            default:
                setDisableFields([]);
        }
    }, [
        changeTourSOId,
        clonedId,
        dataSO?.id,
        dataSO?.paymentAmt,
        dataSO?.status,
        dataTourSchedule?.remainingCapacity,
        isTourSendGuest,
        soId,
    ]);

    useEffect(() => {
        handleDisableFields();
    }, [handleDisableFields]);

    useEffect(() => {
        if (isFirstTimeInitData && !isEmpty(dataSO) && !isEmpty(dataTourSchedule)) {
            const dataFromSO = fetchDataTravellerMerge(dataSO);
            const { newData } = splitTourFareWithVisa(dataTourSchedule, dataFromSO);

            setDataSource(newData);
            setIsFirstTimeInitData(false);
        }
    }, [dataSO, dataTourSchedule, isFirstTimeInitData]);

    useEffect(() => {
        if (
            isFirstTimeInitData &&
            !isEmptyString(createSOFromTourDepartureSchedule) &&
            !isEmpty(dataTourSchedule) &&
            !isEmpty(dataSource) &&
            !isEmpty(quantityOfGuest)
        ) {
            const newData = dataSource.map(item => {
                const quantityFromTourDepartureSchedule = quantityOfGuest[item?.passengerTypeId ?? ''];

                if (isNumber(quantityFromTourDepartureSchedule) && quantityFromTourDepartureSchedule > 0) {
                    totalTravellerForm.setFieldValue(
                        ['quantity', item?.passengerTypeId],
                        quantityFromTourDepartureSchedule,
                    );
                    return {
                        ...item,
                        quantity: quantityFromTourDepartureSchedule,
                    };
                }

                return item;
            });

            setDataSource(newData);
            setIsFirstTimeInitData(false);
        }
    }, [
        createSOFromTourDepartureSchedule,
        dataSource,
        dataTourSchedule,
        isFirstTimeInitData,
        quantityOfGuest,
        totalTravellerForm,
    ]);

    useEffect(() => {
        if (
            !isEmpty(dataTourSchedule) &&
            !soId &&
            (!currentTourId || currentTourId !== dataTourSchedule?.id) &&
            !((clonedId || changeTourSOId) && isEmpty(dataConvert))
        ) {
            const { newData } = splitTourFareWithVisa(dataTourSchedule, dataConvert);

            newData.forEach(item => {
                totalTravellerForm.setFieldValue(['price', item?.id], item?.price);
            });

            setDataSource(newData);
            setCurrentTourId(dataTourSchedule.id);
        }
    }, [changeTourSOId, clonedId, currentTourId, dataConvert, dataTourSchedule, soId, totalTravellerForm]);

    const columnsData: ColumnsType<TourScheduleFareDto> = [
        {
            title: (
                <p>
                    <span className="text-red-500 mr-1">*</span>
                    {i18n.t('SL khách')}
                </p>
            ),
            dataIndex: 'quantity',
            key: 'quantity',
            width: 100,
            render: (value: number, record: TravellerSub) => (
                <>
                    <BaseInput
                        isForm
                        isHidden
                        name={['passengerTypeId', record.id!]}
                        initialValue={record.passengerTypeId}
                    />
                    <BaseInput
                        isForm
                        isHidden
                        name={['passengerTypeCode', record.id!]}
                        initialValue={record.passengerTypeCode}
                    />
                    <BaseInput
                        isForm
                        isHidden
                        name={['passengerTypeName', record.id!]}
                        initialValue={record.passengerTypeName}
                    />
                    <BaseInput isForm isHidden name={['id', record.id!]} initialValue={record.id} />
                    <Form.Item
                        className="quantity mb-0 text-center"
                        name={['quantity', record.id!]}
                        initialValue={value}
                        rules={[
                            {
                                validator(_, value) {
                                    if (value < 0) {
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
                            disabled={disableFields.includes('numberOfTravellers')}
                        />
                    </Form.Item>
                </>
            ),
        },
        {
            title: i18n.t('saleorder.table.passengerType'),
            width: 200,
            render: (_, record: TravellerSub) => (
                <Flex vertical gap={2}>
                    <p className="text-sm font-bold">{record.title}</p>
                    <p className="text-sx text-black/40">{record.subTitle}</p>
                </Flex>
            ),
        },
        {
            title: <p className="text-center">{i18n.t('Đơn giá')}</p>,
            dataIndex: 'price',
            key: 'price',
            width: 200,
            render: (value: number, record: TravellerSub) => (
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
            render: (_, record: TravellerSub) => (
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
        <Form form={totalTravellerForm} onValuesChange={onValuesChange} disabled={disableFields.includes('form')}>
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
