import { Col, Flex } from 'antd';

import { HeaderDetail } from '../HeaderDetail';

export const SpacingGuideline: React.FC = () => {
    return (
        <Col className="pl-5">
            <HeaderDetail
                content={
                    <Col>
                        <p>- Spacing using same as Tailwind CSS: m-, mx-, my-, p-, px-, py-,... </p>
                    </Col>
                }
            />
            <Col className=" lg:h-[calc(100vh_-_150px)] overflow-y-auto pb-20 pt-10">
                <Flex align="end" justify="space-around">
                    <Flex vertical align="center" gap={8}>
                        <Col className=" w-2 h-2 bg-greyColor-third"></Col>
                        <p>*-2 (8px)</p>
                    </Flex>
                    <Flex vertical align="center" gap={8}>
                        <Col className=" w-4 h-4 bg-greyColor-third"></Col>
                        <p>*-4 (16px)</p>
                    </Flex>
                    <Flex vertical align="center" gap={8}>
                        <Col className=" w-8 h-8 bg-greyColor-third"></Col>
                        <p>*-8 (32px)</p>
                    </Flex>
                    <Flex vertical align="center" gap={8}>
                        <Col className=" w-10 h-10 bg-greyColor-third"></Col>
                        <p>*-10 (40px)</p>
                    </Flex>
                    <Flex vertical align="center" gap={8}>
                        <Col className=" w-14 h-14 bg-greyColor-third"></Col>
                        <p>*-14 (56px)</p>
                    </Flex>
                    <Flex vertical align="center" gap={8}>
                        <Col className=" w-16 h-16 bg-greyColor-third"></Col>
                        <p>*-16 (64px)</p>
                    </Flex>
                    <Flex vertical align="center" gap={8}>
                        <Col className=" w-20 h-20 bg-greyColor-third"></Col>
                        <p>*-20 (80px)</p>
                    </Flex>
                    <Flex vertical align="center" gap={8}>
                        <Col className=" w-24 h-24 bg-greyColor-third"></Col>
                        <p>*-24 (96px)</p>
                    </Flex>
                    <Flex vertical align="center" gap={8}>
                        <Col className=" w-28 h-28 bg-greyColor-third"></Col>
                        <p>*-28 (112px)</p>
                    </Flex>
                </Flex>
            </Col>
        </Col>
    );
};
