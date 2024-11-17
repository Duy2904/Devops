import { Col, Flex } from 'antd';

import { OrderStatus, TourScheduleStatus, VoucherStatus } from '@sdk/tour-operations';
import { TagStatus } from '@src/new/components/ui/Tag/TagStatus';
import { PageName } from '@src/types/TypeEnum';

import { HeaderDetail } from '../HeaderDetail';

export const TagStatusGuideline: React.FC = () => {
    return (
        <Col className="pl-5">
            <HeaderDetail
                content={
                    <Col>
                        <p>- Use in folder src\new\components\ui\Tag\TagStatus.tsx </p>
                        <p>- 2 type: Page and customize </p>
                        <p>
                            + 1st type: Page from PageName (enum) and status from (TourScheduleStatus, OrderStatus,
                            VoucherStatus){' '}
                        </p>
                        <p>
                            Ex:{' '}
                            <code>{'<TagStatus text="Đã xác nhận" page={PageName.Tour} status={item.status} />'}</code>
                        </p>
                        <p>+ 2nd type: customize with bgColor and textColor </p>
                        <p>
                            Ex: <code>{`<TagStatus text="Đang mở bán" bgColor="bg-state-success" />`}</code>
                        </p>
                    </Col>
                }
            />
            <Col className=" lg:h-[calc(100vh_-_150px)] overflow-y-auto pb-20 pt-10">
                <Flex gap={8}>
                    <TagStatus text="Nháp" page={PageName.Tour} status={TourScheduleStatus.New} />
                    <TagStatus text="Đã xác nhận" page={PageName.SaleOrder} status={OrderStatus.Confirmed} />
                    <TagStatus text="Bị từ chối" page={PageName.Voucher} status={VoucherStatus.Rejected} />
                    <TagStatus
                        text="Customize"
                        bgColor="bg-[#FF4D4F]/[.1]"
                        textColor="text-[#FF4D4F]"
                        className="uppercase font-medium"
                    />
                </Flex>
            </Col>
        </Col>
    );
};
