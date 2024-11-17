import { QuoteDetail } from '@fragments/Quote/pages/QuoteForm';
import React from 'react';
import { TourType } from '@src/types/TypeEnum';

export const QuoteDetailPage: React.FC = () => {
    return <QuoteDetail tourType={TourType.FIT} />;
};
