import { Flex } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { useMemo } from 'react';

import { CheckCircleFilled, PlusCircleTwoTone } from '@ant-design/icons';
import { DiscountConditionType, DiscountDto, DiscountOnType, EstimateDiscountItemModel } from '@sdk/tour-operations';
import { AppConfig } from '@utils/config';
import Format from '@utils/format';

import { CheckButton } from './CheckButton';

interface DiscountItemProps {
    item: EstimateDiscountItemModel;
    isChecked: boolean;
    listPromotionFormData: EstimateDiscountItemModel[];
    // eslint-disable-next-line no-unused-vars
    handleCouponChangeGroup: (item: EstimateDiscountItemModel) => () => void;
    type: DiscountOnType;
    detail?: DiscountDto;
}

export const DiscountItem: React.FC<DiscountItemProps> = props => {
    const { item, isChecked, listPromotionFormData, type, detail, handleCouponChangeGroup } = props;

    // check item applied is return in list promotion call from data in this time
    const isExist = listPromotionFormData.find(x => x.discountCode === item.discountCode);

    const typePromotion = useMemo(() => {
        if (item.discountConditionType === DiscountConditionType.FirstPlaces) {
            return 'EB';
        } else if (item.discountConditionType === DiscountConditionType.LastPlaces) {
            return 'LM';
        }

        return '';
    }, [item.discountConditionType]);

    return (
        <div className="overflow-hidden min-h-16 mt-4">
            <Flex
                key={item.discountId}
                justify="space-between"
                onClick={handleCouponChangeGroup(item)}
                className={`h-full min-h-16 border border-black border-solid rounded-md ${
                    item.discountAmount == 0 || (isEmpty(isExist) && !isChecked)
                        ? 'cursor-default pointer-events-none opacity-30'
                        : 'cursor-pointer'
                } ${isChecked && 'border-green-500 bg-green-50'}`}
            >
                <Flex vertical justify="center" className="p-4">
                    <p className={`font-bold line-clamp-1 break-all ${isChecked && 'text-green-500'}`}>
                        {item.discountCode}
                    </p>
                    {item.discountAmount == 0 && (
                        <p className="line-clamp-1 break-all text-[10px]">Chưa đạt đủ điều kiện áp dụng</p>
                    )}
                    {type === DiscountOnType.Group && detail?.endDate && (
                        <p className="break-all text-[10px]">
                            Hết hạn vào {Format.formatUTCTime(`${detail?.endDate}`, AppConfig.DateTimeFormat)}
                        </p>
                    )}
                    {type === DiscountOnType.EarlyBirdLastMinute && detail?.endDate && detail?.remainingQuantity && (
                        <p className="break-all text-[10px]">
                            {typePromotion} còn lại {detail?.remainingQuantity} suất hết hạn vào{' '}
                            {Format.formatUTCTime(`${detail?.endDate}`, AppConfig.DateTimeFormat)}
                        </p>
                    )}
                </Flex>
                {isChecked ? (
                    <CheckButton isChecked={isChecked}>
                        <CheckCircleFilled className="text-xl text-[#52c41a]" />
                    </CheckButton>
                ) : (
                    <CheckButton isChecked={isChecked}>
                        <PlusCircleTwoTone
                            className="text-xl"
                            twoToneColor={`${item.discountAmount == 0 ? '#a6a6a6' : '#52c41a'}`}
                        />
                    </CheckButton>
                )}
            </Flex>
        </div>
    );
};
