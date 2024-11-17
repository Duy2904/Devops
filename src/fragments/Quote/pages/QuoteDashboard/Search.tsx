import { AppConfig } from '@utils/config';
import { BaseRangeDateSearch } from '@components/customizes/SearchBox/BaseRangeDateSearch';
import Can from '@components/common/Can';
import { InputSearch } from '@components/customizes/SearchBox/InputSearch';
import { PermissionType } from '@src/types/TypeEnum';
import SearchBlock from '@components/common/SearchBlock';
import { SearchTourGit } from './components/TourGit/SearchTourGit';
import { StatusSearch } from '@components/customizes/SearchBox/StatusSearch';
import { TimeRangePickerProps } from 'antd';
import { TourFitSearchQuote } from './components/TourFit/SearchTourFit';
import { TourType } from '@src/types/TypeEnum';
import dayjs from 'dayjs';
import { getPermission } from '@fragments/Quote/features/getPermission';
import { getQuoteStatus } from '@fragments/Quote/features';
import i18n from '@src/i18n';
import { useQuoteStore } from '@fragments/Quote/store/quoteStore';

const rangePresets: TimeRangePickerProps['presets'] = [
    { label: 'Hôm nay', value: [dayjs(), dayjs()] },
    { label: 'Hôm qua', value: [dayjs().subtract(1, 'day'), dayjs()] },
    { label: '07 ngày trước', value: [dayjs().subtract(6, 'day'), dayjs()] },
    { label: '30 ngày trước', value: [dayjs().subtract(1, 'month'), dayjs()] },
    { label: '03 tháng trước', value: [dayjs().subtract(3, 'months'), dayjs()] },
    { label: '06 tháng trước', value: [dayjs().subtract(6, 'months'), dayjs()] },
];

export const SearchQuoteList: React.FC = () => {
    // Store
    const { tourType } = useQuoteStore(state => state);

    const quoteStatus = getQuoteStatus();
    return (
        <SearchBlock>
            <Can permissions={getPermission(tourType, [PermissionType.View])}>
                <div className="w-full grid grid-cols-12 gap-4">
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
                        listStatus={quoteStatus}
                    />
                    {tourType === TourType.GIT ? (
                        <SearchTourGit
                            className="w-full col-span-6 md:col-span-2"
                            title="Tour"
                            placeholder={i18n.t('Nhập mã, tên tour')}
                        />
                    ) : (
                        <TourFitSearchQuote
                            className="w-full col-span-6 md:col-span-2"
                            title="Tour"
                            placeholder={i18n.t('Nhập mã, tên tour')}
                        />
                    )}
                    <InputSearch
                        className="w-full col-span-6 md:col-span-2"
                        title="Tìm kiếm"
                        placeholderContent={i18n.t('Nhập Mã/Diễn giải')}
                        showTitle
                    />
                </div>
            </Can>
        </SearchBlock>
    );
};
