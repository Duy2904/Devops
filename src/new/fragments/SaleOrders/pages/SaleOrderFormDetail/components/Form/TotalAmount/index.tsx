import {
    DepositType,
    DiscountOnType,
    EstimateDiscountItemModel,
    EstimateDiscountResponse,
    OrderStatus,
    PaginationResponseOfDiscountDto,
    SaleOrderDiscountDto,
    SaleOrderDto,
} from '@sdk/tour-operations';
import {
    calculateRemainAmountForRefundSO,
    checkIsRefundSO,
    RouteChangeTourSOState,
    RouteCreateSOFromTourDepartureSchedule,
} from '../../../features';
import { Flex, Form, FormInstance, InputNumber } from 'antd';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import isNumber from 'lodash/isNumber';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

import { BaseInput } from '@components/customizes/Input/BaseInput';
import { toastErr } from '@components/ui/Toast/Toast';
import { Price } from '@src/new/fragments/SaleOrders/components/Price';
import { useCheckTourSendGuest } from '@src/new/fragments/SaleOrders/hooks/useCheckTourSendGuest';
import { convertValues, Pattern } from '@utils/formHelper';
import i18n from '@src/i18n';

import { useGetDiscountList, useGetEstimateDiscount } from '../../../hooks/mutates';
import { useGetPaymentMethods, useGetVats, useQueryGetTourScheduleUseId } from '../../../hooks/queries';
import { useGetTotalAmountSurcharge } from '../../../hooks/useGetTotalAmountSurcharge';
import { useGetTotalAmountTraveller } from '../../../hooks/useGetTotalAmountTraveller';
import { TravellerSub } from '../../../type';
import { PaymentTypeSelect } from '../../Select/PaymentTypeSelect';
import { VatSelect } from '../../Select/Vat';
import { AmountItem } from './components/AmountItem';
import { CouponDrawer } from './components/CouponDrawer';
import { PreferentialDiscount } from './components/PreferentialDiscount';
import { comparePromotions, mixedArray, sortDiscountItem } from './features';

interface TotalAmountProps {
    dataSO?: SaleOrderDto;
    totalAmountForm: FormInstance;
    invoiceForm: FormInstance;
    tourInfoForm: FormInstance;
    totalTravellerForm: FormInstance;
    numberOfTotalForm: FormInstance;
    surchargeForm: FormInstance;
    reduceForm: FormInstance;
    isEnableEdit: boolean;
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
}

export const TotalAmount: React.FC<TotalAmountProps> = props => {
    const {
        dataSO,
        totalAmountForm,
        invoiceForm,
        tourInfoForm,
        totalTravellerForm,
        numberOfTotalForm,
        surchargeForm,
        reduceForm,
        isEnableEdit,
        setIsEnableEdit,
    } = props;

    const { soId } = useParams<string>();
    const { changeTourSOId } = (useLocation().state ?? { changeTourSOId: false }) as RouteChangeTourSOState;
    const { dataPromotionsApplied: dataPromotionsAppliedFromTourDepartureSchedule } = (useLocation().state ?? {
        dataPromotionsApplied: false,
    }) as RouteCreateSOFromTourDepartureSchedule;

    const isHasInvoiceWatch = Form.useWatch('hasInvoice', invoiceForm);
    const tourIdWatch = Form.useWatch('tourScheduleId', tourInfoForm);
    const vatIdFormWatch = Form.useWatch('vatId', totalAmountForm);
    const paymentAmt = Form.useWatch('paymentAmt', totalAmountForm);
    const numberOfTravellersWatch: number = Form.useWatch('numberOfTravellers', numberOfTotalForm);

    const reduceFormWatch = Form.useWatch([], reduceForm);
    const dataReduceFormConvert = convertValues(reduceFormWatch);

    const totalTravellerFormWatch = Form.useWatch([], totalTravellerForm);
    const dataTotalTravellerConvert: TravellerSub[] = convertValues(totalTravellerFormWatch);

    const totalAmountTraveller = useGetTotalAmountTraveller(totalTravellerForm);
    const totalAmountSurcharge = useGetTotalAmountSurcharge(surchargeForm);

    // State
    const [disableFields, setDisableFields] = useState<string[]>([]);
    const [isFirstTimeInitData, setIsFirstTimeInitData] = useState<boolean>(true);
    const [totalAmountAppliedPromotion, setTotalAmountAppliedPromotion] = useState<number | undefined>(undefined);
    const [isCouponDrawerOpen, setIsCouponDrawerOpen] = useState(false);
    const [isCalledPromotion, setIsCalledPromotion] = useState<boolean>(false);
    const [isCalledPromotionWithTourId, setIsCalledPromotionWithTourId] = useState<string>('');
    const [isAppliedPromotion, setIsAppliedPromotion] = useState<boolean>(false);
    const [dataPromotionsEL, setDataPromotionsEL] = useState<PaginationResponseOfDiscountDto>();
    const [dataPromotionsGroup, setDataPromotionsGroup] = useState<PaginationResponseOfDiscountDto>();
    const [dataPromotionsApplied, setDataPromotionsApplied] = useState<
        EstimateDiscountItemModel[] | SaleOrderDiscountDto[]
    >([]);
    const [listPromotionGroupWithPrice, setListPromotionGroupWithPrice] = useState<EstimateDiscountItemModel[]>([]);
    const [listPromotionELWithPrice, setListPromotionELWithPrice] = useState<EstimateDiscountItemModel[]>([]);

    // Queries
    const { data: dataVAT } = useGetVats();
    const { data: paymentMethodOptions } = useGetPaymentMethods();
    const { data: dataTourSchedule } = useQueryGetTourScheduleUseId(tourIdWatch);

    // Mutations
    const { mutateAsync: getListDiscount, isLoading: loadingGetDiscountList } = useGetDiscountList(
        dataTourSchedule?.id ?? '',
    );
    const { mutateAsync: getEstimateDiscount, isLoading: loadingEstDiscount } = useGetEstimateDiscount();

    const isTourSendGuest = useCheckTourSendGuest({ dataSO, dataTourSchedule });
    const listPromotionsEL = useMemo(() => dataPromotionsEL?.data ?? [], [dataPromotionsEL?.data]);
    const listPromotionsGroup = useMemo(() => dataPromotionsGroup?.data ?? [], [dataPromotionsGroup?.data]);
    const isEmptyPromotionsEL = isEmpty(listPromotionsEL) || isNil(listPromotionsEL);
    const isEmptyPromotionsGroup = isEmpty(listPromotionsGroup) || isNil(listPromotionsGroup);
    const listPromotionWithPrice = [...listPromotionELWithPrice, ...listPromotionGroupWithPrice];
    const totalPromotion = dataPromotionsApplied.reduce(
        (accumulator, currentValue) => accumulator + (currentValue?.discountAmount ?? 0),
        0,
    );

    const reduceVisa = useMemo(() => dataReduceFormConvert?.[0] ?? {}, [dataReduceFormConvert]);
    const totalReduceAmount = useMemo(
        () => Number(reduceVisa?.quantity ?? 0) * Number(reduceVisa?.price ?? 0) * -1,
        [reduceVisa?.price, reduceVisa?.quantity],
    );
    const totalAmountSO = useMemo(
        () => totalAmountTraveller + totalAmountSurcharge,
        [totalAmountSurcharge, totalAmountTraveller],
    );
    const amountTax = useMemo(() => {
        const vat = dataVAT?.data?.find(x => x.id === vatIdFormWatch)?.value ?? 0;
        return (totalAmountSO + totalReduceAmount) * vat;
    }, [dataVAT?.data, totalAmountSO, totalReduceAmount, vatIdFormWatch]);

    const handleApplyPromotion = useCallback(
        (listPromotion: EstimateDiscountItemModel[]) => {
            const listCode: string[] = [];
            let totalDiscount = 0;
            listPromotion?.forEach(item => {
                listCode.push(item.discountCode ?? '');
                totalDiscount += item.discountAmount ?? 0;
            });
            setDataPromotionsApplied(listPromotion);
            setTotalAmountAppliedPromotion(totalAmountSO);
            totalAmountForm.setFieldValue('discountCodes', listCode);
            totalAmountForm.setFieldValue('totalDiscountAmt', totalDiscount);
            totalAmountForm.setFieldValue('discounts', listPromotion);

            if (!isEnableEdit) {
                setIsEnableEdit(true);
            }
        },
        [isEnableEdit, setIsEnableEdit, totalAmountForm, totalAmountSO],
    );

    const resetPromotion = useCallback(() => {
        if (!isEmpty(dataPromotionsApplied)) {
            toastErr('Thông báo', 'Không thể sử dụng ưu đãi mà bạn đã chọn áp dụng. Vui lòng xem lại thông tin!');
        }
        setDataPromotionsApplied([]);
        setTotalAmountAppliedPromotion(undefined);
        setIsAppliedPromotion(false);
        totalAmountForm.setFieldValue('discountCodes', undefined);
        totalAmountForm.setFieldValue('totalDiscountAmt', undefined);
    }, [dataPromotionsApplied, totalAmountForm]);

    useEffect(() => {
        if (!(soId || changeTourSOId) && !isEmpty(paymentMethodOptions)) {
            totalAmountForm.setFieldValue('paymentMethodId', paymentMethodOptions?.[1].value);
        }
    }, [changeTourSOId, paymentMethodOptions, soId, totalAmountForm]);

    const totalPayment = useMemo(
        () =>
            totalAmountSO + amountTax + totalReduceAmount - totalPromotion > 0
                ? totalAmountSO + amountTax + totalReduceAmount - totalPromotion
                : 0,
        [amountTax, totalAmountSO, totalPromotion, totalReduceAmount],
    );
    const depositAmt = useMemo(() => {
        let depositAmount = 0;
        const tourScheduleDeposit = dataTourSchedule?.deposit;

        if (tourScheduleDeposit) {
            if (dataTourSchedule.depositType == DepositType.Percentage) {
                depositAmount = (tourScheduleDeposit / 100) * totalPayment;
            } else {
                depositAmount = dataTotalTravellerConvert?.reduce((a, v) => {
                    const tourPrice = Number(v.price ?? 0);
                    const quantity = Number(v.quantity ?? 0);
                    const deposit = tourScheduleDeposit > tourPrice ? tourPrice : tourScheduleDeposit;

                    return a + deposit * quantity;
                }, 0);
            }
        }

        if (depositAmount > totalPayment) {
            depositAmount = totalPayment;
        }

        return depositAmount;
    }, [dataTotalTravellerConvert, dataTourSchedule, totalPayment]);

    const totalRemain = useMemo(() => {
        let remain = 0;

        if (!isEmpty(dataSO) && checkIsRefundSO(dataSO?.status)) {
            const remainRefund = calculateRemainAmountForRefundSO(dataSO, paymentAmt);

            if (remainRefund >= 0) {
                return Number(remainRefund);
            }

            return Number(Math.abs(remainRefund));
        }

        remain = totalPayment - paymentAmt;

        return remain;
    }, [dataSO, paymentAmt, totalPayment]);

    const onValuesChange = () => {
        if (!isEnableEdit) {
            setIsEnableEdit(true);
        }
    };

    const handleApplyOnePromotion = useCallback(
        async ({
            request,
            type,
            isGetInfo,
        }: {
            request: {
                tourScheduleId: string | undefined;
                travellers: {
                    tourPrice: number | undefined;
                }[];
                discountCodes: string[];
            };
            type: DiscountOnType;
            isGetInfo?: boolean;
        }) => {
            const returnData = await getEstimateDiscount(request);

            if (type === DiscountOnType.EarlyBirdLastMinute) {
                setListPromotionELWithPrice(returnData.items ?? []);
            } else if (type === DiscountOnType.Group) {
                setListPromotionGroupWithPrice(returnData.items ?? []);
            }

            if ((returnData.discountAmount ?? 0 > 0) && !isGetInfo) {
                handleApplyPromotion(returnData.items ?? []);
            }
        },
        [getEstimateDiscount, handleApplyPromotion],
    );

    const handleApplyMultiplePromotion = useCallback(
        async ({
            request,
            isGetInfo,
        }: {
            request: {
                tourScheduleId: string | undefined;
                travellers: {
                    tourPrice: number | undefined;
                }[];
                discountCodes: string[];
            };
            isGetInfo?: boolean;
        }) => {
            const isMixed = (dataTourSchedule?.discountOnTypes?.length ?? 0) >= 2;
            const newArray: string[][] = mixedArray(listPromotionsEL, listPromotionsGroup, isMixed);
            let tempPromotions: EstimateDiscountResponse = {};
            let tempListCodeGroup: EstimateDiscountItemModel[] = [];
            let tempListELGroup: EstimateDiscountItemModel[] = [];

            const promiseArray = newArray.map(async item => {
                try {
                    const promotionData = await getEstimateDiscount({ ...request, discountCodes: item });
                    // compare promotionData with tempPromotions to check is New promotions higher than tempPromotions
                    // except case just want to get info list promotions group + EL with discount price
                    if (comparePromotions(promotionData, tempPromotions, totalAmountSO + amountTax)) {
                        tempPromotions = promotionData;
                    }

                    // case have 1 coupon
                    if (item.length == 1) {
                        if (listPromotionsEL.find(x => x.code === item[0])) {
                            tempListELGroup = [...tempListELGroup, ...(promotionData.items ?? [])];
                        } else if (listPromotionsGroup.find(x => x.code === item[0])) {
                            tempListCodeGroup = [...tempListCodeGroup, ...(promotionData.items ?? [])];
                        }
                    }
                } catch (err) {
                    /* empty */
                }
            });

            await Promise.all(promiseArray);

            if (!isGetInfo) {
                handleApplyPromotion(tempPromotions.items ?? []);
            }
            setListPromotionELWithPrice(tempListELGroup);
            setListPromotionGroupWithPrice(sortDiscountItem(tempListCodeGroup));
        },
        [
            amountTax,
            dataTourSchedule?.discountOnTypes?.length,
            getEstimateDiscount,
            handleApplyPromotion,
            listPromotionsEL,
            listPromotionsGroup,
            totalAmountSO,
        ],
    );

    // handle auto apply CTKM when first time click Xem them
    const handleAutoApplyDiscount = useCallback(
        (isGetInfo?: boolean) => {
            if (isAppliedPromotion) {
                return;
            } else {
                setIsAppliedPromotion(true);
            }

            const travellersPrice: {
                tourPrice: number | undefined;
            }[] = [];

            dataTotalTravellerConvert?.forEach(item => {
                for (let i = 0; i < (item.quantity ?? 0); i++) {
                    travellersPrice.push({ tourPrice: item.price });
                }
            });

            const request = {
                tourScheduleId: dataTourSchedule?.id,
                travellers: travellersPrice,
                discountCodes: [] as string[],
            };

            // case only 1 promotion in EL and empty promotion Goup
            if (listPromotionsEL?.length === 1 && isEmptyPromotionsGroup) {
                request.discountCodes = [listPromotionsEL[0].code ?? ''];
                handleApplyOnePromotion({ request: request, type: DiscountOnType.EarlyBirdLastMinute, isGetInfo });
            } else if (listPromotionsGroup?.length === 1 && isEmptyPromotionsEL) {
                // case only 1 promotion in Group and empty promotion EL
                request.discountCodes = [listPromotionsGroup[0].code ?? ''];
                handleApplyOnePromotion({ request: request, type: DiscountOnType.Group, isGetInfo });
            } else {
                // case have more than 1 promotion, EL or Group can empty
                handleApplyMultiplePromotion({ request: request, isGetInfo });
            }
        },
        [
            dataTotalTravellerConvert,
            dataTourSchedule?.id,
            handleApplyMultiplePromotion,
            handleApplyOnePromotion,
            isAppliedPromotion,
            isEmptyPromotionsEL,
            isEmptyPromotionsGroup,
            listPromotionsEL,
            listPromotionsGroup,
        ],
    );

    // handle Open list CTKM
    const handleOpenListPromotions = useCallback(() => {
        setIsCouponDrawerOpen(true);
    }, []);

    const handleCloseCoupon = () => {
        setIsCouponDrawerOpen(false);
    };

    // Click Apply promotions button
    const handleClickPromotionBtn = useDebouncedCallback(
        () => {
            if (isEmptyPromotionsEL && isEmptyPromotionsGroup) {
                return;
            }

            // handle auto apply discount
            if (!isAppliedPromotion) {
                handleAutoApplyDiscount();
            } else {
                // handle Open list CTKM
                handleOpenListPromotions();
            }
        },
        1000,
        { leading: true, trailing: false },
    );

    const handleDisableFields = useCallback(() => {
        if (!dataSO?.status) return;

        switch (dataSO?.status) {
            case OrderStatus.Confirmed:
                setDisableFields(['paymentMethodId', 'paymentAmt', 'vatId', 'discount']);
                break;
            case OrderStatus.Canceled:
                setDisableFields(['paymentMethodId', 'paymentAmt', 'vatId', 'discount']);
                break;
            case OrderStatus.Paid:
                setDisableFields(['paymentMethodId', 'paymentAmt', 'vatId', 'discount']);
                break;
            case OrderStatus.Deposited:
                setDisableFields(['paymentMethodId', 'paymentAmt', 'vatId', 'discount']);
                break;
            case OrderStatus.Confirming:
                if ((dataSO?.paymentAmt ?? 0) > 0) {
                    setDisableFields(['paymentMethodId', 'paymentAmt', 'vatId', 'discount']);
                } else {
                    setDisableFields([]);
                }
                break;
            case OrderStatus.Overload:
                setDisableFields(['paymentMethodId', 'paymentAmt']);
                break;
            case OrderStatus.WaitRefund:
                setDisableFields(['paymentMethodId', 'paymentAmt', 'vatId', 'discount']);
                break;
            case OrderStatus.SendRefund:
                setDisableFields(['paymentMethodId', 'paymentAmt', 'vatId', 'discount']);
                break;
            case OrderStatus.CompletedRefund:
                setDisableFields(['paymentMethodId', 'paymentAmt', 'vatId', 'discount']);
                break;
            default:
                setDisableFields([]);
                break;
        }
    }, [dataSO?.paymentAmt, dataSO?.status]);

    useEffect(() => {
        handleDisableFields();
    }, [handleDisableFields]);

    useEffect(() => {
        if (isFirstTimeInitData && !isEmpty(dataSO?.discounts) && isCalledPromotion) {
            setIsFirstTimeInitData(false);
            handleApplyPromotion(dataSO?.discounts ?? []);
            handleAutoApplyDiscount(true);
        }
    }, [dataSO?.discounts, handleApplyPromotion, handleAutoApplyDiscount, isCalledPromotion, isFirstTimeInitData]);

    useEffect(() => {
        if (isFirstTimeInitData && !isEmpty(dataPromotionsAppliedFromTourDepartureSchedule) && isCalledPromotion) {
            setIsFirstTimeInitData(false);
            handleApplyPromotion(dataPromotionsAppliedFromTourDepartureSchedule);
            handleAutoApplyDiscount(true);
        }
    }, [
        dataPromotionsAppliedFromTourDepartureSchedule,
        handleApplyPromotion,
        handleAutoApplyDiscount,
        isCalledPromotion,
        isFirstTimeInitData,
    ]);

    useEffect(() => {
        if (totalAmountSO !== totalAmountAppliedPromotion && isNumber(totalAmountAppliedPromotion)) {
            resetPromotion();
        }
    }, [resetPromotion, totalAmountAppliedPromotion, totalAmountSO]);

    useEffect(() => {
        if (!isHasInvoiceWatch) {
            totalAmountForm.setFieldValue('vatId', undefined);
        } else {
            totalAmountForm.setFieldValue('vatId', dataSO?.vatId);
        }
    }, [dataSO?.vatId, isHasInvoiceWatch, totalAmountForm]);

    useEffect(() => {
        if (
            !dataTourSchedule?.id ||
            (isCalledPromotionWithTourId === dataTourSchedule?.id && isCalledPromotion) ||
            loadingGetDiscountList
        )
            return;

        const keys = Object.keys(DiscountOnType);

        if (isEmpty(keys)) return;

        resetPromotion();
        setListPromotionGroupWithPrice([]);
        setListPromotionELWithPrice([]);

        const fetchData = keys.map(async item => {
            const result = await getListDiscount(item);

            switch (item) {
                case DiscountOnType.EarlyBirdLastMinute:
                    setDataPromotionsEL(result);
                    break;
                case DiscountOnType.Group:
                    setDataPromotionsGroup(result);
                    break;
            }
        });

        Promise.all(fetchData).then(() => {
            setIsCalledPromotion(true);
            setIsCalledPromotionWithTourId(dataTourSchedule?.id ?? '');
        });
    }, [dataTourSchedule?.id, getListDiscount, isCalledPromotion, isCalledPromotionWithTourId, resetPromotion]);

    useEffect(() => {
        const currentTotalPayment = totalAmountForm.getFieldValue('totalIncludeVatAmt');
        if (totalPayment !== currentTotalPayment) {
            totalAmountForm.setFieldValue('totalIncludeVatAmt', totalPayment);
        }
    }, [totalAmountForm, totalPayment]);

    useEffect(() => {
        const currentTotalDeductionAmount = totalAmountForm.getFieldValue('totalDeductionAmount');
        if (totalReduceAmount * -1 !== currentTotalDeductionAmount) {
            totalAmountForm.setFieldValue('totalDeductionAmount', totalReduceAmount * -1);
        }
    }, [totalAmountForm, totalReduceAmount]);

    return (
        <Form
            form={totalAmountForm}
            className="flex flex-col gap-4 bg-white col-span-12 lg:col-span-5 p-4 border border-solid border-gray-100"
            onValuesChange={onValuesChange}
        >
            <BaseInput isForm isHidden name={'totalIncludeVatAmt'} />
            <BaseInput isForm isHidden name={'discountCodes'} />
            <BaseInput isForm isHidden name={'totalDiscountAmt'} />
            <BaseInput isForm isHidden name={'discounts'} />
            <BaseInput isForm isHidden name={'totalDeductionAmount'} />
            <AmountItem title={i18n.t('saleorder.totalAmount.totalAmount')} price={totalAmountSO} />
            {!isEmpty(dataTourSchedule?.visaTourService) && (
                <AmountItem title={i18n.t('Tổng giảm trừ')} price={totalReduceAmount} />
            )}
            {isHasInvoiceWatch && (
                <div>
                    <div className="col-span-8 text-xs flex items-center mb-1">
                        <span className="text-red-500 mr-1">*</span>Thuế GTGT
                    </div>
                    <div className="grid grid-cols-12 gap-1 mb-4">
                        <div className="col-span-8 text-xs flex items-center">
                            <VatSelect
                                isForm
                                className="mb-0"
                                required
                                rules={[{ required: true, message: i18n.t('validation.default.validDefault') }]}
                                name={'vatId'}
                                disabled={disableFields.includes('vatId')}
                                onChange={resetPromotion}
                            />
                        </div>
                        <Price value={amountTax} className="font-bold col-span-4 text-right" />
                    </div>
                </div>
            )}
            <PreferentialDiscount
                dataPromotionsApplied={dataPromotionsApplied}
                onClick={disableFields.includes('discount') ? () => {} : handleClickPromotionBtn}
                dataSO={dataSO}
                isEmptyPromotionsEL={isEmptyPromotionsEL}
                isEmptyPromotionsGroup={isEmptyPromotionsGroup}
                isAppliedPromotion={isAppliedPromotion}
                numberOfTravellersWatch={numberOfTravellersWatch}
                loadingEstDiscount={loadingEstDiscount}
            />
            <AmountItem title={i18n.t('saleorder.totalAmount.totalPayment')} price={totalPayment} />
            <AmountItem title={i18n.t('saleorder.totalAmount.totalDeposit')} price={depositAmt} />
            <div>
                <div className="grid grid-cols-12 gap-1">
                    <div className="col-span-12 text-xs">{i18n.t('saleorder.totalAmount.totalPaid')}</div>
                    <div className="col-span-12 gap-2 grid grid-cols-12">
                        <PaymentTypeSelect
                            isForm
                            name="paymentMethodId"
                            className="col-span-5 mb-0"
                            options={paymentMethodOptions ?? []}
                            disabled={disableFields.includes('paymentMethodId')}
                        />
                        <Form.Item
                            name="paymentAmt"
                            className="col-span-7 mb-0"
                            rules={[
                                () => ({
                                    validator(_, value) {
                                        if (isTourSendGuest && value < (depositAmt ?? 0) && value > 0) {
                                            return Promise.reject(new Error('Không hợp lệ'));
                                        }
                                        if (value == 0 || !value) {
                                            return Promise.resolve();
                                        }
                                        if (totalPayment - value >= 0 && value > 0) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject(new Error('Không hợp lệ'));
                                    },
                                }),
                                {
                                    pattern: Pattern.decimal3,
                                    message: 'Giá trị không hợp lệ',
                                },
                            ]}
                        >
                            <InputNumber
                                className="w-full"
                                min={0}
                                formatter={value => Intl.NumberFormat('en-US').format(Number(value))}
                                disabled={disableFields.includes('paymentAmt')}
                            />
                        </Form.Item>
                    </div>
                </div>
                {paymentAmt < depositAmt && !isTourSendGuest && !dataSO?.status && (
                    <Flex justify="flex-end">
                        <p className="text-red-500 text-xs pt-1">Tiền khách trả thấp hơn tiền cọc</p>
                    </Flex>
                )}
            </div>
            {checkIsRefundSO(dataSO?.status) && dataSO?.isTourServiceVisa && (
                <AmountItem
                    title={i18n.t('saleorder.totalAmount.nonRefundableVisaFees')}
                    price={dataSO?.nonRefundableVisaFees ?? 0}
                />
            )}
            {checkIsRefundSO(dataSO?.status) && (
                <AmountItem title={i18n.t('saleorder.totalAmount.penaltyFee')} price={dataSO?.penaltyFee ?? 0} />
            )}
            <AmountItem
                title={i18n.t('saleorder.totalAmount.totalRemain')}
                price={checkIsRefundSO(dataSO?.status) ? totalRemain * -1 : totalRemain}
            />
            {checkIsRefundSO(dataSO?.status) && (
                <AmountItem title={i18n.t('saleorder.totalAmount.refundAmount')} price={dataSO?.totalReturnAmt ?? 0} />
            )}
            <CouponDrawer
                couponList={listPromotionWithPrice}
                isOpen={isCouponDrawerOpen}
                onClose={handleCloseCoupon}
                dataPromotionsApplied={dataPromotionsApplied}
                handleApplyPromotion={handleApplyPromotion}
                maxPromotionsCanApply={dataTourSchedule?.discountOnTypes?.length ?? 0}
            />
        </Form>
    );
};
