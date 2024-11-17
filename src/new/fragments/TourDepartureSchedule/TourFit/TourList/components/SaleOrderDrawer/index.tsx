import { Button, Col, Drawer, Flex, Tooltip } from 'antd';
import { Fragment, useState } from 'react';
import { TableData, TypeList } from './TableData';

import { CloseOutlined } from '@ant-design/icons';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TourInfo } from './TourInfo';
import { TourSearchFitViewDto } from '@sdk/tour-operations';
import clsx from 'clsx';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

interface SaleOrderDrawerProps {
    tooltip?: string;
    hasIcon?: boolean;
    dataTour?: TourSearchFitViewDto;
    typeList?: TypeList;
}

export const SaleOrderDrawer: React.FC<SaleOrderDrawerProps> = props => {
    const { tooltip, hasIcon, dataTour, typeList } = props;
    // hooks
    const { t } = useTranslation();

    // states
    const [openDrawer, setOpenDrawer] = useState(false);

    // handlers
    const handleOpenDrawer = () => {
        setOpenDrawer(true);
    };

    const handleCloseDrawer = () => {
        setOpenDrawer(false);
    };

    // ui
    const CustomHeader = (
        <Flex className="h-[50px] px-3 shadow relative" align="center" justify="center">
            <h1 className={`${Color.text_2A2A2A} font-bold uppercase text-[18px]`}>{t('Danh sách đơn hàng bán')}</h1>
            <Button
                className="absolute right-5"
                icon={<CloseOutlined className="h-4 w-4" />}
                onClick={handleCloseDrawer}
                type="text"
            />
        </Flex>
    );

    return (
        <Fragment>
            <Tooltip placement="right" title={tooltip}>
                <Flex
                    align="center"
                    justify="center"
                    className={clsx(
                        'cursor-pointer w-5 h-5 rounded',
                        Color.bg_DFE2E6,
                        !hasIcon && 'opacity-0 pointer-events-none',
                    )}
                    onClick={handleOpenDrawer}
                >
                    <FontAwesomeIcon icon={faCircleInfo} fontSize={10} className={clsx(Color.text_black_45)} />
                </Flex>
            </Tooltip>
            <Drawer
                title={CustomHeader}
                open={openDrawer}
                width={1200}
                height="100%"
                closable={false}
                styles={{
                    header: {
                        padding: 0,
                    },
                    body: {
                        padding: 0,
                    },
                }}
                maskClosable={true}
                onClose={handleCloseDrawer}
                mask={true}
            >
                <Col className={`h-full overflow-auto p-5`}>
                    <TourInfo dataTour={dataTour} />
                    <TableData idTour={dataTour?.id ?? ''} typeList={typeList} openDrawer={openDrawer} />
                </Col>
            </Drawer>
        </Fragment>
    );
};
