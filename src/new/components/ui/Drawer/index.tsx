import { Button, Col, Drawer, Flex } from 'antd';
import { Dispatch, Fragment, ReactNode, SetStateAction } from 'react';
import { IconClose, IconFilter } from '@src/new/components/common/SvgIcon';

import { useTranslation } from 'react-i18next';

interface DrawerSearchProps {
    counted: number;
    drawerChild?: ReactNode;
    title?: string;
    width?: number;
    openDrawer?: boolean;
    setOpenDrawer: Dispatch<SetStateAction<boolean>>;
}

export const DrawerUI: React.FC<DrawerSearchProps> = props => {
    const { counted, drawerChild, title, width, openDrawer, setOpenDrawer } = props;
    const { t } = useTranslation();

    const handleOpenDrawer = () => {
        setOpenDrawer(true);
    };

    const handleCloseDrawer = () => {
        setOpenDrawer(false);
    };

    const HeaderDrawer = (
        <Col className="relative">
            <p className="text-center text-md uppercase font-bold">{title}</p>
            <IconClose
                className="w-7 h-7 p-[2px] absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer hover:bg-greyColor-fifth/40 rounded-lg transition-all ease-in-out"
                onClick={handleCloseDrawer}
            />
        </Col>
    );

    return (
        <Fragment>
            <Button
                className="flex items-center px-3 rounded-lg border border-solid !border-greyColor-fourth cursor-pointer relative hover:!text-black"
                onClick={handleOpenDrawer}
                icon={<IconFilter />}
            >
                {t('Lọc')}
                {counted > 0 && (
                    <Flex
                        align="center"
                        justify="center"
                        className="bg-greyColor-fifth w-5 h-5 rounded-md text-xs font-semibold ml-2"
                    >
                        {counted}
                    </Flex>
                )}
            </Button>
            <Drawer
                title={HeaderDrawer}
                placement="right"
                open={openDrawer}
                footer={false}
                width={width}
                closeIcon={false}
                maskClosable={true}
                onClose={handleCloseDrawer}
                mask={true}
                styles={{
                    body: {
                        padding: 0,
                    },
                }}
            >
                {drawerChild}
            </Drawer>
        </Fragment>
    );
};
