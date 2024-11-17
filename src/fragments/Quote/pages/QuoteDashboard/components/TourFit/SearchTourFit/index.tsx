import { OnSearch } from '@components/customizes/AutoComplete/TourAutoComplete/OnSearch';
import { pageSize } from '@utils/filterSearch';

interface TourFitSearchQuoteProps {
    className?: string;
    title?: string;
    placeholder?: string;
}

export const TourFitSearchQuote: React.FC<TourFitSearchQuoteProps> = props => {
    const { className, title, placeholder } = props;

    const paramsSearch = {
        sorter: {
            columnKey: 'CreatedOn',
            order: 'descend',
        },
        pageSize: pageSize,
    };

    return <OnSearch className={className} title={title} placeholder={placeholder} requestSearch={paramsSearch} />;
};
