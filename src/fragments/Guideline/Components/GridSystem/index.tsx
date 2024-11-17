import { Col } from 'antd';
import { HeaderDetail } from '../HeaderDetail';

export const GridSystemGuideline: React.FC = () => {
    return (
        <Col className="pl-5">
            <HeaderDetail
                content={
                    <Col>
                        <p>- Grid using same as Grid tag of AntDesign</p>
                    </Col>
                }
            />
        </Col>
    );
};
