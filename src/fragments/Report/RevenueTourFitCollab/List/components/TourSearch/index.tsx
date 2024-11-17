import { FilterLogicEnum } from '@src/types/FilterOperatorEnum';
import { OnSearch } from '@components/customizes/AutoComplete/TourAutoComplete/OnSearch';
import { TourNatureType } from '@src/types/TypeEnum';
import { pageSize } from '@utils/filterSearch';

interface TourFitSearchRevenueCollabProps {
    className?: string;
    title?: string;
    placeholder?: string;
}

export const TourFitSearchRevenueCollab: React.FC<TourFitSearchRevenueCollabProps> = props => {
    const { className, title, placeholder } = props;

    const paramsSearch = {
        sorter: {
            columnKey: 'CreatedOn',
            order: 'descend',
        },
        advancedFilter: {
            logic: FilterLogicEnum.or,
            filters: [
                {
                    field: 'tourNature',
                    operator: 'eq',
                    value: TourNatureType.SendGuest,
                },
            ],
        },
        pageSize: pageSize,
    };

    return <OnSearch className={className} title={title} placeholder={placeholder} requestSearch={paramsSearch} />;
};
