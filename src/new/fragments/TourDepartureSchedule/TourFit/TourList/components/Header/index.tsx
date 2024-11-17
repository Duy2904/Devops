import { HeadContent } from '@src/new/components/customs/HeadContent';
import { Slug } from './Slug';
import { TitleHeader } from '@src/new/components/customs/TitleHeader';
import i18n from '@src/i18n';

export const Header: React.FC = () => {
    return (
        <HeadContent
            slugContent={<Slug />}
            titleContent={<TitleHeader title={`${i18n.t('default.list')} ${i18n.t('Hành trình')}`} />}
        />
    );
};
