import { Flex, Skeleton } from 'antd';

export const SkeletonLoading: React.FC = () => {
    return (
        <Flex vertical gap={20}>
            <Skeleton className="shadow rounded-lg p-5" active />
            <Skeleton className="shadow rounded-lg p-5" active />
            <Skeleton className="shadow rounded-lg p-5" active />
            <Skeleton className="shadow rounded-lg p-5" active />
        </Flex>
    );
};
