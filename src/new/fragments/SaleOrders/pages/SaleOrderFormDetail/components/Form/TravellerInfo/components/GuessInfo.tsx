import { Checkbox, DatePicker, Flex, Form, FormInstance } from 'antd';
import locale from 'antd/es/date-picker/locale/vi_VN';
import { ColumnsType } from 'antd/es/table';
import clsx from 'clsx';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';

import { BaseInput } from '@components/customizes/Input/BaseInput';
import { GridTableComponent } from '@components/ui/GridTable';
import { OrderStatus, SaleOrderDto, SaleOrderLineTravellerDto, TravellerOrderStatus } from '@sdk/tour-operations';
import { DeleteButton } from '@src/new/components/customs/Buttons/DeleteButton';
import { TagStatus } from '@src/new/components/ui/Tag/TagStatus';
import { splitNamePassengerType, TitleSplitPassengerType } from '@src/new/fragments/SaleOrders/features';
import { useCheckTourSendGuest } from '@src/new/fragments/SaleOrders/hooks/useCheckTourSendGuest';
import { AppConfig } from '@src/new/shared/utils/config';
import { PageName } from '@src/types/TypeEnum';
import { convertValues, Pattern } from '@utils/formHelper';
import { MyPermissions } from '@utils/Permissions';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import Can from '@components/common/Can';
import Format from '@src/new/shared/utils/format';
import i18n from '@src/i18n';

import { getGenderTypes, getRoomTypes, useQueryGetTourScheduleUseId } from '../../../../hooks/queries';
import { RouteChangeTourSOState, RouteCloneSOState } from '../../../../features';
import { defaultID, TravellerSub } from '../../../../type';
import { CountriesSelect } from '../../../Select/Country';
import { GenderSelect } from '../../../Select/GenderSelect';
import { RoomTypeSelect } from '../../../Select/RoomTypeSelect';
import { changeStatusTravellers, createTravellers } from '../features';

interface GuessInfoProps {
    dataSO?: SaleOrderDto;
    tourInfoForm: FormInstance;
    totalTravellerForm: FormInstance;
    travellersForm: FormInstance;
    numberOfTotalForm: FormInstance;
    reduceForm: FormInstance;
    isEnableEdit: boolean;
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
    isModalWarningOpen: boolean;
    setIsModalWarningOpen: Dispatch<SetStateAction<boolean>>;
}

export const GuessInfo: React.FC<GuessInfoProps> = props => {
    const {
        tourInfoForm,
        totalTravellerForm,
        travellersForm,
        numberOfTotalForm,
        reduceForm,
        dataSO,
        isEnableEdit,
        setIsEnableEdit,
        isModalWarningOpen,
        setIsModalWarningOpen,
    } = props;

    const { soId } = useParams<string>();
    const { changeTourSOId } = (useLocation().state ?? { changeTourSOId: false }) as RouteChangeTourSOState;
    const { clonedId } = (useLocation().state ?? { cloneId: false }) as RouteCloneSOState;
    // hooks
    const { t } = useTranslation();
    const genderTypes = getGenderTypes();
    const roomTypes = getRoomTypes();

    const tourIdWatch = Form.useWatch('tourScheduleId', tourInfoForm);
    const isOverloadConfirmedWatch = Form.useWatch('isOverloadConfirmed', tourInfoForm);
    const numberOfTravellersWatch = Form.useWatch('numberOfTravellers', numberOfTotalForm);
    const totalTravellerFormWatch = Form.useWatch([], totalTravellerForm);
    const dataTotalTravellerFormConvert: TravellerSub[] = convertValues(totalTravellerFormWatch);
    const numberOfRooms = Form.useWatch('numberOfRooms', numberOfTotalForm);
    const reduceFormWatch = Form.useWatch([], reduceForm);
    const dataReduceFormConvert = convertValues(reduceFormWatch);
    const reduceVisa = useMemo(() => dataReduceFormConvert?.[0] ?? {}, [dataReduceFormConvert]);
    const numberOfVisa = useMemo(() => reduceVisa?.quantity ?? 0, [reduceVisa?.quantity]);

    // State
    const [dataSource, setDataSource] = useState<SaleOrderLineTravellerDto[]>([]);
    const [disableFields, setDisableFields] = useState<string[]>([]);
    const [lastOrder, setLastOrder] = useState<number>(0);
    const [isFirstTimeInitData, setIsFirstTimeInitData] = useState<boolean>(true);

    const quantityHasVisa = useMemo(
        () => dataSource.reduce((count, x) => count + (x.hasVisa ? 1 : 0), 0),
        [dataSource],
    );

    // Query
    const { data: dataTourSchedule } = useQueryGetTourScheduleUseId(tourIdWatch);

    const isTourSendGuest = useCheckTourSendGuest({ dataSO, dataTourSchedule });

    const checkLimitDate = useCallback(
        (dataTraveller: SaleOrderLineTravellerDto, type: string) => {
            const passengersTypeItem = dataTourSchedule?.tourScheduleFares?.find(
                x => x.passengerTypeId === dataTraveller.passengerType?.id,
            );
            const fromYear = passengersTypeItem?.passengerTypeAgeTo ?? 0;
            const toYear = passengersTypeItem?.passengerTypeAgeFrom ?? 0;
            const tourEndDate = dayjs(dataTourSchedule?.endDate);

            if (type === 'min' && fromYear >= 0) {
                return tourEndDate.add(1, 'day').subtract(fromYear, 'year').startOf('day');
            } else if (type === 'max' && toYear > 0) {
                return tourEndDate.subtract(toYear, 'year').endOf('day');
            } else if (type === 'max' && toYear === 0) {
                return tourEndDate.subtract(toYear, 'year').endOf('day');
            }
        },
        [dataTourSchedule?.endDate, dataTourSchedule?.tourScheduleFares],
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

    const onRecordChange = (isChecked: boolean, id: string) => {
        const newData = dataSource.map(item => {
            return { ...item, hasVisa: item.id === id ? isChecked : item.hasVisa };
        });

        setDataSource(newData);
    };

    const renderTraveller = useCallback(() => {
        if (
            ((soId || changeTourSOId || clonedId) && isFirstTimeInitData) ||
            isEmpty(dataTotalTravellerFormConvert) ||
            isEmpty(dataTourSchedule)
        ) {
            return;
        }

        const { shouldUpdate, newData, lastIndex } = createTravellers({
            dataTotalTravellerForm: dataTotalTravellerFormConvert,
            dataSource,
            lastOrder,
            numberOfTravellers: numberOfTravellersWatch,
            dataTourSchedule,
        });

        if (shouldUpdate) {
            setDataSource([...newData]);
            setLastOrder(lastIndex);

            newData.forEach(x => travellersForm.setFieldValue(['tourPrice', x.id], x.tourPrice));
            const isExistStatusWaiting = newData.find(x => x.orderStatus === TravellerOrderStatus.Waiting);

            if (!isOverloadConfirmedWatch && !isEmpty(isExistStatusWaiting) && !isModalWarningOpen) {
                setIsModalWarningOpen(true);
            }
        } else {
            const isExistStatusWaiting = dataSource.find(x => x.orderStatus === TravellerOrderStatus.Waiting);

            if (!isOverloadConfirmedWatch && !isEmpty(isExistStatusWaiting) && !isModalWarningOpen) {
                setIsModalWarningOpen(true);
            }
        }
    }, [
        changeTourSOId,
        clonedId,
        dataSource,
        dataTotalTravellerFormConvert,
        dataTourSchedule,
        isFirstTimeInitData,
        isModalWarningOpen,
        isOverloadConfirmedWatch,
        lastOrder,
        numberOfTravellersWatch,
        setIsModalWarningOpen,
        soId,
        travellersForm,
    ]);

    const onValuesChange = () => {
        if (!isEnableEdit) {
            setIsEnableEdit(true);
        }
    };

    const onDelete = async (record: SaleOrderLineTravellerDto) => {
        if (!record.id) return;
        const idRow = `${record.passengerTypeId}`;

        const newData = dataSource.filter(x => x.id != record.id);

        setDataSource(newData);
        const currentQuantity = totalTravellerForm.getFieldValue(['quantity', idRow]);
        totalTravellerForm.setFieldValue(['quantity', idRow], currentQuantity - 1);
        numberOfTotalForm.setFieldValue('numberOfTravellers', newData.length);

        if (!isEnableEdit) {
            setIsEnableEdit(true);
        }
    };

    const getNameWithIndex = (record: SaleOrderLineTravellerDto) => {
        if (!record?.id) return '';

        const dataNameSplit: TitleSplitPassengerType = splitNamePassengerType(record.passengerType?.name ?? '');
        const listDataSameCode = dataSource.filter(x => x.passengerType?.code === record.passengerType?.code);
        const position = listDataSameCode.map(x => x.id).indexOf(record.id);
        return `${dataNameSplit.title}${position + 1}`;
    };

    const handleDisableFields = useCallback(() => {
        const paymentAmt = dataSO?.paymentAmt ?? 0;

        if (isTourSendGuest && dataSO?.id) {
            setDisableFields(['delete']);
            return;
        }

        switch (dataSO?.status) {
            case OrderStatus.Confirmed:
                setDisableFields(['delete']);
                break;
            case OrderStatus.Canceled:
                setDisableFields(['hasVisa', 'delete', 'form', 'roomType']);
                break;
            case OrderStatus.Paid:
                setDisableFields(['delete']);
                break;
            case OrderStatus.Confirming:
                if (paymentAmt > 0) {
                    setDisableFields(['delete']);
                }
                break;
            case OrderStatus.Deposited:
                setDisableFields(['delete']);
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
    }, [dataSO?.id, dataSO?.paymentAmt, dataSO?.status, isTourSendGuest]);

    useEffect(() => {
        handleDisableFields();
    }, [handleDisableFields]);

    useEffect(() => {
        if (isFirstTimeInitData && !isEmpty(dataSO) && !isEmpty(dataTourSchedule)) {
            let dataSort: SaleOrderLineTravellerDto[] = Format.formatSortListByOrder(dataSO?.saleOrderLineTravellers);

            if (clonedId) {
                dataSort = dataSort.map((item, index) => {
                    return { ...item, id: `${defaultID.travellers}-${index}`, order: index };
                });

                dataSort = changeStatusTravellers(dataSort, dataTourSchedule);
            }

            setDataSource([...dataSort]);
            setIsFirstTimeInitData(false);
        }
    }, [clonedId, dataSO, dataTourSchedule, isFirstTimeInitData]);

    useEffect(() => {
        if (!isEmpty(dataSource) && lastOrder === 0) {
            setLastOrder(dataSource.length > 0 ? dataSource[dataSource.length - 1].order ?? 0 : 0);
        }
    }, [lastOrder, dataSource]);

    useEffect(() => {
        if (
            !(soId || changeTourSOId) ||
            ((soId || changeTourSOId) && !isFirstTimeInitData && !isEmpty(dataTourSchedule))
        ) {
            renderTraveller();
        }
    }, [changeTourSOId, dataTourSchedule, isFirstTimeInitData, renderTraveller, soId]);

    const columnsData: ColumnsType<SaleOrderLineTravellerDto> = [
        {
            title: t('Loại HK'),
            width: 100,
            render: (_, record) => (
                <>
                    <BaseInput isForm isHidden name={['id', record.id!]} initialValue={record.id} />
                    <BaseInput isForm isHidden type="number" name={['order', record.id!]} initialValue={record.order} />
                    <p className="text-sm font-bold">{getNameWithIndex(record)}</p>
                </>
            ),
        },
        {
            title: t('Họ và tên'),
            dataIndex: 'fullName',
            width: 200,
            render: (value: string, record: SaleOrderLineTravellerDto) => (
                <BaseInput
                    isForm
                    className="mb-0"
                    type="text"
                    name={['fullName', record.id!]}
                    initialValue={value}
                    placeholder="Nhập Họ và tên"
                    showCount
                    maxCountNumber={40}
                />
            ),
        },
        {
            title: t('Ngày sinh'),
            dataIndex: 'dateOfBirth',
            width: 150,
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
            title: t('Giới tính'),
            dataIndex: 'gender',
            width: 90,
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
            title: t('SĐT'),
            dataIndex: 'phone',
            key: 'phone',
            width: 150,
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
                    ]}
                    showCount
                    maxCountNumber={14}
                />
            ),
        },
        {
            title: <>{t('Hộ chiếu')}</>,
            dataIndex: 'passport',
            key: 'passport',
            width: 150,
            render: (value: string, record: SaleOrderLineTravellerDto) => (
                <BaseInput
                    className="mb-0"
                    isForm
                    type="text"
                    name={['passport', record.id!]}
                    initialValue={value}
                    placeholder={t('Nhập Hộ chiếu')}
                    showCount
                    maxCountNumber={14}
                />
            ),
        },
        {
            title: <>{t('CCCD')}</>,
            dataIndex: 'identityId',
            key: 'identityId',
            width: 150,
            render: (value: string, record: SaleOrderLineTravellerDto) => (
                <BaseInput
                    className="mb-0"
                    isForm
                    type="text"
                    name={['identityId', record.id!]}
                    initialValue={value}
                    placeholder={t('Nhập CCCD')}
                    showCount
                    maxCountNumber={14}
                />
            ),
        },
        {
            title: t('Quốc tịch'),
            dataIndex: 'countryId',
            key: 'countryId',
            width: 130,
            render: (value: string, record: SaleOrderLineTravellerDto) => (
                <CountriesSelect className="mb-0" name={['countryId', record.id!]} initialValue={value} isForm />
            ),
        },
        {
            title: t('Đã có VISA'),
            dataIndex: 'hasVisa',
            key: 'hasVisa',
            width: 80,
            render: (value: boolean, record: SaleOrderLineTravellerDto) => (
                <Form.Item
                    className="flex justify-center mb-0"
                    name={['hasVisa', record.id!]}
                    valuePropName="checked"
                    initialValue={value}
                >
                    <div>
                        <p className="hidden">{value}</p>
                        <Checkbox
                            checked={value}
                            onChange={e => onRecordChange(e.target.checked, record.id!)}
                            disabled={
                                disableFields.includes('hasVisa') || (!value && quantityHasVisa >= Number(numberOfVisa))
                            }
                        ></Checkbox>
                    </div>
                </Form.Item>
            ),
        },
        {
            title: t('Loại phòng'),
            dataIndex: 'roomType',
            key: 'roomType',
            width: 150,
            render: (value: string, record: SaleOrderLineTravellerDto) => (
                <RoomTypeSelect
                    isForm
                    className="mb-0"
                    name={['roomType', record.id!]}
                    initialValue={value}
                    options={roomTypes}
                    disabled={!tourIdWatch || !numberOfRooms || disableFields.includes('roomType')}
                />
            ),
        },
        {
            title: t('Số phòng'),
            dataIndex: 'roomNumber',
            key: 'roomNumber',
            width: 80,
            render: (value: string, record: SaleOrderLineTravellerDto) => (
                <>
                    <BaseInput
                        className="mb-0"
                        isForm
                        type="number"
                        name={['roomNumber', record.id!]}
                        initialValue={value}
                        dependencies={['roomType', record.id!]}
                        disable={!numberOfRooms || disableFields.includes('roomType')}
                        rules={[{ pattern: Pattern.decimal3, message: 'Giá trị không hợp lệ' }]}
                    />
                </>
            ),
        },
        {
            title: t('Ghi chú'),
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
                    showCount
                    maxCountNumber={500}
                />
            ),
        },
        {
            title: i18n.t('saleorder.table.orderStatus'),
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            width: 200,
            render(text, record: SaleOrderLineTravellerDto) {
                return (
                    <Form.Item className="mb-0" name={['orderStatus', record.id!]} initialValue={record.orderStatus}>
                        <TagStatus
                            page={PageName.SaleOrder}
                            status={`${record.orderStatus}`}
                            text={i18n.t(`TravellerOrderStatus.${text}`)}
                        />
                    </Form.Item>
                );
            },
        },
        {
            title: t('Loại HK'),
            width: 200,
            render: (_, record) => {
                const dataNameSplit: TitleSplitPassengerType = splitNamePassengerType(record.passengerType?.name ?? '');
                return (
                    <Flex vertical gap={2}>
                        <BaseInput
                            isForm
                            isHidden
                            name={['passengerTypeCode', record.id!]}
                            initialValue={record.passengerType?.code}
                        />
                        <BaseInput
                            isForm
                            isHidden
                            name={['passengerTypeId', record.id!]}
                            initialValue={record.passengerType?.id}
                        />
                        <BaseInput isForm isHidden name={['tourPrice', record.id!]} initialValue={record.tourPrice} />
                        <p className="text-sm font-bold">{dataNameSplit.title}</p>
                        <p className="text-sx text-black/40">{dataNameSplit.subTitle}</p>
                    </Flex>
                );
            },
        },
        {
            key: 'operation',
            fixed: disableFields.includes('delete') ? false : 'right',
            align: 'center',
            width: 60,
            render: (_, record: SaleOrderLineTravellerDto) => (
                <div className="flex gap-4 justify-center">
                    {record?.id && !record?.id.startsWith('soTravellerId') ? (
                        <Can permissions={[MyPermissions.SaleOrderUpdate, MyPermissions.AgencySaleOrderUpdate]}>
                            {!disableFields.includes('delete') ? (
                                <DeleteButton
                                    titleName={'hành khách'}
                                    content={record.fullName ? `Hành khách ${record.fullName}` : ''}
                                    onOk={() => {
                                        onDelete(record);
                                    }}
                                    disabled={disableFields.includes('delete')}
                                />
                            ) : (
                                <></>
                            )}
                        </Can>
                    ) : (
                        <DeleteButton
                            onOk={() => onDelete(record)}
                            titleName={'hành khách'}
                            content={record.fullName ? `Hành khách ${record.fullName}` : ''}
                        />
                    )}
                </div>
            ),
        },
    ];

    let newColumnsData = [...columnsData];

    if (dataTourSchedule?.tourCategoryName == 'Domestic') {
        newColumnsData = newColumnsData.filter(x => x.key != 'passport');
    } else {
        newColumnsData = newColumnsData.filter(x => x.key != 'identityId');
    }

    if (!dataTourSchedule?.visaTourService) {
        newColumnsData = newColumnsData.filter(x => x.key != 'hasVisa');
    }

    return (
        <>
            <Flex justify="space-between">
                <h2 className="text-black text-[15px]/[22px] font-bold">{t('Thông tin khách')}</h2>
                {!isEmpty(reduceVisa) && numberOfVisa > 0 && (
                    <p
                        className={clsx(
                            'py-0.5 px-1.5  rounded-md text-sm',
                            quantityHasVisa < numberOfVisa
                                ? `${Color.text_FF4D4F} bg-[#FF4D4F]/[.2]`
                                : `${Color.text_1677FF} bg-[#1677FF]/[.2]`,
                        )}
                    >
                        Số khách đã có VISA {quantityHasVisa}/{numberOfVisa}
                    </p>
                )}
            </Flex>
            <Form
                form={travellersForm}
                className="mt-5 form-travellers"
                onValuesChange={onValuesChange}
                disabled={disableFields.includes('form')}
            >
                <GridTableComponent
                    isStriped
                    columns={newColumnsData}
                    scrollX={1900}
                    scrollY={innerHeight - 355}
                    dataSource={dataSource}
                    tableParams={{}}
                    isHideSelectColumn
                    isHidePagination
                />
            </Form>
        </>
    );
};
