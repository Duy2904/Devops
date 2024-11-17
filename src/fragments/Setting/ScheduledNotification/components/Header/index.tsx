import React from 'react';
import { SlugHeader } from '@components/ui/Slug';
import i18n from '@src/i18n';

export const Header: React.FC = () => {
    const slug = [
        {
            name: 'Home',
            slug: '/',
        },
        {
            name: i18n.t('setting.scheduledNotification.table.tableName'),
            slug: '',
        },
    ];
    return <SlugHeader slugList={slug} />;
};
