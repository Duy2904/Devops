import { useCallback, useEffect, useState } from 'react';

import { BaseSelect } from '@src/new/components/customs/Selects/BaseSelect';
import FilterSearch from '@utils/filterSearch';
import { Select } from 'antd';
import i18n from '@src/i18n';
import { useGetTripOnFilterTourFit } from '@fragments/Tour/hooks/useTourFit';

interface RouteFitSelectProps {
    className?: string;
    title?: string;
    routeId?: string;
    destinationId?: string;
    setRouteId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const RouteFitSelect: React.FC<RouteFitSelectProps> = props => {
    const { destinationId, routeId, setRouteId } = props;
    const { mutateAsync: getTripSelect, isLoading } = useGetTripOnFilterTourFit();
    const [dataResponse, setDataResponse] = useState<Array<{ value: string; label: string }>>([]);

    const onChange = (value: string) => {
        setRouteId(value);
    };

    const handleResponse = useCallback(async () => {
        if (destinationId) {
            const res = await getTripSelect(destinationId);
            setDataResponse(res);
        }
    }, [destinationId, getTripSelect]);

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
                value={routeId}
                disabled={!destinationId}
            />
        );
    };

    return <BaseSelect className={props.className} title={props.title} items={select()} />;
};
