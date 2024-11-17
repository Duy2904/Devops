import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { useQueryClient } from 'react-query';

import { useCancelQuote, useDeleteQuote, useFetchQuotes } from '@fragments/Quote/hooks/useQuoteFIT';
import { SearchQuoteDto } from '@sdk/tour-operations';
import { useSearchTableStore } from '@store/searchTableStore';

import { TableQuoteCommon } from '../../Common/TableCommon';

interface TableQuoteFitProps {
    rowSelected: React.Key[];
    setIsOpenConfirmationModal: Dispatch<SetStateAction<boolean>>;
    setRowSelected: Dispatch<SetStateAction<React.Key[]>>;
    setQuoteList: Dispatch<SetStateAction<SearchQuoteDto[]>>;
}

export const TableQuoteFit: React.FC<TableQuoteFitProps> = props => {
    const { rowSelected, setRowSelected, setIsOpenConfirmationModal, setQuoteList } = props;
    const queryClient = useQueryClient();
    const setInvalidQuery = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ['fetchQuotes'] });
    }, [queryClient]);

    // store
    const { tableParams } = useSearchTableStore(state => state);

    // query & mutate
    const { data, isLoading } = useFetchQuotes(tableParams);
    const { mutateAsync: deleteQuote } = useDeleteQuote();
    const { mutateAsync: cancelQuote } = useCancelQuote();

    if (tableParams.pagination) {
        tableParams.pagination.total = data?.totalCount;
    }

    const renderFileName = useCallback((quoteData: SearchQuoteDto) => {
        if (isEmpty(quoteData?.tourScheduleTourCode)) {
            return `${quoteData.orderNo}_${dayjs().format('DDMMYYYY')}.xlsx`;
        }
        return `${quoteData.orderNo}_${quoteData?.tourScheduleTourCode}_${dayjs().format('DDMMYYYY')}.xlsx`;
    }, []);

    useEffect(() => {
        if (data?.data && !isEmpty(data?.data)) {
            setQuoteList(data?.data);
        }
    }, [data?.data, setQuoteList]);

    return (
        <TableQuoteCommon
            data={data}
            rowSelected={rowSelected}
            isLoading={isLoading}
            setIsOpenConfirmationModal={setIsOpenConfirmationModal}
            setRowSelected={setRowSelected}
            setQuoteList={setQuoteList}
            cancelQuote={cancelQuote}
            deleteQuote={deleteQuote}
            setInvalidQuery={setInvalidQuery}
            renderFileName={renderFileName}
        />
    );
};
