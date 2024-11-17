import { SlugHeader } from '@components/ui/Slug';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';

export const Header = () => {
    const slug = [
        {
            name: i18n.t('Danh sách tài khoản'),
            slug: rootPaths.userList,
        },
        {
            name: i18n.t('Thông tin tài khoản'),
            slug: '',
        },
    ];
    return <SlugHeader slugList={slug} />;
};
