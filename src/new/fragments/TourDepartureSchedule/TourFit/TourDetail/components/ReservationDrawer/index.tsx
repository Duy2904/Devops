import { Col, Divider, Flex, Spin } from 'antd';
import {
    DiscountOnType,
    EstimateDiscountItemModel,
    EstimateDiscountResponse,
    PaginationResponseOfDiscountDto,
    TourGitDto,
    TourScheduleDto,
} from '@sdk/tour-operations';
import {
    calculateTotalPrice,
    calculateTotalQuantity,
    comparePromotions,
    formatTourScheduleFare,
    mixedArray,
    sortDiscountItem,
} from './features';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useGetDiscountList, useGetEstimateDiscount } from '../../hooks/useDiscount';
import { useNavigate, useParams } from 'react-router-dom';

import { ArrowRight } from '@src/new/components/common/SvgIcon';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import ConditionsAndTerms from './ConditionsAndTerms';
import ConfirmButton from './ConfirmButton';
import CouponDrawer from './CouponDrawer';
import GuestInfoList from './GuestInfoList';
import PaymentDetail from './PaymentDetail';
import PreferentialDiscount from './PreferentialDiscount';
import { RouteCreateSOFromTourDepartureSchedule } from '@fragments/SaleOrders/features';
import TotalPrice from './TotalPrice';
import clsx from 'clsx';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { rootPathsNew } from '@src/routers/newRoute';
import { useGetTourFitByCode } from '../../../hooks/useTourFit';
import { useTourScheduleFareInfos } from '@src/new/shared/query-hooks/useTourScheduleFare';
import { useTourScheduleStore } from '@store/tourScheduleStore';
import { useTranslation } from 'react-i18next';

interface ReservationAsideProps {
    isOpen: boolean;
    onCloseSidebar: () => void;
}

const ReservationDrawer = ({ isOpen, onCloseSidebar }: ReservationAsideProps) => {
    const { t } = useTranslation();
    const { tourCode } = useParams();
    const navigate = useNavigate();

    // Store
    const {
        actions: { setTourSchedule },
    } = useTourScheduleStore(state => state);

    // Queries
    const { data: dataTourFit, isLoading: isGetTourFitLoading } = useGetTourFitByCode(tourCode!);
    const { data: tourScheduleFare, isLoading: isGetTourScheduleFareLoading } = useTourScheduleFareInfos(
        dataTourFit?.id ?? '',
    );

    // Mutations
    const { mutateAsync: getListDiscount } = useGetDiscountList(dataTourFit?.id ?? '');
    const { mutateAsync: getEstimateDiscount } = useGetEstimateDiscount();

    // States
    const [isCouponDrawerOpen, setIsCouponDrawerOpen] = useState(false);
    const [quantityOfGuest, setQuantityOfGuest] = useState<Record<string, number>>({});
    const [isCalledPromotion, setIsCalledPromotion] = useState<boolean>(false);
    const [isAppliedPromotion, setIsAppliedPromotion] = useState<boolean>(false);
    const [dataPromotionsEL, setDataPromotionsEL] = useState<PaginationResponseOfDiscountDto>();
    const [dataPromotionsGroup, setDataPromotionsGroup] = useState<PaginationResponseOfDiscountDto>();
    const [dataPromotionsApplied, setDataPromotionsApplied] = useState<EstimateDiscountItemModel[]>([]);
    const [listPromotionGroupWithPrice, setListPromotionGroupWithPrice] = useState<EstimateDiscountItemModel[]>([]);
    const [listPromotionELWithPrice, setListPromotionELWithPrice] = useState<EstimateDiscountItemModel[]>([]);
    const [isAvailable, setIsAvailable] = useState<boolean>(true);
    const [isAllowConditions, setIsAllowConditions] = useState<boolean>(true);

    // Compute values
    const listPromotionsEL = useMemo(() => dataPromotionsEL?.data ?? [], [dataPromotionsEL?.data]);
    const listPromotionsGroup = useMemo(() => dataPromotionsGroup?.data ?? [], [dataPromotionsGroup?.data]);
    const isEmptyPromotionsEL = isEmpty(listPromotionsEL) || isNil(listPromotionsEL);
    const isEmptyPromotionsGroup = isEmpty(listPromotionsGroup) || isNil(listPromotionsGroup);
    const listPromotionWithPrice = [...listPromotionELWithPrice, ...listPromotionGroupWithPrice];
    const formattedTourScheduleFare = useMemo(() => formatTourScheduleFare(tourScheduleFare), [tourScheduleFare]);

    const totalQuantityOfAdult = useMemo(
        () => calculateTotalQuantity(formattedTourScheduleFare, quantityOfGuest, 'ADT'),
        [formattedTourScheduleFare, quantityOfGuest],
    );

    const totalQuantityOfChild = useMemo(
        () => calculateTotalQuantity(formattedTourScheduleFare, quantityOfGuest, 'CHD'),
        [formattedTourScheduleFare, quantityOfGuest],
    );

    const totalQuantityOfInfant = useMemo(
        () => calculateTotalQuantity(formattedTourScheduleFare, quantityOfGuest, 'INF'),
        [formattedTourScheduleFare, quantityOfGuest],
    );

    const totalPriceOfAdult = useMemo(
        () => calculateTotalPrice(formattedTourScheduleFare, quantityOfGuest, 'ADT'),
        [formattedTourScheduleFare, quantityOfGuest],
    );

    const totalPriceOfChild = useMemo(
        () => calculateTotalPrice(formattedTourScheduleFare, quantityOfGuest, 'CHD'),
        [formattedTourScheduleFare, quantityOfGuest],
    );

    const totalPriceOfInfant = useMemo(
        () => calculateTotalPrice(formattedTourScheduleFare, quantityOfGuest, 'INF'),
        [formattedTourScheduleFare, quantityOfGuest],
    );

    const totalPriceAll = formattedTourScheduleFare.reduce((acc, cur) => {
        if (!cur.passengerTypeId) return acc;

        const quantity = quantityOfGuest[cur.passengerTypeId] ?? 0;
        return acc + (cur.taxInclusivePrice ?? 0) * quantity;
    }, 0);

    const totalPromotion = dataPromotionsApplied.reduce(
        (accumulator, currentValue) => accumulator + (currentValue?.discountAmount ?? 0),
        0,
    );

    // Handlers
    const handleOpenCoupon = () => setIsCouponDrawerOpen(true);
    const handleCloseCoupon = () => setIsCouponDrawerOpen(false);

    const resetPromotion = useCallback(() => {
        setDataPromotionsApplied([]);
        setIsAppliedPromotion(false);
    }, []);

    const handleGuestQuantityChange = ({ id, quantity }: { id?: string; quantity: number }) => {
        if (!id) return;
        setQuantityOfGuest(prev => ({ ...prev, [id]: quantity }));
        resetPromotion();
    };

    const handleConfirmBooking = () => {
        setTourSchedule(dataTourFit as TourScheduleDto | TourGitDto);
        navigate(`${rootPathsNew.saleOrderFormDetail}`, {
            state: {
                createSOFromTourDepartureSchedule: dataTourFit?.id,
                quantityOfGuest: quantityOfGuest,
                dataPromotionsApplied: dataPromotionsApplied,
            } as RouteCreateSOFromTourDepartureSchedule,
        });
    };

    const handleApplyOnePromotion = async ({
        request,
        type,
    }: {
        request: {
            tourScheduleId: string | undefined;
            travellers: {
                tourPrice: number | undefined;
            }[];
            discountCodes: string[];
        };
        type: DiscountOnType;
    }) => {
        const returnData = await getEstimateDiscount(request);

        if (type === DiscountOnType.EarlyBirdLastMinute) {
            setListPromotionELWithPrice(returnData.items ?? []);
        } else if (type === DiscountOnType.Group) {
            setListPromotionGroupWithPrice(returnData.items ?? []);
        }

        if (returnData.discountAmount ?? 0 > 0) {
            // setDataPromotionsApplied(returnData.items ?? []);
        }
    };

    const handleApplyMultiplePromotion = async ({
        request,
    }: {
        request: {
            tourScheduleId: string | undefined;
            travellers: {
                tourPrice: number | undefined;
            }[];
            discountCodes: string[];
        };
    }) => {
        const isMixed = (dataTourFit?.discountOnTypes?.length ?? 0) >= 2;
        const newArray: string[][] = mixedArray(listPromotionsEL, listPromotionsGroup, isMixed);
        let tempPromotions: EstimateDiscountResponse = {};
        let tempListCodeGroup: EstimateDiscountItemModel[] = [];
        let tempListELGroup: EstimateDiscountItemModel[] = [];

        const promiseArray = newArray.map(async item => {
            try {
                const promotionData = await getEstimateDiscount({ ...request, discountCodes: item });
                // compare promotionData with tempPromotions to check is New promotions higher than tempPromotions
                // except case just want to get info list promotions group + EL with discount price
                if (comparePromotions(promotionData, tempPromotions, totalPriceAll)) {
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

        // setDataPromotionsApplied(tempPromotions.items ?? []);
        setListPromotionELWithPrice(tempListELGroup);
        setListPromotionGroupWithPrice(sortDiscountItem(tempListCodeGroup));
    };

    // handle auto apply CTKM when first time click Xem them
    const handleAutoApplyDiscount = () => {
        handleOpenCoupon();

        if (isAppliedPromotion) {
            return;
        } else {
            setIsAppliedPromotion(true);
        }

        const travellersPrice: {
            tourPrice: number | undefined;
        }[] = [];

        const keysId = Object.keys(quantityOfGuest);

        if (isEmpty(keysId)) return;

        keysId.map(id => {
            const quantity = quantityOfGuest[id] ?? 0;
            const findTourFare = tourScheduleFare?.data?.find(item => item.passengerTypeId === id);

            if (isEmpty(findTourFare)) return;

            for (let i = 0; i < quantity; i++) {
                travellersPrice.push({ tourPrice: findTourFare.taxInclusivePrice });
            }
        });

        const request = {
            tourScheduleId: dataTourFit?.id,
            travellers: travellersPrice,
            discountCodes: [] as string[],
        };

        // case only 1 promotion in EL and empty promotion Goup
        if (listPromotionsEL?.length === 1 && isEmptyPromotionsGroup) {
            request.discountCodes = [listPromotionsEL[0].code ?? ''];
            handleApplyOnePromotion({ request: request, type: DiscountOnType.EarlyBirdLastMinute });
        } else if (listPromotionsGroup?.length === 1 && isEmptyPromotionsEL) {
            // case only 1 promotion in Group and empty promotion EL
            request.discountCodes = [listPromotionsGroup[0].code ?? ''];
            handleApplyOnePromotion({ request: request, type: DiscountOnType.Group });
        } else {
            // case have more than 1 promotion, EL or Group can empty
            handleApplyMultiplePromotion({ request: request });
        }
    };

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const tourScheduleFareData = tourScheduleFare?.data;

        if (!dataTourFit?.id || !tourScheduleFareData || isCalledPromotion) return;

        const keys = Object.keys(DiscountOnType);

        if (isEmpty(keys)) return;

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
            if (!isCalledPromotion) {
                setIsCalledPromotion(true);
            }
        });
    }, [dataTourFit?.id, getListDiscount, isCalledPromotion, isOpen, tourScheduleFare?.data]);

    useEffect(() => {
        if (!isEmpty(dataTourFit)) {
            const quantity = formattedTourScheduleFare.reduce((acc, cur) => {
                if (!cur.passengerTypeId) return acc;

                const quantity = quantityOfGuest[cur.passengerTypeId] ?? 0;
                return acc + quantity;
            }, 0);

            const canBook =
                (dataTourFit?.remainingCapacity ?? 0) > 0 && (dataTourFit?.remainingCapacity ?? 0) >= quantity;

            setIsAvailable(canBook);
        }
    }, [dataTourFit, formattedTourScheduleFare, quantityOfGuest]);

    return (
        <aside
            className={clsx(
                `${Color.bg_F6F7FA} sticky top-0 rounded-xl shadow-xl h-full border border-solid overflow-hidden ${Color.border_F0F0F0} transition-all duration-300 ease-in-out`,
                {
                    'translate-x-0 visible w-[400px] opacity-100': isOpen,
                    'translate-x-full invisible w-0 opacity-0': !isOpen,
                },
            )}
        >
            <header className="sticky top-0 flex justify-between items-center p-4">
                <div />
                <h3 className={`${Color.text_2A2A2A} text-2xl font-extrabold uppercase`}>{t('Đặt chỗ')}</h3>
                <button
                    className={`${Color.bg_3E6DDA_10} border-none rounded-md p-2 flex items-center justify-center hover:opacity-80 cursor-pointer`}
                    onClick={onCloseSidebar}
                >
                    <ArrowRight className={`${Color.text_2F80ED} w-[14px] h-[14px]`} />
                </button>
            </header>

            <Col className="h-[calc(100vh_-_260px)] overflow-y-auto pb-[180px] no-scrollbar">
                {(isGetTourFitLoading || isGetTourScheduleFareLoading) && (
                    <Col className="w-full h-full flex justify-center items-center">
                        <Spin spinning />
                    </Col>
                )}

                {(formattedTourScheduleFare?.length ?? 0) > 0 && (
                    <div className="px-6">
                        <GuestInfoList
                            data={formattedTourScheduleFare}
                            quantityOfGuest={quantityOfGuest}
                            onGuestQuantityChange={handleGuestQuantityChange}
                        />
                    </div>
                )}

                <Col className="mt-4 px-6">
                    <PaymentDetail
                        quantityOfAdult={totalQuantityOfAdult}
                        quantityOfChild={totalQuantityOfChild}
                        quantityOfInfant={totalQuantityOfInfant}
                        totalPriceOfAdult={totalPriceOfAdult}
                        totalPriceOfChild={totalPriceOfChild}
                        totalPriceOfInfant={totalPriceOfInfant}
                    />
                    <Divider className="my-2" />
                    <PreferentialDiscount
                        dataPromotionsApplied={dataPromotionsApplied}
                        onClick={handleAutoApplyDiscount}
                    />
                </Col>
                <div className="px-6 pb-4">
                    <Divider className="my-2" />
                    <TotalPrice
                        totalPrice={totalPriceAll - totalPromotion}
                        totalQuantity={Object.values(quantityOfGuest).reduce((acc, cur) => acc + cur, 0)}
                        expiredDate={
                            dataTourFit?.departureDate && dataTourFit?.prepaidDateNo
                                ? dayjs(dataTourFit?.departureDate).subtract(dataTourFit?.prepaidDateNo, 'days')
                                : undefined
                        }
                    />
                </div>
            </Col>

            <footer className={`${Color.bg_F6F7FA} absolute bottom-0 w-full`}>
                <Flex vertical gap={14}>
                    <ConditionsAndTerms
                        setIsAllowConditions={setIsAllowConditions}
                        isAllowConditions={isAllowConditions}
                    />
                    <Col className="bg-white p-3">
                        <ConfirmButton
                            onSubmit={handleConfirmBooking}
                            isAvailable={isAvailable}
                            disabled={isAllowConditions}
                        />
                    </Col>
                </Flex>
            </footer>

            <CouponDrawer
                couponList={listPromotionWithPrice}
                isOpen={isCouponDrawerOpen}
                onClose={handleCloseCoupon}
                dataPromotionsApplied={dataPromotionsApplied}
                setDataPromotionsApplied={setDataPromotionsApplied}
                maxPromotionsCanApply={dataTourFit?.discountOnTypes?.length ?? 0}
            />
        </aside>
    );
};

export default ReservationDrawer;
