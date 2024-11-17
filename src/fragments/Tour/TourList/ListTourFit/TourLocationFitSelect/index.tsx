import FilterSearch, { currentPage, pageSize } from '@utils/filterSearch';
import {
    useGetDepartureLocationOnFilterTourFit,
    useGetDestinationLocationOnFilterTourFit,
} from '@fragments/Tour/hooks/useTourFit';

import { BaseSelect } from '@components/customizes/Select/BaseSelect';
import { Select } from 'antd';
import i18n from '@src/i18n';
import { useSearchTableStore } from '@store/searchTableStore';

interface TourLocationFitSelectProps {
    className?: string;
    showTitle?: boolean;
    title?: string;
    isDepartureLocation?: boolean;
}

export const TourLocationFitSelect: React.FC<TourLocationFitSelectProps> = props => {
    const { data: departureLocation, isLoading: loadingDepartureLocation } = useGetDepartureLocationOnFilterTourFit();
    const { data: destinationLocation, isLoading: loadingDestinationLocation } =
        useGetDestinationLocationOnFilterTourFit();

    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    const onChange = (value: string) => {
        setSearchParams({
            ...tableParams,
            pagination: { current: currentPage, pageSize: pageSize, showSizeChanger: true },
            ...(props.isDepartureLocation ? { departureLocationId: value } : { destinationLocationId: value }),
            ...(!props.isDepartureLocation && { routeId: undefined }),
        });
    };

    const select = () => {
        return (
            <Select
                virtual={false}
                showSearch
                className="w-full"
                placeholder={i18n.t('--Chọn địa điểm--')}
                onChange={onChange}
                options={props.isDepartureLocation ? departureLocation : destinationLocation}
                filterOption={FilterSearch.filterOption}
                allowClear
                loading={props.isDepartureLocation ? loadingDepartureLocation : loadingDestinationLocation}
                value={props.isDepartureLocation ? tableParams.departureLocationId : tableParams.destinationLocationId}
            />
        );
    };

    return <BaseSelect className={props.className} showTitle={props?.showTitle} title={props.title} items={select()} />;
};
