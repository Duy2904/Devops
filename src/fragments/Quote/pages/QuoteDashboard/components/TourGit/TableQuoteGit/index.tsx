import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { useQueryClient } from 'react-query';

import { useCancelQuoteGit, useDeleteQuoteGit, useFetchQuotesGit } from '@fragments/Quote/hooks/useQuoteGIT';
import { SearchQuoteDto } from '@sdk/tour-operations';
import { useSearchTableStore } from '@store/searchTableStore';

import { TableQuoteCommon } from '../../Common/TableCommon';

interface TableQuoteGitProps {
    rowSelected: React.Key[];
    setIsOpenConfirmationModal: Dispatch<SetStateAction<boolean>>;
    setRowSelected: Dispatch<SetStateAction<React.Key[]>>;
    setQuoteList: Dispatch<SetStateAction<SearchQuoteDto[]>>;
}

export const TableQuoteGit: React.FC<TableQuoteGitProps> = props => {
    const { rowSelected, setRowSelected, setIsOpenConfirmationModal, setQuoteList } = props;
    const queryClient = useQueryClient();
    const setInvalidQuery = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ['fetchQuotesGit'] });
    }, [queryClient]);

    // store
    const { tableParams } = useSearchTableStore(state => state);

    // query & mutate
    const { data, isLoading } = useFetchQuotesGit(tableParams);
    const { mutateAsync: deleteQuoteGit } = useDeleteQuoteGit();
    const { mutateAsync: cancelQuoteGit } = useCancelQuoteGit();

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
            cancelQuote={cancelQuoteGit}
            deleteQuote={deleteQuoteGit}
            setInvalidQuery={setInvalidQuery}
            renderFileName={renderFileName}
        />
    );
};
