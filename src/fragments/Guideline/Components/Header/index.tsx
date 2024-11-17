import React from 'react';
import { SlugHeader } from '@components/ui/Slug';
import { TitleHeader } from '@components/ui/TitleHeader';
import i18n from '@src/i18n';

export const Header: React.FC = () => {
    const slug = [
        {
            name: 'Home',
            slug: '/',
        },
        {
            name: i18n.t('Guideline'),
            slug: '',
        },
    ];
    return (
        <div>
            <SlugHeader slugList={slug} />
            <TitleHeader title={i18n.t('Guidelines Design')} />
        </div>
    );
};
