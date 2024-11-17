import { Col, TimeRangePickerProps } from 'antd';

import { AppConfig } from '@utils/config';
import { BaseRangeDateSearch } from '@components/customizes/SearchBox/BaseRangeDateSearch';
import { CountriesSelect } from '@components/customizes/Select/Country';
import { InputSearch } from '@components/customizes/SearchBox/InputSearch';
import SearchBlock from '@components/common/SearchBlock';
import { StatusSearch } from '@components/customizes/SearchBox/StatusSearch';
import { TourFitSearchDocumentVisa } from './TourSearch';
import dayjs from 'dayjs';
import { getTourVisaStatus } from '../hook/useDocumentReceiptVisa';
import i18n from '@src/i18n';

const rangePresets: TimeRangePickerProps['presets'] = [
    { label: 'Hôm nay', value: [dayjs(), dayjs()] },
    { label: 'Hôm qua', value: [dayjs().subtract(1, 'day'), dayjs()] },
    { label: '07 ngày trước', value: [dayjs().subtract(6, 'day'), dayjs()] },
    { label: '30 ngày trước', value: [dayjs().subtract(1, 'month'), dayjs()] },
    { label: '03 tháng trước', value: [dayjs().subtract(3, 'months'), dayjs()] },
    { label: '06 tháng trước', value: [dayjs().subtract(6, 'months'), dayjs()] },
];

export const DocumentReceiptSearch: React.FC = () => {
    const documentReceiptStatus = getTourVisaStatus();
    return (
        <SearchBlock>
            <Col className="w-full grid grid-cols-12 gap-4">
                <BaseRangeDateSearch
                    title="Thời gian"
                    showTitle
                    rangePresets={rangePresets}
                    className="w-full col-span-12 md:col-span-2"
                    formatDate={AppConfig.DateShortYearFormat}
                    defaultValue={[dayjs().subtract(1, 'month'), dayjs()]}
                />
                <StatusSearch
                    className="w-full col-span-6 md:col-span-2"
                    title="Trạng thái"
                    placeholderContent="Chọn trạng thái"
                    showTitle
                    listStatus={documentReceiptStatus}
                />
                <TourFitSearchDocumentVisa
                    className="w-full col-span-6 md:col-span-2"
                    title="Tour"
                    placeholder="Nhập mã, tên tour"
                />
                <CountriesSelect className="w-full col-span-6 md:col-span-2" title="Visa" showTitle />
                <InputSearch
                    className="w-full col-span-6 md:col-span-2"
                    title="Tìm kiếm"
                    placeholderContent={i18n.t('Nhập mã biên nhận/Diễn giải')}
                    showTitle
                />
            </Col>
        </SearchBlock>
    );
};
