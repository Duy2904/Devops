import { Col, Spin, SpinProps } from 'antd';

interface LoadingProps {
    size?: SpinProps['size'];
}

export const Loading = (_props: LoadingProps) => {
    return (
        <Col className="flex justify-center items-center h-full">
            <Spin size={_props?.size ?? 'large'} />
        </Col>
    );
};
