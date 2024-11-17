import { BaseSelect } from '../BaseSelect';
import FilterSearch from '@utils/filterSearch';
import { ReactNode } from 'react';
import { Rule } from 'antd/es/form';
import { Select } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import i18n from '@src/i18n';
import { useGetCancellationType } from '@hooks/queries/useCancellationType';

interface CancellationTypeSelectProps {
    className?: string;
    name?: string[] | string;
    rules?: Rule[];
    required?: boolean;
    label?: ReactNode;
    initialValue?: string | null;
    disabled?: boolean;
    size?: SizeType;
    isForm?: boolean;
}

export const CancellationTypeSelect: React.FC<CancellationTypeSelectProps> = props => {
    const { data, isLoading } = useGetCancellationType();
    const fetchItem =
        data?.data?.map(cancellationType => ({
            value: cancellationType.id ?? '',
            label: `${cancellationType.name}`,
        })) ?? [];

    const select = () => {
        return (
            <Select
                virtual={false}
                showSearch
                className="w-full"
                placeholder={i18n.t('--Chọn loại điều kiện--')}
                options={fetchItem}
                filterOption={FilterSearch.filterOption}
                disabled={props.disabled}
                loading={isLoading}
            />
        );
    };

    return (
        <BaseSelect
            isForm={props.isForm}
            className={props.className}
            name={props.name}
            rules={props.rules}
            required={props.required}
            label={props.label}
            initialValue={props.initialValue}
            items={select()}
        />
    );
};
