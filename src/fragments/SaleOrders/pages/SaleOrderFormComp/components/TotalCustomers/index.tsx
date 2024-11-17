import { Form, FormInstance } from 'antd';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { BaseInput } from '@components/customizes/Input/BaseInput';
import { RouteChangeTourSOState, RouteCloneSOState } from '@fragments/SaleOrders/features';
import { useCheckSOTN } from '@fragments/SaleOrders/hooks/useCheckSOTN';
import { useSaleOrderDetailStore } from '@fragments/SaleOrders/store/saleOrderDetailStore';
import { useSaleOrderFormStore } from '@fragments/SaleOrders/store/saleOrderFormStore';
import { useSaleOrderLineTravellersStore } from '@fragments/SaleOrders/store/saleOrderLineTravellerStore';
import { getRoomTypes } from '@hooks/queries/useSaleOrderLineTravellers';
import { useTourScheduleFareInfos } from '@hooks/queries/useTourScheduleFare';
import { OrderStatus, SearchTourScheduleFaresRequest } from '@sdk/tour-operations';
import i18n from '@src/i18n';
import { useSaleOrderStore } from '@store/saleOrderStore';
import { TourScheduleFareGroupingDto, useTourFaresStore } from '@store/tourFareStore';
import { useTourScheduleStore } from '@store/tourScheduleStore';
import { convertValues } from '@utils/formHelper';
import { mapRoom, sumData } from '@utils/sumData';

export interface TotalCustomerProps {
    form: FormInstance;
    touristForm: FormInstance;
    isEnableEdit: boolean;
    isFirstTimeDirty: boolean;
    soId: string | undefined;
    setIsEnableEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setIsFirstTimeDirty: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TotalCustomerComponent: React.FC<TotalCustomerProps> = props => {
    const { setIsEnableEdit, isFirstTimeDirty, setIsFirstTimeDirty, soId, touristForm } = props;
    const { clonedId } = (useLocation().state ?? { cloneId: false }) as RouteCloneSOState;
    const { changeTourSOId } = (useLocation().state ?? { changeTourSOId: false }) as RouteChangeTourSOState;
    const isSOTN = useCheckSOTN();

    // State
    const roomTypes = getRoomTypes();
    const [disableFields, setDisableFields] = useState<string[]>([]);

    // Mutate
    const { mutateAsync: getTourScheduleFareInfos } = useTourScheduleFareInfos();

    // Store
    const {
        roomCount,
        totalCount,
        actions: { setFareCount, setRoomCount, setTotalCount },
    } = useSaleOrderFormStore(state => state);
    const {
        tourFareGroupings,
        actions: { setTourFares, setTourFareQuantity },
    } = useTourFaresStore(state => state);
    const { saleOrderLineTravellers } = useSaleOrderLineTravellersStore(state => state);
    const { saleOrder } = useSaleOrderStore(state => state);
    const { tourSchedule } = useTourScheduleStore(state => state);
    const {
        numberOfRooms,
        numberOfTravellers,
        travellers,
        tourId,
        actions: { setNumberOfTravellers, setNumberOfRooms },
    } = useSaleOrderDetailStore(state => state);

    const fetchFareData = useCallback(
        async (tourScheduleId: string) => {
            const request: SearchTourScheduleFaresRequest = {
                advancedSearch: {
                    fields: ['tourScheduleId'],
                    keyword: tourScheduleId,
                },
            };
            const response = await getTourScheduleFareInfos(request);

            if (!soId && isEmpty(saleOrderLineTravellers)) {
                const data = convertValues(touristForm.getFieldsValue());
                const cloneData = data.map(x => ({
                    ...x,
                    passengerType: {
                        code: x.passengerTypeCode,
                    },
                }));
                setTourFares(response.data ?? [], cloneData);
            } else if (soId && !isEmpty(saleOrderLineTravellers)) {
                setTourFares(response.data ?? [], saleOrderLineTravellers);
            }
        },
        [getTourScheduleFareInfos, saleOrderLineTravellers, setTourFares, soId, touristForm],
    );

    useEffect(() => {
        if (isString(tourId) && tourId !== '') {
            fetchFareData(tourId);
        }
    }, [tourId, fetchFareData]);

    useEffect(() => {
        props.form.setFieldsValue({
            numberOfTravellers: numberOfTravellers ?? 0,
            numberOfRooms: numberOfRooms,
        });
    }, [numberOfRooms, props.form, numberOfTravellers]);

    useEffect(() => {
        if (!isEmpty(travellers)) {
            const resultArray = travellers.map(item => item.passengerTypeId);
            const roomType = travellers.map(item => item.roomType);
            const roomNumber = travellers.map(item => item.roomNumber);
            setFareCount(sumData(resultArray));
            setRoomCount(mapRoom(roomType, roomNumber));
        }
    }, [travellers, soId, setFareCount, setRoomCount]);

    useEffect(() => {
        if (!soId) {
            setTourFares([]);
            setFareCount([]);
            setRoomCount([]);
            setTotalCount(0);
        }
    }, [soId, setFareCount, setRoomCount, setTotalCount, setTourFares]);

    useEffect(() => {
        // Trigger re-validate
        if (numberOfRooms && roomCount.length > 0) {
            props.form.validateFields(['numberOfRooms']);
        }
    }, [props.form, numberOfRooms, roomCount]);

    useEffect(() => {
        let numberOfTravellers = 0;
        tourFareGroupings.forEach(x => {
            props.form.setFieldValue(x.code, x.value);
            numberOfTravellers += x.value;
        });
        setNumberOfTravellers(numberOfTravellers);
    }, [props.form, setNumberOfTravellers, tourFareGroupings]);

    const handleDisableFields = useCallback(() => {
        const paymentAmt = saleOrder?.paymentAmt ?? 0;
        const isNoSeatLeft = (tourSchedule?.remainingCapacity ?? 0) <= 0 && !!soId;

        if (isSOTN) {
            setDisableFields(['numberOfTravellers', 'form']);
            return;
        }

        switch (saleOrder?.status) {
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
        isSOTN,
        saleOrder?.paymentAmt,
        saleOrder?.status,
        soId,
        tourSchedule?.remainingCapacity,
    ]);

    useEffect(() => {
        handleDisableFields();
    }, [handleDisableFields]);

    const getTourFareGroupingSorting = () => {
        return tourFareGroupings.sort((a, b) => a.code.localeCompare(b.code));
    };

    const handleDirtyForm = useCallback(() => {
        if (isFirstTimeDirty && !props.isEnableEdit) {
            setIsFirstTimeDirty(false);
            setIsEnableEdit(true);
        }
    }, [props.isEnableEdit, isFirstTimeDirty, setIsEnableEdit, setIsFirstTimeDirty]);

    const onChangeValues = () => {
        handleDirtyForm();
    };

    return (
        <Form
            form={props.form}
            className="bg-white p-4 pt-5"
            layout="vertical"
            disabled={disableFields.includes('form')}
            onValuesChange={onChangeValues}
        >
            <div className="grid grid-cols-4 gap-4">
                <BaseInput
                    isForm
                    type="number"
                    className="col-span-4 md:col-span-2 lg:col-span-1"
                    name="numberOfTravellers"
                    label={<p className="mb-1 font-semibold">Số lượng khách</p>}
                    disable
                />
                {getTourFareGroupingSorting().map((item: TourScheduleFareGroupingDto) => {
                    return (
                        <div key={item.code}>
                            <BaseInput
                                isForm
                                type="number"
                                className="col-span-4 md:col-span-2 lg:col-span-1"
                                label={<p className="mb-1 font-semibold">{item.name}</p>}
                                // value={item.value}
                                onInputChange={value => {
                                    setTourFareQuantity(tourFareGroupings, item.code, value as number);
                                    handleDirtyForm();
                                }}
                                name={item.code}
                                disable={disableFields.includes('numberOfTravellers')}
                                min={0}
                                initialValue={item.value ? item.value : 0}
                                rules={[
                                    {
                                        required: item.code === 'ADT',
                                        message: 'Không hợp lệ.',
                                    },
                                    {
                                        validator(_, value) {
                                            if (value < 1 && item.code === 'ADT') {
                                                return Promise.reject(new Error(i18n.t(`Không hợp lệ.`)));
                                            }

                                            return Promise.resolve();
                                        },
                                    },
                                ]}
                            />
                        </div>
                    );
                })}
            </div>
            <div className="grid grid-cols-4 gap-4">
                <BaseInput
                    isForm
                    type="number"
                    className="col-span-4 md:col-span-2 lg:col-span-1"
                    name="numberOfRooms"
                    label={<p className="mb-1 font-semibold">{i18n.t('Số lượng phòng')}</p>}
                    rules={[
                        () => ({
                            validator(_, value) {
                                if (value >= 0 && (totalCount <= value || !totalCount)) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('Không hợp lệ.'));
                            },
                        }),
                    ]}
                    initialValue={numberOfRooms}
                    onInputChange={value => {
                        const numericValue = typeof value === 'number' ? value : undefined;
                        setNumberOfRooms(numericValue ?? 0);
                    }}
                    min={0}
                />
                {roomTypes.map(item => {
                    const value = roomCount?.find(count => count.key === item.value)?.value ?? 0;
                    return (
                        <div key={item.value}>
                            <BaseInput
                                isForm
                                type="number"
                                key={item.value}
                                value={value ?? 0}
                                className="col-span-4 md:col-span-2 lg:col-span-1 mb-0"
                                clasNameInput={`${
                                    numberOfRooms &&
                                    totalCount > numberOfRooms &&
                                    'border border-solid border-red-500 !text-red-500'
                                }`}
                                label={
                                    <p className="mb-1 font-semibold">
                                        Phòng {item.label}{' '}
                                        {numberOfRooms && totalCount > numberOfRooms ? (
                                            <span className="font-bold text-xs text-red-500 ml-1">
                                                (Số lượng không chính xác)
                                            </span>
                                        ) : (
                                            ''
                                        )}
                                    </p>
                                }
                                disable
                            />
                        </div>
                    );
                })}
            </div>
        </Form>
    );
};
