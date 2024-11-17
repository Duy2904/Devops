import { Col } from 'antd';
import { FieldTimeOutlined } from '@ant-design/icons';
import { StaticTag } from '@components/customizes/StaticTag';
import { TourVisaStatus } from '@sdk/tour-operations';
import i18n from '@src/i18n';
import { setDocumentVisaColor } from '@utils/colorStatus';

interface StatusHeader {
    documentReceiptStatus?: TourVisaStatus;
    setIsOpenHistory: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StatusHeader: React.FC<StatusHeader> = props => {
    return (
        <Col className="flex justify-start items-center gap-2 my-3 mt-1">
            <StaticTag
                type={i18n.t(`tourVisa.status.${props.documentReceiptStatus}`)}
                showLabel
                color={`${setDocumentVisaColor(props.documentReceiptStatus ?? '')}`}
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
