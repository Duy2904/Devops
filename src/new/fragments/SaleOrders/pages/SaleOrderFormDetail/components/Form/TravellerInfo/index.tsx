import { Button, Col, Drawer, Flex, FormInstance } from 'antd';
import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CloseOutlined } from '@ant-design/icons';
import { SaleOrderDto } from '@sdk/tour-operations';
import { Color } from '@src/new/components/ui/Color/CustomColor';

import { GuessInfo } from './components/GuessInfo';
import { GuessTotal } from './components/GuessTotal';
import { RoomInfo } from './components/RoomInfo';

interface TravellerInfoProps {
    dataSO?: SaleOrderDto;
    tourInfoForm: FormInstance;
    totalTravellerForm: FormInstance;
    travellersForm: FormInstance;
    numberOfTotalForm: FormInstance;
    reduceForm: FormInstance;
    isEnableEdit: boolean;
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
    isModalWarningOpen: boolean;
    setIsModalWarningOpen: Dispatch<SetStateAction<boolean>>;
    isLoadingTourData: boolean;
}

export const TravellerInfo: React.FC<TravellerInfoProps> = props => {
    const {
        tourInfoForm,
        totalTravellerForm,
        travellersForm,
        numberOfTotalForm,
        reduceForm,
        dataSO,
        isEnableEdit,
        setIsEnableEdit,
        isModalWarningOpen,
        setIsModalWarningOpen,
        isLoadingTourData,
    } = props;
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
            <Button onClick={handleOpenDrawer} disabled={isLoadingTourData}>
                Cập nhật chi tiết
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
                forceRender
            >
                <Col className={`${Color.bg_F6F7FA} h-full overflow-auto px-5 py-5`}>
                    <div className="grid grid-cols-2 gap-5">
                        <GuessTotal totalTravellerForm={totalTravellerForm} numberOfTotalForm={numberOfTotalForm} />
                        <RoomInfo
                            numberOfTotalForm={numberOfTotalForm}
                            travellersForm={travellersForm}
                            dataSO={dataSO}
                            isEnableEdit={isEnableEdit}
                            setIsEnableEdit={setIsEnableEdit}
                        />
                    </div>
                    <Col className="mt-5">
                        <GuessInfo
                            dataSO={dataSO}
                            tourInfoForm={tourInfoForm}
                            totalTravellerForm={totalTravellerForm}
                            travellersForm={travellersForm}
                            numberOfTotalForm={numberOfTotalForm}
                            reduceForm={reduceForm}
                            isEnableEdit={isEnableEdit}
                            setIsEnableEdit={setIsEnableEdit}
                            isModalWarningOpen={isModalWarningOpen}
                            setIsModalWarningOpen={setIsModalWarningOpen}
                        />
                    </Col>
                </Col>
            </Drawer>
        </>
    );
};
