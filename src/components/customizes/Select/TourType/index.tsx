import { BaseSelect } from '../BaseSelect';
import FilterSearch from '@utils/filterSearch';
import { ReactNode } from 'react';
import { Rule } from 'antd/es/form';
import { Select } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import i18n from '@src/i18n';
import { useGetTourTypes } from './useTourTypeSelecte';

interface TourTypeSelectProps {
    className?: string;
    name?: string;
    rules?: Rule[];
    required?: boolean;
    label?: ReactNode;
    disable?: boolean;
    isForm?: boolean;
    showTitle?: boolean;
    title?: string;
    size?: SizeType;
}

export const TourTypeSelect: React.FC<TourTypeSelectProps> = props => {
    const { data, isLoading } = useGetTourTypes();
    const fetchItem =
        data?.data?.map(data => ({
            value: data.id ?? '',
            label: data.name ?? '',
        })) ?? [];

    const select = () => {
        return (
            <Select
                virtual={false}
                showSearch
                className="w-full"
                placeholder={i18n.t('--Chọn Loại Tour--')}
                options={fetchItem}
                filterOption={FilterSearch.filterOption}
                loading={isLoading}
                disabled={props.isForm && props.disable}
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
        />
    );
};
