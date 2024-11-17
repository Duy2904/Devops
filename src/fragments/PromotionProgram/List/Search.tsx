import 'dayjs/locale/vi';

import { AppConfig } from '@utils/config';
import { BaseRangeDateSearch } from '@components/customizes/SearchBox/BaseRangeDateSearch';
import Can from '@components/common/Can';
import { InputSearch } from '@components/customizes/SearchBox/InputSearch';
import { MyPermissions } from '@utils/Permissions/index.ts';
import SearchBlock from '@components/common/SearchBlock';
import { TimeRangePickerProps } from 'antd';
import dayjs from 'dayjs';
import i18n from '@src/i18n';

export const PromotionProgramSearch: React.FC = () => {
    const rangePresets: TimeRangePickerProps['presets'] = [
        { label: 'Hôm nay', value: [dayjs(), dayjs()] },
        { label: '07 ngày tới', value: [dayjs(), dayjs().add(6, 'day')] },
        { label: 'Trong tháng', value: [dayjs().startOf('month'), dayjs().endOf('month')] },
        { label: '03 tháng tới', value: [dayjs(), dayjs().add(3, 'months')] },
        { label: '06 tháng tới', value: [dayjs(), dayjs().add(6, 'months')] },
    ];

    return (
        <SearchBlock>
            <Can permissions={[MyPermissions.DiscountView]}>
                <div className="w-full grid grid-cols-12 gap-4">
                    <BaseRangeDateSearch
                        title={i18n.t('Thời gian')}
                        showTitle
                        rangePresets={rangePresets}
                        className="w-full col-span-6 md:col-span-2"
                        formatDate={AppConfig.DateShortYearFormat}
                    />
                    <InputSearch
                        className="w-full col-span-6 md:col-span-2"
                        title={i18n.t('Tìm kiếm')}
                        placeholderContent={i18n.t('Nhập từ khoá')}
                        showTitle
                    />
                </div>
            </Can>
        </SearchBlock>
    );
};
