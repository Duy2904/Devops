import { DrawerItems } from './DrawerItems';
import { Flex } from 'antd';
import { KeywordSearch } from './KeywordSearch';
import { QuickSearch } from '@src/new/components/customs/SearchItems/QuickSearch';
import { RangeDateSearch } from './RangeDateSearch';
import SearchBlock from '@src/new/components/common/SearchBlock';
import { StatusSearch } from '@src/new/components/customs/SearchItems/StatusSearch';
import { TourCategorySelect } from './TourCategory';
import { TourScheduleStatus } from '@sdk/tour-operations';
import { tourAgentStatus } from './SearchTourFeature';
import { useTranslation } from 'react-i18next';

export const Search: React.FC = () => {
    const { t } = useTranslation();
    return (
        <SearchBlock>
            <Flex className="w-full relative" align="center" justify="space-between">
                <QuickSearch />
                <Flex className="absolute right-0 top-0" gap={10}>
                    <KeywordSearch className="w-72 rounded-lg" placeholder={t('Tìm tên tour, mã tour, hành trình')} />
                    <RangeDateSearch />
                    <StatusSearch
                        className="w-[180px]"
                        listStatus={tourAgentStatus}
                        placeholder={t('Trạng thái tour')}
                        defaultValue={[TourScheduleStatus.SalesOpen]}
                    />
                    <TourCategorySelect className="w-[180px]" placeholder={t('Thị trường')} />
                    <DrawerItems />
                </Flex>
            </Flex>
        </SearchBlock>
    );
};
