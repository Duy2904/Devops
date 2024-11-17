import { Flex } from 'antd';
import { KeywordSearch } from './KeywordSearch';
import { RangeDateSearch } from './RangeDateSearch';
import SearchBlock from '@components/common/SearchBlock';
import { StatusSearch } from '@src/new/components/customs/SearchItems/StatusSearch';
import { getVoucherStatus } from '@src/new/fragments/RefundVoucher/hooks/useRefundList';
import { useTranslation } from 'react-i18next';

export const RFSearch: React.FC = () => {
    const { t } = useTranslation();
    const voucherStatus = getVoucherStatus();

    return (
        <SearchBlock>
            <Flex justify="space-between" align="center" gap={12} className="w-full">
                <KeywordSearch className="w-72 rounded-lg" placeholder={t('Nhập từ khoá')} />
                <Flex gap={12} justify="flex-end" align="center">
                    <RangeDateSearch />
                    <StatusSearch className="w-60" listStatus={voucherStatus} placeholder={t('Trạng thái')} />
                </Flex>
            </Flex>
        </SearchBlock>
    );
};
