import { useApproveQuoteGit, useGetQuoteGit, useRequestApproveQuoteGit } from '@fragments/Quote/hooks/useQuoteGIT';
import { useCallback, useState } from 'react';

import { AxiosError } from 'axios';
import { ConfirmQuoteCommon } from '@fragments/Quote/components/Common/ConfirmQuoteCommon';
import { ConfirmQuoteRequest } from '@sdk/tour-operations';
import { STATUS_ERROR } from '@src/types/statusErrors';
import i18n from '@src/i18n';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { useQueryClient } from 'react-query';
import { useQueryGetTourGitScheduleUseId } from '@fragments/Quote/hooks/useSearchTour';

interface ConfirmQuoteGitProps {
    quoteId: string;
    isSendRequest: boolean;
    isApproveRequest: boolean;
    isOpenModal: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConfirmQuoteGit: React.FC<ConfirmQuoteGitProps> = props => {
    const { quoteId, isSendRequest, isApproveRequest, isOpenModal, setIsModalOpen } = props;
    const queryClient = useQueryClient();

    // State
    const [quoteCodeConfirmed, setQuoteCodeConfirmed] = useState<string | undefined>(undefined);

    // Mutate
    const { mutateAsync: requestApproveQuoteGit, isLoading: loadingRequestApproveQuote } = useRequestApproveQuoteGit();
    const { mutateAsync: approveQuoteGit, isLoading: loadingApproveQuote } = useApproveQuoteGit();

    // Query
    const { data: dataQuote } = useGetQuoteGit(quoteId);
    const { data: dataTourSchedule } = useQueryGetTourGitScheduleUseId(dataQuote?.tourScheduleId ?? '');

    const refetchQuote = useCallback(() => {
        if (quoteId) {
            queryClient.invalidateQueries({ queryKey: ['getQuoteGit', quoteId] });
            queryClient.invalidateQueries({ queryKey: ['fetchQuotesGit'] });
        }
    }, [queryClient, quoteId]);

    const submitApproveQuote = useCallback(
        async (value: ConfirmQuoteRequest) => {
            try {
                const response = await approveQuoteGit({
                    id: quoteId,
                    type: value.type,
                    reason: value.reason,
                } as ConfirmQuoteRequest);
                if (response) {
                    toastSuccess('', i18n.t('quote.modal.approveSuccess'));
                    setIsModalOpen(false);
                    refetchQuote();
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    if (error?.response?.data?.messages?.[0] === STATUS_ERROR.EXISTED_QUOTE_CONFIRMED.toString()) {
                        setQuoteCodeConfirmed(error?.response?.data?.messages?.[1]);
                    }
                }
            }
        },
        [approveQuoteGit, quoteId, refetchQuote, setIsModalOpen],
    );

    const submitRequestApproveQuote = useCallback(async () => {
        await requestApproveQuoteGit(quoteId);

        toastSuccess('', i18n.t('quote.modal.sendRequestSuccess'));
        setIsModalOpen(false);
        refetchQuote();
    }, [quoteId, refetchQuote, requestApproveQuoteGit, setIsModalOpen]);

    return (
        <ConfirmQuoteCommon
            isSendRequest={isSendRequest}
            isApproveRequest={isApproveRequest}
            isOpenModal={isOpenModal}
            loadingRequestApproveQuote={loadingRequestApproveQuote}
            loadingApproveQuote={loadingApproveQuote}
            dataTourSchedule={dataTourSchedule}
            submitApproveQuote={submitApproveQuote}
            submitRequestApproveQuote={submitRequestApproveQuote}
            setIsModalOpen={setIsModalOpen}
            quoteCodeConfirmed={quoteCodeConfirmed}
            setQuoteCodeConfirmed={setQuoteCodeConfirmed}
        />
    );
};
