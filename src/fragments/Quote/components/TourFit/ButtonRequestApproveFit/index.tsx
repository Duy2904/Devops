import { ButtonRequestApproveCommon } from '../../Common/ButtonRequestApproveCommon';
import Can from '@components/common/Can';
import { PermissionType } from '@src/types/TypeEnum';
import { getPermission } from '@fragments/Quote/features/getPermission';
import i18n from '@src/i18n';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { useQuoteStore } from '@fragments/Quote/store/quoteStore';
import { useRequestApproveQuote } from '@fragments/Quote/hooks/useQuoteFIT';
import { useRequestApproveQuoteGit } from '@fragments/Quote/hooks/useQuoteGIT';

interface ButtonRequestApproveFitProps {
    isSmall?: boolean;
    quoteId: string;
}

export const ButtonRequestApproveFit: React.FC<ButtonRequestApproveFitProps> = props => {
    const { isSmall, quoteId } = props;
    const queryClient = useQueryClient();

    // Store
    const { tourType } = useQuoteStore(state => state);

    // Mutate
    const { mutateAsync: requestApproveQuote, isLoading } = useRequestApproveQuote();
    useRequestApproveQuoteGit();

    const handleAfterApprove = useCallback(() => {
        toastSuccess('', i18n.t('quote.modal.sendRequestSuccess'));
        if (isSmall) {
            queryClient.invalidateQueries({ queryKey: ['fetchQuotes'] });
        } else {
            queryClient.invalidateQueries({ queryKey: ['getQuote'] });
        }
    }, [isSmall, queryClient]);

    const requestApprove = useCallback(async () => {
        await requestApproveQuote(quoteId);

        handleAfterApprove();
    }, [handleAfterApprove, quoteId, requestApproveQuote]);

    return (
        <Can permissions={getPermission(tourType, [PermissionType.Update])}>
            <ButtonRequestApproveCommon
                isSmall={isSmall}
                quoteId={quoteId}
                isLoading={isLoading}
                requestApprove={requestApprove}
            />
        </Can>
    );
};
