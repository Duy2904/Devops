import { DepositType, TourScheduleDto } from '@sdk/tour-operations';
import { Flex, Form, FormInstance } from 'antd';

import { BaseInput } from '@components/customizes/Input/BaseInput';
import { DepositTypeSelect } from '@components/customizes/Select/DepositTypeSelect';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { Pattern } from '@utils/formHelper';
import i18n from '@src/i18n';
import { useEffect } from 'react';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { useTourFormStore } from '@store/tourFormStore';

interface DepositRuleProps {
    form: FormInstance;
    tourSchedule?: TourScheduleDto;
}

export const DepositRule: React.FC<DepositRuleProps> = props => {
    const hasModifyTourFITPermission = useHasAnyPermission([MyPermissions.TourFitUpdate]);
    const depositTypeValues = Form.useWatch('depositType', props.form);
    const {
        amountDeposit,
        actions: { setAmountDeposit },
    } = useTourFormStore(state => state);

    useEffect(() => {
        if (props.tourSchedule?.tourScheduleFares) {
            const dataAmount = props.tourSchedule.tourScheduleFares?.map(item => item.taxInclusivePrice) as number[];
            const maxAmount = Math.max.apply(null, dataAmount);
            setAmountDeposit(maxAmount ?? 0);
        }
    }, [props.tourSchedule, setAmountDeposit]);
    return (
        <div className="py-4">
            <p className="text-blue-600 mb-4">{i18n.t('tour.tourDetail.depositTitle')}</p>
            <Flex className="mb-4" align="center" gap={12}>
                <p className="font-semibold">{i18n.t('tour.tourDetail.depositAmount')}</p>
                <DepositTypeSelect
                    isForm
                    className=" w-40 mb-0"
                    name="depositType"
                    disableCash={!amountDeposit || amountDeposit <= 0}
                />
                <BaseInput
                    name="deposit"
                    className="mb-0"
                    isForm
                    type="number"
                    min={0}
                    disable={!depositTypeValues || !hasModifyTourFITPermission}
                    rules={[
                        {
                            validator(_, value) {
                                if (
                                    (depositTypeValues == DepositType.Percentage && value > 100) ||
                                    (depositTypeValues == DepositType.Cash && value > amountDeposit)
                                ) {
                                    return Promise.reject(new Error(i18n.t('validation.default.errorValue')));
                                }
                                return Promise.resolve();
                            },
                        },
                        { pattern: Pattern.decimal3, message: i18n.t('Giá trị không hợp lệ') },
                    ]}
                />
            </Flex>
            <Flex align="center" gap={12}>
                <p className="font-semibold">{i18n.t('tour.tourDetail.remainingAmount')} </p>
                <BaseInput
                    name="prepaidDateNo"
                    className="mb-0 w-20"
                    isForm
                    type="number"
                    min={0}
                    rules={[{ pattern: Pattern.decimal3, message: i18n.t('Giá trị không hợp lệ') }]}
                />
                <p className="font-semibold">{i18n.t('tour.tourDetail.date')}</p>
            </Flex>
        </div>
    );
};
