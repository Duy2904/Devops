import { Col, Flex } from 'antd';

import { Color } from '@src/new/components/ui/Color/CustomColor';
import { HeaderDetail } from '../HeaderDetail';
import { IconCoupon } from '@src/new/components/common/SvgIcon';
import TagCoupon from '@src/new/components/ui/Tag/TagCoupon';
import { TagTourID } from '@src/new/components/ui/Tag/TagTourID';
import { TagTourName } from '@src/new/components/ui/Tag/TagTourName';

export const TagsLabelGuideline: React.FC = () => {
    return (
        <Col className="pl-5">
            <HeaderDetail
                content={
                    <Col>
                        <p>- Use in folder src\new\components\ui\Tag </p>
                    </Col>
                }
            />
            <Col className=" lg:h-[calc(100vh_-_150px)] overflow-y-auto pb-20 pt-10">
                <Flex gap={8}>
                    <div>
                        <TagTourID text="FCN22.01.120624" />
                    </div>
                    <div>
                        <TagTourName text="Thành Đô – Cửu Trại Câu – Vườn gấu trúc – Lạc Sơn" className="max-w-80" />
                    </div>
                    <div>
                        <TagCoupon
                            name="EBLM.33"
                            icon={<IconCoupon className={`${Color.text_1B3280} w-[10px] h-[10px]`} />}
                            bgColor={Color.bg_1B3280}
                            borderColor={Color.border_1B3280}
                        />
                    </div>
                </Flex>
            </Col>
        </Col>
    );
};
