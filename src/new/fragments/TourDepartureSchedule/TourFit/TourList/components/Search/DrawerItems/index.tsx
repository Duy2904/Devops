import { Button, Col, Flex } from 'antd';
import { currentPage, pageSize } from '@src/new/shared/types/BaseTypes';
import { useMemo, useState } from 'react';

import { DepartureSelect } from './Location/DepartureSelect';
import { DestinationSelect } from './Location/DestinationSelect';
import { DrawerUI } from '@src/new/components/ui/Drawer';
import { Price } from './FilterData/Price';
import { RangeSaleDate } from './FilterData/RangeSaleDateSearch';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchTableStoreNew } from '@src/new/shared/stores/SearchTableStore';
import { useTranslation } from 'react-i18next';

export const DrawerItems = () => {
    const { t } = useTranslation();

    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStoreNew(state => state);

    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [departureId, setDepartureId] = useState<string | undefined>(tableParams.departureLocationId);
    const [destinationId, setDestinationId] = useState<string | undefined>(tableParams.destinationLocationId);
    const [saleStartDate, setSaleStartDate] = useState<Date | null | undefined>(tableParams.saleStartDate);
    const [saleEndDate, setSaleEndDate] = useState<Date | null | undefined>(tableParams.saleEndDate);
    const [fromPrice, setFromPrice] = useState<number | undefined>(tableParams.fromPrice);
    const [toPrice, setToPrice] = useState<number | undefined>(tableParams.toPrice);

    const handleFilter = useDebouncedCallback(() => {
        setSearchParams({
            ...tableParams,
            pagination: { current: currentPage, pageSize: pageSize, showSizeChanger: true },
            departureLocationId: departureId,
            destinationLocationId: destinationId,
            saleStartDate: saleStartDate,
            saleEndDate: saleEndDate,
            fromPrice: fromPrice,
            toPrice: toPrice,
        });
    }, 500);

    const handleReset = () => {
        setDepartureId(undefined);
        setDestinationId(undefined);
        setSaleStartDate(undefined);
        setSaleEndDate(undefined);
        setFromPrice(undefined);
        setToPrice(undefined);
        handleFilter();
    };

    const countedItem = useMemo(() => {
        let countTemp = 0;
        departureId && countTemp++;
        destinationId && countTemp++;
        (saleStartDate || saleEndDate) && countTemp++;
        (fromPrice || toPrice) && countTemp++;
        return countTemp;
    }, [departureId, destinationId, fromPrice, saleEndDate, saleStartDate, toPrice]);

    const itemDrawer = (
        <Flex className="relative h-full bg-[#F6F7FA] p-5" vertical gap={24}>
            <DepartureSelect title={t('Điểm khởi hành')} departureId={departureId} setDepartureId={setDepartureId} />
            <DestinationSelect
                title={t('Điểm đến')}
                destinationId={destinationId}
                setDestinationId={setDestinationId}
            />
            <RangeSaleDate
                saleStartDate={saleStartDate}
                saleEndDate={saleEndDate}
                setSaleStartDate={setSaleStartDate}
                setSaleEndDate={setSaleEndDate}
            />
            <Price fromPrice={fromPrice} toPrice={toPrice} setFromPrice={setFromPrice} setToPrice={setToPrice} />
            <Col className="w-full absolute left-0 bottom-0 bg-white p-5">
                {countedItem > 0 && (
                    <p className="text-xs font-normal text-black/40 mb-4">
                        {t('Đã chọn')} <span className="text-greyColor-first font-bold">{countedItem}</span>
                    </p>
                )}
                <Flex className="h-10" gap={16}>
                    <Button className="h-full w-1/3 font-bold" onClick={handleReset}>
                        Đặt lại
                    </Button>
                    <Button
                        className="h-full w-2/3 font-bold"
                        type="primary"
                        onClick={() => {
                            setOpenDrawer(false);
                            handleFilter();
                        }}
                    >
                        Áp dụng
                    </Button>
                </Flex>
            </Col>
        </Flex>
    );

    return (
        <DrawerUI
            title={t('Lọc Tour')}
            drawerChild={itemDrawer}
            counted={countedItem}
            width={463}
            openDrawer={openDrawer}
            setOpenDrawer={setOpenDrawer}
        />
    );
};
