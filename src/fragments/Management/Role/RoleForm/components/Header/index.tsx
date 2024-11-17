import { ReactNode, useMemo } from 'react';
import { getURLFormNavigate, getURLListNavigate } from '@fragments/Management/Role/features';

import { HeadContent } from '@components/ui/HeadContent';
import { RoleType } from '@src/types/TypeEnum';
import { SlugHeader } from '@components/ui/Slug';
import { TitleHeader } from '@components/ui/TitleHeader';
import i18n from '@src/i18n';
import { useParams } from 'react-router-dom';

interface HeaderProps {
    type: RoleType;
    listAction?: ReactNode;
}

export const Header: React.FC<HeaderProps> = props => {
    const { type, listAction } = props;
    const { roleId } = useParams<string>();

    const titleHeader = useMemo(() => (roleId ? `Chỉnh sửa quyền hạn` : 'Thêm mới quyền hạn'), [roleId]);

    const slug = [
        {
            name: i18n.t('Danh sách quyền hạn'),
            slug: getURLListNavigate(type),
        },
        {
            name: titleHeader,
            slug: `${roleId ? getURLFormNavigate(type) + '/' + roleId : getURLFormNavigate(type)}`,
        },
    ];
    return (
        <div>
            <HeadContent
                slugContent={<SlugHeader slugList={slug} />}
                titleContent={<TitleHeader title={titleHeader} />}
                buttonActionList={listAction}
            />
        </div>
    );
};
