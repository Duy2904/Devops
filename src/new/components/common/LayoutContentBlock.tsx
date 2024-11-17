import { Col } from 'antd';

interface LayoutContentBlockProps {
    children: JSX.Element | null;
    className?: string;
}

const LayoutContentBlock: React.FC<LayoutContentBlockProps> = ({ className, children }) => {
    return <Col className={`overflow-auto ${className}`}>{children}</Col>;
};

export default LayoutContentBlock;
