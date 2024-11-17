import { useCallback, useEffect, useState } from 'react';
import { useExportQuoteGitDetail, useExportQuoteGitList } from '@fragments/Quote/hooks/useQuoteGIT';

import { ButtonExportExcelCommon } from '../../Common/ButtonExportExcelCommon';
import Can from '@components/common/Can';
import Format from '@utils/format';
import { PermissionType } from '@src/types/TypeEnum';
import { SearchQuotesRequest } from '@sdk/tour-operations';
import { getPermission } from '@fragments/Quote/features/getPermission';
import { mapSearchRequest } from '@fragments/Quote/hooks/useQuoteFIT';
import { useQuoteStore } from '@fragments/Quote/store/quoteStore';
import { useSearchTableStore } from '@store/searchTableStore';
import useSignalRInstance from '@hooks/useSignalRInstance';

interface ButtonExportExcelGitProps {
    isSmall?: boolean;
    quoteId?: string;
    fileName?: string;
}

export const ButtonExportExcelGit: React.FC<ButtonExportExcelGitProps> = props => {
    const { isSmall, quoteId, fileName } = props;

    const [searchRequest, setSearchRequest] = useState<SearchQuotesRequest>({});

    // Store
    const { tableParams } = useSearchTableStore(state => state);
    const { signalConnectedId } = useSignalRInstance(state => state);
    const { tourType } = useQuoteStore(state => state);

    // Mutate
    const { mutateAsync: exportQuoteGitList } = useExportQuoteGitList();
    const { mutateAsync: exportQuoteGitDetail } = useExportQuoteGitDetail();

    const exportQuote = useCallback(async () => {
        if (quoteId && fileName) {
            await exportQuoteGitDetail({
                id: quoteId,
                request: {
                    id: quoteId,
                    connectionId: signalConnectedId!,
                    fileName: Format.formatExportExcelTitle(fileName),
                    locale: 'vi-VN',
                },
            });
        } else {
            delete searchRequest.pageNumber;
            delete searchRequest.pageSize;
            await exportQuoteGitList({
                ...searchRequest,
                connectionId: signalConnectedId!,
                fileName: Format.formatExportExcelTitle('DSChiettinhgia-GIT', searchRequest),
                locale: 'vi-VN',
            });
        }
    }, [exportQuoteGitDetail, exportQuoteGitList, fileName, quoteId, searchRequest, signalConnectedId]);

    useEffect(() => {
        if (tableParams) {
            setSearchRequest(mapSearchRequest(tableParams));
        }
    }, [tableParams]);

    return (
        <Can permissions={getPermission(tourType, [PermissionType.View])}>
            <ButtonExportExcelCommon exportQuote={exportQuote} isSmall={isSmall} setSearchRequest={setSearchRequest} />
        </Can>
    );
};
