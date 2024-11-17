import { Fragment, useState } from 'react';

import { History } from '@fragments/History';
import { HistoryBtn } from '@src/new/components/customs/Buttons/HistoryBtn';
import { SlugHeader } from '@src/new/components/customs/Slug';
import i18n from '@src/i18n';
import { rootPathsNew } from '@src/routers/newRoute';
import { useParams } from 'react-router-dom';

export const Slug: React.FC = () => {
    const { soId } = useParams<string>();
    const [isOpenHistory, setIsOpenHistory] = useState<boolean>(false);

    const slug = [
        {
            name: i18n.t('menu.saleOrder'),
            slug: rootPathsNew.saleOrders,
        },
        {
            name: i18n.t('Chi tiết đơn hàng bán'),
            slug: '',
        },
    ];

    return (
        <Fragment>
            <SlugHeader
                slugList={slug}
                showBackBtn
                navigateUrl={rootPathsNew.saleOrders}
                addHistory={<HistoryBtn onClick={() => setIsOpenHistory(true)} />}
            />
            <History
                tableName="SaleOrder"
                title={i18n.t('Lịch sử thao tác')}
                id={soId ?? ''}
                isOpenHistory={isOpenHistory}
                setIsOpenHistory={setIsOpenHistory}
            />
        </Fragment>
    );
};
