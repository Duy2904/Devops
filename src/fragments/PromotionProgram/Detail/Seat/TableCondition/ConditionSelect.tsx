import { BaseSelect } from '@components/customizes/Select/BaseSelect';
import { ConditionTypeSelect } from '@fragments/PromotionProgram/Feature';
import FilterSearch from '@utils/filterSearch';
import { Select } from 'antd';
import i18n from '@src/i18n';

interface ConditionSelectProps {
    name?: string[] | string;
    initialValue?: string;
}

export const ConditionSelect: React.FC<ConditionSelectProps> = props => {
    const { name, initialValue } = props;
    const select = () => {
        return (
            <Select
                className="w-full"
                virtual={false}
                showSearch
                placeholder="--Chọn Điều kiện--"
                optionFilterProp="children"
                filterOption={FilterSearch.filterOption}
                options={ConditionTypeSelect()}
                disabled={!!initialValue}
            />
        );
    };
    return (
        <BaseSelect
            isForm
            className="mb-0"
            name={name}
            rules={[
                {
                    required: true,
                    message: i18n.t('validation.default.validDefault'),
                },
            ]}
            items={select()}
            initialValue={initialValue}
        />
    );
};
