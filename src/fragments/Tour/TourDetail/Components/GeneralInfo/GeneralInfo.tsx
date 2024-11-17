import { Form, FormInstance, Radio, RadioChangeEvent } from 'antd';
import { TourGitDto, TourScheduleDto } from '@sdk/tour-operations';
import { TourNatureType, TourType } from '@src/types/TypeEnum';
import { useCallback, useEffect, useState } from 'react';

import { BaseDatePicker } from '@components/customizes/DatePicker/BaseDatePicker';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import Can from '@components/common/Can';
import { CopyButton } from '@components/customizes/Button/CopyButton';
import { CurrenciesSelect } from '@components/customizes/Select/Currency';
import { CustomersSelect } from '@components/customizes/Select/Customers';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { Pattern } from '@utils/formHelper';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { RouteSelect } from '@components/customizes/Select/Route';
import TextArea from 'antd/es/input/TextArea';
import { TooltipComponent } from '@components/customizes/Tooltip/Tooltip';
import { TourCategorySelect } from '@components/customizes/Select/TourCategory';
import { TourInfo } from '../ProgramInfo/TourInfo';
import { TourLocationSelect } from '@components/customizes/Select/TourLocation';
import { TourTypeSelect } from '@components/customizes/Select/TourType';
import { VatSelect } from '@components/customizes/Select/Vat';
import { VendorSelect } from '@components/customizes/Select/Vendor';
import { canEditData } from '../../Feature';
import dayjs from 'dayjs';
import i18n from '@src/i18n';
import isNumber from 'lodash/isNumber';
import { toastWarning } from '@components/ui/Toast/Toast';
import { useCustomersStore } from '@store/customersStore';
import { useDebouncedCallback } from 'use-debounce';
import { useGetCurrencies } from '@components/customizes/Select/Currency/useCurrencies';
import { useGetCustomers } from '@components/customizes/Select/Customers/useCustomers';
import { useGetTourTypes } from '@hooks/queries/useGetTourInfos';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { useTourTypesStore } from '@store/tourTypeStore';
import { isEmpty } from 'lodash';

interface GeneralInfoProps {
    form: FormInstance;
    isOB?: boolean;
    tourCode?: string;
    tourType?: TourType;
    isCloned?: boolean;
    canEdit?: boolean | null;
    tourSchedule?: TourScheduleDto | TourGitDto;
}

export const GeneralInfo: React.FC<GeneralInfoProps> = props => {
    const { form } = props;
    const destinationId = Form.useWatch('destinationLocationId', form);
    const saleStartDate = Form.useWatch('saleStartDate', form);
    const departureDate = Form.useWatch('departureDate', form);

    const showFieldPartner = [TourNatureType.SendGuest, TourNatureType.League];
    const hasModifyTourFITPermission = useHasAnyPermission([MyPermissions.TourFitCreate, MyPermissions.TourFitUpdate]);

    const [isChangeDestination, setIsChangeDestination] = useState<boolean>(false);
    const [valueChangeRadio, setValueChangeRadio] = useState<TourNatureType>(TourNatureType.HNH);
    const { mutateAsync: getTourTypes } = useGetTourTypes();
    const { mutateAsync: getCustomers } = useGetCustomers();
    const { data: dataCurrencies } = useGetCurrencies(true);

    const {
        customers,
        actions: { setCustomers },
    } = useCustomersStore(state => state);
    const {
        tourTypes,
        actions: { setTourType },
    } = useTourTypesStore(state => state);

    const fetchTourTypes = useCallback(async () => {
        const data = await getTourTypes({ pageSize: 20 });
        setTourType(data.data ?? []);
    }, [getTourTypes, setTourType]);

    const fetchCustomers = useCallback(async () => {
        const data = await getCustomers({});
        setCustomers(data?.data ?? []);
    }, [getCustomers, setCustomers]);

    const handleChangeStartDate = () => {
        if (props.isCloned) {
            form.setFieldsValue({
                departureDate: undefined,
                endDate: undefined,
            });
        } else {
            form.setFieldsValue({
                saleEndDate: undefined,
            });
        }
    };

    const handleChangeDestination = () => {
        if (props.tourType == TourType.FIT) {
            form.setFieldValue('routeId', undefined);
            setIsChangeDestination(true);
        }
    };

    const handleValidationCapacity = useDebouncedCallback((value: string | number | null) => {
        if (value && !props.isCloned) {
            const tourDataTemp = props.tourSchedule as TourScheduleDto;
            const remainingCapacity = (tourDataTemp?.bookedQuantity ?? 0) + (tourDataTemp?.reserveQuantity ?? 0);
            if ((isNumber(value) ? value : parseInt(value)) < remainingCapacity) {
                toastWarning(
                    i18n.t('validation.tour.validForm'),
                    i18n.t(`Số chỗ phải lớn hơn hoặc bằng ${remainingCapacity}`),
                );
                form.setFieldsValue({
                    capacity: undefined,
                });
            }
        }
    }, 500);

    const onChangePropertyTour = (e: RadioChangeEvent) => {
        setValueChangeRadio(e.target.value);
    };

    useEffect(() => {
        fetchTourTypes();
        fetchCustomers();
    }, [fetchCustomers, fetchTourTypes]);

    useEffect(() => {
        form.setFieldsValue({
            tourTypeId: tourTypes?.find(item => item.code === (props.tourType == TourType.FIT ? 'FIT' : 'GIT'))?.id,
            customerId: props.tourSchedule?.customerId
                ? props.tourSchedule?.customerId
                : customers?.find(item => item.customerNo === 'KLE')?.id,
            currencyId: dataCurrencies?.data?.find(item => item.name === 'VND')?.id,
        });
    }, [dataCurrencies, customers, form, tourTypes, props.tourType, props.tourSchedule?.customerId]);

    useEffect(() => {
        if (props.tourSchedule?.tourNature) {
            setValueChangeRadio(props.tourSchedule?.tourNature as TourNatureType);
        } else {
            form.setFieldValue('tourNature', TourNatureType.HNH);
        }
    }, [form, props.tourSchedule?.tourNature]);

    return (
        <div className="p-5 pb-2">
            <BaseInput isForm name="id" isHidden />
            <BaseInput isForm name="tourCode" isHidden />
            <BaseInput isForm name="travellerId" isHidden />
            {/* Mã Tour - Mã kế toán */}
            <div className="grid grid-cols-12 gap-4">
                <Form.Item
                    label={
                        <>
                            {i18n.t('tour.tourList.tourCode')}
                            <TooltipComponent
                                title={i18n.t('tour.tourDetail.tooltipCode')}
                                content={<QuestionCircleOutlined />}
                            />
                        </>
                    }
                    className="col-span-12 lg:col-span-7"
                >
                    <CopyButton textToCopy={form.getFieldValue('tourCode') ?? props.tourCode} />
                </Form.Item>
                <BaseInput
                    isForm
                    showCount
                    maxCountNumber={25}
                    className="col-span-12 lg:col-span-5"
                    name="accountingTourCode"
                    label={i18n.t('tour.tourDetail.accountingTourCode')}
                    rules={[
                        {
                            required: true,
                            message: i18n.t('validation.default.validDefault'),
                        },
                    ]}
                />
            </div>

            {/* Tên Tour */}
            <BaseInput
                isForm
                showCount
                maxCountNumber={250}
                name="name"
                label={i18n.t('tour.tourList.tourName')}
                rules={[{ required: true, message: i18n.t('validation.tour.validName') }]}
            />

            {/* Loại tour - Thị trường tour */}
            <div className="grid grid-cols-2 gap-4">
                <TourTypeSelect
                    label={i18n.t('tour.tourDetail.tourType')}
                    name="tourTypeId"
                    rules={[{ required: true, message: i18n.t('validation.tour.validTourType') }]}
                    className="col-span-2 lg:col-span-1"
                    disable
                    isForm
                />
                <TourCategorySelect
                    label={i18n.t('tour.tourList.category')}
                    name="tourCategoryId"
                    rules={[{ required: true, message: i18n.t('validation.tour.validCategory') }]}
                    className="col-span-2 lg:col-span-1"
                    disable={!canEditData(props.tourSchedule?.status)}
                    isForm
                />
            </div>

            {/* Điểm khởi hành - Điểm đến */}
            <div className="grid grid-cols-2 gap-4">
                <TourLocationSelect
                    label={i18n.t('tour.tourList.departureLocation')}
                    name="departureLocationId"
                    rules={[{ required: true, message: i18n.t('validation.tour.validDepartureLocation') }]}
                    className="col-span-2 lg:col-span-1"
                    isForm
                />
                <TourLocationSelect
                    label={i18n.t('tour.tourList.destinationLocation')}
                    name="destinationLocationId"
                    rules={[{ required: true, message: i18n.t('validation.tour.validDestinationLocation') }]}
                    className="col-span-2 lg:col-span-1"
                    disable={
                        props.isOB === undefined ||
                        !hasModifyTourFITPermission ||
                        !canEditData(props.tourSchedule?.status)
                    }
                    onChange={handleChangeDestination}
                    isForm
                />
            </div>

            {/* Tính chất Tour (hiện thị khi là tour FIT) và ẩn nếu là đại lý */}
            {props.tourType == TourType.FIT && (
                <Form.Item name="tourNature">
                    <Radio.Group
                        className="flex items-center justify-between"
                        onChange={onChangePropertyTour}
                        disabled={!hasModifyTourFITPermission || !canEditData(props.tourSchedule?.status)}
                    >
                        <Radio value={TourNatureType.HNH}>{i18n.t('HNH')}</Radio>
                        <Radio value={TourNatureType.SendGuest}>{i18n.t('Gửi khách')}</Radio>
                        <Radio value={TourNatureType.League}>{i18n.t('Liên minh')}</Radio>
                    </Radio.Group>
                </Form.Item>
            )}

            {/* Mã đối tượng - Hành trình - Tên đoàn (hiển thị khi là tour GIT) */}
            <div className="grid grid-cols-2 gap-4">
                <CustomersSelect
                    isForm
                    label={i18n.t('tour.tourDetail.customerCode')}
                    name="customerId"
                    rules={[{ required: true, message: i18n.t('validation.tour.validCustomerCode') }]}
                    className="col-span-2 lg:col-span-1"
                    disable={props.tourSchedule && !isEmpty((props.tourSchedule as TourGitDto).traveller) && props.tourType && props.tourType === TourType.GIT}
                />
                {props.tourType == TourType.FIT ? (
                    <RouteSelect
                        isForm
                        label={i18n.t('tour.tourDetail.trip')}
                        name="routeId"
                        rules={[{ required: true, message: i18n.t('validation.tour.validTrip') }]}
                        className="col-span-2 lg:col-span-1"
                        disable={
                            destinationId === undefined ||
                            !hasModifyTourFITPermission ||
                            !canEditData(props.tourSchedule?.status)
                        }
                        destinationId={destinationId}
                        isChangeDestination={isChangeDestination}
                        setIsChangeDestination={setIsChangeDestination}
                    />
                ) : (
                    <BaseInput
                        isForm
                        name="groupName"
                        className="col-span-2 lg:col-span-1"
                        label={i18n.t('tour.tourList.groupName')}
                        showCount
                        maxCountNumber={250}
                    />
                )}
            </div>

            {/* Đối tác - mã đối tác - (hiển thị khi là tour FIT) và ẩn khi là đại lý*/}
            {props.tourType == TourType.FIT && showFieldPartner.includes(valueChangeRadio) && (
                <div className="grid grid-cols-2 gap-4">
                    <VendorSelect
                        isForm
                        label={
                            valueChangeRadio == TourNatureType.SendGuest
                                ? i18n.t('tour.tourDetail.vendorReceiptCustomer')
                                : i18n.t('tour.tourDetail.leagueReceiptCustomer')
                        }
                        name="vendorId"
                        rules={[{ required: true, message: i18n.t('validation.tour.validVendorReceiptCustomer') }]}
                        className="col-span-2 lg:col-span-1"
                    />
                    <BaseInput
                        isForm
                        name="partnerTourCode"
                        className="col-span-2 lg:col-span-1"
                        label={
                            valueChangeRadio == TourNatureType.SendGuest
                                ? i18n.t('tour.tourDetail.vendorReceipt')
                                : i18n.t('tour.tourDetail.leagueReceipt')
                        }
                        showCount
                        maxCountNumber={50}
                    />
                </div>
            )}

            {/* Ngày mở bán - Ngày kết thúc */}
            {props.tourType == TourType.FIT && (
                <div className="grid grid-cols-2 gap-4">
                    <BaseDatePicker
                        name="saleStartDate"
                        label={i18n.t('tour.tourDetail.openSaleDate')}
                        rules={[{ required: true, message: i18n.t('validation.default.validDate') }]}
                        isRequired
                        className="col-span-2 lg:col-span-1"
                        format={'date'}
                        disabledDate={current => current < dayjs().subtract(1, 'day')}
                        onChange={handleChangeStartDate}
                    />
                    <BaseDatePicker
                        name="saleEndDate"
                        label={i18n.t('tour.tourDetail.closeSaleDate')}
                        rules={[{ required: true, message: i18n.t('validation.default.validDate') }]}
                        className="col-span-2 lg:col-span-1"
                        format={'date'}
                        disabled={!saleStartDate || !hasModifyTourFITPermission}
                        disabledDate={current => current <= saleStartDate || (departureDate && current > departureDate)}
                        customDefaultValue={saleStartDate}
                    />
                </div>
            )}

            {/* Số chỗ - Loại tiền - VAT */}
            {props.tourType == TourType.FIT ? (
                <div className="grid grid-cols-3 gap-4">
                    <Can permissions={[MyPermissions.TourFitUpdate, MyPermissions.TourGitUpdate]}>
                        <BaseInput
                            isForm
                            type="number"
                            name="capacity"
                            className="col-span-3 lg:col-span-1"
                            rules={[
                                { required: true, message: i18n.t('validation.tour.validCapacity') },
                                { pattern: Pattern.decimal3, message: i18n.t('Giá trị không hợp lệ') },
                            ]}
                            label={i18n.t('tour.tourDetail.capacity')}
                            onInputChange={value => handleValidationCapacity(value)}
                            disable={(props.tourSchedule as TourScheduleDto).hasTourThienNhien && !props.isCloned}
                        />
                    </Can>
                    <CurrenciesSelect
                        isForm
                        rules={[{ required: true, message: i18n.t('validation.tour.validCurrencyType') }]}
                        label={i18n.t('tour.tourDetail.currencyType')}
                        name="currencyId"
                        className="col-span-3 lg:col-span-1"
                    />
                    <VatSelect
                        isForm
                        rules={[{ required: true, message: i18n.t('validation.tour.validVat') }]}
                        label={i18n.t('vat.title')}
                        name="vatId"
                        className="col-span-3 lg:col-span-1"
                    />
                </div>
            ) : (
                <TourInfo form={props.form} tourType={props.tourType} tourSchedule={props.tourSchedule} />
            )}

            {/* Ghi chú */}
            <Form.Item className="pb-4" label={i18n.t('default.note')} name="description">
                <TextArea className="w-full" showCount maxLength={500} />
            </Form.Item>
        </div>
    );
};
