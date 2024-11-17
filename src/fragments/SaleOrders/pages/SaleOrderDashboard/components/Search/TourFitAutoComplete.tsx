import { OnSearch } from '@components/customizes/AutoComplete/TourAutoComplete/OnSearch';
import { pageSize } from '@utils/filterSearch';

interface TourFitSearchSOProps {
    className?: string;
    title?: string;
    placeholder?: string;
}

export const TourFitSearchSO: React.FC<TourFitSearchSOProps> = props => {
    const { className, title, placeholder } = props;

    const logicFilter = {
        logic: 'or',
        filters: [
            {
                field: 'status',
                operator: 'eq',
                value: 'SalesOpen',
            },
            {
                field: 'status',
                operator: 'eq',
                value: 'NoSeatsAvailable',
            },
            {
                field: 'status',
                operator: 'eq',
                value: 'SaleTimeExpired',
            },
        ],
    };

    const paramsSearch = {
        sorter: {
            columnKey: 'CreatedOn',
            order: 'descend',
        },
        pageSize: pageSize,
        advancedFilter: logicFilter,
    };

    return <OnSearch className={className} title={title} placeholder={placeholder} requestSearch={paramsSearch} />;
};
