import { Col } from 'antd';

interface HeadTitleBlockProps {
    children: JSX.Element | null;
}

const HeadTitleBlock: React.FC<HeadTitleBlockProps> = ({ children }) => {
    return <Col className="mb-4">{children}</Col>;
};

export default HeadTitleBlock;
