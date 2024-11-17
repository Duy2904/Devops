import { Col } from 'antd';

import { SaleOrderDto } from '@sdk/tour-operations';

import { LeftBlock } from './LeftBlock';
import { RightBlock } from './RightBlock';

interface CollapseBlockProps {
    data?: SaleOrderDto;
}

export const CollapseBlock: React.FC<CollapseBlockProps> = ({ data }) => {
    return (
        <Col className="grid grid-cols-3 gap-5 py-5 saleOrderCollapse">
            <Col className="col-span-2">
                <LeftBlock data={data} />
            </Col>
            <Col className="col-span-1">
                <RightBlock data={data} />
            </Col>
        </Col>
    );
};
