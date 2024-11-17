import { tourAgentStatus, tourStatus } from '../SearchTourFeature';

import { DrawerItems } from '../DrawerItems';
import { Flex } from 'antd';
import { KeywordSearch } from '../KeywordSearch';
import { MyPermissions } from '@utils/Permissions';
import { RangeDateSearch } from '../RangeDateSearch';
import SearchBlock from '@src/new/components/common/SearchBlock';
import { StatusSearch } from '@src/new/components/customs/SearchItems/StatusSearch';
import { TourCategorySelect } from '../TourCategory';
import useHasAnyPermission from '@src/new/shared/hooks/useHasAnyPermission';
import { useTranslation } from 'react-i18next';

export const SearchTourFit = () => {
    const { t } = useTranslation();
    const isFitManagerSearch = useHasAnyPermission([MyPermissions.TourFitView]);

    return (
        <SearchBlock>
            <Flex justify="space-between" align="center" gap={12} className="w-full">
                <KeywordSearch className="w-72 rounded-lg" placeholder={t('Nhập mã, tên tour')} />
                <Flex gap={12} justify="flex-end" align="center">
                    <RangeDateSearch />
                    <StatusSearch
                        className="w-52"
                        listStatus={isFitManagerSearch ? tourStatus : tourAgentStatus}
                        placeholder={t('Trạng thái')}
                    />
                    <TourCategorySelect className="w-52" placeholder={t('Thị trường')} />
                    <DrawerItems />
                </Flex>
            </Flex>
        </SearchBlock>
    );
};
