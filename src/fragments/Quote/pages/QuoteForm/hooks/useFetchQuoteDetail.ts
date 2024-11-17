import { useGetQuote } from '@fragments/Quote/hooks/useQuoteFIT';
import { useGetQuoteGit } from '@fragments/Quote/hooks/useQuoteGIT';
import { useQuoteStore } from '@fragments/Quote/store/quoteStore';
import { TourType } from '@src/types/TypeEnum';

const useFetchQuoteDetail = (id: string) => {
    const { tourType } = useQuoteStore(state => state);

    const { data: dataQuote = {} } = useGetQuote(tourType === TourType.FIT ? id : '');
    const { data: dataQuoteGit = {} } = useGetQuoteGit(tourType === TourType.GIT ? id : '');

    return tourType === TourType.GIT ? dataQuoteGit : dataQuote;
};

export default useFetchQuoteDetail;
