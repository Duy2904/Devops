import { HeadContent } from '@components/ui/HeadContent';
import { ReactNode } from 'react';
import { SlugHeader } from '@components/ui/Slug';
import { TitleHeader } from '@components/ui/TitleHeader';

interface HeaderPromoteProps {
    slug: {
        name: string;
        slug: string;
    }[];
    title: string;
    buttonList?: ReactNode;
}

export const HeaderPromoteComponent: React.FC<HeaderPromoteProps> = props => {
    const { slug, title, buttonList } = props;
    return (
        <HeadContent
            slugContent={<SlugHeader slugList={slug} showUpdated />}
            titleContent={<TitleHeader title={title} />}
            buttonActionList={buttonList}
        />
    );
};
