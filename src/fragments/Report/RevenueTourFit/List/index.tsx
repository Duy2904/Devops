import { Col } from 'antd';
import { HeaderRevenueTourFit } from './Header';
import { SearchRevenueTourFit } from './Search';
import { TableDataRevenueTourFit } from './TableData';

export const IndexRevenueTourFit: React.FC = () => {
    return (
        <Col>
            <HeaderRevenueTourFit />
            <Col className="overflow-auto">
                <SearchRevenueTourFit />
                <TableDataRevenueTourFit />
            </Col>
        </Col>
    );
};
