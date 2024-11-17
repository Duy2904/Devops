import { HeadContent } from '@src/new/components/customs/HeadContent';
import { Slug } from './Slug';

export const Header = () => {
    return <HeadContent slugContent={<Slug />} />;
};
