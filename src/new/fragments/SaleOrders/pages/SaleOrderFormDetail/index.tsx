import {
    CreateSaleOrderRequest,
    DiscountOnType,
    EstimateDiscountItemModel,
    SaleOrderDto,
    UpdateSaleOrderRequest,
} from '@sdk/tour-operations';
import { Col, Form } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { AxiosError } from 'axios';
import clsx from 'clsx';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { LoadingSubmit } from '@components/customizes/Loading/LoadingSubmit';
import { toastErr, toastSuccess, toastWarning } from '@components/ui/Toast/Toast';
import { useGetSaleOrder } from '@hooks/queries/useSaleOrders';
import { useBackStore } from '@src/new/shared/stores/backStore';
import { rootPathsNew } from '@src/routers/newRoute';
import { STATUS_ERROR } from '@src/types/statusErrors';
import { convertValues, transformDataForm } from '@utils/formHelper';
import i18n from '@src/i18n';
import LayoutContentBlock from '@src/new/components/common/LayoutContentBlock';

import { SkeletonPage } from '../../components/SkeletonPage';
import { useCreateSaleOrderChangeTour } from '../../hooks/useSaleOrder';
import { Content } from './components/Content';
import { Header } from './components/Header';
import { useCreateSaleOrder, useGenerateSaleOrderCode, useUpdateSaleOrder } from './hooks/mutates';
import { QueriesKey } from './hooks/QueriesKey';
import { cloneDataSOLikeNew, RouteChangeTourSOState, RouteCloneSOState } from './features';
import { defaultID } from './type';

export const SaleOrderFormDetail: React.FC = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { soId } = useParams<string>();
    const { clonedId } = (useLocation().state ?? { cloneId: false }) as RouteCloneSOState;
    const { changeTourSOId } = (useLocation().state ?? { changeTourSOId: false }) as RouteChangeTourSOState;

    const [travellersForm] = Form.useForm();
    const [tourInfoForm] = Form.useForm();
    const [totalTravellerForm] = Form.useForm();
    const [surchargeForm] = Form.useForm();
    const [totalAmountForm] = Form.useForm();
    const [contactPersonForm] = Form.useForm();
    const [commissionRefForm] = Form.useForm();
    const [commissionCollabForm] = Form.useForm();
    const [numberOfTotalForm] = Form.useForm();
    const [invoiceForm] = Form.useForm();
    const [reduceForm] = Form.useForm();

    const tourIdWatch = Form.useWatch('tourScheduleId', tourInfoForm);

    // State
    const [isEnableEdit, setIsEnableEdit] = useState<boolean>(false);
    const [isModalWarningOpen, setIsModalWarningOpen] = useState<boolean>(false);
    const [isFirstTimeInitData, setIsFirstTimeInitData] = useState<boolean>(true);

    // Store
    const { setPathStore } = useBackStore(state => state);

    // Query
    const { data: dataSO, isLoading: isLoadingDataSO } = useGetSaleOrder(soId ?? clonedId ?? changeTourSOId ?? '');

    // Mutate
    const { mutateAsync: createSaleOrder, isLoading: loadingCreateSO } = useCreateSaleOrder();
    const { mutateAsync: updateSaleOrder, isLoading: loadingUpdateSO } = useUpdateSaleOrder();
    const { mutateAsync: generateSoCode, isLoading: loadingGenSOCode } = useGenerateSaleOrderCode();
    const { mutateAsync: createSaleOrderChangeTour, isLoading: loadingChangeTourSO } = useCreateSaleOrderChangeTour();

    const dataSOClone = useMemo(() => {
        if (isEmpty(dataSO)) return {};

        const newData = cloneDataSOLikeNew(dataSO);

        return newData;
    }, [dataSO]);

    const dataSOChangeTour = useMemo(() => {
        if (isEmpty(dataSO)) return {};

        const newData = cloneDataSOLikeNew(dataSO);

        return newData;
    }, [dataSO]);

    const dataSODetail = useMemo(() => {
        if (soId) {
            return dataSO;
        } else if (clonedId) {
            return dataSOClone;
        } else if (changeTourSOId) {
            return dataSOChangeTour;
        }
    }, [changeTourSOId, clonedId, dataSO, dataSOChangeTour, dataSOClone, soId]);

    const handleCreateSuccess = useCallback(
        (soId: string) => {
            toastSuccess('', i18n.t('Thêm mới thành công!'));
            setPathStore(`${rootPathsNew.saleOrderViewDetail}/${soId}`);
            navigate(`${rootPathsNew.saleOrderViewDetail}/${soId}`);
        },
        [navigate, setPathStore],
    );

    const handleErrorOverload = useCallback(() => {
        setIsModalWarningOpen(true);
        queryClient.invalidateQueries({ queryKey: [QueriesKey.GetTourScheduleId] });
    }, [queryClient]);

    const handleErrorDiscount = () => {
        toastErr('Thông báo', 'Không thể sử dụng ưu đãi mà bạn đã chọn áp dụng. Vui lòng xem lại thông tin!');

        // setIsCallAgainDiscountList(true);
    };

    const handleCreateSO = useCallback(
        async (values: CreateSaleOrderRequest) => {
            values = values as CreateSaleOrderRequest;
            try {
                const response = await createSaleOrder({
                    ...values,
                    orderDate: dayjs().toDate(),
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
        },
        [changeTourSOId, createSaleOrder, handleCreateSuccess, handleErrorOverload],
    );

    const handleCreateChangeTourSO = useCallback(
        async (values: AnyObject) => {
            try {
                const response = await createSaleOrderChangeTour({
                    ...values,
                    orderDate: dayjs().toDate(),
                    saleOrderOldId: changeTourSOId,
                    isTransfer: true,
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
                }
            }
        },
        [changeTourSOId, createSaleOrderChangeTour, handleCreateSuccess, handleErrorOverload],
    );

    const handleUpdateSO = useCallback(
        async (values: AnyObject) => {
            try {
                values.readDiscountGroupExpired = !isEmpty(dataSO?.expiredDiscountGroupCode);

                const response = await updateSaleOrder(values as UpdateSaleOrderRequest);
                if (response.status == 200) {
                    toastSuccess('', i18n.t('Cập nhật thành công!'));
                    setPathStore(`${rootPathsNew.saleOrderViewDetail}/${soId}`);
                    navigate(`${rootPathsNew.saleOrderViewDetail}/${soId}`);
                    return;
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    if (error?.response?.data?.messages?.[0] === STATUS_ERROR.OVERLOAD.toString()) {
                        handleErrorOverload();
                    }
                }
            }
        },
        [dataSO?.expiredDiscountGroupCode, handleErrorOverload, navigate, setPathStore, soId, updateSaleOrder],
    );

    const onFinish = useCallback(async () => {
        const dataTourInfoForm = tourInfoForm.getFieldsValue();
        const dataTotalAmountForm = totalAmountForm.getFieldsValue();
        const dataContactPersonForm = contactPersonForm.getFieldsValue();
        const dataCommissionRefForm = commissionRefForm.getFieldsValue();
        const dataCommissionCollabForm = commissionCollabForm.getFieldsValue();
        const dataInvoiceForm = invoiceForm.getFieldsValue();
        const dataNumberOfTotalForm = numberOfTotalForm.getFieldsValue();
        const dataReduce = reduceForm.getFieldsValue();
        const dataReduceConvert = convertValues(dataReduce);

        const discountCodes = totalAmountForm.getFieldValue('discountCodes');
        const discounts = totalAmountForm.getFieldValue('discounts');
        const isOverloadConfirmed = tourInfoForm.getFieldValue('isOverloadConfirmed');

        const travellers = transformDataForm(travellersForm, defaultID.travellers);
        const dataSurchargeConvert = transformDataForm(surchargeForm, defaultID.surcharge);

        const values: SaleOrderDto = {
            ...dataTourInfoForm,
            ...dataTotalAmountForm,
            ...dataContactPersonForm,
            ...dataCommissionRefForm,
            ...dataCommissionCollabForm,
            ...dataInvoiceForm,
            ...dataNumberOfTotalForm,
            travellers: travellers,
            saleOrderLines: dataSurchargeConvert,
            numberOfVisas: Number(dataReduceConvert?.[0]?.quantity ?? 0),
        };

        if (!isEmpty(discountCodes)) {
            // case exist promotions apply

            // check is exist EL promotion and paymentAmt > 0
            const existELDiscount: EstimateDiscountItemModel =
                discounts?.find(
                    (x: EstimateDiscountItemModel) => x.discountType == DiscountOnType.EarlyBirdLastMinute,
                ) ?? {};

            if (
                ((!values.paymentAmt && (values.totalIncludeVatAmt ?? 0) > 0) || isOverloadConfirmed) &&
                !isEmpty(existELDiscount)
            ) {
                let contentError = '';

                if (!values.paymentAmt) {
                    contentError = `Không thể sử dụng ưu đãi ${existELDiscount.discountCode} mà bạn đã áp dụng vì chưa thỏa điều kiện khách phải trả tiền cọc. Vui lòng xem lại thông tin!`;
                } else if (isOverloadConfirmed) {
                    contentError = `Không thể sử dụng ưu đãi ${existELDiscount.discountCode} mà bạn đã áp dụng vì đơn quá tải, không thỏa điều kiện khách phải trả tiền cọc. Vui lòng xem lại thông tin!`;
                }

                toastErr('Thông báo', contentError);
                queryClient.invalidateQueries({ queryKey: ['getTourScheduleId'] });
                setIsEnableEdit(false);
                return;
            }

            let isKeepPromotions = true;
            const listCodeAppliedFromData = dataSO?.discounts?.map(x => x.discountCode ?? '') ?? [];
            discountCodes.map((x: string) => {
                if (isKeepPromotions) {
                    isKeepPromotions = listCodeAppliedFromData.includes(x);
                }
            });

            // case not change any promotions
            if (isKeepPromotions && dataSO?.totalIncludeVatAmt === values.totalIncludeVatAmt) {
                delete values.discountCodes;
            }
        } else if (isEmpty(discountCodes) && !isEmpty(dataSO?.discounts)) {
            // case uncheck all Promotions

            values.discountCodes = [];
            values.totalDiscountAmt = 0;
        }

        if (values.id && !clonedId && !changeTourSOId) {
            handleUpdateSO(values);
        } else if (changeTourSOId) {
            await handleCreateChangeTourSO(values);
        } else if (!soId) {
            await handleCreateSO(values);
        }
    }, [
        changeTourSOId,
        clonedId,
        commissionCollabForm,
        commissionRefForm,
        contactPersonForm,
        dataSO?.discounts,
        dataSO?.totalIncludeVatAmt,
        handleCreateChangeTourSO,
        handleCreateSO,
        handleUpdateSO,
        invoiceForm,
        numberOfTotalForm,
        queryClient,
        reduceForm,
        soId,
        surchargeForm,
        totalAmountForm,
        tourInfoForm,
        travellersForm,
    ]);

    const handleSubmit = useCallback(async () => {
        const formListValidate = [
            { title: i18n.t('Thông tin tour'), form: tourInfoForm.validateFields() },
            { title: i18n.t('Danh sách khách đi tour'), form: totalTravellerForm.validateFields() },
            { title: i18n.t('Danh sách khách đi tour'), form: travellersForm.validateFields() },
            { title: i18n.t('Danh sách khách đi tour'), form: numberOfTotalForm.validateFields() },
            { title: i18n.t('Giảm trừ'), form: reduceForm.validateFields() },
            { title: i18n.t('Phụ thu'), form: surchargeForm.validateFields() },
            { title: i18n.t('Tổng tiền đơn hàng'), form: totalAmountForm.validateFields() },
            { title: i18n.t('Người liên lạc'), form: contactPersonForm.validateFields() },
            { title: i18n.t('Hoa hồng người giới thiệu'), form: commissionRefForm.validateFields() },
            { title: i18n.t('Hoa hồng của tour gửi khách'), form: commissionCollabForm.validateFields() },
            { title: i18n.t('Thông tin xuất hóa đơn'), form: invoiceForm.validateFields() },
        ];

        try {
            const errors = await Promise.all(
                formListValidate.map(async item => {
                    try {
                        await item.form;
                        return null;
                    } catch (error) {
                        return item.title;
                    }
                }),
            );
            const filteredErrors = errors.filter(error => error !== null);
            if (filteredErrors.length > 0) {
                const errorMessage: ReactNode = filteredErrors.map(error => <li key={error}>{error}</li>);
                toastWarning(i18n.t('validation.default.validForm'), <ul>{errorMessage}</ul>);
            } else {
                onFinish();
            }
        } catch (errors) {
            return errors;
        }
    }, [
        commissionCollabForm,
        commissionRefForm,
        contactPersonForm,
        invoiceForm,
        numberOfTotalForm,
        onFinish,
        reduceForm,
        surchargeForm,
        totalAmountForm,
        totalTravellerForm,
        tourInfoForm,
        travellersForm,
    ]);

    const onSubmit = () => {
        handleSubmit();
    };

    const fetchSoCode = useCallback(async () => {
        const response = await generateSoCode();
        tourInfoForm.setFieldValue('orderNo', response);
    }, [generateSoCode, tourInfoForm]);

    const renderLoadingContent = useCallback(() => {
        let content = '';

        if (loadingGenSOCode) {
            content = i18n.t('Đang tạo mã đơn hàng bán');
        } else if (loadingCreateSO) {
            content = i18n.t('Đang tạo đơn hàng bán');
        } else if (loadingUpdateSO) {
            content = i18n.t('Đang cập nhật đơn hàng bán');
        } else if (loadingChangeTourSO) {
            content = i18n.t('Đang chuyển tour đơn hàng bán');
        }

        return content;
    }, [loadingChangeTourSO, loadingCreateSO, loadingGenSOCode, loadingUpdateSO]);

    useEffect(() => {
        if (!soId) {
            fetchSoCode();
        }
    }, [fetchSoCode, soId]);

    useEffect(() => {
        if (soId && !isEmpty(dataSO) && isFirstTimeInitData) {
            setIsFirstTimeInitData(false);
            tourInfoForm.setFieldsValue(dataSO);
            totalAmountForm.setFieldsValue(dataSO);
            contactPersonForm.setFieldsValue(dataSO);
            commissionRefForm.setFieldsValue(dataSO);
            commissionCollabForm.setFieldsValue(dataSO);
            invoiceForm.setFieldsValue(dataSO);
            numberOfTotalForm.setFieldsValue(dataSO);
        }
    }, [
        commissionCollabForm,
        commissionRefForm,
        contactPersonForm,
        dataSO,
        invoiceForm,
        isFirstTimeInitData,
        numberOfTotalForm,
        soId,
        totalAmountForm,
        tourInfoForm,
    ]);

    useEffect(() => {
        if (clonedId && !isEmpty(dataSOClone) && isFirstTimeInitData) {
            setIsFirstTimeInitData(false);
            setIsEnableEdit(true);
            tourInfoForm.setFieldsValue(dataSOClone);
            totalAmountForm.setFieldsValue(dataSOClone);
            contactPersonForm.setFieldsValue(dataSOClone);
            commissionRefForm.setFieldsValue(dataSOClone);
            commissionCollabForm.setFieldsValue(dataSOClone);
            invoiceForm.setFieldsValue(dataSOClone);
            numberOfTotalForm.setFieldsValue(dataSO);
        }
    }, [
        clonedId,
        commissionCollabForm,
        commissionRefForm,
        contactPersonForm,
        dataSO,
        dataSOClone,
        invoiceForm,
        isFirstTimeInitData,
        numberOfTotalForm,
        totalAmountForm,
        tourInfoForm,
    ]);

    useEffect(() => {
        if (changeTourSOId && !isEmpty(dataSOChangeTour) && isFirstTimeInitData) {
            setIsFirstTimeInitData(false);
            setIsEnableEdit(true);
            tourInfoForm.setFieldsValue(dataSOChangeTour);
            totalAmountForm.setFieldsValue(dataSOChangeTour);
            contactPersonForm.setFieldsValue(dataSOChangeTour);
            commissionRefForm.setFieldsValue(dataSOChangeTour);
            commissionCollabForm.setFieldsValue(dataSOChangeTour);
            invoiceForm.setFieldsValue(dataSOChangeTour);
            numberOfTotalForm.setFieldsValue(dataSO);
        }
    }, [
        changeTourSOId,
        commissionCollabForm,
        commissionRefForm,
        contactPersonForm,
        dataSO,
        dataSOChangeTour,
        invoiceForm,
        isFirstTimeInitData,
        numberOfTotalForm,
        totalAmountForm,
        tourInfoForm,
    ]);

    if (soId && isLoadingDataSO) {
        return <SkeletonPage />;
    }

    const showLoadingPage = loadingCreateSO || loadingUpdateSO || loadingGenSOCode || loadingChangeTourSO;

    return (
        <Col className="h-full">
            {showLoadingPage && <LoadingSubmit contentLoading={renderLoadingContent()} />}
            <Header
                handleSubmit={onSubmit}
                dataSO={dataSODetail}
                isEnableEdit={isEnableEdit && !(changeTourSOId && tourIdWatch === dataSO?.tourScheduleId)}
            />
            <LayoutContentBlock
                className={clsx('px-1 pb-5', soId ? 'max-h-[calc(100vh_-_250px)]' : 'max-h-[calc(100vh_-_180px)]')}
            >
                <Content
                    dataSO={dataSODetail}
                    travellersForm={travellersForm}
                    tourInfoForm={tourInfoForm}
                    totalTravellerForm={totalTravellerForm}
                    surchargeForm={surchargeForm}
                    totalAmountForm={totalAmountForm}
                    contactPersonForm={contactPersonForm}
                    commissionRefForm={commissionRefForm}
                    commissionCollabForm={commissionCollabForm}
                    invoiceForm={invoiceForm}
                    numberOfTotalForm={numberOfTotalForm}
                    reduceForm={reduceForm}
                    isEnableEdit={isEnableEdit}
                    setIsEnableEdit={setIsEnableEdit}
                    isModalWarningOpen={isModalWarningOpen}
                    setIsModalWarningOpen={setIsModalWarningOpen}
                />
            </LayoutContentBlock>
        </Col>
    );
};
