import { ExportDebtReportRequest, SyntheticSearchDebtReportDto } from '@sdk/tour-operations';

import { ExportButton } from '@components/customizes/Button/ExportButton';
import Format from '@utils/format';
import React from 'react';
import dayjs from 'dayjs';
import { useDebouncedCallback } from 'use-debounce';
import { useExportExcel } from '@fragments/Report/AccountsReceivableAgency/hook/useAccountsReceivable';
import { useSearchTableStore } from '@store/searchTableStore';
import useSignalRInstance from '@hooks/useSignalRInstance';

interface ExportExcelTableSummaryProps {
    data: SyntheticSearchDebtReportDto;
}

export const ExportExcelTableSummary: React.FC<ExportExcelTableSummaryProps> = ({ data }) => {
    const { tableParams } = useSearchTableStore(state => state);
    const { signalConnectedId } = useSignalRInstance(state => state);

    const { mutateAsync: exportExcelData, isLoading } = useExportExcel();

    const handleExportExcel = useDebouncedCallback(async () => {
        const fetchTableParams = { ...tableParams };
        const convertDate = Format.formatSearchDate(
            fetchTableParams,
            dayjs().subtract(1, 'months').startOf('day').utc().toDate(),
            dayjs().endOf('day').utc().toDate(),
        );
        const currentDate = dayjs().format('DDMMYYYY');
        if (signalConnectedId) {
            const dataName =
                convertDate.fromDate && convertDate.toDate
                    ? `${dayjs(convertDate.fromDate).format('DDMMYYYY')}-${dayjs(convertDate.toDate).format(
                          'DDMMYYYY',
                      )}`
                    : 'all';
            const tourScheduleId = fetchTableParams.tourId;
            delete fetchTableParams.pagination;
            delete fetchTableParams.advancedFilter;
            delete fetchTableParams.advancedSearch;
            delete fetchTableParams.sorter;
            delete fetchTableParams.tourId;
            const params: ExportDebtReportRequest = {
                ...fetchTableParams,
                fromDate: convertDate.fromDate,
                toDate: convertDate.toDate,
                tourScheduleId: tourScheduleId,
                isAgent: true,
                id: data.groupId,
                connectionId: signalConnectedId,
                fileName: Format.formatExportExcelTitle(
                    `BCCongnoDaily${data.groupCode}_${dataName}_${currentDate}.xlsx`,
                ),
                locale: 'vi-VN',
            };
            await exportExcelData(params);
        }
    }, 500);

    return <ExportButton isSmall onClick={handleExportExcel} disabled={isLoading} />;
};
