import { Checkbox, DatePicker, Form, FormInstance, Table } from 'antd';
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import {
    OrderStatus,
    SaleOrderLineTravellerDto,
    TourGitDto,
    TourScheduleDto,
    TourScheduleFareDto,
} from '@sdk/tour-operations';
import {
    RouteChangeTourSOState,
    RouteCloneSOState,
    RouteCreateSOFromTourDepartureSchedule,
} from '@fragments/SaleOrders/features';
import { TourScheduleFareGroupingDto, useTourFaresStore } from '@store/tourFareStore';
import {
    changeStatusTravellers,
    checkShowWarningOverloadModal,
    createNewTravellers,
    getDataSelect,
    getListNewTravellerCloned,
    getListNewTravellerFromTourDeparture,
    getTourFareQuantity,
    getTravellerAmount,
} from './features';
import {
    getGenderTypes,
    getRoomTypes,
    useDeleteSaleOrderLineTraveller,
} from '@hooks/queries/useSaleOrderLineTravellers';
import { mapRoom, sumData } from '@utils/sumData';
import { toastErr, toastSuccess, toastWarning } from '@components/ui/Toast/Toast';
import { useCallback, useEffect, useState } from 'react';

import { AnyObject } from 'antd/es/_util/type';
import { AppConfig } from '@utils/config';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import Can from '@components/common/Can';
import { ColumnsType } from 'antd/es/table';
import { CountriesSelect } from '@components/customizes/Select/Country';
import { DeleteButton } from '@components/customizes/Button/DeleteButton';
import Format from '@utils/format';
import { GenderSelect } from '@components/customizes/Select/GenderSelect';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { PassengerTypeSelect } from '@components/customizes/Select/PassengerType';
import { RoomTypeSelect } from '@components/customizes/Select/RoomTypeSelect';
import { StaticTag } from '@components/customizes/StaticTag';
import { convertValues } from '@utils/formHelper';
import dayjs from 'dayjs';
import i18n from '@src/i18n';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import locale from 'antd/es/date-picker/locale/vi_VN';
import { setSaleOrderTravellerColor } from '@utils/colorStatus';
import { useCheckSOTN } from '@fragments/SaleOrders/hooks/useCheckSOTN';
import { useDebouncedCallback } from 'use-debounce';
import { useFetchPassengerTypeDefaultFIT } from '@components/customizes/Select/PassengerType/usePassenger';
import { useGetTravellers } from '@hooks/queries/useTraveller';
import { useLocation } from 'react-router-dom';
import { usePersonContactStore } from '@fragments/PersonContactForm/store/personContactStore';
import { useSaleOrderDetailStore } from '@fragments/SaleOrders/store/saleOrderDetailStore';
import { useSaleOrderFormStore } from '@fragments/SaleOrders/store/saleOrderFormStore';
import { useSaleOrderLineTravellersStore } from '@fragments/SaleOrders/store/saleOrderLineTravellerStore';
import { useSaleOrderStore } from '@store/saleOrderStore';
import { useTourScheduleStore } from '@store/tourScheduleStore';

interface InfoTouristProps {
    form: FormInstance;
    personContactForm: FormInstance;
    soId: string | undefined;
    isEnableEdit: boolean;
    isFirstTimeDirty: boolean;
    isConfirmOverload: boolean;
    setIsEnableEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setIsFirstTimeDirty: React.Dispatch<React.SetStateAction<boolean>>;
    setIsModalWarningOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setInvalidQuerySOList: () => void;
}

export const InfoTouristComponent: React.FC<InfoTouristProps> = props => {
    const {
        form,
        isFirstTimeDirty,
        setIsFirstTimeDirty,
        setIsEnableEdit,
        setIsModalWarningOpen,
        isConfirmOverload,
        isEnableEdit,
        soId,
        personContactForm,
        setInvalidQuerySOList,
    } = props;

    const [disableFields, setDisableFields] = useState<string[]>([]);
    const genderTypes = getGenderTypes();
    const roomTypes = getRoomTypes();
    const [currentTourId, setCurrentTourId] = useState<string>();
    const { clonedId } = (useLocation().state ?? { cloneId: false }) as RouteCloneSOState;
    const { changeTourSOId } = (useLocation().state ?? { changeTourSOId: false }) as RouteChangeTourSOState;
    const { quantityOfGuest, createSOFromTourDepartureSchedule } = (useLocation().state ?? {
        quantityOfGuest: false,
        createSOFromTourDepartureSchedule: false,
    }) as RouteCreateSOFromTourDepartureSchedule;

    const isSOTN = useCheckSOTN();

    // State
    const [isFirstTimeInitFromTourDeparture, setIsFirstTimeInitFromTourDeparture] = useState<boolean>(false);
    const [lastOrder, setLastOrder] = useState<number>(0);

    // Mutate
    const { mutateAsync: deleteSaleOrderLineTraveller } = useDeleteSaleOrderLineTraveller();
    const { mutateAsync: getTravellers } = useGetTravellers();

    // store
    const {
        tourFares,
        tourFareGroupings,
        actions: { setTourFareQuantity },
    } = useTourFaresStore(state => state);
    const {
        actions: { setFareCount, setRoomCount, setTotalCount, setTravellerTotalAmount, setDefaultContact },
    } = useSaleOrderFormStore(state => state);
    const {
        saleOrder,
        actions: { setSaleOrder },
    } = useSaleOrderStore(state => state);
    const { tourSchedule } = useTourScheduleStore(state => state);
    const {
        saleOrderLineTravellers,
        actions: { setSaleOrderLineTravellers },
    } = useSaleOrderLineTravellersStore(state => state);
    const {
        numberOfRooms,
        numberOfTravellers,
        travellers,
        tourId,
        actions: { setTravellers },
    } = useSaleOrderDetailStore(state => state);
    const {
        isCreatingPersonContact,
        actions: { setPersonContactDetail, setIsCreatingPersonContact },
    } = usePersonContactStore(state => state);

    // Query
    const { data: dataPassengerType } = useFetchPassengerTypeDefaultFIT({ isFit: true });

    const handleDisableFields = useCallback(() => {
        const paymentAmt = saleOrder?.paymentAmt ?? 0;

        if (isSOTN) {
            setDisableFields(['hasVisa', 'delete', 'form', 'roomType']);
            return;
        }

        switch (saleOrder.status) {
            case OrderStatus.Confirmed:
                setDisableFields(['hasVisa', 'delete']);
                break;
            case OrderStatus.Canceled:
                setDisableFields(['hasVisa', 'delete', 'form', 'roomType']);
                break;
            case OrderStatus.Paid:
                setDisableFields(['hasVisa', 'delete']);
                break;
            case OrderStatus.Confirming:
                if (paymentAmt > 0) {
                    setDisableFields(['hasVisa', 'delete']);
                }
                break;
            case OrderStatus.Deposited:
                setDisableFields(['hasVisa', 'delete']);
                break;
            case OrderStatus.WaitRefund:
                setDisableFields(['hasVisa', 'delete', 'form', 'roomType']);
                break;
            case OrderStatus.SendRefund:
                setDisableFields(['hasVisa', 'delete', 'form', 'roomType']);
                break;
            case OrderStatus.CompletedRefund:
                setDisableFields(['hasVisa', 'delete', 'form', 'roomType']);
                break;
            default:
                setDisableFields([]);
        }
    }, [isSOTN, saleOrder?.paymentAmt, saleOrder.status]);

    useEffect(() => {
        return () => {
            setSaleOrderLineTravellers([]);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Change tour Select in TourInfo
    useEffect(() => {
        if (tourId !== currentTourId) {
            setCurrentTourId(tourId);
        }
    }, [currentTourId, tourId]);

    useEffect(() => {
        handleDisableFields();
    }, [handleDisableFields]);

    const debounceRenderCustomerRow = useDebouncedCallback(
        (
            tourFareGroupings: TourScheduleFareGroupingDto[],
            tourFares: TourScheduleFareDto[],
            tourSchedule: TourScheduleDto | TourGitDto | null,
        ) => {
            let tourRemainingCapacity = tourSchedule?.remainingCapacity ?? 0;
            let saleOrderFares: SaleOrderLineTravellerDto[] = [];

            const numberNewTravellers = travellers.filter(
                x => x.id?.includes('soTravellerId') && x.passengerType?.code !== 'INF',
            ).length;
            // delete traveller SO already exist
            // if (soId && isEmpty(travellers) && !changeTourSOId && !clonedId) return;

            tourFareGroupings.forEach(tourFare => {
                let count = 0;

                if (tourFare.value <= 0) return;

                travellers
                    .filter(x => x.passengerType?.code == tourFare.code)
                    .forEach(item => {
                        count++;
                        const tourScheduleFare = tourFares.find(x => x.passengerTypeId == item.passengerType?.id);
                        const newPrice = item.hasVisa
                            ? (tourScheduleFare?.taxInclusivePrice ?? 0) -
                              (tourSchedule?.visaTourService?.reducedVisaFees ?? 0)
                            : tourScheduleFare?.taxInclusivePrice;
                        item.tourPrice = newPrice;
                        form.setFieldValue(['tourPrice', item.id], newPrice);
                        saleOrderFares.push(item);
                    });

                if (count > tourFare.value) {
                    while (count > tourFare.value) {
                        saleOrderFares.pop();
                        count--;
                    }
                } else if (count < tourFare.value) {
                    const { newTravellers, tourRemainingCapacityTemp } = createNewTravellers(
                        tourFare,
                        tourFares,
                        count,
                        tourRemainingCapacity,
                        numberNewTravellers,
                        lastOrder,
                    );
                    setLastOrder(newTravellers?.length > 0 ? newTravellers[newTravellers.length - 1].order ?? 0 : 0);
                    saleOrderFares = [...saleOrderFares, ...newTravellers];
                    tourRemainingCapacity = tourRemainingCapacityTemp;
                }
            });

            if (!soId) {
                saleOrderFares = [...changeStatusTravellers(saleOrderFares, tourSchedule)];
            }

            setTravellers(saleOrderFares);
        },
        250,
    );

    useEffect(() => {
        if (!isEmpty(travellers) && lastOrder === 0) {
            setLastOrder(travellers.length > 0 ? travellers[travellers.length - 1].order ?? 0 : 0);
        }
    }, [lastOrder, travellers]);

    useEffect(() => {
        if (!tourSchedule?.id || isEmpty(tourFareGroupings)) return;
        debounceRenderCustomerRow(tourFareGroupings, tourFares, tourSchedule);
    }, [debounceRenderCustomerRow, tourFareGroupings, tourFares, tourSchedule]);

    const handleSOLineTravellers = useCallback(async () => {
        let response: SaleOrderLineTravellerDto[] = Format.formatSortListByOrder(saleOrder.saleOrderLineTravellers);
        const numberTravellersNotCount = response?.filter(x => x.passengerType?.code === 'INF')?.length ?? 0;

        if (isEmpty(tourSchedule)) {
            return;
        }

        if (clonedId || changeTourSOId) {
            response = getListNewTravellerCloned(
                response,
                (tourSchedule?.remainingCapacity ?? 0) + numberTravellersNotCount,
            );
        }

        setSaleOrderLineTravellers(response);
        setTravellers(response);
    }, [
        changeTourSOId,
        clonedId,
        saleOrder.saleOrderLineTravellers,
        setSaleOrderLineTravellers,
        setTravellers,
        tourSchedule,
    ]);

    // wait useQuery get data for SOLineTravellers and handle it
    useEffect(() => {
        if ((soId || clonedId || changeTourSOId) && !isEmpty(saleOrder.saleOrderLineTravellers)) {
            handleSOLineTravellers();
        }
    }, [handleSOLineTravellers, changeTourSOId, clonedId, saleOrder.saleOrderLineTravellers, soId]);

    const handleSOTravellersFromTourDeparture = useCallback(async () => {
        const keysId = Object.keys(quantityOfGuest ?? {});

        if (isEmpty(keysId)) return;

        let response: TourScheduleFareDto[] = [];
        keysId?.forEach(item => {
            const findItem = tourFares.find(x => x.passengerTypeId === item) ?? {};
            const quantitySameCode = tourFareGroupings.find(x => x.code === findItem.passengerTypeCode)?.value ?? 0;
            setTourFareQuantity(
                tourFareGroupings,
                findItem.passengerTypeCode ?? '',
                quantitySameCode + (quantityOfGuest?.[item] ?? 0),
            );

            for (let i = 0; i < (quantityOfGuest?.[item] ?? 0); i++) {
                response.push(findItem);
            }
        });
        const numberTravellersNotCount = response?.filter(x => x.passengerTypeCode === 'INF')?.length ?? 0;

        response = getListNewTravellerFromTourDeparture(
            response,
            (tourSchedule?.remainingCapacity ?? 0) + numberTravellersNotCount,
        );

        setSaleOrderLineTravellers(response);
        setTravellers(response);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantityOfGuest, tourFares, tourSchedule]);

    // wait useQuery get data for SOLineTravellers and handle it
    useEffect(() => {
        if (
            createSOFromTourDepartureSchedule &&
            !isEmpty(tourFares) &&
            !isFirstTimeInitFromTourDeparture &&
            !isEmpty(tourSchedule)
        ) {
            handleSOTravellersFromTourDeparture();
            setIsFirstTimeInitFromTourDeparture(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createSOFromTourDepartureSchedule, isFirstTimeInitFromTourDeparture, tourFares, tourSchedule]);

    const onRecordChange = (isChecked: boolean, keyChange: string, value: string, id: string) => {
        const newData = travellers.map(item => {
            if (item.id != id) return item;

            const tourScheduleFare = tourFares.find(x => x.passengerTypeId == value);
            const travellerItem = travellers.find(x => x.id === id) ?? {};
            if (!tourScheduleFare) return { ...travellerItem, item };

            const amount =
                (keyChange == 'passengerType' && !isChecked) || !isChecked
                    ? tourScheduleFare.taxInclusivePrice
                    : (tourScheduleFare.taxInclusivePrice ?? 0) - (tourSchedule?.visaTourService?.reducedVisaFees ?? 0);

            form.setFieldValue(['tourPrice', id], amount);
            return {
                ...travellerItem,
                ...item,
                passengerTypeId: tourScheduleFare.passengerTypeId,
                tourPrice: amount,
                hasVisa: isChecked,
                passengerType: {
                    id: tourScheduleFare.passengerTypeId,
                    code: tourScheduleFare.passengerTypeCode,
                },
            };
        });

        debounceSetTravellersData && debounceSetTravellersData.cancel();
        setTravellers(newData);
    };

    const handleSetDefaultContact = (record: SaleOrderLineTravellerDto) => async () => {
        if (isFirstTimeDirty && !isEnableEdit) {
            setIsFirstTimeDirty(false);
            setIsEnableEdit(true);
        }

        travellers.forEach(item => {
            form.setFieldValue(['isDefaultContact', item.id], item.id == record.id);
        });

        if (isCreatingPersonContact) {
            setIsCreatingPersonContact(false);
        }

        if (record.id) {
            let fullName = form.getFieldValue(['fullName', record.id]);
            const phone = form.getFieldValue(['phone', record.id]);

            if (!fullName) {
                toastErr('Lỗi', 'Hành khách chưa có Họ và Tên');
            } else if (!phone) {
                toastErr('Lỗi', 'Hành khách chưa có SĐT');
            } else {
                // find contact person by phone
                const data = await getTravellers({
                    advancedFilter: {
                        field: 'phone',
                        value: phone,
                        operator: 'eq',
                    },
                    pageSize: 5,
                });

                // set travellerId and contactPerson auto init data
                if (!isEmpty(data?.data)) {
                    const dataContactPerson = data?.data?.[0] ?? {};
                    fullName = `${dataContactPerson?.lastName} ${dataContactPerson?.firstName}`;
                    const contactPerson = {
                        id: dataContactPerson?.id,
                        customerCode: dataContactPerson?.customerCode,
                        lastName: dataContactPerson?.lastName,
                        firstName: dataContactPerson?.firstName,
                        fullName: fullName,
                        address: dataContactPerson?.address,
                        email: dataContactPerson?.email,
                        phone: phone,
                    };

                    setSaleOrder({
                        ...saleOrder,
                        travellerId: dataContactPerson?.id,
                        contactEmail: dataContactPerson?.email,
                        contactAddress: dataContactPerson?.address,
                    });

                    personContactForm.setFieldsValue(contactPerson);
                } else {
                    // if phone doesn't exist, init data manual
                    const valueSplit = fullName?.split(' ');
                    const lastName = valueSplit[0] ?? '';
                    const firstName = valueSplit.slice(1).join(' ') ?? '';

                    const contactPerson = {
                        id: undefined,
                        customerCode: undefined,
                        lastName: lastName,
                        firstName: firstName,
                        fullName: fullName,
                        address: undefined,
                        email: undefined,
                        phone: phone,
                    };

                    setSaleOrder({
                        ...saleOrder,
                        travellerId: undefined,
                    });

                    personContactForm.setFieldsValue(contactPerson);
                    setPersonContactDetail(contactPerson);
                }

                setDefaultContact(fullName, phone);
                toastSuccess('Thông báo', `Đặt hành khách ${fullName} có SĐT ${phone} làm Người liên lạc thành công`);
            }
        }
    };

    const checkLimitDate = useCallback(
        (dataTraveller: SaleOrderLineTravellerDto, type: string) => {
            const passengersTypeItem = dataPassengerType?.data?.find(x => x.id === dataTraveller.passengerType?.id);
            const fromYear = passengersTypeItem?.ageTo ?? 0;
            const toYear = passengersTypeItem?.ageFrom ?? 0;
            const tourEndDate = dayjs(tourSchedule.endDate);

            if (type === 'min' && fromYear >= 0) {
                return tourEndDate.add(1, 'day').subtract(fromYear, 'year').startOf('day');
            } else if (type === 'max' && toYear > 0) {
                return tourEndDate.subtract(toYear, 'year').endOf('day');
            } else if (type === 'max' && toYear === 0) {
                return tourEndDate.subtract(toYear, 'year').endOf('day');
            }
        },
        [dataPassengerType?.data, tourSchedule.endDate],
    );

    const checkIsOutRangeDOB = useCallback(
        (record: SaleOrderLineTravellerDto, value: Date) => {
            let isOutRange = false;
            if (
                (!isNil(checkLimitDate(record, 'max')) && dayjs(value) > checkLimitDate(record, 'max')!) ||
                (!isNil(checkLimitDate(record, 'min')) && dayjs(value) < checkLimitDate(record, 'min')!)
            ) {
                isOutRange = true;
            }
            return isOutRange;
        },
        [checkLimitDate],
    );

    const columnsExtraInput: ColumnsType<SaleOrderLineTravellerDto> = [
        {
            title: '#',
            dataIndex: 'order',
            key: 'Order',
            width: 40,
            align: 'center',
            render: (value: number, record: SaleOrderLineTravellerDto, index: number) => (
                <>
                    <BaseInput isForm isHidden type="number" name={['order', record.id!]} initialValue={value} />
                    <BaseInput isForm isHidden type="text" name={['id', record.id!]} initialValue={record.id} />
                    <BaseInput
                        className="mb-0"
                        isForm
                        isHidden
                        type="text"
                        name={['saleOrderId', record.id!]}
                        initialValue={record.saleOrderId}
                    />
                    <>{index + 1}</>
                </>
            ),
        },
        {
            title: (
                <p>
                    {' '}
                    <span className="text-red-500 mr-1">*</span>
                    {i18n.t('saleorder.table.passengerType')}
                </p>
            ),
            dataIndex: 'passengerType.name',
            key: 'passengerType.name',
            width: 300,
            render: (_, record: SaleOrderLineTravellerDto) => (
                <>
                    <BaseInput
                        isForm
                        isHidden
                        type="text"
                        dependencies={['passengerTypeId']}
                        name={['passengerTypeCode', record.id!]}
                        initialValue={
                            tourFares.find(x => x.passengerTypeId === record.passengerTypeId)?.passengerTypeCode
                        }
                    />

                    <PassengerTypeSelect
                        isForm
                        placeholder="Loại hành khách"
                        className="mb-0"
                        name={['passengerTypeId', record.id!]}
                        initialValue={record.passengerTypeId}
                        rules={[{ required: true, message: 'Vui lòng Chọn loại hành khách' }]}
                        dataSelect={getDataSelect(tourFares, record)}
                        onChange={(value: string) =>
                            onRecordChange(!!record.hasVisa, 'passengerType', value, record.id!)
                        }
                        allowClear={false}
                        disabled={!record.id?.includes('soTravellerId')}
                        isFit
                    />
                </>
            ),
        },
        {
            title: <p> {i18n.t('saleorder.table.fullName')}</p>,
            dataIndex: 'fullName',
            key: 'fullName',
            width: 200,
            render: (value: string, record: SaleOrderLineTravellerDto) => (
                <BaseInput
                    isForm
                    className="mb-0"
                    type="text"
                    name={['fullName', record.id!]}
                    initialValue={value}
                    placeholder="Nhập Họ và tên"
                />
            ),
        },
        {
            title: <p> {i18n.t('saleorder.table.dateOfBirth')}</p>,
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
            width: 180,
            render: (value: Date, record: SaleOrderLineTravellerDto) => (
                <Form.Item
                    className="mb-0"
                    name={['dateOfBirth', record.id!]}
                    initialValue={value ? dayjs(value) : undefined}
                    rules={[
                        {
                            validator(_, value: Date) {
                                if (
                                    (value &&
                                        checkIsOutRangeDOB(record, value) &&
                                        record?.passengerType?.code == 'ADT') ||
                                    (value && checkIsOutRangeDOB(record, value))
                                ) {
                                    return Promise.reject(
                                        new Error(i18n.t(`Ngày sinh không hợp lệ tính đến ngày kết thúc.`)),
                                    );
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                    dependencies={['passengerTypeId', record.id!]}
                >
                    <DatePicker
                        locale={locale}
                        format={AppConfig.DateFormat}
                        className="w-full"
                        maxDate={checkLimitDate(record, 'max')}
                        minDate={checkLimitDate(record, 'min')}
                    />
                </Form.Item>
            ),
        },
        {
            title: <p> {i18n.t('saleorder.table.gender')}</p>,
            dataIndex: 'gender',
            key: 'gender',
            width: 100,
            render: (value: string, record: SaleOrderLineTravellerDto) => (
                <GenderSelect
                    isForm
                    className="mb-0"
                    name={['gender', record.id!]}
                    initialValue={value}
                    options={genderTypes}
                />
            ),
        },
        {
            title: i18n.t('saleorder.table.phone'),
            dataIndex: 'phone',
            key: 'phone',
            width: 200,
            render: (value: string, record: SaleOrderLineTravellerDto) => (
                <BaseInput
                    className="mb-0"
                    isForm
                    type="text"
                    name={['phone', record.id!]}
                    initialValue={value}
                    placeholder="Nhập Số điện thoại"
                    rules={[
                        {
                            pattern: AppConfig.PhoneRegex,
                            message: i18n.t('validation.default.errorPhone'),
                        },
                        () => ({
                            validator(_, value) {
                                const isDefaultContact = form.getFieldValue(['isDefaultContact', record.id]) ?? false;
                                if (isDefaultContact && !value) {
                                    return Promise.reject(new Error('Vui lòng nhập Số điện thoại'));
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                />
            ),
        },
        {
            title: i18n.t('saleorder.table.passport'),
            dataIndex: 'passport',
            key: 'passport',
            width: 200,
            render: (value: string, record: SaleOrderLineTravellerDto) => (
                <BaseInput
                    className="mb-0"
                    isForm
                    type="text"
                    name={['passport', record.id!]}
                    initialValue={value}
                    placeholder="Nhập hộ chiếu"
                />
            ),
        },
        {
            title: i18n.t('saleorder.table.identity'),
            dataIndex: 'identityId',
            key: 'identityId',
            width: 200,
            render: (value: string, record: SaleOrderLineTravellerDto) => (
                <BaseInput
                    className="mb-0"
                    isForm
                    type="text"
                    name={['identityId', record.id!]}
                    initialValue={value}
                    placeholder="Nhập CCCD"
                />
            ),
        },
        {
            title: i18n.t('saleorder.table.country'),
            dataIndex: 'countryId',
            key: 'countryId',
            width: 150,
            render: (value: string, record: SaleOrderLineTravellerDto) => (
                <CountriesSelect className="mb-0" name={['countryId', record.id!]} initialValue={value} isForm />
            ),
        },
        {
            title: i18n.t('saleorder.table.orderStatus'),
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            width: 150,
            render(text, record: SaleOrderLineTravellerDto) {
                return (
                    <Form.Item className="mb-0" name={['orderStatus', record.id!]} initialValue={record.orderStatus}>
                        <StaticTag
                            type={i18n.t(`TravellerOrderStatus.${text}`) || ''}
                            color={`${setSaleOrderTravellerColor(record.orderStatus ?? '')}`}
                        />
                    </Form.Item>
                );
            },
        },
        {
            title: i18n.t('saleorder.table.isDefaultContact'),
            dataIndex: 'isDefaultContact',
            key: 'isDefaultContact',
            width: 100,
            render: (value: boolean, record: SaleOrderLineTravellerDto) => (
                <Form.Item
                    className="flex justify-center mb-0"
                    name={['isDefaultContact', record.id!]}
                    valuePropName="checked"
                    initialValue={value}
                >
                    <CopyOutlined onClick={handleSetDefaultContact(record)} />
                </Form.Item>
            ),
        },
        {
            title: i18n.t('saleorder.table.hasVisa'),
            dataIndex: 'hasVisa',
            key: 'hasVisa',
            width: 100,
            render: (value: boolean, record: SaleOrderLineTravellerDto) => (
                <Form.Item
                    className="flex justify-center mb-0"
                    name={['hasVisa', record.id!]}
                    valuePropName="checked"
                    initialValue={value}
                >
                    <Checkbox
                        checked={value}
                        onChange={e => onRecordChange(e.target.checked, '', record.passengerTypeId!, record.id!)}
                        disabled={disableFields.includes('hasVisa')}
                    ></Checkbox>
                </Form.Item>
            ),
        },
        {
            title: i18n.t('saleorder.table.tourPrice'),
            dataIndex: 'tourPrice',
            key: 'tourPrice',
            width: 200,
            render: (value: string, record: SaleOrderLineTravellerDto) => (
                <BaseInput
                    className="mb-0"
                    isForm
                    type="number"
                    name={['tourPrice', record.id!]}
                    initialValue={value}
                    disable
                />
            ),
        },
        {
            title: <p> {i18n.t('saleorder.table.roomType')}</p>,
            dataIndex: 'roomType',
            key: 'roomType',
            width: 200,
            render: (value: string, record: SaleOrderLineTravellerDto) => (
                <RoomTypeSelect
                    isForm
                    className="mb-0"
                    name={['roomType', record.id!]}
                    initialValue={value}
                    options={roomTypes}
                    disabled={!tourId || !numberOfRooms || disableFields.includes('roomType')}
                />
            ),
        },
        {
            title: <p> {i18n.t('saleorder.table.roomNumber')}</p>,
            dataIndex: 'roomNumber',
            key: 'roomNumber',
            width: 100,
            render: (value: string, record: SaleOrderLineTravellerDto) => (
                <BaseInput
                    className="mb-0"
                    isForm
                    type="number"
                    name={['roomNumber', record.id!]}
                    initialValue={value}
                    dependencies={['roomType', record.id!]}
                    disable={!record.roomType}
                />
            ),
        },
        {
            title: i18n.t('saleorder.table.description'),
            dataIndex: 'description',
            key: 'description',
            width: 200,
            render: (value: string, record: SaleOrderLineTravellerDto) => (
                <BaseInput
                    isForm
                    className="mb-0"
                    type="text"
                    name={['description', record.id!]}
                    initialValue={value}
                    placeholder="Nhập ghi chú"
                />
            ),
        },
        {
            key: 'operation',
            fixed: disableFields.includes('delete') ? false : 'right',
            align: 'center',
            width: 50,
            render: (_, record: SaleOrderLineTravellerDto) => (
                <Can permissions={[MyPermissions.SaleOrderUpdate, MyPermissions.AgencySaleOrderUpdate]}>
                    <div className="flex gap-4 justify-center">
                        {record?.id && !record?.id.startsWith('soTravellerId') ? (
                            <DeleteButton
                                titleName={'hành khách'}
                                content={record.fullName ? `Hành khách ${record.fullName}` : ''}
                                onOk={() => {
                                    onDelete(record);
                                }}
                                disabled={disableFields.includes('delete')}
                            />
                        ) : (
                            <DeleteOutlined onClick={() => onDelete(record)} />
                        )}
                    </div>
                </Can>
            ),
        },
    ];

    const onDelete = async (record: SaleOrderLineTravellerDto) => {
        if (!record.id) return;

        if (!record.id.startsWith('soTravellerId')) {
            await deleteSaleOrderLineTraveller(record.id);
            setSaleOrderLineTravellers(saleOrderLineTravellers.filter(x => x.id != record.id));
            toastSuccess(i18n.t('message.default.deleteContentSuccess'), '');
            setInvalidQuerySOList();
        }
        if (isFirstTimeDirty && !isEnableEdit) {
            setIsFirstTimeDirty(false);
            setIsEnableEdit(true);
        }
        setTravellers(travellers.filter(x => x.id != record.id));
        const quantity = getTourFareQuantity(travellers, record);
        setTourFareQuantity(tourFareGroupings, record.passengerType?.code ?? '', quantity);
    };

    const debounceSetTravellersData = useDebouncedCallback(values => {
        const dataList = convertValues(values);

        const temp = travellers.map(item => {
            const findItem = dataList.find((x: SaleOrderLineTravellerDto) => x.id === item.id);
            return { ...item, ...findItem };
        });
        setTravellers(temp);
    }, 1000);

    const handleValuesChange = (value: AnyObject, values: AnyObject) => {
        // Passenger Change
        if (value.passengerTypeId) {
            const passengerTypeIdList = values.passengerTypeId;
            const resFareData = sumData(passengerTypeIdList);
            setFareCount(resFareData);
        }
        // Room Change
        if (value.roomType || value.roomNumber) {
            const roomMap = mapRoom(values.roomType, values.roomNumber).filter(item => item.key !== 'undefined');
            const totalCount: number = roomMap.reduce((acc, obj) => acc + obj.value, 0);
            if (numberOfRooms && totalCount > numberOfRooms) {
                toastWarning('Số lượng phòng', 'Số phòng đang nhiều hơn số lượng phòng đã nhập');
            }
            setRoomCount(roomMap);
            setTotalCount(totalCount);
            debounceSetTravellersData(values);
        }

        if (isFirstTimeDirty && !isEnableEdit) {
            setIsFirstTimeDirty(false);
            setIsEnableEdit(true);
        }
    };

    useEffect(() => {
        if (!isEmpty(travellers)) {
            const travellerAmount = getTravellerAmount(travellers);
            setTravellerTotalAmount(travellerAmount);
        } else {
            setTravellerTotalAmount(0);
        }
    }, [setTravellerTotalAmount, travellers]);

    const showTourCapacityWarning = useCallback(() => {
        if (isEmpty(tourFareGroupings)) {
            return;
        }
        const numberTravellersNotCountOrder = tourFareGroupings.find(x => x.code === 'INF')?.value ?? 0;
        const numberOfTravellersCurrent = numberOfTravellers - numberTravellersNotCountOrder;

        if (
            !(changeTourSOId && currentTourId === saleOrder.tourScheduleId) &&
            tourId &&
            !isConfirmOverload &&
            checkShowWarningOverloadModal(
                travellers,
                tourSchedule,
                saleOrder,
                isConfirmOverload,
                currentTourId,
                tourId,
                numberOfTravellersCurrent,
            )
        ) {
            setIsModalWarningOpen(true);
        }
    }, [
        changeTourSOId,
        currentTourId,
        isConfirmOverload,
        numberOfTravellers,
        saleOrder,
        setIsModalWarningOpen,
        tourFareGroupings,
        tourId,
        tourSchedule,
        travellers,
    ]);

    useEffect(() => {
        showTourCapacityWarning();
    }, [showTourCapacityWarning]);

    return (
        <Form className="p-4" form={form} onValuesChange={handleValuesChange} disabled={disableFields.includes('form')}>
            <Table
                className="w-max-[1366px] text-center overflow-x-auto block"
                size="small"
                bordered
                columns={
                    tourSchedule?.visaTourService
                        ? columnsExtraInput
                        : columnsExtraInput.filter(x => x.key != 'hasVisa')
                }
                rowKey="id"
                dataSource={Format.formatSortListByOrder(travellers)}
                scroll={{ x: 2000, y: 300 }}
                pagination={false}
            />
        </Form>
    );
};
