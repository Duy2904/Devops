import { SlugHeader } from '@components/ui/Slug';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';

interface HeaderProps {
    branchId?: string;
}

export const Header: React.FC<HeaderProps> = props => {
    const slug = [
        {
            name: i18n.t('menu.manageSystem'),
            slug: '',
        },
        {
            name: i18n.t('menu.departmentManagement'),
            slug: '',
        },
        {
            name: i18n.t('menu.branch'),
            slug: rootPaths.branchList,
        },
        {
            name: `${props.branchId ? i18n.t('action.edit') : i18n.t('action.create')}`,
            slug: `${props.branchId ? rootPaths.branchForm + props.branchId : rootPaths.branchForm}`,
        },
    ];

    return <SlugHeader slugList={slug} />;
};
