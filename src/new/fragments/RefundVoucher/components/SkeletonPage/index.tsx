import { Col, Flex, Skeleton } from 'antd';

export const SkeletonPage = () => {
    return (
        <Flex vertical gap={16}>
            <Flex align="center" justify="space-between" gap={16}>
                <Flex align="center" gap={16}>
                    <Skeleton.Button style={{ width: 60, height: 24 }} active />
                    <Skeleton.Button style={{ width: 400, height: 24 }} active />
                </Flex>
                <Skeleton.Button style={{ width: 200, height: 24 }} active />
            </Flex>
            <Flex align="center" justify="space-between">
                <Flex align="center" gap={16}>
                    <Skeleton.Button style={{ width: 300, height: 32 }} active />
                </Flex>
                <Skeleton.Button style={{ width: 400, height: 32 }} active />
            </Flex>
            <Skeleton.Button style={{ width: 180, height: 20 }} active />
            <Skeleton.Button style={{ width: '100%', height: 100 }} active />
            <Col className="grid grid-cols-3 gap-5">
                <Flex vertical className="col-span-2" gap={20}>
                    <Skeleton.Button style={{ width: '100%', height: 'calc(100vh - 345px)' }} active />
                </Flex>
                <Flex vertical className="col-span-1" gap={20}>
                    <Skeleton.Button style={{ width: '100%', height: 'calc(100vh - 345px)' }} active />
                </Flex>
            </Col>
        </Flex>
    );
};
