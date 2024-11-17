import { Button, Col, Drawer, Flex, Tooltip } from 'antd';

import { CloseOutlined } from '@ant-design/icons';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Info } from './Info';
import { SearchSaleOrderViewDto } from '@sdk/tour-operations';
import { TableData } from './TableData';
import { TypeButton } from '@fragments/SaleOrders/features';
import clsx from 'clsx';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import i18n from '@src/i18n';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface DrawerVoucherProps {
    soId: string;
    typeButton: TypeButton;
    data?: SearchSaleOrderViewDto;
    showInfo?: boolean;
}

export const DrawerVoucher: React.FC<DrawerVoucherProps> = props => {
    const { soId, typeButton, data, showInfo } = props;
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    const onOpen = async () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const renderButton = (
        <Col onClick={onOpen}>
            {typeButton == TypeButton.Full ? (
                <Button className="text-xs" icon={<FontAwesomeIcon icon={faFileInvoiceDollar} />}>
                    {i18n.t(`Chứng từ thanh toán`)}
                </Button>
            ) : (
                <Tooltip placement="top" title={i18n.t('Chứng từ thanh toán')}>
                    <Flex
                        className={clsx(
                            'flex items-center justify-center !w-7 !h-7 cursor-pointer font-bold transition-all ease-in-out text-white bg-supportColor-fifth hover:opacity-80 rounded-md',
                        )}
                    >
                        <FontAwesomeIcon icon={faFileInvoiceDollar} />
                    </Flex>
                </Tooltip>
            )}
        </Col>
    );

    const CustomHeader = (
        <Flex className="h-[50px] px-3 shadow relative" align="center" justify="center">
            <h1 className={`${Color.text_2A2A2A} font-bold uppercase text-[18px]`}>
                {t('Danh sách chứng từ thanh toán')}
            </h1>
            <Button
                className="absolute right-5"
                icon={<CloseOutlined className="h-4 w-4" />}
                onClick={onClose}
                type="text"
            />
        </Flex>
    );

    return (
        <Col>
            {renderButton}
            <Drawer
                title={CustomHeader}
                open={open}
                width={880}
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
                onClose={onClose}
                mask={true}
            >
                <Col className={`h-full overflow-auto p-5`}>
                    {showInfo && <Info data={data} />}
                    <TableData soId={soId} open={open} showSummary={showInfo} />
                </Col>
            </Drawer>
        </Col>
    );
};
