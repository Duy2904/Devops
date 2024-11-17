import { BaseInput } from '@components/customizes/Input/BaseInput';
import { Flex } from 'antd';
import { Pattern } from '@utils/formHelper';
import { TourScheduleDto } from '@sdk/tour-operations';
import i18n from '@src/i18n';
import { useEffect } from 'react';
import { useTourFormStore } from '@store/tourFormStore';

interface TourVisaCondition {
    tourSchedule?: TourScheduleDto;
}

export const TourVisaCondition: React.FC<TourVisaCondition> = props => {
    const {
        amountReducedVisaFees,
        actions: { setAmountReducedVisaFees },
    } = useTourFormStore(state => state);

    useEffect(() => {
        if (props.tourSchedule?.tourScheduleFares) {
            const dataAmount = props.tourSchedule.tourScheduleFares?.map(item => item.taxInclusivePrice) as number[];
            const minAmount = Math.min.apply(null, dataAmount);
            setAmountReducedVisaFees(minAmount ?? 0);
        }
    }, [props.tourSchedule, setAmountReducedVisaFees]);

    return (
        <div>
            <Flex className="pb-4" align="center" gap={12}>
                <p className="font-semibold w-1/4 text-xs">{i18n.t('tour.tourDetail.reducedVisaFees')}</p>
                <BaseInput
                    name="reducedVisaFees"
                    className="mb-0 w-full md:w-1/3"
                    isForm
                    type="number"
                    min={0}
                    rules={[
                        () => ({
                            validator(_, value) {
                                if (value > amountReducedVisaFees) {
                                    return Promise.reject(new Error(i18n.t('validation.default.errorValue')));
                                }
                                return Promise.resolve();
                            },
                        }),
                        { pattern: Pattern.decimal3, message: i18n.t('Giá trị không hợp lệ') },
                    ]}
                />
            </Flex>
            <Flex align="center" gap={12}>
                <p className="font-semibold w-1/4 flex flex-col text-xs">
                    <span>{i18n.t('tour.tourDetail.nonRefundableVisaFees')}</span>
                    <span className="text-xs text-gray-400">({i18n.t('tour.tourDetail.afterReject')})</span>
                </p>
                <BaseInput
                    name="nonRefundableVisaFees"
                    className="mb-0 w-full md:w-1/3"
                    isForm
                    type="number"
                    min={0}
                    rules={[{ pattern: Pattern.decimal3, message: i18n.t('Giá trị không hợp lệ') }]}
                />
            </Flex>
        </div>
    );
};
