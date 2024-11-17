import FilterSearch, { currentPage, pageSize } from '@utils/filterSearch';
import {
    useGetDepartureLocationOnFilterTourGit,
    useGetDestinationLocationOnFilterTourGit,
} from '@fragments/Tour/hooks/useTourGit';

import { BaseSelect } from '@components/customizes/Select/BaseSelect';
import { Select } from 'antd';
import i18n from '@src/i18n';
import { useSearchTableStore } from '@store/searchTableStore';

interface TourLocationGitSelectProps {
    className?: string;
    showTitle?: boolean;
    title?: string;
    isDepartureLocation?: boolean;
}

export const TourLocationGitSelect: React.FC<TourLocationGitSelectProps> = props => {
    const { data: departureLocation, isLoading: loadingDepartureLocation } = useGetDepartureLocationOnFilterTourGit();
    const { data: destinationLocation, isLoading: loadingDestinationLocation } =
        useGetDestinationLocationOnFilterTourGit();

    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);

    const onChange = (value: string) => {
        setSearchParams({
            ...tableParams,
            pagination: { current: currentPage, pageSize: pageSize, showSizeChanger: true },
            ...(props.isDepartureLocation ? { departureLocationId: value } : { destinationLocationId: value }),
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
