import { SlugHeader } from '@components/ui/Slug';
import { TitleHeader } from '@components/ui/TitleHeader';
import i18n from '@src/i18n';
import { t } from 'i18next';

interface HeaderAutoIncrementCodeProps {
    name: string;
    slugUrl: string;
}

export const HeaderAutoIncrementCode: React.FC<HeaderAutoIncrementCodeProps> = props => {
    const slug = [
        {
            name: i18n.t('Thiết lập hệ thống'),
            slug: '',
        },
        {
            name: i18n.t('Mã tăng tự động'),
            slug: props.slugUrl,
        },
    ];
    return (
        <>
            <SlugHeader slugList={slug} />
            <TitleHeader title={t(`${props.name}`)} />
        </>
    );
};
