import { HeadContent } from '@components/ui/HeadContent';
import { ListButton } from '../ListButton';
import { SlugHeader } from '@components/ui/Slug';
import { TitleHeader } from '@components/ui/TitleHeader';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';

export interface HeaderProps {
    isOwner?: boolean;
}

export const Header: React.FC<HeaderProps> = props => {
    const { isOwner } = props;
    const slug = [
        {
            name: i18n.t(isOwner ? 'Quản lý chung' : 'menu.manageSystem'),
            slug: '',
        },
        {
            name: i18n.t('Quản lý tài khoản'),
            slug: isOwner ? rootPaths.userOwnerList : rootPaths.userList,
        },
    ];
    return (
        <HeadContent
            slugContent={<SlugHeader slugList={slug} showUpdated />}
            titleContent={<TitleHeader title={`${i18n.t('Danh sách')} ${i18n.t('tài khoản')}`} />}
            buttonActionList={<ListButton isOwner={isOwner} />}
        />
    );
};
