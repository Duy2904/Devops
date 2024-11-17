import { AddNewButton } from '@components/customizes/Button/AddNewButton';
import Can from '@components/common/Can';
import { HeadContent } from '@components/ui/HeadContent';
import { MyPermissions } from '@utils/Permissions';
import { TitleHeader } from '@components/ui/TitleHeader';
import { TitleSlugDepartmentsManagement } from './TitleSlug';
import i18n from '@src/i18n';

export interface DepartmentsManagementHeaderProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setDepartmentId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const DepartmentsManagementHeader: React.FC<DepartmentsManagementHeaderProps> = props => {
    const { setIsModalOpen, setDepartmentId } = props;

    const handleCreateDepartment = () => {
        setIsModalOpen(true);
        setDepartmentId(undefined);
    };

    return (
        <HeadContent
            slugContent={<TitleSlugDepartmentsManagement />}
            titleContent={<TitleHeader title={`${i18n.t('default.list')} ${i18n.t('menu.department')}`} />}
            buttonActionList={
                <Can permissions={[MyPermissions.DepartmentCreate]}>
                    <AddNewButton onClick={handleCreateDepartment} />
                </Can>
            }
        />
    );
};
