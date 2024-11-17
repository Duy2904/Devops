import { mapSearchRequest, useExportExcel } from '../hook/useRevenueTourFit';
import { useEffect, useState } from 'react';

import Can from '@components/common/Can';
import { ExportButton } from '@components/customizes/Button/ExportButton';
import Format from '@utils/format';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { SearchRevenueReportViewRequest } from '@sdk/tour-operations';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchTableStore } from '@store/searchTableStore';
import useSignalRInstance from '@hooks/useSignalRInstance';

export const ButtonRevenueTourFitCollab: React.FC = () => {
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
                fileName: Format.formatExportExcelTitle('BCDoanhthutourGuikhach', searchRequest),
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
            <Can permissions={[MyPermissions.RevenueReportView]}>
                <ExportButton onClick={handleExportExcel} />
            </Can>
        </>
    );
};
