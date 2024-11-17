import { Dispatch, SetStateAction, useMemo } from 'react';

import { Col } from 'antd';
import CountdownTimer from '@components/customizes/CountDown';
import Format from '@utils/format';
import { StatusHeader } from './StatusHeader';
import { TitleHeader } from '@components/ui/TitleHeader';
import { statusShowCountDown } from '@fragments/SaleOrders/features';
import { useGetSaleOrder } from '@hooks/queries/useSaleOrders';

interface HeaderProps {
    soId: string;
    setIsOpenHistory: Dispatch<SetStateAction<boolean>>;
}

export const Header: React.FC<HeaderProps> = props => {
    const { soId, setIsOpenHistory } = props;
    // Query
    const { data: saleOrder } = useGetSaleOrder(soId ?? '');

    const titleHeader = useMemo(() => (soId ? `Chỉnh sửa Đơn hàng bán` : 'Thêm mới Đơn hàng bán'), [soId]);

    return (
        <Col>
            <TitleHeader title={titleHeader} />
            {saleOrder?.status && (
                <StatusHeader saleOrderStatus={saleOrder?.status ?? ''} setIsOpenHistory={setIsOpenHistory} />
            )}
            {saleOrder?.status && statusShowCountDown.includes(saleOrder.status) && saleOrder.endCountDown && (
                <div className="mt-2">
                    <span className="text-xs text-slate-500">{`Thời gian xử lý còn lại: `}</span>
                    <CountdownTimer
                        endDate={Format.formatUTCTime(`${saleOrder.endCountDown}`)}
                        className="text-xs text-red-500 font-semibold"
                    />
                </div>
            )}
        </Col>
    );
};
