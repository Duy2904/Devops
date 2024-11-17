import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

import Can from '@components/common/Can';
import { HeadContent } from '@components/ui/HeadContent';
import { TitleHeader } from '@components/ui/TitleHeader';
import { useExportExcelTourFit } from '@fragments/Tour/hooks/useTourFit';
import { useExportExcelTourGit } from '@fragments/Tour/hooks/useTourGit';
import useSignalRInstance from '@hooks/useSignalRInstance';
import { SearchTourSchedulesRequestOfTourSearchFitDto } from '@sdk/tour-operations';
import i18n from '@src/i18n';
import { AddBtn } from '@src/new/components/customs/Buttons/AddBtn';
import { ExportButton } from '@src/new/components/customs/Buttons/ExportButton';
import { useSearchTableStoreNew } from '@src/new/shared/stores/SearchTableStore';
import Format from '@utils/format';
import { MyPermissions } from '@utils/Permissions/index.ts';

import { mapSearchRequest } from '../../Feature/FeatureTourFit';
import { SlugTour } from './SlugTour';

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

    const { tableParams } = useSearchTableStoreNew(state => state);
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
            const paramsSearch = mapSearchRequest(tableParams);
            delete paramsSearch.keyword;
            setSearchRequest(paramsSearch);
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
                    <Can permissions={[MyPermissions.TourFitView, MyPermissions.TourGitView]}>
                        <ExportButton onClick={handleExportExcel} />
                    </Can>
                    <Can permissions={[MyPermissions.TourFitCreate, MyPermissions.TourGitCreate]}>
                        <AddBtn onClick={() => navigate(`${props.redirectUrl}`)} />
                    </Can>
                </>
            }
        />
    );
};
