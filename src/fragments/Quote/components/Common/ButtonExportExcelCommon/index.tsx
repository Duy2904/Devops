import { SetStateAction, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { ExportButton } from '@components/customizes/Button/ExportButton';
import { mapSearchRequest } from '@fragments/Quote/hooks/useQuoteFIT';
import useSignalRInstance from '@hooks/useSignalRInstance';
import { SearchQuotesRequest } from '@sdk/tour-operations';
import { useSearchTableStore } from '@store/searchTableStore';

interface ButtonExportExcelCommonProps {
    isSmall?: boolean;
    exportQuote: () => Promise<void>;
    // eslint-disable-next-line no-unused-vars
    setSearchRequest: (value: SetStateAction<SearchQuotesRequest>) => void;
}

export const ButtonExportExcelCommon: React.FC<ButtonExportExcelCommonProps> = props => {
    const { isSmall, exportQuote, setSearchRequest } = props;

    // Store
    const { tableParams } = useSearchTableStore(state => state);
    const { signalConnectedId } = useSignalRInstance(state => state);

    const handleExportExcel = useDebouncedCallback(async () => {
        if (signalConnectedId) {
            exportQuote();
        }
    }, 500);

    useEffect(() => {
        if (tableParams) {
            setSearchRequest(mapSearchRequest(tableParams));
        }
    }, [setSearchRequest, tableParams]);

    return <ExportButton onClick={handleExportExcel} isSmall={isSmall} />;
};
