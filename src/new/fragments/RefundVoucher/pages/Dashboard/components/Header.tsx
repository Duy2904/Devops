import { ButtonRF } from './Button';
import { HeadContent } from '@components/ui/HeadContent';
import { SlugHeader } from '@components/ui/Slug';
import { TitleHeader } from '@components/ui/TitleHeader';
import i18n from '@src/i18n';
import { rootPathsNew } from '@src/routers/newRoute';

export const HeaderRF = () => {
    const slug = [
        {
            name: i18n.t('Chứng từ thanh toán'),
            slug: '',
        },
        {
            name: i18n.t('Phiếu hoàn'),
            slug: rootPathsNew.refundList,
        },
    ];
    return (
        <HeadContent
            slugContent={<SlugHeader slugList={slug} showUpdated />}
            titleContent={<TitleHeader title={i18n.t('Danh sách phiếu hoàn')} />}
            buttonActionList={<ButtonRF />}
        />
    );
};
