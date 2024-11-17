import { HeaderRefundComponent } from './Header';
import { RefundVoucherSearch } from './Search';
import { TableRefundVoucher } from './TableData';

export const IndexRefundVoucher: React.FC = () => {
    return (
        <div>
            <HeaderRefundComponent />
            <div className="h-[calc(100vh_-_143px)] bg-white pt-0 overflow-auto">
                <RefundVoucherSearch />
                <TableRefundVoucher />
            </div>
        </div>
    );
};
