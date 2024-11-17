import { Col } from 'antd';

import Can from '@components/common/Can';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';
import { MyPermissions } from '@utils/Permissions/index.ts';

import { HeaderAutoIncrementCode } from './Header';
import { ReceivableVoucherCode } from './ReceivableVoucherCode';
import { SaleOrderCode } from './SaleOrderCode';

export const AutoIncrementCode: React.FC = () => {
    return (
        <Col className="p-4">
            <HeaderAutoIncrementCode name={i18n.t('Mã tăng tự động')} slugUrl={rootPaths.incrementCode} />
            <Col className="h-[calc(100vh_-_143px)] overflow-auto">
                <Can
                    permissions={[
                        MyPermissions.SaleOrderCreate,
                        MyPermissions.AgencySaleOrderCreate,
                        MyPermissions.SaleOrderUpdate,
                        MyPermissions.AgencySaleOrderUpdate,
                    ]}
                >
                    <SaleOrderCode />
                </Can>
                <Can permissions={[MyPermissions.ReceivableVoucherCreate, MyPermissions.ReceivableVoucherUpdate]}>
                    <ReceivableVoucherCode />
                </Can>
            </Col>
        </Col>
    );
};
