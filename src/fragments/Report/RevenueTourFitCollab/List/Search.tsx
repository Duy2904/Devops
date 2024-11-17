import { AppConfig } from '@utils/config';
import { BaseRangeDateSearch } from '@components/customizes/SearchBox/BaseRangeDateSearch';
import Can from '@components/common/Can';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { ProviderMultiSelectCollab } from './components/ProviderSearch';
import SearchBlock from '@components/common/SearchBlock';
import { SendCustomerMultiSelectCollab } from './components/SendCustomerSearch';
import { TimeRangePickerProps } from 'antd';
import { TourFitSearchRevenueCollab } from './components/TourSearch';
import dayjs from 'dayjs';
import i18n from '@src/i18n';

const rangePresets: TimeRangePickerProps['presets'] = [
    { label: 'Hôm nay', value: [dayjs(), dayjs()] },
    { label: 'Hôm qua', value: [dayjs().subtract(1, 'day'), dayjs()] },
    { label: '07 ngày trước', value: [dayjs().subtract(6, 'day'), dayjs()] },
    { label: 'Trong tháng', value: [dayjs().startOf('month'), dayjs().endOf('month')] },
    { label: '03 tháng trước', value: [dayjs().subtract(3, 'months'), dayjs()] },
    { label: '06 tháng trước', value: [dayjs().subtract(6, 'months'), dayjs()] },
];

export const SearchRevenueTourFitCollab: React.FC = () => {
    return (
        <SearchBlock>
            <Can permissions={[MyPermissions.ReceivableVoucherView]}>
                <div className="w-full grid grid-cols-12 gap-4">
                    <BaseRangeDateSearch
                        title="Thời gian"
                        showTitle
                        rangePresets={rangePresets}
                        className="w-full col-span-12 md:col-span-2"
                        formatDate={AppConfig.DateShortYearFormat}
                        defaultValue={[dayjs().subtract(3, 'months'), dayjs()]}
                    />
                    <TourFitSearchRevenueCollab
                        className="w-full col-span-6 md:col-span-2"
                        title="Tour"
                        placeholder={i18n.t('Nhập mã, tên tour')}
                    />
                    <ProviderMultiSelectCollab
                        className="w-full col-span-6 md:col-span-2"
                        placeholderContent="--Tất cả--"
                        title="Nguồn"
                        showTitle
                    />
                    <SendCustomerMultiSelectCollab
                        className="w-full col-span-6 md:col-span-2"
                        placeholderContent="--Tất cả--"
                        title="Người bán"
                        showTitle
                    />
                </div>
            </Can>
        </SearchBlock>
    );
};
