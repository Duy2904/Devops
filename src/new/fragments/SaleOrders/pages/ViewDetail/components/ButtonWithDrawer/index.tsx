import { Button, Col, Drawer, Flex } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CloseOutlined } from '@ant-design/icons';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import { SaleOrderDto } from '@sdk/tour-operations';

import { GuessInfo } from './GuessInfo';
import { GuessTotal } from './GuessTotal';
import { RoomInfo } from './RoomInfo';

interface ButtonWithDrawerProps {
    data?: SaleOrderDto;
}

export const ButtonWithDrawer: React.FC<ButtonWithDrawerProps> = ({ data }) => {
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
            <h1 className={`${Color.text_2A2A2A} font-bold uppercase text-[20px]`}>
                {t('Chi tiết danh sách khách đi tour')}
            </h1>
            <Button
                className="absolute right-5"
                icon={<CloseOutlined className="h-4 w-4" />}
                onClick={handleCloseDrawer}
                type="text"
            />
        </Flex>
    );

    return (
        <>
            <Button className="text-sm" onClick={handleOpenDrawer}>
                {t('Thông tin chi tiết')}
            </Button>
            <Drawer
                title={CustomHeader}
                open={openDrawer}
                width="100%"
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
            >
                <Col className={`${Color.bg_F6F7FA} h-full overflow-auto px-10 py-5`}>
                    <Col className="grid grid-cols-2 gap-5">
                        <GuessTotal data={data} />
                        <RoomInfo data={data} />
                    </Col>

                    <Col className="mt-5">
                        <GuessInfo data={data} />
                    </Col>
                </Col>
            </Drawer>
        </>
    );
};
