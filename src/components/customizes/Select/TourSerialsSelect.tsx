import { ReactNode, useCallback, useEffect, useState } from 'react';
import { mapSearchRequest, useGetTourInfos } from '../../../hooks/queries/useGetTourInfos';

import { BaseSelect } from './BaseSelect';
import FilterSearch from '../../../utils/filterSearch';
import { Rule } from 'antd/es/form';
import { Select } from 'antd';
import { TableParams } from '../../../types/SearchResponse';
import { TourInforDto } from '../../../../sdk/tour-operations';
import { useTourSerialsStore } from '../../../store/tourSerialStore';

interface TourSerialsSelectProps {
    className?: string;
    name?: string;
    rules?: Rule[];
    required?: boolean;
    label?: ReactNode;
    isForm?: boolean;
}

export const TourSerialsSelect: React.FC<TourSerialsSelectProps> = props => {
    const {
        selectTourSerial,
        actions: { setTourSerials },
    } = useTourSerialsStore(state => state);
    const { mutateAsync: getTourInfos } = useGetTourInfos();
    const [loadingTourForm, setLoadingTourForm] = useState<boolean>(false);
    const [tourSearchParams, setTourSearchParams] = useState<TableParams<TourInforDto>>({
        pagination: {
            current: 1,
            pageSize: 10,
            showSizeChanger: true,
        },
        sorter: {
            columnKey: 'CreatedOn',
            order: 'descend',
        },
    });

    const fetchTourSerials = useCallback(async () => {
        const data = await getTourInfos(mapSearchRequest(tourSearchParams));
        setTourSerials(data.data ?? []);
    }, [getTourInfos, setTourSerials, tourSearchParams]);

    const onTourSerialSearch = async (value: string) => {
        setLoadingTourForm(true);
        setTourSearchParams({
            ...tourSearchParams,
            keyword: value,
        });
        const data = await getTourInfos(mapSearchRequest(tourSearchParams));
        if (data) {
            setTourSerials(data.data ?? []);
            setLoadingTourForm(false);
        }
    };

    const select = () => {
        return (
            <Select
                virtual={false}
                showSearch
                className="w-full"
                placeholder="Nhập mã, tên tour"
                onSearch={onTourSerialSearch}
                options={selectTourSerial}
                loading={loadingTourForm}
                filterOption={FilterSearch.filterOption}
                allowClear
                autoClearSearchValue
            />
        );
    };

    useEffect(() => {
        fetchTourSerials();
    }, [fetchTourSerials]);

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
