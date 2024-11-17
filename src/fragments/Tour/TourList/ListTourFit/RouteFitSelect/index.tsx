import FilterSearch, { currentPage, pageSize } from '@utils/filterSearch';
import { useCallback, useEffect, useState } from 'react';

import { BaseSelect } from '@components/customizes/Select/BaseSelect';
import { Select } from 'antd';
import i18n from '@src/i18n';
import { useGetTripOnFilterTourFit } from '@fragments/Tour/hooks/useTourFit';
import { useSearchTableStore } from '@store/searchTableStore';

interface RouteFitSelectProps {
    className?: string;
    title?: string;
    showTitle?: boolean;
}

export const RouteFitSelect: React.FC<RouteFitSelectProps> = props => {
    const { mutateAsync: getTripSelect, isLoading } = useGetTripOnFilterTourFit();
    const [dataResponse, setDataResponse] = useState<Array<{ value: string; label: string }>>([]);

    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    const onChange = (value: string) => {
        setSearchParams({
            ...tableParams,
            pagination: { current: currentPage, pageSize: pageSize, showSizeChanger: true },
            routeId: value,
        });
    };

    const handleResponse = useCallback(async () => {
        if (tableParams && tableParams.destinationLocationId) {
            const res = await getTripSelect(tableParams.destinationLocationId);
            setDataResponse(res);
        }
    }, [getTripSelect, tableParams]);

    useEffect(() => {
        handleResponse();
    }, [handleResponse]);

    const select = () => {
        return (
            <Select
                virtual={false}
                showSearch
                className="w-full"
                placeholder={i18n.t('--Chọn Hành trình--')}
                onChange={onChange}
                options={dataResponse}
                filterOption={FilterSearch.filterOption}
                allowClear
                loading={isLoading}
                value={tableParams.routeId}
                disabled={!tableParams.destinationLocationId}
            />
        );
    };

    return <BaseSelect className={props.className} showTitle={props?.showTitle} title={props.title} items={select()} />;
};
