import { Col, Flex } from 'antd';

import { HeadContent } from '@src/new/components/customs/HeadContent';
import { PageName } from '@src/types/TypeEnum';
import { ReceivableVoucherDto } from '@sdk/tour-operations';
import { Slug } from './Slug';
import { TagStatus } from '@src/new/components/ui/Tag/TagStatus';
import { TitleHeader } from '@src/new/components/customs/TitleHeader';
import { useTranslation } from 'react-i18next';
import { ButtonActionList } from './ButtonActionList';

interface HeaderProps {
    data?: ReceivableVoucherDto;
}

export const Header: React.FC<HeaderProps> = ({ data }) => {
    const { t } = useTranslation();

    return (
        <Col>
            <HeadContent slugContent={<Slug />} titleContent={<TitleHeader title={`THÔNG TIN PHIẾU THU`} />} buttonActionList={<ButtonActionList data={data} />} />
            <Flex className="mb-5" align="center" gap={20}>
                <Flex align="center" gap={6}>
                    <p className="text-sm">{t('Trạng thái')}</p>
                    <TagStatus
                        text={t(`voucher.status.${data?.status}`)}
                        page={PageName.Voucher}
                        status={`${data?.status}`}
                    />
                </Flex>
            </Flex>
        </Col>
    );
};
