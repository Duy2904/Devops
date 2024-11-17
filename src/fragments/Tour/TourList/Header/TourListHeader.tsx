import { useEffect, useState } from 'react';

import { AddNewButton } from '@components/customizes/Button/AddNewButton';
import Can from '@components/common/Can';
import { ExportButton } from '@components/customizes/Button/ExportButton';
import Format from '@utils/format';
import { HeadContent } from '@components/ui/HeadContent';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { SearchTourSchedulesRequestOfTourSearchFitDto } from '@sdk/tour-operations';
import { SlugTour } from './SlugTour';
import { TitleHeader } from '@components/ui/TitleHeader';
import i18n from '@src/i18n';
import { mapSearchRequest } from '@fragments/Tour/Feature/FeatureTourFit';
import { useDebouncedCallback } from 'use-debounce';
import { useExportExcelTourFit } from '@fragments/Tour/hooks/useTourFit';
import { useExportExcelTourGit } from '@fragments/Tour/hooks/useTourGit';
import { useNavigate } from 'react-router-dom';
import { useSearchTableStore } from '@store/searchTableStore';
import useSignalRInstance from '@hooks/useSignalRInstance';

type TourListHeaderProps = {
    title: string;
    redirectUrl: string;
    isFitTour: boolean;
};

export const TourListHeader: React.FC<TourListHeaderProps> = props => {
    const navigate = useNavigate();

    const [searchRequest, setSearchRequest] = useState<SearchTourSchedulesRequestOfTourSearchFitDto>({});

    const { mutateAsync: exportExcelDataTourFit } = useExportExcelTourFit();
    const { mutateAsync: exportExcelDataTourGit } = useExportExcelTourGit();

    const { tableParams } = useSearchTableStore(state => state);
    const { signalConnectedId } = useSignalRInstance(state => state);

    const handleExportExcel = useDebouncedCallback(async () => {
        delete searchRequest.pageNumber;
        delete searchRequest.pageSize;
        if (signalConnectedId) {
            const reqObj = {
                ...searchRequest,
                connectionId: signalConnectedId,
                fileName: Format.formatExportExcelTitle(props.isFitTour ? 'DSTourFIT' : 'DSTourGit', searchRequest),
                locale: 'vi-VN',
                status: searchRequest.status,
            };
            props.isFitTour ? await exportExcelDataTourFit(reqObj) : await exportExcelDataTourGit(reqObj);
        }
    }, 500);

    useEffect(() => {
        if (tableParams) {
            setSearchRequest(mapSearchRequest(tableParams));
        }
    }, [tableParams]);

    return (
        <HeadContent
            slugContent={<SlugTour isFitTour={props.isFitTour} />}
            titleContent={
                <TitleHeader
                    title={`${i18n.t('default.list')} ${
                        props.isFitTour ? i18n.t('menu.tourFit') : i18n.t('menu.tourGit')
                    }`}
                />
            }
            buttonActionList={
                <>
                    <Can permissions={[MyPermissions.TourFitCreate, MyPermissions.TourGitCreate]}>
                        <AddNewButton onClick={() => navigate(`${props.redirectUrl}`)} />
                    </Can>
                    <Can permissions={[MyPermissions.TourFitView, MyPermissions.TourGitView]}>
                        <ExportButton onClick={handleExportExcel} />
                    </Can>
                </>
            }
        />
    );
};
