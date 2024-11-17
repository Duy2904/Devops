import { Col, Flex } from 'antd';
import { t } from 'i18next';
import isEmpty from 'lodash/isEmpty';
import { useParams } from 'react-router-dom';

import CountdownTimer from '@components/customizes/CountDown';
import { SaleOrderDto } from '@sdk/tour-operations';
import { HeadContent } from '@src/new/components/customs/HeadContent';
import { TitleHeader } from '@src/new/components/customs/TitleHeader';
import { TagStatus } from '@src/new/components/ui/Tag/TagStatus';
import Format from '@src/new/shared/utils/format';
import { PageName } from '@src/types/TypeEnum';

import { statusShowCountDown } from '../../features';
import { ButtonAction } from './ButtonAction';
import { Slug } from './Slug';

interface HeaderProps {
    dataSO?: SaleOrderDto;
    isEnableEdit: boolean;
    handleSubmit: () => void;
}

export const Header: React.FC<HeaderProps> = props => {
    const { dataSO, isEnableEdit, handleSubmit } = props;
    const { soId } = useParams<string>();

    return (
        <Col>
            <HeadContent
                slugContent={<Slug isEnableEdit={isEnableEdit} />}
                titleContent={<TitleHeader title={soId ? `Cập nhật đơn hàng bán` : 'Thêm mới đơn hàng bán'} />}
                buttonActionList={
                    <ButtonAction handleSubmit={handleSubmit} isEnableEdit={isEnableEdit} dataSO={dataSO} />
                }
            />
            {!isEmpty(dataSO?.id) && (
                <Flex className="mb-5" align="center" gap={20}>
                    <Flex align="center" gap={6}>
                        <p className="text-sm">{t('Trạng thái')}</p>
                        <TagStatus
                            text={t(`OrderStatus.${dataSO?.status}`)}
                            page={PageName.SaleOrder}
                            status={`${dataSO?.status}`}
                        />
                    </Flex>
                    {dataSO?.status && statusShowCountDown.includes(dataSO?.status) && dataSO?.endCountDown && (
                        <Flex align="center" gap={6}>
                            <p className="text-sm">{t('Thời gian xử lý còn lại')}</p>
                            <CountdownTimer
                                endDate={Format.formatUTCTime(`${dataSO?.endCountDown}`)}
                                className="text-sm text-red-500 font-bold"
                            />
                        </Flex>
                    )}
                </Flex>
            )}
        </Col>
    );
};
