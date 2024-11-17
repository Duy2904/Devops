import { Flex, FormInstance } from 'antd';
import { t } from 'i18next';
import isEmpty from 'lodash/isEmpty';
import { useEffect, useMemo } from 'react';

import { splitNamePassengerType, TitleSplitPassengerType } from '@src/new/fragments/SaleOrders/features';

import { useGetSummaryTraveller } from '../../../../hooks/useGetSummaryTraveller';

interface GuessTotalProps {
    totalTravellerForm: FormInstance;
    numberOfTotalForm: FormInstance;
}

export const GuessTotal: React.FC<GuessTotalProps> = props => {
    const { totalTravellerForm, numberOfTotalForm } = props;

    const listSummaryTraveller = useGetSummaryTraveller(totalTravellerForm);

    const totalQuantity = useMemo(
        () => listSummaryTraveller?.reduce((acc, obj) => acc + Number(obj?.quantity ?? 0), 0),
        [listSummaryTraveller],
    );

    useEffect(() => {
        numberOfTotalForm.setFieldValue('numberOfTravellers', totalQuantity);
    }, [totalQuantity, numberOfTotalForm]);

    return (
        <div className="bg-white rounded-lg p-5">
            <p className="text-black text-base font-bold uppercase">
                {t(`số lượng khách:`)} {totalQuantity}
            </p>
            <div className="mt-5 grid grid-cols-3">
                {!isEmpty(listSummaryTraveller) &&
                    listSummaryTraveller.map(item => {
                        const dataNameSplit: TitleSplitPassengerType = splitNamePassengerType(
                            item.passengerTypeName ?? '',
                        );

                        return (
                            <Flex vertical gap={4} key={item.passengerTypeId}>
                                <p className="text-sm font-bold">{dataNameSplit.title}</p>
                                <p className="text-lg font-medium">{item.quantity}</p>
                            </Flex>
                        );
                    })}
            </div>
        </div>
    );
};
