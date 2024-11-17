import { AddNewButton } from '@components/customizes/Button/AddNewButton';
import Can from '@components/common/Can';
import { HeadContent } from '@components/ui/HeadContent';
import { MyPermissions } from '@utils/Permissions';
import { TitleHeader } from '@components/ui/TitleHeader';
import { TitleSlugBranchesManagement } from './TitleSlug';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';
import { useNavigate } from 'react-router-dom';

export const BranchesManagementHeader: React.FC = () => {
    const navigate = useNavigate();

    return (
        <HeadContent
            slugContent={<TitleSlugBranchesManagement />}
            titleContent={<TitleHeader title={`${i18n.t('default.list')} ${i18n.t('menu.branch')}`} />}
            buttonActionList={
                <Can permissions={[MyPermissions.BranchCreate]}>
                    <AddNewButton onClick={() => navigate(rootPaths.branchForm)} />
                </Can>
            }
        />
    );
};
