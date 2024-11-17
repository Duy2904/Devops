import { Button, Form, FormInstance, Input, InputNumber, Skeleton } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import isString from 'lodash/isString';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

import { PaymentTypeSelect } from '@components/customizes/Select/PaymentTypeSelect';
import { VatSelect } from '@components/customizes/Select/Vat';
import { useGetVats } from '@components/customizes/Select/Vat/useVat';
import { toastErr } from '@components/ui/Toast/Toast';
import {
    calculateRemainAmountForRefundSO,
    checkIsRefundSO,
    RouteChangeTourSOState,
    RouteCloneSOState,
} from '@fragments/SaleOrders/features';
import { useCheckSOTN } from '@fragments/SaleOrders/hooks/useCheckSOTN';
import { useSaleOrderDetailStore } from '@fragments/SaleOrders/store/saleOrderDetailStore';
import { useSaleOrderFormStore } from '@fragments/SaleOrders/store/saleOrderFormStore';
import { useGetPaymentMethods } from '@hooks/queries/useSaleOrders';
import {
    DepositType,
    DiscountDto,
    DiscountOnType,
    EstimateDiscountItemModel,
    EstimateDiscountResponse,
    OrderStatus,
    PaginationResponseOfDiscountDto,
    SaleOrderDto,
    SearchPaymentMethodsRequest,
    TourScheduleDto,
} from '@sdk/tour-operations';
import i18n from '@src/i18n';
import { useSaleOrderStore } from '@store/saleOrderStore';
import { useSearchTableStore } from '@store/searchTableStore';
import { useTourScheduleStore } from '@store/tourScheduleStore';
import Format from '@utils/format';
import { calTotalRemainAmt } from '@utils/saleOrderHelper';

import { useGetDiscountList, useGetEstimateDiscount } from '../../../../hooks/useGetDiscount';
import { useDiscountStore } from '../../../../store/discountStore';
import { AmountItem } from './components/AmountItem';
import { DiscountItemInfo } from './components/DiscountItemInfo';
import { DiscountModal } from './components/DiscountModal';
import { comparePromotions, mixedArray } from './features';

interface TotalAmountComponentProps {
    soId?: string;
    form: FormInstance;
    infoForm: FormInstance;
    isEnableEdit: boolean;
    isFirstTimeDirty: boolean;
    setIsEnableEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setIsFirstTimeDirty: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TotalAmountComponent: React.FC<TotalAmountComponentProps> = props => {
    const { isFirstTimeDirty, soId, infoForm, setIsFirstTimeDirty, setIsEnableEdit } = props;
    const discountType = DiscountOnType;
    const isHasInvoice = Form.useWatch('hasInvoice', infoForm);
    const { clonedId } = (useLocation().state ?? { cloneId: false }) as RouteCloneSOState;
    const { changeTourSOId } = (useLocation().state ?? { changeTourSOId: false }) as RouteChangeTourSOState;
    const isSOTN = useCheckSOTN();

    // State
    const [isLoading, setIsLoading] = useState(true);
    const [paymentInfo, setPaymentInfo] = useState<SaleOrderDto>();
    const [paymentMethodOptions, setPaymentMethodOptions] = useState<{ label: string; value: string }[]>([]);
    const [totalRemainAmt, setTotalRemainAmt] = useState<number>(0);
    const [disableFields, setDisableFields] = useState<string[]>([]);
    const [dataPromotionsApplied, setDataPromotionsApplied] = useState<EstimateDiscountResponse>({});
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [dataPromotionsEL, setDataPromotionsEL] = useState<PaginationResponseOfDiscountDto>();
    const [dataPromotionsGroup, setDataPromotionsGroup] = useState<PaginationResponseOfDiscountDto>();
    const [listCodeApplied, setListCodeApplied] = useState<string[]>([]);
    const [listCodeGroupWithDiscountPrice, setListCodeGroupWithDiscountPrice] = useState<EstimateDiscountItemModel[]>(
        [],
    );
    const [listCodeELWithDiscountPrice, setListCodeELWithDiscountPrice] = useState<EstimateDiscountItemModel[]>([]);
    const [currentTourId, setCurrentTourId] = useState<string>('');
    const [isFirstTimeInitDataPromotions, setIsFirstTimeInitDataPromotions] = useState<boolean>(true);
    const [isFetchPromotionsDone, setIsFetchPromotionsDone] = useState<boolean>(false);
    const [isShowedWarningRemovePromotion, setIsShowedWarningRemovePromotion] = useState<boolean>(false);

    // store
    const { tourSchedule } = useTourScheduleStore(state => state);
    const { travellerTotalAmount, surchargeTotalAmount } = useSaleOrderFormStore(state => state);
    const { saleOrder } = useSaleOrderStore(state => state);
    const {
        travellers,
        tourId,
        isCallAgainDiscountList,
        actions: { setPaymentMethod, setIsCallAgainDiscountList },
    } = useSaleOrderDetailStore(state => state);
    const { tableParams } = useSearchTableStore(state => state);
    const {
        isAppliedPromotions,
        actions: { setIsAppliedPromotions, resetDiscountStore },
    } = useDiscountStore(state => state);

    // mutate
    const { mutateAsync: getPaymentMethods } = useGetPaymentMethods();
    const { mutateAsync: getEstimateDiscount } = useGetEstimateDiscount();
    const { mutateAsync: getListDiscount } = useGetDiscountList(tableParams, tourId);

    //queries
    const { data: dataVAT } = useGetVats();

    const listPromotionsEL = useMemo(() => dataPromotionsEL?.data ?? [], [dataPromotionsEL?.data]);
    const listPromotionsGroup = useMemo(() => dataPromotionsGroup?.data ?? [], [dataPromotionsGroup?.data]);
    const isEmptyPromotionsEL = isEmpty(listPromotionsEL) || isNil(listPromotionsEL);
    const isEmptyPromotionsGroup = isEmpty(listPromotionsGroup) || isNil(listPromotionsGroup);

    const listCodeDetail = useMemo(
        () => [...listPromotionsEL, ...listPromotionsGroup],
        [listPromotionsEL, listPromotionsGroup],
    );
    // reset store when unmmount
    useEffect(() => {
        return () => {
            resetDiscountStore();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchPaymentMethod = useCallback(async () => {
        const request: SearchPaymentMethodsRequest = {
            pageSize: 10,
        };
        const response = await getPaymentMethods(request);
        const options =
            response.data?.reverse().map(x => ({
                label: x.name ?? '',
                value: x.id ?? '',
            })) ?? [];

        setPaymentMethodOptions(options);
        return options;
    }, [getPaymentMethods]);

    const fetchData = useCallback(async () => {
        const paymentMethods = await fetchPaymentMethod();
        if (!props.soId) {
            setPaymentInfo(prev => ({
                ...prev,
                paymentMethodId: paymentMethods[0].value,
            }));

            setIsLoading(false);
            return;
        }

        setIsLoading(false);
    }, [fetchPaymentMethod, props.soId]);

    useEffect(() => {
        setPaymentMethod({
            id: paymentInfo?.paymentMethodId ?? '',
            value: paymentInfo?.paymentAmt ?? 0,
        });
    }, [paymentInfo?.paymentAmt, paymentInfo?.paymentMethodId, setPaymentMethod]);

    useEffect(() => {
        if (!isEmpty(paymentInfo)) {
            props.form.setFieldsValue({
                ...paymentInfo,
            });
        }
    }, [paymentInfo, props.form]);

    const handleReset = useCallback(() => {
        if (!isAppliedPromotions) return;
        setDataPromotionsApplied({});
        setListCodeApplied([]);
        if (isAppliedPromotions) {
            setIsAppliedPromotions(false);
        }

        props.form.setFieldsValue({
            discountCodes: undefined,
            totalDiscountAmt: 0,
            discounts: [],
        });
    }, [isAppliedPromotions, props.form, setIsAppliedPromotions]);

    // reset discount applied when change something related to price
    const resetDiscount = useDebouncedCallback(() => {
        if (!isAppliedPromotions) return;
        toastErr('Thông báo', 'Không thể sử dụng ưu đãi mà bạn đã chọn áp dụng. Vui lòng xem lại thông tin!');
        handleReset();
    }, 500);

    // fetch Data discount list when exist tourId, have 2 type -> init into 2 arrays
    useEffect(() => {
        if ((isString(tourId) && tourId !== '') || (isString(tourId) && isCallAgainDiscountList)) {
            const keys = Object.keys(discountType);
            if (isCallAgainDiscountList) {
                setIsCallAgainDiscountList(false);
                handleReset();
            }
            if (!isEmpty(keys)) {
                if (currentTourId !== '' && currentTourId !== tourId) {
                    resetDiscount();
                    setDataPromotionsEL({});
                    setDataPromotionsGroup({});
                    setListCodeELWithDiscountPrice([]);
                    setListCodeGroupWithDiscountPrice([]);
                }
                setCurrentTourId(tourId);
                const fetchData = keys.map(async item => {
                    const result = await getListDiscount(item);

                    switch (item) {
                        case discountType.EarlyBirdLastMinute:
                            setDataPromotionsEL(result);
                            break;
                        case discountType.Group:
                            setDataPromotionsGroup(result);
                            break;
                    }
                });

                Promise.all(fetchData).then(() => {
                    if (!isFetchPromotionsDone) {
                        setIsFetchPromotionsDone(true);
                    }
                });
            }
        }
    }, [
        currentTourId,
        discountType,
        getListDiscount,
        handleReset,
        isCallAgainDiscountList,
        isFetchPromotionsDone,
        resetDiscount,
        setIsCallAgainDiscountList,
        tourId,
    ]);

    useEffect(() => {
        const vat = dataVAT?.data?.find(x => x.id === paymentInfo?.vatId)?.value ?? 0;
        const totalAmount = (travellerTotalAmount ?? 0) + (surchargeTotalAmount ?? 0);
        const totalAmountWithPromotions =
            totalAmount + totalAmount * vat - (dataPromotionsApplied?.discountAmount ?? 0);

        let depositAmount = 0;
        const tourScheduleDeposit = tourSchedule?.deposit;

        if (tourScheduleDeposit) {
            if (tourSchedule.depositType == DepositType.Percentage) {
                depositAmount = (tourScheduleDeposit / 100) * totalAmountWithPromotions;
            } else {
                depositAmount = travellers?.reduce((a, v) => {
                    const tourPrice = v.tourPrice ?? 0;
                    if (tourScheduleDeposit > tourPrice) return a + tourPrice;

                    return a + tourScheduleDeposit;
                }, 0);
            }
        }

        // check old total amount and new current amount
        if (
            totalAmountWithPromotions &&
            paymentInfo?.totalAmt &&
            totalAmount !== paymentInfo?.totalAmt &&
            totalAmount !== saleOrder.totalAmt
        ) {
            resetDiscount();
        }

        if (depositAmount > totalAmountWithPromotions) {
            depositAmount = totalAmountWithPromotions;
        }

        setPaymentInfo(prev => ({
            ...prev,
            totalAmt: totalAmount,
            totalIncludeVatAmt: totalAmountWithPromotions < 0 ? 0 : totalAmountWithPromotions,
            depositAmt: depositAmount < 0 ? 0 : depositAmount,
            vatId: paymentInfo?.vatId ?? saleOrder?.vatId,
        }));
    }, [
        travellerTotalAmount,
        surchargeTotalAmount,
        tourSchedule,
        paymentInfo?.depositAmt,
        travellers,
        paymentInfo?.totalAmt,
        resetDiscount,
        dataPromotionsApplied?.discountAmount,
        saleOrder.totalAmt,
        paymentInfo?.vatId,
        dataVAT?.data,
        saleOrder?.vatId,
    ]);

    // update when SO change data
    useEffect(() => {
        setPaymentInfo(prev => ({
            ...prev,
            paymentAmt: saleOrder?.paymentAmt ?? 0,
        }));
    }, [saleOrder.paymentAmt]);

    useEffect(() => {
        if (saleOrder.paymentMethod?.id) {
            setPaymentInfo(prev => ({
                ...prev,
                paymentMethodId: saleOrder?.paymentMethod?.id,
            }));
            props.form.setFieldValue('paymentMethodId', saleOrder?.paymentMethod?.id);
        }
    }, [saleOrder.paymentMethod?.id]);

    useEffect(() => {
        setTotalRemainAmt(calTotalRemainAmt(paymentInfo));
    }, [paymentInfo]);

    useEffect(() => {
        fetchPaymentMethod();
    }, [fetchPaymentMethod]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDisableFields = useCallback(() => {
        if (!saleOrder.status) return;

        if (isSOTN) {
            setDisableFields(['paymentMethodId', 'paymentAmt', 'vatId']);
            return;
        }

        switch (saleOrder.status) {
            case OrderStatus.Confirmed:
                setDisableFields(['paymentMethodId', 'paymentAmt', 'vatId']);
                break;
            case OrderStatus.Canceled:
                setDisableFields(['paymentMethodId', 'paymentAmt', 'vatId']);
                break;
            case OrderStatus.Paid:
                setDisableFields(['paymentMethodId', 'paymentAmt', 'vatId']);
                break;
            case OrderStatus.Deposited:
                setDisableFields(['paymentMethodId', 'paymentAmt', 'vatId']);
                break;
            case OrderStatus.Confirming:
                if ((saleOrder?.paymentAmt ?? 0) > 0) {
                    setDisableFields(['paymentMethodId', 'paymentAmt', 'vatId']);
                } else {
                    setDisableFields([]);
                }
                break;
            case OrderStatus.Overload:
                setDisableFields(['paymentMethodId', 'paymentAmt', 'vatId']);
                break;
            case OrderStatus.WaitRefund:
                setDisableFields(['paymentMethodId', 'paymentAmt', 'vatId']);
                break;
            case OrderStatus.SendRefund:
                setDisableFields(['paymentMethodId', 'paymentAmt', 'vatId']);
                break;
            case OrderStatus.CompletedRefund:
                setDisableFields(['paymentMethodId', 'paymentAmt', 'vatId']);
                break;
            default:
                setDisableFields([]);
                break;
        }
    }, [isSOTN, saleOrder?.paymentAmt, saleOrder.status]);

    useEffect(() => {
        handleDisableFields();
    }, [handleDisableFields]);

    const onValuesChange = (value: AnyObject, _values: AnyObject) => {
        if (isFirstTimeDirty && !props.isEnableEdit) {
            setIsFirstTimeDirty(false);
            setIsEnableEdit(true);
        }

        if (value.vatId) {
            setPaymentInfo(prev => ({
                ...prev,
                vatId: value.vatId,
            }));
        }
    };

    // use paymentInfo instead
    // useEffect(() => {
    //     if (paymentInfo?.depositAmt && saleOrder?.depositAmt !== paymentInfo?.depositAmt && !isEmpty(saleOrder)) {
    //         setSaleOrder({
    //             ...saleOrder,
    //             depositAmt: paymentInfo?.depositAmt,
    //         });
    //     }
    // }, [paymentInfo?.depositAmt, saleOrder, setSaleOrder]);

    useEffect(() => {
        if (!paymentInfo?.vatId && saleOrder?.vatId) {
            setPaymentInfo(prev => ({
                ...prev,
                vatId: saleOrder?.vatId,
            }));
        }
    }, [paymentInfo, saleOrder?.vatId]);

    // handle auto apply discount with 1 item promotion in array
    const handleApplyOnePromotion = useCallback(
        async (
            request: {
                tourScheduleId: string | undefined;
                travellers: {
                    tourPrice: number | undefined;
                }[];
                discountCodes: string[];
                saleOrderId: string;
            },
            setListPromotionWithDiscountPrice: Dispatch<SetStateAction<EstimateDiscountItemModel[]>>,
            isGetInfo: boolean = false,
            isChangePromotions: boolean = false,
        ) => {
            // check promotion applied from data same with promotion will get info
            if (!isEmpty(saleOrder.discounts)) {
                const existAppliedPromotion = saleOrder.discounts?.find(
                    x => x.discountCode === request.discountCodes[0],
                );
                if (!isEmpty(existAppliedPromotion)) {
                    setListPromotionWithDiscountPrice([existAppliedPromotion]);
                    // remove because can not check
                    // return;
                }
            }

            const returnData = await getEstimateDiscount(request);

            if (returnData?.discountAmount == 0 && !isGetInfo) {
                toastErr('Thông báo', 'Không có ưu đãi nào phù hợp!');
                return;
            }

            if (!isChangePromotions) {
                if (!isAppliedPromotions) {
                    setIsAppliedPromotions(true);
                }

                setListPromotionWithDiscountPrice([...(returnData.items ?? [])]);
            }

            // except case just want to get info list promotions group + EL with discount price
            if (!isGetInfo) {
                setDataPromotionsApplied(returnData);
                setListCodeApplied(request.discountCodes);
                props.form.setFieldsValue({
                    discountCodes: request.discountCodes,
                    totalDiscountAmt: returnData?.discountAmount,
                    discounts: returnData.items,
                });
            }
        },
        [getEstimateDiscount, isAppliedPromotions, props.form, saleOrder.discounts, setIsAppliedPromotions],
    );

    // handle auto apply discount with multiple promomtion, mix 2 of them
    const handleApplyMultiplePromotion = useCallback(
        async (
            request: {
                tourScheduleId: string | undefined;
                travellers: {
                    tourPrice: number | undefined;
                }[];
                discountCodes: string[];
            },
            listPromotionsEL: DiscountDto[],
            listPromotionsGroup: DiscountDto[],
            isGetInfo: boolean = false,
            isChangePromotions: boolean = false,
        ) => {
            let tempPromotions: EstimateDiscountResponse = {};
            const isMixed = (tourSchedule.discountOnTypes?.length ?? 0) >= 2;
            const newArray: string[][] = mixedArray(listPromotionsEL, listPromotionsGroup, isMixed);
            let codesApplied: string[] = [];
            let tempListCodeGroup: EstimateDiscountItemModel[] = [];
            let tempListELGroup: EstimateDiscountItemModel[] = [];

            const promiseArray = newArray.map(async item => {
                try {
                    const totalAmt = props.form.getFieldValue('totalAmt') ?? 0;
                    const vatId = props.form.getFieldValue('vatId') ?? 0;
                    const vat = dataVAT?.data?.find(x => x.id === vatId)?.value ?? 0;
                    const promotionData = await getEstimateDiscount({ ...request, discountCodes: item });
                    // compare promotionData with tempPromotions to check is New promotions higher than tempPromotions
                    // except case just want to get info list promotions group + EL with discount price
                    if (comparePromotions(promotionData, tempPromotions, totalAmt, vat) && !isGetInfo) {
                        tempPromotions = promotionData;
                        codesApplied = item;
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

            // except case just want to get info list promotions group + EL with discount price
            if (!isGetInfo) {
                setDataPromotionsApplied({ ...tempPromotions });
                setListCodeApplied(codesApplied);
                props.form.setFieldsValue({
                    discountCodes: codesApplied,
                    totalDiscountAmt: tempPromotions?.discountAmount,
                    discounts: tempPromotions.items,
                });
                if (isEmpty(tempPromotions)) {
                    toastErr('Thông báo', 'Không có ưu đãi nào phù hợp!');
                } else {
                    if (!isAppliedPromotions) {
                        setIsAppliedPromotions(true);
                    }
                }
            }

            if (!isChangePromotions) {
                setListCodeELWithDiscountPrice(tempListELGroup);
                setListCodeGroupWithDiscountPrice(tempListCodeGroup);
            }
        },
        [
            getEstimateDiscount,
            isAppliedPromotions,
            props.form,
            setIsAppliedPromotions,
            tourSchedule.discountOnTypes?.length,
        ],
    );

    // handle click auto apply CTKM
    const handleAutoApplyDiscount = useCallback(
        (isGetInfo: boolean = false) => {
            const travellersPrice = travellers.map(item => ({ tourPrice: item.tourPrice }));
            const request = {
                tourScheduleId: tourId,
                travellers: travellersPrice,
                discountCodes: [] as string[],
                saleOrderId: soId!,
            };

            // case only 1 promotion in EL and empty promotion Goup
            if (listPromotionsEL?.length === 1 && isEmptyPromotionsGroup) {
                request.discountCodes = [listPromotionsEL[0].code ?? ''];
                handleApplyOnePromotion(request, setListCodeELWithDiscountPrice, isGetInfo);
            } else if (listPromotionsGroup?.length === 1 && isEmptyPromotionsEL) {
                // case only 1 promotion in Group and empty promotion EL
                request.discountCodes = [listPromotionsGroup[0].code ?? ''];
                handleApplyOnePromotion(request, setListCodeGroupWithDiscountPrice, isGetInfo);
            } else {
                // case have more than 1 promotion, EL or Group can empty
                handleApplyMultiplePromotion(request, listPromotionsEL ?? [], listPromotionsGroup ?? [], isGetInfo);
            }
        },
        [
            handleApplyMultiplePromotion,
            handleApplyOnePromotion,
            isEmptyPromotionsEL,
            isEmptyPromotionsGroup,
            listPromotionsEL,
            listPromotionsGroup,
            soId,
            tourId,
            travellers,
        ],
    );

    // Handle case init data from SO applied promotions already
    useEffect(() => {
        if (
            !isEmpty(saleOrder.discounts) &&
            isFirstTimeInitDataPromotions &&
            isFetchPromotionsDone &&
            !isEmpty(travellers)
        ) {
            const listCodeAppliedFromData = saleOrder.discounts?.map(x => x.discountCode ?? '') ?? [];
            setIsFirstTimeInitDataPromotions(false);
            setDataPromotionsApplied({ discountAmount: saleOrder.totalDiscountAmt, items: saleOrder.discounts });
            setListCodeApplied(listCodeAppliedFromData);
            props.form.setFieldsValue({
                discountCodes: listCodeAppliedFromData,
                totalDiscountAmt: saleOrder.totalDiscountAmt,
                discounts: saleOrder.discounts,
            });
            if (!isAppliedPromotions) {
                setIsAppliedPromotions(true);
            }
            // get list promotions group + EL with discount price
            handleAutoApplyDiscount(true);
        }
    }, [
        isFetchPromotionsDone,
        handleAutoApplyDiscount,
        isFirstTimeInitDataPromotions,
        props.form,
        saleOrder.discounts,
        saleOrder.totalDiscountAmt,
        setIsAppliedPromotions,
        isAppliedPromotions,
        discountType.Group,
        listPromotionsGroup,
        saleOrder.status,
        saleOrder.paymentAmt,
        travellers,
    ]);

    // handle Open list CTKM
    const handleOpenListPromotions = useCallback(() => {
        setIsOpenModal(true);
    }, []);

    // Click Apply promotions button
    const handleClickPromotionBtn = useDebouncedCallback(
        () => {
            if (isEmptyPromotionsEL && isEmptyPromotionsGroup) {
                return;
            }

            // handle auto apply discount
            if (!isAppliedPromotions) {
                handleAutoApplyDiscount();
            } else {
                // handle Open list CTKM
                handleOpenListPromotions();
            }
        },
        1000,
        { leading: true, trailing: false },
    );

    // handle apply change promotion
    const handleChangePromotion = useCallback(
        (listELCode: string[], listGroupCode: string[]) => {
            const travellersPrice = travellers.map(item => ({ tourPrice: item.tourPrice }));
            const request = {
                tourScheduleId: tourId,
                travellers: travellersPrice,
                discountCodes: [] as string[],
                saleOrderId: soId!,
            };
            const listELCodeEmpty = isEmpty(listELCode);
            const listGroupCodeEmpty = isEmpty(listGroupCode);

            // set new list code apply
            // setListCodeApplied(discountCodes);

            // case uncheck all promotions
            if (listELCodeEmpty && listGroupCodeEmpty) {
                handleReset();
            } else if (!listELCodeEmpty && listGroupCodeEmpty) {
                request.discountCodes = [listELCode[0] ?? ''];
                handleApplyOnePromotion(request, setListCodeELWithDiscountPrice, false, true);
            } else if (!listGroupCodeEmpty && listELCodeEmpty) {
                request.discountCodes = [listGroupCode[0] ?? ''];
                handleApplyOnePromotion(request, setListCodeGroupWithDiscountPrice, false, true);
            } else {
                const ELCodeItem = listPromotionsEL?.find(x => x.code === listELCode[0]);
                const GroupCodeItem = listPromotionsGroup?.find(x => x.code === listGroupCode[0]);
                handleApplyMultiplePromotion(request, [ELCodeItem ?? {}], [GroupCodeItem ?? {}], false, true);
            }

            if (isFirstTimeDirty && !props.isEnableEdit) {
                setIsFirstTimeDirty(false);
                setIsEnableEdit(true);
            }
        },
        [
            handleApplyMultiplePromotion,
            handleApplyOnePromotion,
            handleReset,
            isFirstTimeDirty,
            listPromotionsEL,
            listPromotionsGroup,
            props.isEnableEdit,
            setIsEnableEdit,
            setIsFirstTimeDirty,
            soId,
            tourId,
            travellers,
        ],
    );

    const renderAmount = () => {
        if (checkIsRefundSO(saleOrder.status)) {
            const remainRefund = calculateRemainAmountForRefundSO(saleOrder);

            if (remainRefund >= 0) {
                return Intl.NumberFormat('en-US').format(Number(remainRefund));
            }

            return `(${Intl.NumberFormat('en-US').format(Number(Math.abs(remainRefund)))})`;
        }

        return Intl.NumberFormat('en-US').format(Number(totalRemainAmt));
    };

    // show Toast when isDiscountGroupExpired true (case BE remove discount group because expired for SO without payment)
    useEffect(() => {
        if (saleOrder.expiredDiscountGroupCode && !isShowedWarningRemovePromotion && !clonedId && !changeTourSOId) {
            setIsShowedWarningRemovePromotion(true);
            toastErr(
                'Thông báo',
                `Ưu đãi ${saleOrder.expiredDiscountGroupCode} mà bạn đã áp dụng đã hết hiệu lực. Vui lòng kiểm tra lại thông tin.`,
            );
        }
    }, [changeTourSOId, clonedId, isShowedWarningRemovePromotion, saleOrder.expiredDiscountGroupCode]);

    const calculateTax = () => {
        const vat = dataVAT?.data?.find(x => x.id === paymentInfo?.vatId)?.value ?? 0;
        return (paymentInfo?.totalAmt ?? 0) * vat;
    };

    if (isLoading) return <Skeleton paragraph={{ rows: 10 }} className="p-4" />;

    return (
        <Form
            form={props.form}
            initialValues={paymentInfo}
            className=" bg-white col-span-12 lg:col-span-5 p-4 border border-solid border-gray-100"
            onValuesChange={onValuesChange}
        >
            <Form.Item name="discountCodes" hidden>
                <Input />
            </Form.Item>
            <Form.Item name="discounts" hidden>
                <Input />
            </Form.Item>
            <Form.Item name="totalDiscountAmt" hidden>
                <Input />
            </Form.Item>
            <AmountItem
                name="totalAmt"
                title={i18n.t('saleorder.totalAmount.totalAmount')}
                price={Format.formatNegativeNumber(paymentInfo?.totalAmt)}
            />
            {isHasInvoice && (
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
                                onChange={resetDiscount}
                            />
                        </div>
                        <div className="col-span-4 text-right mb-0">
                            <Form.Item className="col-span-4 text-right mb-0" name="vatAmount">
                                <span className="text-xs">{Format.formatNegativeNumber(calculateTax())}</span>
                            </Form.Item>
                        </div>
                    </div>
                </div>
            )}
            <div className="grid grid-cols-12 gap-1 mb-4">
                <div className="flex justify-between col-span-12 text-xs items-center">
                    <span>{i18n.t('saleorder.totalAmount.discount')}</span>
                    {(saleOrder.status === OrderStatus.New ||
                        saleOrder.status === OrderStatus.Overload ||
                        !saleOrder.status) &&
                    (!isEmptyPromotionsEL || !isEmptyPromotionsGroup) ? (
                        <Button
                            className="text-xs"
                            onClick={handleClickPromotionBtn}
                            loading={isLoading}
                            disabled={isEmpty(travellers)}
                        >
                            {isAppliedPromotions ? 'Danh sách ưu đãi' : 'Áp dụng ưu đãi'}
                        </Button>
                    ) : (
                        <></>
                    )}
                </div>
                <div className="col-span-12">
                    {dataPromotionsApplied.items?.map(item => (
                        <DiscountItemInfo
                            key={item.discountId}
                            code={item.discountCode ?? ''}
                            price={item.discountAmount}
                        />
                    ))}
                </div>
            </div>
            <AmountItem
                name="totalIncludeVatAmt"
                title={i18n.t('saleorder.totalAmount.totalPayment')}
                price={Format.formatNegativeNumber(paymentInfo?.totalIncludeVatAmt)}
            />
            <AmountItem
                title={i18n.t('saleorder.totalAmount.totalDeposit')}
                price={Format.formatNegativeNumber(paymentInfo?.depositAmt)}
            />
            <div className="grid grid-cols-12 gap-1 mb-4">
                <div className="col-span-12 text-xs">{i18n.t('saleorder.totalAmount.totalPaid')}</div>
                <div className="col-span-12 gap-1 grid grid-cols-12">
                    <PaymentTypeSelect
                        isForm
                        name="paymentMethodId"
                        className="col-span-12 md:col-span-4 mb-0"
                        options={paymentMethodOptions}
                        onChange={value => {
                            setPaymentInfo(prev => ({
                                ...prev,
                                paymentMethodId: value,
                            }));
                        }}
                        disabled={disableFields.includes('paymentMethodId')}
                    />
                    <Form.Item
                        name="paymentAmt"
                        className="col-span-12 md:col-span-8"
                        rules={[
                            () => ({
                                validator(_, value) {
                                    if (
                                        (tourSchedule as TourScheduleDto).hasTourThienNhien &&
                                        value < (paymentInfo?.depositAmt ?? 0) &&
                                        value > 0
                                    ) {
                                        return Promise.reject(new Error('Không hợp lệ'));
                                    }
                                    if (value == 0 || !value) {
                                        return Promise.resolve();
                                    }
                                    if ((paymentInfo?.totalIncludeVatAmt ?? 0) - value >= 0 && value > 0) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('Không hợp lệ'));
                                },
                            }),
                        ]}
                    >
                        <InputNumber
                            className="w-full"
                            min={0}
                            formatter={value => Intl.NumberFormat('en-US').format(Number(value))}
                            onChange={value => {
                                setPaymentInfo(prev => ({
                                    ...prev,
                                    paymentAmt: value ?? 0,
                                }));
                            }}
                            disabled={disableFields.includes('paymentAmt')}
                        />
                    </Form.Item>
                </div>
            </div>
            {checkIsRefundSO(saleOrder.status) && saleOrder.isTourServiceVisa && (
                <AmountItem
                    title={i18n.t('saleorder.totalAmount.nonRefundableVisaFees')}
                    price={Format.formatNegativeNumber(saleOrder.nonRefundableVisaFees)}
                />
            )}
            {checkIsRefundSO(saleOrder.status) && (
                <AmountItem
                    title={i18n.t('saleorder.totalAmount.penaltyFee')}
                    price={Format.formatNegativeNumber(saleOrder.penaltyFee)}
                />
            )}
            <AmountItem title={i18n.t('saleorder.totalAmount.totalRemain')} price={renderAmount()} />
            {checkIsRefundSO(saleOrder.status) && (
                <AmountItem
                    title={i18n.t('saleorder.totalAmount.refundAmount')}
                    price={Format.formatNegativeNumber(saleOrder.totalReturnAmt)}
                />
            )}
            {!isEmpty(listCodeApplied) && (
                <DiscountModal
                    isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
                    listCodeELWithDiscountPrice={listCodeELWithDiscountPrice ?? []}
                    listCodeGroupWithDiscountPrice={listCodeGroupWithDiscountPrice ?? []}
                    dataPromotionsApplied={dataPromotionsApplied}
                    handleChangePromotion={handleChangePromotion}
                    listCodeDetail={listCodeDetail}
                />
            )}
        </Form>
    );
};
