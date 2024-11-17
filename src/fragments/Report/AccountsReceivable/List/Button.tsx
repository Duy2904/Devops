import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import Can from '@components/common/Can';
import { ExportButton } from '@components/customizes/Button/ExportButton';
import useSignalRInstance from '@hooks/useSignalRInstance';
import { SearchRevenueReportViewRequest } from '@sdk/tour-operations';
import { useSearchTableStore } from '@store/searchTableStore';
import Format from '@utils/format';
import { MyPermissions } from '@utils/Permissions/index.ts';

import { mapSearchRequest, useExportExcel } from '../hook/useAccountsReceivable';

export const ButtonRevenueTourFit: React.FC = () => {
    const [searchRequest, setSearchRequest] = useState<SearchRevenueReportViewRequest>({});

    const { mutateAsync: exportExcelData } = useExportExcel();

    // store
    const { signalConnectedId } = useSignalRInstance(state => state);
    const { tableParams } = useSearchTableStore(state => state);

    const handleExportExcel = useDebouncedCallback(async () => {
        delete searchRequest.pageNumber;
        delete searchRequest.pageSize;
        if (signalConnectedId) {
            await exportExcelData({
                ...searchRequest,
                connectionId: signalConnectedId,
                fileName: Format.formatExportExcelTitle('BCCongnoKhachhang', searchRequest),
                locale: 'vi-VN',
            });
        }
    }, 500);

    useEffect(() => {
        if (tableParams) {
            setSearchRequest(mapSearchRequest(tableParams));
        }
    }, [tableParams]);

    return (
        <>
            <Can permissions={[MyPermissions.CustomerDebtReportView]}>
                <ExportButton onClick={handleExportExcel} />
            </Can>
        </>
    );
};
