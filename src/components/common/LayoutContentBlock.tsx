import { Col } from 'antd';

interface LayoutContentBlockProps {
    children: JSX.Element | null;
}

const LayoutContentBlock: React.FC<LayoutContentBlockProps> = ({ children }) => {
    return <Col className="mb-4">{children}</Col>;
};

export default LayoutContentBlock;
