import { Col } from 'antd';
import { HeaderRF } from './components/Header';
import { RFSearch } from './components/Search';
import { TableDataRF } from './components/TableData';

export const RefundVoucherIndex: React.FC = () => {
    return (
        <Col>
            <HeaderRF />
            <Col className="h-[calc(100vh_-_143px)] bg-white pt-0 overflow-auto">
                <RFSearch />
                <TableDataRF />
            </Col>
        </Col>
    );
};
