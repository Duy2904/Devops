import { Col, Flex } from 'antd';

import { HeaderDetail } from '../HeaderDetail';
import { colorObj } from './feature';

export const ColorsGuideline: React.FC = () => {
    return (
        <Col className="pl-5">
            <HeaderDetail
                content={
                    <Col>
                        <p>- Add to className tag: bg-value/text-value/shadow-value</p>
                    </Col>
                }
            />
            <Col className=" lg:h-[calc(100vh_-_150px)] overflow-y-auto pb-20">
                {colorObj.map(item => {
                    return (
                        <Col className="grid grid-cols-6 gap-x-10 my-8" key={item.id}>
                            <h6 className="col-span-1 text-greyColor-third font-normal mt-10">{item.name}</h6>
                            <Flex className="col-span-5" wrap gap={30}>
                                {item.items.map(data => {
                                    return (
                                        <Flex vertical align="center" key={data.id}>
                                            <Col className={`w-28 h-28 ${data.color} shadow rounded-xl`}></Col>
                                            <small className="text-greyColor-third mt-2">{data.name}</small>
                                        </Flex>
                                    );
                                })}
                            </Flex>
                        </Col>
                    );
                })}
            </Col>
        </Col>
    );
};
