import { QuoteList } from '@fragments/Quote/pages/QuoteDashboard';
import { TourType } from '@src/types/TypeEnum';

export const QuoteListPage: React.FC = () => {
    return <QuoteList tourType={TourType.FIT} />;
};
