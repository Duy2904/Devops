import { Col, Flex, Skeleton } from 'antd';

const TourDetailSkeleton = () => {
    return (
        <Flex vertical gap={30}>
            <Flex align="center" justify="space-between" gap={16}>
                <Flex align="center" gap={16}>
                    <Skeleton.Button style={{ width: 60, height: 24 }} active />
                    <Skeleton.Button style={{ width: 400, height: 24 }} active />
                </Flex>
                <Skeleton.Button style={{ width: 200, height: 24 }} active />
            </Flex>

            <Flex gap={24}>
                <Col className="w-full flex-1 overflow-hidden">
                    <Flex align="center" justify="space-between">
                        <Skeleton.Button style={{ width: 60, height: 24 }} active />
                        <Skeleton.Button style={{ width: 250, height: 24 }} active />
                    </Flex>
                    <Flex align="center" justify="space-between" className="mt-2">
                        <Skeleton.Button style={{ width: 320, height: 24 }} active />
                        <Skeleton.Button style={{ width: 100, height: 24 }} active />
                    </Flex>
                    <Skeleton.Button className="my-2 !w-full" style={{ height: 148 }} active />
                    <Skeleton.Button className="!w-full !h-[calc(100vh_-_396px)]" active />
                </Col>
                <Col className="w-[400px]">
                    <Flex className="w-full" align="center" justify="space-between" gap={24}>
                        <Skeleton.Button className="!w-40" style={{ height: 24 }} active />
                        <Skeleton.Button className="!w-40" style={{ height: 24 }} active />
                    </Flex>
                    <Skeleton.Button className="!w-full !h-[calc(100vh_-_194px)] mt-1" active />
                </Col>
            </Flex>
        </Flex>
    );
};

export default TourDetailSkeleton;
