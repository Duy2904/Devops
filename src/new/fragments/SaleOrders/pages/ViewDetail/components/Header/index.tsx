import { Col, Flex } from 'antd';
import { useTranslation } from 'react-i18next';

import CountdownTimer from '@components/customizes/CountDown';
import { SaleOrderDto } from '@sdk/tour-operations';
import { HeadContent } from '@src/new/components/customs/HeadContent';
import { TitleHeader } from '@src/new/components/customs/TitleHeader';
import { TagStatus } from '@src/new/components/ui/Tag/TagStatus';
import Format from '@src/new/shared/utils/format';
import { PageName } from '@src/types/TypeEnum';

import { statusShowCountDown } from '../../../SaleOrderFormDetail/features';
import { ButtonActionList } from './ButtonActionList';
import { Slug } from './Slug';

interface HeaderProps {
    data?: SaleOrderDto;
}

export const Header: React.FC<HeaderProps> = ({ data }) => {
    const { t } = useTranslation();

    return (
        <Col>
            <HeadContent
                slugContent={<Slug />}
                titleContent={<TitleHeader title={`ĐƠN HÀNG BÁN`} />}
                buttonActionList={<ButtonActionList data={data} />}
            />
            <Flex className="mb-5" align="center" gap={20}>
                <Flex align="center" gap={6}>
                    <p className="text-sm">{t('Trạng thái')}</p>
                    <TagStatus
                        text={t(`OrderStatus.${data?.status}`)}
                        page={PageName.SaleOrder}
                        status={`${data?.status}`}
                    />
                </Flex>
                {data?.status && statusShowCountDown.includes(data?.status) && data?.endCountDown && (
                    <Flex align="center" gap={6}>
                        <p className="text-sm">{t('Thời gian xử lý còn lại')}</p>
                        <CountdownTimer
                            endDate={Format.formatUTCTime(`${data?.endCountDown}`)}
                            className="text-sm text-red-500 font-bold"
                        />
                    </Flex>
                )}
            </Flex>
        </Col>
    );
};
