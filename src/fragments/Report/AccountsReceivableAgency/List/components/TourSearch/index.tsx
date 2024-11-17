import { OnSearchDebt } from '@components/customizes/AutoComplete/TourAutoComplete/OnSearchDebt';
import { pageSize } from '@utils/filterSearch';

interface TourFitSearchRevenueProps {
    className?: string;
    title?: string;
    placeholder?: string;
}

export const TourFitSearchRevenue: React.FC<TourFitSearchRevenueProps> = props => {
    const { className, title, placeholder } = props;

    const paramsSearch = {
        sorter: {
            columnKey: 'CreatedOn',
            order: 'descend',
        },
        pageSize: pageSize,
    };

    return (
        <OnSearchDebt
            className={className}
            title={title}
            placeholder={placeholder}
            requestSearch={paramsSearch}
            isAgent={true}
        />
    );
};
