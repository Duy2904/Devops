import isEmpty from 'lodash/isEmpty';

import {
    DiscountDto,
    DiscountOnType,
    EstimateDiscountItemModel,
    EstimateDiscountResponse,
    PaginationResponseOfTourScheduleFareDto,
    TourScheduleFareDto,
} from '@sdk/tour-operations';

import { PassengerType } from '../../../types';

// Helper function to sort and format tour schedule fare data
export const formatTourScheduleFare = (
    tourScheduleFare?: PaginationResponseOfTourScheduleFareDto,
): TourScheduleFareDto[] => {
    if (!tourScheduleFare?.data) return [];

    const sortedTourScheduleFare = tourScheduleFare.data.sort((a, b) => {
        if (!a.order || !b.order) return 0;
        return a.order - b.order;
    });

    return sortedTourScheduleFare;
};

export const sortDiscountItem = (tempListCodeGroup: EstimateDiscountItemModel[]) => {
    if (!isEmpty(tempListCodeGroup)) {
        return tempListCodeGroup?.sort((a, b) => {
            if (!a.discountAmount || !b.discountAmount) return 0;
            return b.discountAmount - a.discountAmount;
        });
    }
    return [];
};

// Helper function to calculate total quantity based on passenger type
export const calculateTotalQuantity = (
    formattedData: TourScheduleFareDto[],
    quantityOfGuest: Record<string, number>,
    type: PassengerType,
) => {
    return formattedData.reduce((acc, cur) => {
        const quantity = quantityOfGuest[cur.passengerTypeId ?? ''] ?? 0;
        return cur.passengerTypeCode === type ? acc + quantity : acc;
    }, 0);
};

// Helper function to calculate total price based on passenger type
export const calculateTotalPrice = (
    formattedData: TourScheduleFareDto[],
    quantityOfGuest: Record<string, number>,
    type: PassengerType,
) => {
    return formattedData.reduce((acc, cur) => {
        if (!cur.passengerTypeId) return acc;
        const quantity = quantityOfGuest[cur.passengerTypeId ?? ''] ?? 0;
        return cur.passengerTypeCode === type ? acc + (cur?.taxInclusivePrice ?? 0) * quantity : acc;
    }, 0);
};

// compare is New Promotions better than tempPromotion
export const comparePromotions = (
    promotionData: EstimateDiscountResponse,
    tempPromotions: EstimateDiscountResponse,
    totalAmt: number,
) => {
    const discountAmountPromotionData = promotionData.discountAmount ?? 0;
    const discountAmountTempPromotion = tempPromotions.discountAmount ?? 0;
    const isNewPromotionDiscountMore = discountAmountPromotionData > discountAmountTempPromotion;
    const isNewPromotionUseLessCode = (promotionData.items?.length ?? 0) < (tempPromotions.items?.length ?? 0);
    const isBothPromotionTheSame = discountAmountPromotionData === discountAmountTempPromotion;
    const isTotalAmountMoreThanTempPromotion = totalAmt > discountAmountTempPromotion;

    if (isEmpty(tempPromotions)) {
        if (discountAmountPromotionData > 0) {
            return true;
        }
    } else if (
        (isNewPromotionDiscountMore && isTotalAmountMoreThanTempPromotion) ||
        (isNewPromotionUseLessCode && isBothPromotionTheSame)
    ) {
        return true;
    }

    return false;
};

export const mixedArray = (listPromotionsEL: DiscountDto[], listPromotionsGroup: DiscountDto[], isMixed: boolean) => {
    const newArray: string[][] = [];
    if (isEmpty(listPromotionsEL)) {
        listPromotionsGroup.forEach(x => {
            newArray.push([x.code ?? '']);
        });
    } else if (isEmpty(listPromotionsGroup)) {
        listPromotionsEL.forEach(x => {
            newArray.push([x.code ?? '']);
        });
    } else {
        listPromotionsEL.forEach((x, indexX) => {
            newArray.push([x.code ?? '']);
            listPromotionsGroup.forEach(y => {
                // only push at first round
                if (indexX === 0) {
                    newArray.push([y.code ?? '']);
                }

                if (isMixed) {
                    newArray.push([x.code ?? '', y.code ?? '']);
                }
            });
        });
    }

    return newArray;
};

export const togglePromotionInMutilList = ({
    item,
    dataPromotionsTemp,
    typeSelectedItem,
}: {
    item: EstimateDiscountItemModel;
    dataPromotionsTemp: EstimateDiscountItemModel[];
    typeSelectedItem: DiscountOnType | undefined;
}) => {
    let newListApplied: EstimateDiscountItemModel[] = [];
    const existedSameType = dataPromotionsTemp.find(promotion => promotion.discountType === typeSelectedItem);

    if (!isEmpty(existedSameType)) {
        const newData = dataPromotionsTemp.filter(promotion => promotion.discountType !== typeSelectedItem);
        newListApplied = [item, ...newData];
    } else {
        newListApplied = [item, ...dataPromotionsTemp];
    }

    return newListApplied;
};
