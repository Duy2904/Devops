import { Col, Flex } from 'antd';
import { startTransition, useEffect, useState } from 'react';

import { Header } from './components/Header';
import LayoutContentBlock from '@src/new/components/common/LayoutContentBlock';
import { MainContent } from './MainContent';
import { MyPermissions } from '@utils/Permissions';
import ReservationDrawer from './components/ReservationDrawer';
import { TitleHeader } from './TitleHeader';
import TourDetailSkeleton from './components/Skeleton';
import { TourScheduleStatus } from '@sdk/tour-operations';
import { useGetTourFitByCode } from '../hooks/useTourFit';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { useParams } from 'react-router-dom';
import { useWindowSize } from 'react-use';

export const TourFitDepartureScheduleDetail: React.FC = () => {
    const { tourCode } = useParams();
    const canBookingSO = useHasAnyPermission([MyPermissions.SaleOrderCreate, MyPermissions.AgencySaleOrderCreate]);

    // Hooks
    const { width } = useWindowSize();

    // States
    const [isFastReservationDrawerOpen, setIsFastReservationDrawerOpen] = useState(false);

    // Queries
    const { data: tourData, isLoading } = useGetTourFitByCode(tourCode!);

    // Handlers
    const handleCloseReservationSidebar = () => setIsFastReservationDrawerOpen(false);

    // Effects
    useEffect(() => {
        startTransition(() => {
            const DRAWER_DISPLAY_WIDTH_THRESHOLD = 1360;
            if (
                width >= DRAWER_DISPLAY_WIDTH_THRESHOLD &&
                tourData?.status !== TourScheduleStatus.SaleTimeExpired &&
                canBookingSO
            ) {
                setIsFastReservationDrawerOpen(true);
            } else {
                setIsFastReservationDrawerOpen(false);
            }
        });
    }, [canBookingSO, tourData?.status, width]);

    if (!tourData && isLoading) {
        return <TourDetailSkeleton />;
    }

    return (
        <Col className="h-full pb-10">
            <Header />
            <LayoutContentBlock className="max-h-[calc(100vh_-_160px)] overflow-hidden">
                <>
                    <TitleHeader tourData={tourData} />
                    <Flex gap={isFastReservationDrawerOpen ? 24 : 0} className="mt-2 h-full">
                        <MainContent
                            tourData={tourData}
                            isFastReservationDrawerOpen={isFastReservationDrawerOpen}
                            setIsFastReservationDrawerOpen={setIsFastReservationDrawerOpen}
                        />
                        <ReservationDrawer
                            isOpen={isFastReservationDrawerOpen}
                            onCloseSidebar={handleCloseReservationSidebar}
                        />
                    </Flex>
                </>
            </LayoutContentBlock>
        </Col>
    );
};
