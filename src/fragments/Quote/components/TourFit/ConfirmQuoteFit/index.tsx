import { useApproveQuote, useGetQuote, useRequestApproveQuote } from '@fragments/Quote/hooks/useQuoteFIT';
import { useCallback, useState } from 'react';

import { AxiosError } from 'axios';
import { ConfirmQuoteCommon } from '@fragments/Quote/components/Common/ConfirmQuoteCommon';
import { ConfirmQuoteRequest } from '@sdk/tour-operations';
import { STATUS_ERROR } from '@src/types/statusErrors';
import i18n from '@src/i18n';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { useQueryClient } from 'react-query';
import { useQueryGetTourScheduleUseId } from '@fragments/Quote/hooks/useSearchTour';

interface ConfirmQuoteFitProps {
    quoteId: string;
    isSendRequest: boolean;
    isApproveRequest: boolean;
    isOpenModal: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ConfirmQuoteFit: React.FC<ConfirmQuoteFitProps> = props => {
    const { quoteId, isSendRequest, isApproveRequest, isOpenModal, setIsModalOpen } = props;
    const queryClient = useQueryClient();

    // State
    const [quoteCodeConfirmed, setQuoteCodeConfirmed] = useState<string | undefined>(undefined);

    // Mutate
    const { mutateAsync: requestApproveQuote, isLoading: loadingRequestApproveQuote } = useRequestApproveQuote();
    const { mutateAsync: approveQuote, isLoading: loadingApproveQuote } = useApproveQuote();

    // Query
    const { data: dataQuote } = useGetQuote(quoteId);
    const { data: dataTourSchedule } = useQueryGetTourScheduleUseId(dataQuote?.tourScheduleId ?? '');

    const refetchQuote = useCallback(() => {
        if (quoteId) {
            queryClient.invalidateQueries({ queryKey: ['getQuote', quoteId] });
            queryClient.invalidateQueries({ queryKey: ['fetchQuotes'] });
        }
    }, [queryClient, quoteId]);

    const submitApproveQuote = useCallback(
        async (value: ConfirmQuoteRequest) => {
            try {
                const response = await approveQuote({
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
        [approveQuote, quoteId, refetchQuote, setIsModalOpen],
    );

    const submitRequestApproveQuote = useCallback(async () => {
        await requestApproveQuote(quoteId);

        toastSuccess('', i18n.t('quote.modal.sendRequestSuccess'));
        setIsModalOpen(false);
        refetchQuote();
    }, [quoteId, refetchQuote, requestApproveQuote, setIsModalOpen]);

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
