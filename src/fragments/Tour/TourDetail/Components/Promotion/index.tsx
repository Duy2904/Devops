import { BaseSelect } from '@components/customizes/Select/BaseSelect';
import { DiscountOnType } from '@sdk/tour-operations';
import FilterSearch from '@utils/filterSearch';
import { Select } from 'antd';
import i18n from '@src/i18n';

export const PromotionTour: React.FC = () => {
    const selectData = Object.values(DiscountOnType).map((key: string | DiscountOnType) => ({
        value: key,
        label: i18n.t(`discountConditionType.${key}`),
    }));

    const select = () => {
        return (
            <Select
                mode="multiple"
                className="w-full"
                virtual={false}
                showSearch
                placeholder={i18n.t('--Chọn loại CTKM--')}
                optionFilterProp="children"
                filterOption={FilterSearch.filterOption}
                options={selectData.filter(item => item.value !== DiscountOnType.EarlyBirdLastMinute)}
            />
        );
    };

    return (
        <div className="py-4">
            <p className="text-blue-600 mb-4">{i18n.t('Thiết lập Loại CTKM áp dụng đồng thời')}</p>
            <BaseSelect isForm name="discountOnTypes" className="w-full lg:w-2/3" items={select()} />
        </div>
    );
};
