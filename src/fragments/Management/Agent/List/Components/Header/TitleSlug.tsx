import { SlugHeader } from '@components/ui/Slug';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';

export const TitleSlugAgentsManagement: React.FC = () => {
    const slug = [
        {
            name: i18n.t('menu.manageSystem'),
            slug: '',
        },
        {
            name: i18n.t('menu.agent'),
            slug: rootPaths.agentList,
        },
    ];
    return <SlugHeader slugList={slug} showUpdated />;
};
