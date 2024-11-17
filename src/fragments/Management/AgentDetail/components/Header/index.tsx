import { SlugHeader } from '@components/ui/Slug';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';

interface HeaderAgentManagementFormProps {
    agentId?: string;
}

export const HeaderAgentManagementForm: React.FC<HeaderAgentManagementFormProps> = props => {
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
            name: i18n.t('menu.agent'),
            slug: rootPaths.agentList,
        },
        {
            name: `${props.agentId ? i18n.t('action.edit') : i18n.t('action.create')}`,
            slug: `${props.agentId ? rootPaths.agentForm + props.agentId : rootPaths.agentForm}`,
        },
    ];

    return <SlugHeader slugList={slug} />;
};
