import { Flex } from 'antd';
import { KeywordSearch } from './KeywordSearch';
import { RangeDateSearch } from './RangeDateSearch';
import SearchBlock from '@components/common/SearchBlock';
import { StatusSearch } from '@src/new/components/customs/SearchItems/StatusSearch';
import { TourFitSearchSO } from './TourFitAutoComplete';
import { getOrderStatus } from '@hooks/queries/useOrderStatus';
import { t } from 'i18next';

export const OrderSearch: React.FC = () => {
    const orderStatus = getOrderStatus();
    return (
        <SearchBlock>
            <Flex justify="space-between" align="center" gap={12} className="w-full">
                <KeywordSearch className="w-72 rounded-lg" placeholder={t('Nhập từ khoá')} />
                <Flex gap={12} justify="flex-end" align="center">
                    <RangeDateSearch />
                    <StatusSearch className="w-60" listStatus={orderStatus} placeholder={t('Trạng thái')} />
                    <TourFitSearchSO className="w-60" placeholder="Nhập mã, tên tour" />
                </Flex>
            </Flex>
        </SearchBlock>
    );
};
