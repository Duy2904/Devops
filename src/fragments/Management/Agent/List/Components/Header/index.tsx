import { useEffect, useState } from 'react';

import { AddNewButton } from '@components/customizes/Button/AddNewButton';
import Can from '@components/common/Can';
import { ExportButton } from '@components/customizes/Button/ExportButton';
import Format from '@utils/format';
import { HeadContent } from '@components/ui/HeadContent';
import { MyPermissions } from '@utils/Permissions';
import { SharedSearchAgentsRequestOfLiteAgentDto } from '@sdk/identity-next/models';
import { TitleHeader } from '@components/ui/TitleHeader';
import { TitleSlugAgentsManagement } from './TitleSlug';
import { customTableParamsListAgent } from '@fragments/Management/Agent/Feature';
import dayjs from 'dayjs';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';
import { useDebouncedCallback } from 'use-debounce';
import { useExportExcelAgents } from '@fragments/Management/Agent/hooks/mutates';
import { useNavigate } from 'react-router-dom';
import { useSearchTableStore } from '@store/searchTableStore';
import useSignalRInstance from '@hooks/useSignalRInstance';

export const AgentsManagementHeader: React.FC = () => {
    const navigate = useNavigate();

    const [searchRequest, setSearchRequest] = useState<SharedSearchAgentsRequestOfLiteAgentDto>({});

    const { tableParams } = useSearchTableStore(state => state);
    const { signalConnectedId } = useSignalRInstance(state => state);

    const { mutateAsync: exportExcel, isLoading } = useExportExcelAgents();

    const handleExportExcel = useDebouncedCallback(async () => {
        const currentDate = dayjs().format('DDMMYYYY');
        delete searchRequest.pageNumber;
        delete searchRequest.pageSize;
        if (signalConnectedId) {
            const reqObj = {
                ...searchRequest,
                connectionId: signalConnectedId,
                fileName: Format.formatExportExcelTitle(`DSDaily_${currentDate}.xlsx`),
                locale: 'vi-VN',
            };
            await exportExcel(reqObj);
        }
    }, 500);

    useEffect(() => {
        if (tableParams) {
            setSearchRequest(customTableParamsListAgent(tableParams));
        }
    }, [tableParams]);

    return (
        <HeadContent
            slugContent={<TitleSlugAgentsManagement />}
            titleContent={<TitleHeader title={`${i18n.t('default.list')} ${i18n.t('menu.agent')}`} />}
            buttonActionList={
                <>
                    <Can permissions={[MyPermissions.AgentCreate]}>
                        <AddNewButton onClick={() => navigate(rootPaths.agentForm)} />
                    </Can>
                    <ExportButton onClick={handleExportExcel} disabled={isLoading} />
                </>
            }
        />
    );
};
