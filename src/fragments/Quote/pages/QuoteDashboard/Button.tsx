import { Button } from 'antd';
import { ButtonExportExcelFit } from '@fragments/Quote/components/TourFit/ButtonExportExcelFit';
import { ButtonExportExcelGit } from '@fragments/Quote/components/TourGit/ButtonExportExcelGit';
import Can from '@components/common/Can';
import { PermissionType } from '@src/types/TypeEnum';
import { PlusOutlined } from '@ant-design/icons';
import { TourType } from '@src/types/TypeEnum';
import { getLinkQuoteForm } from '@fragments/Quote/features/getLink';
import { getPermission } from '@fragments/Quote/features/getPermission';
import i18n from '@src/i18n';
import { useNavigate } from 'react-router-dom';
import { useQuoteStore } from '@fragments/Quote/store/quoteStore';
import { useTourScheduleStore } from '@store/tourScheduleStore';

export const ButtonQuoteList: React.FC = () => {
    const navigate = useNavigate();

    // Store
    const {
        actions: { removeTourSchedule },
    } = useTourScheduleStore(state => state);
    const { tourType } = useQuoteStore(state => state);

    const handleAddQuote = () => {
        removeTourSchedule();
        navigate(getLinkQuoteForm(tourType));
    };

    return (
        <>
            <Can permissions={getPermission(tourType, [PermissionType.Create])}>
                <Button className="text-xs" type="primary" onClick={handleAddQuote} icon={<PlusOutlined />}>
                    {i18n.t('action.create')}
                </Button>
            </Can>
            {tourType === TourType.GIT ? <ButtonExportExcelGit /> : <ButtonExportExcelFit />}
        </>
    );
};
