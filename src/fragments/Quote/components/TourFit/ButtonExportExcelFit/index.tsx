import { mapSearchRequest, useExportQuoteDetail, useExportQuoteList } from '@fragments/Quote/hooks/useQuoteFIT';
import { useCallback, useEffect, useState } from 'react';

import { ButtonExportExcelCommon } from '../../Common/ButtonExportExcelCommon';
import Can from '@components/common/Can';
import Format from '@utils/format';
import { PermissionType } from '@src/types/TypeEnum';
import { SearchQuotesRequest } from '@sdk/tour-operations';
import { getPermission } from '@fragments/Quote/features/getPermission';
import { useQuoteStore } from '@fragments/Quote/store/quoteStore';
import { useSearchTableStore } from '@store/searchTableStore';
import useSignalRInstance from '@hooks/useSignalRInstance';

interface ButtonExportExcelFitProps {
    isSmall?: boolean;
    quoteId?: string;
    fileName?: string;
}

export const ButtonExportExcelFit: React.FC<ButtonExportExcelFitProps> = props => {
    const { isSmall, quoteId, fileName } = props;

    const [searchRequest, setSearchRequest] = useState<SearchQuotesRequest>({});

    // Store
    const { tableParams } = useSearchTableStore(state => state);
    const { signalConnectedId } = useSignalRInstance(state => state);
    const { tourType } = useQuoteStore(state => state);

    // Mutate
    const { mutateAsync: exportQuoteList } = useExportQuoteList();
    const { mutateAsync: exportQuoteDetail } = useExportQuoteDetail();

    const exportQuote = useCallback(async () => {
        if (quoteId && fileName) {
            await exportQuoteDetail({
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
            await exportQuoteList({
                ...searchRequest,
                connectionId: signalConnectedId!,
                fileName: Format.formatExportExcelTitle('DSChiettinhgia', searchRequest),
                locale: 'vi-VN',
            });
        }
    }, [exportQuoteDetail, exportQuoteList, fileName, quoteId, searchRequest, signalConnectedId]);

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
