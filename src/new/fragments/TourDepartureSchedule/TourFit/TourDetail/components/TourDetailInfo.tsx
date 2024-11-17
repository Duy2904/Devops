import { Spin, Tabs } from 'antd';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import StickyBox from 'react-sticky-box';

import { TourScheduleDto } from '@sdk/tour-operations';

import { useGetTourFitByCode } from '../../hooks/useTourFit';
import { PriceList } from '../types';
import PriceListContent from './TourDetailInfo/PriceListContent';
import { ScheduleContent } from './TourDetailInfo/ScheduleContent';
import { TermsAndConditions } from './TourDetailInfo/TermsAndConditions';

import type { TabsProps } from 'antd';
interface RenderItemsProps {
    priceList: PriceList[];
    tourData?: TourScheduleDto;
}

const renderItems: (props: RenderItemsProps) => TabsProps['items'] = props => [
    {
        key: '1',
        label: 'Lịch trình',
        children: <ScheduleContent tourData={props.tourData} />,
    },
    {
        key: '2',
        label: 'Bảng giá',
        children: <PriceListContent data={props.priceList} />,
    },
    {
        key: '3',
        label: 'Điều kiện & Điều khoản',
        children: <TermsAndConditions tourData={props.tourData} />,
    },
];

export const TourDetailInfo: React.FC = () => {
    const { tourCode } = useParams();

    // Queries
    const { data: tourData, isLoading } = useGetTourFitByCode(tourCode!);

    // Computed values
    const formattedTourScheduleFares = useMemo(() => {
        if (!tourData?.tourScheduleFares) return [];

        const sortedTourScheduleFares = tourData.tourScheduleFares.sort((a, b) => {
            if (!a.order || !b.order) return 0;
            return a.order - b.order;
        });

        return sortedTourScheduleFares?.map(tourScheduleFare => {
            const title =
                tourScheduleFare.passengerTypeCode === 'ADT'
                    ? 'Người lớn'
                    : tourScheduleFare.passengerTypeCode === 'CHD'
                    ? 'Trẻ em'
                    : 'Em bé';

            return {
                title: title,
                description: tourScheduleFare.passengerTypeName || '',
                price: tourScheduleFare.taxInclusivePrice || 0,
            };
        });
    }, [tourData?.tourScheduleFares]);

    const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
        <StickyBox offsetTop={0} offsetBottom={0} style={{ zIndex: 1 }}>
            <DefaultTabBar {...props} className="bg-white" />
        </StickyBox>
    );

    if (isLoading) return <Spin spinning={isLoading} fullscreen />;

    return (
        <Tabs
            defaultActiveKey="1"
            className="sticky top-0"
            renderTabBar={renderTabBar}
            items={renderItems({ priceList: formattedTourScheduleFares, tourData })}
        />
    );
};
