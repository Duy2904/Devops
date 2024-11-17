import { DiscountDetailDto, DiscountOnType } from '@sdk/tour-operations';
import { ReactNode, useEffect, useState } from 'react';

import { FormInstance } from 'antd';
import { OnForm } from '@components/customizes/AutoComplete/TourAutoComplete/OnForm';
import i18n from '@src/i18n';
import { pageSize } from '@utils/filterSearch';
import { useSearchTourDiscount } from '@fragments/PromotionProgram/hook/usePromoteProgram';

interface MultipleTourSearchProps {
    name?: string;
    infoForm: FormInstance;
    label: ReactNode;
    disable?: boolean;
    isMultiple?: boolean;
    initialValue?: string;
    discountData?: DiscountDetailDto;
}

export const MultipleTourSearch: React.FC<MultipleTourSearchProps> = props => {
    const { disable, isMultiple, initialValue, discountData, infoForm } = props;

    // state
    const [selectData, setSelectData] = useState<{ value: string; label: string; disabled?: boolean }[]>([]);
    const paramsSearch = {
        sorter: {
            columnKey: 'CreatedOn',
            order: 'descend',
        },
        pageSize: pageSize,
        discountOnType: isMultiple ? DiscountOnType.Group : DiscountOnType.EarlyBirdLastMinute,
    };

    // query
    const { mutateAsync: getFetchDataList, isLoading } = useSearchTourDiscount();

    const handleChangeTour = () => {
        !isMultiple &&
            infoForm.setFieldsValue({
                isEarlyBird: false,
                isLastMinute: false,
            });
    };

    useEffect(() => {
        if (discountData) {
            const mapData = discountData.tourScheduleDiscounts?.map(item => {
                return {
                    value: `${item.tourScheduleId}`,
                    label: `${item.tourScheduleTourCode} - ${item.tourScheduleName}`,
                };
            });
            setSelectData(mapData ?? []);
        }
    }, [discountData]);

    return (
        <OnForm
            {...props}
            initialValue={initialValue}
            requestSearch={paramsSearch}
            dataSelected={discountData ? selectData : []}
            handleSelectOutSide={handleChangeTour}
            disabled={disable}
            hookOnChange={getFetchDataList}
            multiple={isMultiple}
            loading={isLoading}
            rules={[
                {
                    required: true,
                    message: i18n.t('validation.default.validDefault'),
                },
            ]}
        />
    );
};
