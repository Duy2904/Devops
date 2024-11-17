import isEmpty from 'lodash/isEmpty';

import { DiscountDto, EstimateDiscountResponse } from '@sdk/tour-operations';

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

// compare is New Promotions better than tempPromotion
export const comparePromotions = (
    promotionData: EstimateDiscountResponse,
    tempPromotions: EstimateDiscountResponse,
    totalAmt: number,
    vatValue: number,
) => {
    const discountAmountPromotionData = promotionData.discountAmount ?? 0;
    const discountAmountTempPromotion = tempPromotions.discountAmount ?? 0;
    const isNewPromotionDiscountMore = discountAmountPromotionData > discountAmountTempPromotion;
    const isNewPromotionUseLessCode = (promotionData.items?.length ?? 0) < (tempPromotions.items?.length ?? 0);
    const isBothPromotionTheSame = discountAmountPromotionData === discountAmountTempPromotion;
    const isTotalAmountMoreThanTempPromotion = totalAmt + totalAmt * vatValue > discountAmountTempPromotion;

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

// toogle code applied
export const handleToogleCode = (prevList: string[], couponId: string) => {
    if (prevList.includes(couponId)) {
        return prevList.filter(id => id !== couponId);
    } else {
        return [couponId];
    }
};
