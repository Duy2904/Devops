import { Col, TimeRangePickerProps } from 'antd';

import { AppConfig } from '@utils/config';
import { BaseRangeDateSearch } from '@components/customizes/SearchBox/BaseRangeDateSearch';
import { InputSearch } from '@components/customizes/SearchBox/InputSearch';
import SearchBlock from '@components/common/SearchBlock';
import { StatusSearch } from '@components/customizes/SearchBox/StatusSearch';
import dayjs from 'dayjs';
import { getVoucherStatus } from '../hook/useRefundVoucher';

const rangePresets: TimeRangePickerProps['presets'] = [
    { label: 'Hôm nay', value: [dayjs(), dayjs()] },
    { label: 'Hôm qua', value: [dayjs().subtract(1, 'day'), dayjs()] },
    { label: '07 ngày trước', value: [dayjs().subtract(6, 'day'), dayjs()] },
    { label: 'Trong tháng', value: [dayjs().startOf('month'), dayjs().endOf('month')] },
    { label: '03 tháng trước', value: [dayjs().subtract(3, 'months'), dayjs()] },
    { label: '06 tháng trước', value: [dayjs().subtract(6, 'months'), dayjs()] },
];

export const RefundVoucherSearch: React.FC = () => {
    const voucherStatus = getVoucherStatus();
    return (
        <SearchBlock>
            <Col className="w-full grid grid-cols-12 gap-4">
                <BaseRangeDateSearch
                    title="Thời gian"
                    showTitle
                    rangePresets={rangePresets}
                    className="w-full col-span-12 md:col-span-2"
                    formatDate={AppConfig.DateFormat}
                    defaultValue={[dayjs().subtract(1, 'month'), dayjs()]}
                />
                <StatusSearch
                    className="w-full col-span-6 md:col-span-2"
                    title="Trạng thái"
                    placeholderContent="Chọn trạng thái"
                    showTitle
                    listStatus={voucherStatus}
                />
                <InputSearch
                    className="w-full col-span-6 md:col-span-2"
                    title="Tìm kiếm"
                    placeholderContent="Nhập từ khoá"
                    showTitle
                />
            </Col>
        </SearchBlock>
    );
};
