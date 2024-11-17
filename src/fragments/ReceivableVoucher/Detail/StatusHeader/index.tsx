import { Col } from 'antd';
import { FieldTimeOutlined } from '@ant-design/icons';
import { StaticTag } from '@components/customizes/StaticTag';
import { VoucherStatus } from '@sdk/tour-operations';
import i18n from '@src/i18n';
import { setVoucherColor } from '@utils/colorStatus';

interface StatusHeader {
    voucherStatus?: VoucherStatus;
    setIsOpenHistory: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StatusHeader: React.FC<StatusHeader> = props => {
    return (
        <Col className="flex justify-start items-center gap-2 mt-1">
            <StaticTag
                type={i18n.t(`voucher.status.${props.voucherStatus}`)}
                showLabel
                color={`${setVoucherColor(props.voucherStatus ?? '')}`}
            />
            <p className="text-xs text-gray-300">|</p>
            <Col
                className="flex gap-1 items-center text-[#1677ff] text-xs font-semibold cursor-pointer"
                onClick={() => props.setIsOpenHistory(true)}
            >
                <FieldTimeOutlined />
                {i18n.t('Lịch sử')}
            </Col>
        </Col>
    );
};
