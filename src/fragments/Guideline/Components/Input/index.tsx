import { Col, Flex } from 'antd';

import CouponInput from '@src/new/components/ui/Input/CouponInput';

import { HeaderDetail } from '../HeaderDetail';

export const InputGuideline: React.FC = () => {
    return (
        <Col className="pl-5">
            <HeaderDetail
                content={
                    <Col>
                        <p>- Use in folder src\new\components\ui\Input</p>
                    </Col>
                }
            />
            <Col className=" lg:h-[calc(100vh_-_150px)] overflow-y-auto pb-20 pt-10">
                <Flex vertical gap={32}>
                    <Flex vertical gap={16} className="max-w-[500px]">
                        <p className="font-bold">{`<CouponInput />`}</p>
                        <CouponInput />
                    </Flex>
                </Flex>
            </Col>
        </Col>
    );
};
