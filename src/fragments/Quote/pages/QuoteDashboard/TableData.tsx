import { useMemo, useState } from 'react';

import { QuoteStatus, SearchQuoteDto } from '@sdk/tour-operations';
import { TourType } from '@src/types/TypeEnum';
import { isOnlyOneStatus } from '@fragments/Quote/features';
import { useQuoteStore } from '@fragments/Quote/store/quoteStore';

import { ConfirmQuoteFit } from '../../components/TourFit/ConfirmQuoteFit';
import { ConfirmQuoteGit } from '../../components/TourGit/ConfirmQuoteGit';
import { TableQuoteFit } from './components/TourFit/TableQuoteFit';
import { TableQuoteGit } from './components/TourGit/TableQuoteGit';

export const TableQuoteList: React.FC = () => {
    // State
    const [rowSelected, setRowSelected] = useState<React.Key[]>([]);
    const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState<boolean>(false);
    const [quoteList, setQuoteList] = useState<SearchQuoteDto[]>([]);

    // store
    const { tourType } = useQuoteStore(state => state);

    const isSelectOneRow = useMemo(() => rowSelected.length == 1, [rowSelected.length]);
    const isSendRequest =
        isSelectOneRow &&
        (isOnlyOneStatus(QuoteStatus.Deny, rowSelected, quoteList) ||
            isOnlyOneStatus(QuoteStatus.Draft, rowSelected, quoteList));
    const isApproveRequest = isSelectOneRow && isOnlyOneStatus(QuoteStatus.WaitConfirm, rowSelected, quoteList);

    return (
        <>
            {tourType === TourType.GIT && (
                <>
                    <TableQuoteGit
                        rowSelected={rowSelected}
                        setRowSelected={setRowSelected}
                        setIsOpenConfirmationModal={setIsOpenConfirmationModal}
                        setQuoteList={setQuoteList}
                    />
                    <ConfirmQuoteGit
                        quoteId={rowSelected[0] as string}
                        isSendRequest={isSendRequest}
                        isApproveRequest={isApproveRequest}
                        isOpenModal={isOpenConfirmationModal}
                        setIsModalOpen={setIsOpenConfirmationModal}
                    />
                </>
            )}
            {tourType === TourType.FIT && (
                <>
                    <TableQuoteFit
                        rowSelected={rowSelected}
                        setRowSelected={setRowSelected}
                        setIsOpenConfirmationModal={setIsOpenConfirmationModal}
                        setQuoteList={setQuoteList}
                    />
                    <ConfirmQuoteFit
                        quoteId={rowSelected[0] as string}
                        isSendRequest={isSendRequest}
                        isApproveRequest={isApproveRequest}
                        isOpenModal={isOpenConfirmationModal}
                        setIsModalOpen={setIsOpenConfirmationModal}
                    />
                </>
            )}
        </>
    );
};
