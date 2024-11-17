import { HeadContent } from '@components/ui/HeadContent';
import { ListButton } from '../ListButton';
import { RoleType } from '@src/types/TypeEnum';
import { SlugHeader } from '@components/ui/Slug';
import { TitleHeader } from '@components/ui/TitleHeader';
import i18n from '@src/i18n';

interface HeaderProps {
    type: RoleType;
}

export const Header: React.FC<HeaderProps> = props => {
    const { type } = props;

    const slugName = type === RoleType.Agent ? 'Đại lý' : '';

    const slug = [
        {
            name: i18n.t('menu.manageSystem'),
            slug: '',
        },
        {
            name: i18n.t(`Quyền hạn ${slugName}`),
            slug: '',
        },
    ];
    return (
        <HeadContent
            slugContent={<SlugHeader slugList={slug} showUpdated />}
            titleContent={<TitleHeader title={`${i18n.t('Danh sách')} ${i18n.t(`Quyền hạn ${slugName}`)}`} />}
            buttonActionList={<ListButton type={type} />}
        />
    );
};
