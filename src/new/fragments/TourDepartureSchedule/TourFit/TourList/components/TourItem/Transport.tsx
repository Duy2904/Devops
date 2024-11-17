import { Col, Flex } from 'antd';

import { TourSearchFitViewDto } from '@sdk/tour-operations';
import { Color } from '@src/new/components/ui/Color/CustomColor';

interface TransportProps {
    item: TourSearchFitViewDto;
}

export const Transport: React.FC<TransportProps> = props => {
    const { item } = props;
    return (
        <Flex gap={8} className="w-[400px]" vertical>
            <Col>
                <span className={`text-black text-xs`}>Chuyến đi</span>
                <p
                    className={`font-bold ${Color.text_2A2A2A}`}
                    dangerouslySetInnerHTML={{ __html: item.departureTrip ?? '' }}
                />
            </Col>
            <Col>
                <span className={`text-black text-xs`}>Chuyến về</span>
                <p
                    className={`font-bold ${Color.text_2A2A2A}`}
                    dangerouslySetInnerHTML={{ __html: item.returnTrip ?? '' }}
                />
            </Col>
            {/* <div className="flex gap-3">
                <FlightInfoCard
                    title={t('Chuyến đi')}
                    airlineName="Vietnam Airline"
                    airlineCode="VNA"
                    flightNumber="VN235"
                    departureTime="17:50"
                    arrivalTime="19:50"
                />

                <FlightInfoCard
                    title={t('Chuyến về')}
                    airlineName="Vietnam Airline"
                    airlineCode="VNA"
                    flightNumber="VN900"
                    departureTime="19:30"
                    arrivalTime="22:00"
                />
            </div> */}
        </Flex>
    );
};
