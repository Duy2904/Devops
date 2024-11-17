import { QuoteDetail } from '@fragments/Quote/pages/QuoteForm';
import React from 'react';
import { TourType } from '@src/types/TypeEnum';

export const QuoteGitDetailPage: React.FC = () => {
    return <QuoteDetail tourType={TourType.GIT} />;
};
