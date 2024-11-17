import { Fragment, useState } from 'react';

import { History } from '@fragments/History';
import { HistoryBtn } from '@src/new/components/customs/Buttons/HistoryBtn';
import { SlugHeader } from '@src/new/components/customs/Slug';
import i18n from '@src/i18n';
import { rootPathsNew } from '@src/routers/newRoute';
import { useParams } from 'react-router-dom';

export const Slug: React.FC = () => {
    const { recId } = useParams<string>();
    const [isOpenHistory, setIsOpenHistory] = useState<boolean>(false);

    const slug = [
        {
            name: i18n.t('Chứng từ thanh toán'),
            slug: '',
        },
        {
            name: i18n.t('Phiếu thu'),
            slug: rootPathsNew.receivableList,
        },
        {
            name: i18n.t('Chi tiết phiếu thu'),
            slug: '',
        },
    ];

    return (
        <Fragment>
            <SlugHeader
                slugList={slug}
                showBackBtn
                navigateUrl={rootPathsNew.receivableList}
                addHistory={<HistoryBtn onClick={() => setIsOpenHistory(true)} />}
            />
            <History
                tableName="ReceivableVoucher"
                title={i18n.t('Lịch sử thao tác')}
                id={recId ?? ''}
                isOpenHistory={isOpenHistory}
                setIsOpenHistory={setIsOpenHistory}
            />
        </Fragment>
    );
};
