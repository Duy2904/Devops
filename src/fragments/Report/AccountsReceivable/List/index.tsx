import { Col, Tabs, TabsProps } from 'antd';

import { HeaderAccountsReceivable } from './Header';
import { SearchRevenueTourFit } from './Search';
import { TableDetail } from './components/TableDetail';
import { TableSummary } from './components/TableSummary';
import i18n from '@src/i18n';

export const AccountsReceivableReport: React.FC = () => {
    const itemTab: TabsProps['items'] = [
        {
            forceRender: true,
            label: i18n.t('Tổng hợp'),
            key: 'summary',
            children: <TableSummary />,
        },
        {
            forceRender: true,
            label: i18n.t('Chi tiết'),
            key: 'detail',
            children: <TableDetail />,
        },
    ];

    return (
        <Col>
            <HeaderAccountsReceivable />
            <Col className="h-[calc(100vh_-_143px)] bg-white pt-0 overflow-auto">
                <SearchRevenueTourFit />
                <Tabs className="h-[calc(100%_-_80px)] overflow-auto" type="card" items={itemTab} />
            </Col>
        </Col>
    );
};
