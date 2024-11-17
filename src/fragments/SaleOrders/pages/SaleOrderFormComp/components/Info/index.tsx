import { Checkbox, Form, FormInstance, Input, Modal, Skeleton } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { toastErr, toastSuccess } from '@components/ui/Toast/Toast';
import { PersonContactForm } from '@fragments/PersonContactForm';
import { usePersonContactStore } from '@fragments/PersonContactForm/store/personContactStore';
import { RouteChangeTourSOState, RouteCloneSOState, shouldDisableAllForm } from '@fragments/SaleOrders/features';
import { useCheckSOTN } from '@fragments/SaleOrders/hooks/useCheckSOTN';
import { useSaleOrderDetailStore } from '@fragments/SaleOrders/store/saleOrderDetailStore';
import { useSaleOrderFormStore } from '@fragments/SaleOrders/store/saleOrderFormStore';
import { useCreateSaleOrder, useUpdateSaleOrder } from '@hooks/queries/useSaleOrders';
import {
    CreateSaleOrderRequest,
    CreateSaleOrderTransferRequest,
    DiscountOnType,
    EstimateDiscountItemModel,
    OrderStatus,
    SaleOrderLineTravellerDto,
    TourScheduleDto,
    TravellerDto,
    UpdateSaleOrderRequest,
} from '@sdk/tour-operations';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';
import { STATUS_ERROR } from '@src/types/statusErrors';
import { useSaleOrderStore } from '@store/saleOrderStore';
import { useTourSchedulesStore, useTourScheduleStore } from '@store/tourScheduleStore';
import { isEmptyString, transformDataForm } from '@utils/formHelper';

import { useCreateSaleOrderChangeTour } from '../../../../hooks/useSaleOrder';
import { defaultID } from '../../type/enum';
import { CommissionModel } from '../CommissionComponent';

interface InfoProps {
    form: FormInstance;
    touristForm: FormInstance;
    totalAmountForm: FormInstance;
    soCode?: string;
    isEnableEdit: boolean;
    isFirstTimeDirty: boolean;
    isModalWarningOpen: boolean;
    isConfirmOverload: boolean;
    surchargeForm: FormInstance;
    personContactForm: FormInstance;
    setSoCode: React.Dispatch<React.SetStateAction<string | undefined>>;
    setIsEnableEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setIsFirstTimeDirty: React.Dispatch<React.SetStateAction<boolean>>;
    setIsModalWarningOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsConfirmOverload: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
    setInvalidQuerySOList: () => void;
    // eslint-disable-next-line no-unused-vars
    handleDataPersonContact: (traveller: TravellerDto) => void;
}

export const InfoComponent: React.FC<InfoProps> = props => {
    const {
        form,
        touristForm,
        totalAmountForm,
        personContactForm,
        isFirstTimeDirty,
        surchargeForm,
        isEnableEdit,
        setIsFirstTimeDirty,
        setSoCode,
        soCode,
        setIsEnableEdit,
        isConfirmOverload,
        setIsConfirmOverload,
        setIsSubmitting,
        setInvalidQuerySOList,
        handleDataPersonContact,
    } = props;

    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { soId } = useParams<string>();
    const { clonedId } = (useLocation().state ?? { cloneId: false }) as RouteCloneSOState;
    const { changeTourSOId } = (useLocation().state ?? { changeTourSOId: false }) as RouteChangeTourSOState;
    const isSOTN = useCheckSOTN();

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<CreateSaleOrderRequest>({
        hasInvoice: false,
    });
    const [currentTourId, setCurrentTourId] = useState<string>();
    const [oldSOId, setOldSOId] = useState<string>();

    // Mutate
    const { mutateAsync: createSaleOrder } = useCreateSaleOrder();
    const { mutateAsync: updateSaleOrder } = useUpdateSaleOrder();
    const { mutateAsync: createSaleOrderChangeTour } = useCreateSaleOrderChangeTour();

    // Store
    const { tourSchedules } = useTourSchedulesStore(state => state);
    const { defaultContact } = useSaleOrderFormStore(state => state);
    const {
        saleOrder,
        saleOrderFormStatus,
        actions: { setSaleOrder, setSaleOrderFormStatus },
    } = useSaleOrderStore(state => state);
    const { tourSchedule } = useTourScheduleStore(state => state);
    const {
        numberOfRooms,
        numberOfTravellers,
        saleOrderLines,
        tourId,
        commission,
        paymentMethod,
        actions: { setNumberOfTravellers, setNumberOfRooms, setTourId, setCommission, setIsCallAgainDiscountList },
    } = useSaleOrderDetailStore(state => state);
    const { personContactDetail } = usePersonContactStore(state => state);

    const syncDataFormWithNewSO = useCallback(() => {
        setTourId(saleOrder?.tourScheduleId ?? '');
        setNumberOfRooms(saleOrder?.numberOfRooms ?? 0);
        setNumberOfTravellers(saleOrder?.numberOfTravellers ?? 0);
        const commission: CommissionModel = {
            presenter: saleOrder?.presenter ?? '',
            presenterPhone: saleOrder?.presenterPhone ?? '',
            commissionAmount: saleOrder?.commissionAmt,
            agencyCommissionAmt: saleOrder?.agencyCommissionAmt,
        };
        setCommission(commission);
    }, [
        saleOrder?.commissionAmt,
        saleOrder?.numberOfRooms,
        saleOrder?.numberOfTravellers,
        saleOrder?.presenter,
        saleOrder?.presenterPhone,
        saleOrder?.tourScheduleId,
        setCommission,
        setNumberOfRooms,
        setNumberOfTravellers,
        setTourId,
    ]);

    // init data with Clone SO / Change tour SO
    const initDataWithNewStatusSO = useCallback(
        (isChangeTour: boolean = false) => {
            const newData = {
                ...saleOrder,
                status: OrderStatus.New,
                orderNo: soCode,
                discounts: [],
                totalDiscountAmt: 0,
            };
            // delete id to check when data was cloned
            setOldSOId(saleOrder.id);
            isChangeTour && delete newData.id;
            setData(newData);
            setSaleOrder(newData);
            syncDataFormWithNewSO();
        },
        [saleOrder, setSaleOrder, soCode, syncDataFormWithNewSO],
    );

    // init data with none condition
    const initDataNoneCondition = useCallback(() => {
        const newData = { ...saleOrder };
        setData(newData);
        setSoCode(saleOrder?.orderNo);
        setSaleOrder(saleOrder ?? {});
        syncDataFormWithNewSO();
    }, [saleOrder, setSaleOrder, setSoCode, syncDataFormWithNewSO]);

    const initData = useCallback(async () => {
        if (!isEmpty(saleOrder)) {
            if (clonedId && soCode && saleOrder.status !== OrderStatus.New) {
                // only clone for canceled SO
                initDataWithNewStatusSO();
            } else if (changeTourSOId && soCode && saleOrder.id) {
                // for all status SO except canceled
                initDataWithNewStatusSO(true);
            } else if (!clonedId && !changeTourSOId && !soCode) {
                initDataNoneCondition();
            }
        }
        setIsLoading(false);
    }, [saleOrder, clonedId, soCode, changeTourSOId, initDataWithNewStatusSO, initDataNoneCondition]);

    useEffect(() => {
        initData();
    }, [initData]);

    useEffect(() => {
        let tourSchedule = null;
        if (tourId) {
            tourSchedule = tourSchedules.filter(x => x.id == tourId)[0];
        }
        if (!isLoading && data) {
            form.setFieldsValue({
                ...data,
                tourScheduleId: tourId,
                numberOfRooms: numberOfRooms,
                numberOfTravellers: numberOfTravellers,
                orderNo: props.soCode,
                customerId: tourSchedule?.customerId,
                currencyId: (tourSchedule as TourScheduleDto)?.currencyId,
            });
        }
    }, [data, form, isLoading, numberOfRooms, numberOfTravellers, props.soCode, tourId, tourSchedules]);

    useEffect(() => {
        if (!isEmpty(saleOrder)) {
            setData(prev => ({
                ...prev,
                ...saleOrder,
            }));
        }
    }, [saleOrder]);

    useEffect(() => {
        if (!isEmpty(paymentMethod)) {
            setData(prev => ({
                ...prev,
                paymentMethodId: paymentMethod?.id,
                paymentAmt: paymentMethod?.value,
            }));
        }
    }, [paymentMethod]);

    useEffect(() => {
        if (!isEmpty(commission)) {
            setData(prev => ({
                ...prev,
                presenter: commission.presenter,
                presenterPhone: commission.presenterPhone,
                commissionAmt: commission.commissionAmount,
                agencyCommissionAmt: commission.agencyCommissionAmt,
            }));
        }
    }, [commission]);

    useEffect(() => {
        if (!isEmpty(saleOrderLines)) {
            setData(prev => ({
                ...prev,
                saleOrderLines: saleOrderLines,
            }));
        }
    }, [saleOrderLines]);

    useEffect(() => {
        if (saleOrderFormStatus?.isInfoFormSuccess) {
            toastSuccess('', saleOrderFormStatus.message ?? '');
            // Create sale order successful.
            if (saleOrderFormStatus?.soId && soId != saleOrderFormStatus.soId) {
                navigate(`${rootPaths.saleOrderForm}/${saleOrderFormStatus.soId}`, {
                    state: {
                        clonedId: undefined,
                        changeTourSOId: undefined,
                    } as RouteCloneSOState,
                });
            }
            setInvalidQuerySOList();
        }
    }, [
        navigate,
        saleOrderFormStatus?.isInfoFormSuccess,
        saleOrderFormStatus.message,
        saleOrderFormStatus.soId,
        setInvalidQuerySOList,
        soId,
    ]);

    const handleUpdateSuccess = (soId: string) => {
        setSaleOrderFormStatus({
            isInfoFormSuccess: true,
            soId: soId,
            message: i18n.t('Cập nhật thành công!'),
        });

        setIsFirstTimeDirty(true);
        setIsEnableEdit(false);
    };

    const handleCreateSuccess = (soId: string) => {
        setSaleOrderFormStatus({
            isInfoFormSuccess: true,
            soId: soId,
            message: i18n.t('Thêm mới thành công!'),
        });

        setIsFirstTimeDirty(true);
        setIsEnableEdit(false);
    };

    const handleErrorOverload = () => {
        props.setIsModalWarningOpen(true);
        queryClient.invalidateQueries({ queryKey: ['getTourScheduleId'] });
    };

    const handleErrorDiscount = () => {
        toastErr('Thông báo', 'Không thể sử dụng ưu đãi mà bạn đã chọn áp dụng. Vui lòng xem lại thông tin!');

        setIsCallAgainDiscountList(true);
    };

    const handleUpdateSO = async (values: AnyObject, travellersNew: SaleOrderLineTravellerDto[]) => {
        try {
            const overloadConfirm = saleOrder.status !== OrderStatus.Overload ? isConfirmOverload : true;
            values.isOverloadConfirmed = overloadConfirm;
            values.travellers = travellersNew;
            values.readDiscountGroupExpired = !isEmpty(saleOrder.expiredDiscountGroupCode);

            const response = await updateSaleOrder(values as UpdateSaleOrderRequest);
            queryClient.invalidateQueries({ queryKey: ['getSaleOrder'] });
            queryClient.invalidateQueries({ queryKey: ['getTourScheduleId'] });
            if (response.status == 200) {
                handleUpdateSuccess(response.data);
                return;
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error?.response?.data?.messages?.[0] === STATUS_ERROR.OVERLOAD.toString()) {
                    handleErrorOverload();
                }
            }
        }
    };

    const handleCreateSO = async (values: AnyObject, travellersNew: SaleOrderLineTravellerDto[]) => {
        values = values as CreateSaleOrderRequest;
        delete values.id;

        try {
            const response = await createSaleOrder({
                ...values,
                orderDate: dayjs().toDate(),
                isOverloadConfirmed: isConfirmOverload,
                travellers: travellersNew,
                isTransfer: !!changeTourSOId,
            });

            if (response.status == 200) {
                handleCreateSuccess(response.data);
                return;
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error?.response?.data?.messages?.[0] === STATUS_ERROR.OVERLOAD.toString()) {
                    handleErrorOverload();
                }
                if (error?.response?.data?.messages?.[0] === STATUS_ERROR.DISCOUNT_OUT_OF_STOCK.toString()) {
                    handleErrorDiscount();
                }
            }
        }
    };

    const handleCreateChangeTourSO = async (values: AnyObject, travellersNew: SaleOrderLineTravellerDto[]) => {
        values = values as CreateSaleOrderTransferRequest;
        delete values.id;

        try {
            const response = await createSaleOrderChangeTour({
                ...values,
                orderDate: dayjs().toDate(),
                isOverloadConfirmed: isConfirmOverload,
                travellers: travellersNew,
                saleOrderOldId: oldSOId,
                isTransfer: true,
            });

            if (response.status == 200) {
                handleCreateSuccess(response.data);
                setOldSOId('');
                return;
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error?.response?.data?.messages?.[0] === STATUS_ERROR.OVERLOAD.toString()) {
                    handleErrorOverload();
                }
            }
        }
    };

    const onFinish = async (values: AnyObject) => {
        const travellersNew = transformDataForm(touristForm, defaultID.travellers);
        const discountCodes = totalAmountForm.getFieldValue('discountCodes');
        const totalDiscountAmt = totalAmountForm.getFieldValue('totalDiscountAmt');
        const discounts = totalAmountForm.getFieldValue('discounts');
        const vatId = totalAmountForm.getFieldValue('vatId');
        const totalIncludeVatAmt = totalAmountForm.getFieldValue('totalIncludeVatAmt');
        const paymentMethodId = totalAmountForm.getFieldValue('paymentMethodId');
        const surcharge = transformDataForm(surchargeForm, defaultID.surcharge);
        values.paymentAmt = totalAmountForm.getFieldValue('paymentAmt');
        values.saleOrderLines = surcharge;
        values.vatId = vatId;
        values.paymentMethodId = paymentMethodId;

        if (isEmptyString(values.travellerId)) {
            if (isEmptyString(personContactDetail.id)) {
                toastErr('Thông báo', 'Tạo người liên lạc thất bại. Vui lòng chọn lại người liên lạc.');
                queryClient.invalidateQueries({ queryKey: ['getTourScheduleId'] });
                setIsSubmitting(false);
                return;
            } else {
                values.traverllerId = personContactDetail.id;
            }
        }

        if (!isEmpty(discountCodes)) {
            // case exist promotions apply

            // check is exist EL promotion and paymentAmt > 0
            const existELDiscount: EstimateDiscountItemModel =
                discounts.find(
                    (x: EstimateDiscountItemModel) => x.discountType == DiscountOnType.EarlyBirdLastMinute,
                ) ?? {};

            if (((!values.paymentAmt && totalIncludeVatAmt > 0) || isConfirmOverload) && !isEmpty(existELDiscount)) {
                let contentError = '';

                if (!values.paymentAmt) {
                    contentError = `Không thể sử dụng ưu đãi ${existELDiscount.discountCode} mà bạn đã áp dụng vì chưa thỏa điều kiện khách phải trả tiền cọc. Vui lòng xem lại thông tin!`;
                } else if (isConfirmOverload) {
                    contentError = `Không thể sử dụng ưu đãi ${existELDiscount.discountCode} mà bạn đã áp dụng vì đơn quá tải, không thỏa điều kiện khách phải trả tiền cọc. Vui lòng xem lại thông tin!`;
                }

                toastErr('Thông báo', contentError);
                queryClient.invalidateQueries({ queryKey: ['getTourScheduleId'] });
                setIsSubmitting(false);
                return;
            }

            let isKeepPromotions = true;
            const listCodeAppliedFromData = saleOrder.discounts?.map(x => x.discountCode ?? '') ?? [];
            discountCodes.map((x: string) => {
                if (isKeepPromotions) {
                    isKeepPromotions = listCodeAppliedFromData.includes(x);
                }
            });

            // case not change any promotions
            if (isKeepPromotions) {
                delete values.discountCodes;
                delete values.totalDiscountAmt;
            } else {
                // case change promotions compare with old SO data

                values.discountCodes = discountCodes;
                values.totalDiscountAmt = totalDiscountAmt;
            }
        } else if (isEmpty(discountCodes) && !isEmpty(saleOrder.discounts)) {
            // case uncheck all Promotions

            values.discountCodes = [];
            values.totalDiscountAmt = 0;
        } else {
            // case don't have any promotions from new SO and exist SO

            delete values.discountCodes;
            delete values.totalDiscountAmt;
        }

        if (values.id && !clonedId && !changeTourSOId) {
            await handleUpdateSO(values, travellersNew);
        } else if (changeTourSOId) {
            await handleCreateChangeTourSO(values, travellersNew);
        } else {
            await handleCreateSO(values, travellersNew);
        }
        setIsSubmitting(false);
        setSaleOrderFormStatus({});
    };

    useEffect(() => {
        form.setFieldValue('contactName', defaultContact.name);
        form.setFieldValue('contactPhone', defaultContact.phone);
    }, [defaultContact, form]);

    const onValuesChange = (_value: AnyObject) => {
        if (isFirstTimeDirty && !props.isEnableEdit) {
            setIsFirstTimeDirty(false);
            setIsEnableEdit(true);
        }

        // debounceSetInfoData(_value);
    };

    useEffect(() => {
        setData(prev => ({
            ...prev,
            depositAmt: saleOrder.depositAmt,
        }));
    }, [saleOrder.depositAmt]);

    const renderContentModal = useCallback(() => {
        let content = 'Tour đã hết chỗ, vui lòng đặt tour khác. Nếu vẫn lưu thì đơn sẽ được gửi duyệt.';
        if (tourSchedule?.remainingCapacity && tourSchedule?.remainingCapacity > 0) {
            content = `Tour còn ${tourSchedule?.remainingCapacity} chỗ, vui lòng đặt tour khác hoặc bỏ bớt số lượng khách đi tour. Nếu vẫn lưu thì đơn sẽ được gửi duyệt.`;
        }

        return <p className="pr-2">{content}</p>;
    }, [tourSchedule?.remainingCapacity]);

    const handleConfirmOverload = () => {
        props.setIsModalWarningOpen(false);
        setIsConfirmOverload(true);
        setCurrentTourId(tourId);
    };

    useEffect(() => {
        if (tourId !== currentTourId && isConfirmOverload) {
            setIsConfirmOverload(false);
        }
    }, [isConfirmOverload, tourId, currentTourId, setIsConfirmOverload]);

    const handleInvoice = (e: CheckboxChangeEvent) => {
        setData(prev => ({
            ...prev,
            hasInvoice: e.target.checked,
        }));
    };

    useEffect(() => {
        if (saleOrder.status === OrderStatus.Overload && isConfirmOverload) {
            setIsConfirmOverload(false);
        }
    }, [isConfirmOverload, saleOrder.status, setIsConfirmOverload]);

    const disableInvoice = useMemo(
        () =>
            !data.hasInvoice ||
            shouldDisableAllForm(saleOrder.status) ||
            ((saleOrder.paymentAmt ?? 0) > 0 && !isEmptyString(saleOrder.vatId)),
        [data.hasInvoice, saleOrder.paymentAmt, saleOrder.status, saleOrder.vatId],
    );

    const disbaleCheckBoxInvoice = useMemo(() => {
        return (saleOrder.paymentAmt ?? 0) > 0;
    }, [saleOrder.paymentAmt]);

    const handleClearPersonContact = () => {
        setSaleOrder({ ...saleOrder, travellerId: undefined });
    };

    if (isLoading) return <Skeleton paragraph={{ rows: 10 }} />;

    return (
        <div className=" bg-white p-6 border border-solid border-gray-100">
            <Form
                form={form}
                initialValues={data}
                onFinish={onFinish}
                layout="vertical"
                disabled={shouldDisableAllForm(saleOrder.status) || isSOTN}
                onValuesChange={onValuesChange}
            >
                <Form.Item name="id" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="orderStatus" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="tourScheduleId" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="orderNo" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="numberOfTravellers" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="numberOfRooms" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="customerId" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="currencyId" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="paymentMethodId" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="paymentAmt" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="presenter" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="presenterPhone" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="commissionAmt" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="agencyCommissionAmt" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="vatId" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="travellers" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="saleOrderLines" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="discountCodes" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="totalDiscountAmt" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="contactName" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="contactPhone" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="contactEmail" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="contactAddress" hidden>
                    <Input />
                </Form.Item>
                <Form.Item name="travellerId" hidden>
                    <Input />
                </Form.Item>
                <div>
                    <PersonContactForm
                        form={personContactForm}
                        travellerId={saleOrder.travellerId ?? ''}
                        handleDataPersonContact={handleDataPersonContact}
                        isEnableEdit={isEnableEdit}
                        setIsEnableEdit={setIsEnableEdit}
                        handleClearPersonContact={handleClearPersonContact}
                    />
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <Form.Item
                            className="mb-0"
                            name="description"
                            label={<p className="mb-1">{i18n.t('saleorder.defaultContact.note')}</p>}
                        >
                            <Input placeholder={i18n.t('saleorder.defaultContact.noteDesc')} />
                        </Form.Item>
                    </div>
                    <Form.Item name="hasInvoice" className="mb-0" valuePropName="checked">
                        <Checkbox onChange={handleInvoice} disabled={disbaleCheckBoxInvoice}>
                            Thông tin xuất hoá đơn
                        </Checkbox>
                    </Form.Item>
                    {data.hasInvoice && (
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <Form.Item
                                className="mb-0"
                                name="companyName"
                                label={<p className="mb-1">{i18n.t('saleorder.defaultContact.companyName')}</p>}
                                rules={[
                                    {
                                        required: data.hasInvoice ?? false,
                                        message: i18n.t('saleorder.defaultContact.require.requireCompanyName'),
                                    },
                                ]}
                            >
                                <Input
                                    disabled={disableInvoice}
                                    placeholder={i18n.t('saleorder.defaultContact.companyName')}
                                />
                            </Form.Item>
                            <Form.Item
                                className="mb-0"
                                name="companyTaxCode"
                                label={<p className="mb-1">{i18n.t('saleorder.defaultContact.companyTaxID')}</p>}
                                rules={[
                                    {
                                        required: data.hasInvoice ?? false,
                                        message: i18n.t('saleorder.defaultContact.require.requireCompanyTaxID'),
                                    },
                                ]}
                            >
                                <Input
                                    disabled={disableInvoice}
                                    placeholder={i18n.t('saleorder.defaultContact.companyTaxID')}
                                />
                            </Form.Item>
                            <Form.Item
                                className="mb-0"
                                name="companyAddress"
                                label={<p className="mb-1">{i18n.t('saleorder.defaultContact.companyAddress')}</p>}
                                rules={[
                                    {
                                        required: data.hasInvoice ?? false,
                                        message: i18n.t('saleorder.defaultContact.require.requireCompanyAddress'),
                                    },
                                ]}
                            >
                                <Input
                                    disabled={disableInvoice}
                                    placeholder={i18n.t('saleorder.defaultContact.companyAddress')}
                                />
                            </Form.Item>
                            <Form.Item
                                className="mb-0"
                                name="companyEmail"
                                label={<p className="mb-1">{i18n.t('saleorder.defaultContact.companyMail')}</p>}
                                rules={[
                                    {
                                        required: data.hasInvoice ?? false,
                                        message: i18n.t('saleorder.defaultContact.require.requireCompanyMail'),
                                    },
                                ]}
                            >
                                <Input
                                    disabled={disableInvoice}
                                    placeholder={i18n.t('saleorder.defaultContact.companyMail')}
                                />
                            </Form.Item>
                        </div>
                    )}
                </div>
            </Form>
            <Modal
                open={props.isModalWarningOpen && !isConfirmOverload}
                cancelText="Quay lại"
                cancelButtonProps={{ style: { display: 'none' } }}
                okText="Đồng ý"
                onOk={handleConfirmOverload}
                onCancel={handleConfirmOverload}
                destroyOnClose={true}
                maskClosable={false}
            >
                {renderContentModal()}
            </Modal>
        </div>
    );
};
