import { BaseSelect } from '../BaseSelect';
import FilterSearch from '../../../../utils/filterSearch';
import { ReactNode } from 'react';
import { Rule } from 'antd/es/form';
import { Select } from 'antd';
import i18n from '@src/i18n';
import { useGetVendors } from './useVendor';

interface VendorSelectProps {
    className?: string;
    name?: string | string[];
    rules?: Rule[];
    required?: boolean;
    label?: ReactNode;
    isForm?: boolean;
    disable?: boolean;
    initialValue?: string | null;
}

export const VendorSelect: React.FC<VendorSelectProps> = props => {
    const { data, isLoading } = useGetVendors();
    const fetchItem =
        data?.data?.map(item => ({
            value: item.id ?? '',
            label: item.name ?? '',
        })) ?? [];

    const select = () => {
        return (
            <Select
                virtual={false}
                showSearch
                className="w-full"
                placeholder={i18n.t('--Chọn Nhà Cung Cấp--')}
                options={fetchItem}
                filterOption={FilterSearch.filterOption}
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
            items={select()}
            disable={props.disable}
            initialValue={props.initialValue}
        />
    );
};
