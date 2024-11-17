import { Col } from 'antd';
import { FieldTimeOutlined } from '@ant-design/icons';
import { OrderStatus } from '@sdk/tour-operations';
import { StaticTag } from '@components/customizes/StaticTag';
import i18n from '@src/i18n';
import { setSaleOrderColor } from '@utils/colorStatus';

interface StatusHeader {
    saleOrderStatus: OrderStatus;
    setIsOpenHistory: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StatusHeader: React.FC<StatusHeader> = props => {
    return (
        <Col className="flex items-center gap-2">
            <StaticTag
                type={i18n.t(`OrderStatus.${props.saleOrderStatus}`)}
                showLabel
                color={`${setSaleOrderColor(props.saleOrderStatus)}`}
            />
            <>
                <p className="text-xs text-gray-300">|</p>
                <Col
                    className="flex gap-1 items-center text-[#1677ff] text-xs font-semibold cursor-pointer"
                    onClick={() => props.setIsOpenHistory(true)}
                >
                    <FieldTimeOutlined />
                    {i18n.t('Lịch sử')}
                </Col>
            </>
        </Col>
    );
};
