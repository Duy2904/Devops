import { HeaderReceiptComponent } from './Header';
import { ReceivableVoucherSearch } from './Search';
import { TableDataVoucherReceivable } from './TableData';

export const IndexReceivableVoucher: React.FC = () => {
    return (
        <div>
            <HeaderReceiptComponent />
            <div className="h-[calc(100vh_-_143px)] bg-white pt-0 overflow-auto">
                <ReceivableVoucherSearch />
                <TableDataVoucherReceivable />
            </div>
        </div>
    );
};
