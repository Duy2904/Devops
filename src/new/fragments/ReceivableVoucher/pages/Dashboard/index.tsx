import { Col } from 'antd';
import { HeaderRC } from './components/Header';
import { RCSearch } from './components/Search';
import { TableDataRC } from './components/TableData';

export const ReceivableVoucherIndex: React.FC = () => {
    return (
        <Col>
            <HeaderRC />
            <Col className="h-[calc(100vh_-_143px)] bg-white pt-0 overflow-auto">
                <RCSearch />
                <TableDataRC />
            </Col>
        </Col>
    );
};
