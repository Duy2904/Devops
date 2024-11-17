import { Button, Col, Flex } from 'antd';
import { currentPage, pageSize } from '@src/new/shared/types/BaseTypes';
import { useMemo, useState } from 'react';

import { DepartureSelect } from './Location/DepartureSelect';
import { DestinationSelect } from './Location/DestinationSelect';
import { DrawerUI } from '@src/new/components/ui/Drawer';
import { MyPermissions } from '@utils/Permissions';
import { ProviderMultiSelect } from './Providers';
import { RouteFitSelect } from './RouteFit';
import { TagMultiSelect } from './Tags';
import isEmpty from 'lodash/isEmpty';
import { useDebouncedCallback } from 'use-debounce';
import useHasAnyPermission from '@src/new/shared/hooks/useHasAnyPermission';
import { useSearchTableStoreNew } from '@src/new/shared/stores/SearchTableStore';
import { useTranslation } from 'react-i18next';

export const DrawerItems = () => {
    const { t } = useTranslation();
    const canSeeProvider = useHasAnyPermission([MyPermissions.TourFitProviderView]);

    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStoreNew(state => state);

    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [departureId, setDepartureId] = useState<string | undefined>(tableParams.departureLocationId);
    const [destinationId, setDestinationId] = useState<string | undefined>(tableParams.destinationLocationId);
    const [routeId, setRouteId] = useState<string | undefined>(tableParams.routeId);
    const [providers, setProviders] = useState<string[] | undefined>(tableParams.providers);
    const [tags, setTags] = useState<string[] | undefined>(tableParams.tags);

    const handleFilter = useDebouncedCallback(() => {
        setSearchParams({
            ...tableParams,
            pagination: { current: currentPage, pageSize: pageSize, showSizeChanger: true },
            departureLocationId: departureId,
            destinationLocationId: destinationId,
            routeId: routeId,
            providers: providers,
            tags: tags,
        });
    }, 500);

    const handleReset = () => {
        setDepartureId(undefined);
        setDestinationId(undefined);
        setRouteId(undefined);
        setProviders(undefined);
        setTags(undefined);
        handleFilter();
    };

    const countedItem = useMemo(() => {
        return [departureId, destinationId, routeId, !isEmpty(providers), !isEmpty(tags)].filter(Boolean).length;
    }, [departureId, destinationId, providers, routeId, tags]);

    const itemDrawer = (
        <Flex className="relative h-full bg-[#F6F7FA] p-5" vertical gap={24}>
            <DepartureSelect title={t('Điểm khởi hành')} departureId={departureId} setDepartureId={setDepartureId} />
            <DestinationSelect
                title={t('Điểm đến')}
                destinationId={destinationId}
                setDestinationId={setDestinationId}
                setRouteId={setRouteId}
            />
            <RouteFitSelect
                title={t('Hành trình')}
                destinationId={destinationId}
                routeId={routeId}
                setRouteId={setRouteId}
            />
            {canSeeProvider && (
                <ProviderMultiSelect
                    placeholderContent="--Chọn đơn vị--"
                    title={t('Đơn vị mở tour')}
                    providers={providers}
                    setProviders={setProviders}
                />
            )}
            <TagMultiSelect placeholderContent="--Chọn thẻ--" title={t('Thẻ')} tags={tags} setTags={setTags} />
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
