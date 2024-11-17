import { Col } from 'antd';

import { IconJpg } from '@src/new/components/common/svg/IconJpg';
import { IconPdf } from '@src/new/components/common/svg/IconPdf';
import { IconPng } from '@src/new/components/common/svg/IconPng';
import { IconWord } from '@src/new/components/common/svg/IconWord';
import { Color } from '@src/new/components/ui/Color/CustomColor';

import { HeaderDetail } from '../HeaderDetail';

export const IconSvgGuideline: React.FC = () => {
    return (
        <Col className="pl-5">
            <HeaderDetail
                content={
                    <Col>
                        <p>- Use in folder src\new\components\common\svg </p>
                        <p>{'<Icon... />'}</p>
                        <p>Optional props: fill , fillOpacity, width, height</p>
                    </Col>
                }
            />
            <Col className=" lg:h-[calc(100vh_-_150px)] overflow-y-auto pb-20 pt-10">
                <div className="grid grid-cols-10 gap-2">
                    <Col>
                        <IconPdf fill={Color.color_F5222D} width={24} height={24} />
                        <p className="text-xs">{'<IconPdf />'}</p>
                    </Col>
                    <Col>
                        <IconWord fill={Color.color_0958D9} width={24} height={24} />
                        <p className="text-xs">{'<IconWord />'}</p>
                    </Col>
                    <Col>
                        <IconJpg fill={Color.color_FA8C16} width={24} height={24} />
                        <p className="text-xs">{'<IconJpg />'}</p>
                    </Col>
                    <Col>
                        <IconPng fill={Color.color_03C684} width={24} height={24} />
                        <p className="text-xs">{'<IconPng />'}</p>
                    </Col>
                </div>
            </Col>
        </Col>
    );
};
