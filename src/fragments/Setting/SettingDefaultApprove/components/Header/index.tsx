import React from 'react';
import { SlugHeader } from '@components/ui/Slug';

export const Header: React.FC = () => {
    const slug = [
        {
            name: 'Home',
            slug: '/',
        },
        {
            name: 'Thiết lập quy trình duyệt',
            slug: '',
        },
    ];
    return <SlugHeader slugList={slug} />;
};
