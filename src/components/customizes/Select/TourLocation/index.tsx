import { ReactNode, useEffect } from 'react';

import { BaseSelect } from '../BaseSelect';
import FilterSearch from '@utils/filterSearch';
import { LocationDto } from '@sdk/tour-operations';
import { Rule } from 'antd/es/form';
import { Select } from 'antd';
import i18n from '@src/i18n';
import { useGetLocations } from './useTourLocation';
import { useSearchTableStore } from '@store/searchTableStore';
import { useTourLocationsStore } from '@store/tourLocationStore';

interface TourLocationSelectProps {
    className?: string;
    name?: string;
    rules?: Rule[];
    required?: boolean;
    label?: ReactNode;
    disable?: boolean;
    isForm?: boolean;
    showTitle?: boolean;
    title?: string;
    isDepartureLocation?: boolean;
    placeholder?: string;
    onChange?: () => void;
}

export const TourLocationSelect: React.FC<TourLocationSelectProps> = props => {
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);
    const {
        actions: { setLocation },
    } = useTourLocationsStore(state => state);

    const { data, isLoading } = useGetLocations();
    const fetchItem =
        data?.data?.map(data => ({
            value: data.id ?? '',
            label: data.name ?? '',
        })) ?? [];

    const onChange = (value: string) => {
        setSearchParams({
            ...tableParams,
            ...(props.isDepartureLocation ? { departureLocationId: value } : { destinationLocationId: value }),
        });
    };

    const select = () => {
        return (
            <Select
                virtual={false}
                disabled={props.disable}
                showSearch
                className="w-full"
                placeholder={props.placeholder ? props.placeholder : i18n.t('--Chọn địa điểm--')}
                onChange={!props.isForm ? onChange : props.onChange}
                options={fetchItem}
                filterOption={FilterSearch.filterOption}
                allowClear
                loading={isLoading}
                value={props.isDepartureLocation ? tableParams.departureLocationId : tableParams.destinationLocationId}
            />
        );
    };

    useEffect(() => {
        if (data) {
            setLocation(data.data as LocationDto[]);
        }
    }, [data, setLocation]);

    return (
        <BaseSelect
            isForm={props.isForm}
            className={props.className}
            name={props.name}
            rules={props.rules}
            required={props.required}
            label={props.label}
            showTitle={props?.showTitle}
            title={props.title}
            items={select()}
        />
    );
};
