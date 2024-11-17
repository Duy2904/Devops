import { DocumentReceiptSearch } from './Search';
import { HeaderDocumentReceipt } from './Header';
import { TableDocumentReceiptVisa } from './TableData';

export const IndexDocumentReceiptVisa: React.FC = () => {
    return (
        <div>
            <HeaderDocumentReceipt />
            <div className="h-[calc(100vh_-_143px)] bg-white pt-0 overflow-auto">
                <DocumentReceiptSearch />
                <TableDocumentReceiptVisa />
            </div>
        </div>
    );
};
