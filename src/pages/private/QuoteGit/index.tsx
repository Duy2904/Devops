import { QuoteList } from '@fragments/Quote/pages/QuoteDashboard';
import { TourType } from '@src/types/TypeEnum';

export const QuoteGitListPage: React.FC = () => {
    return <QuoteList tourType={TourType.GIT} />;
};
