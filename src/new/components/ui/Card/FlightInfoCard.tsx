import { Tag } from 'antd';

import VietnamAirline from '@assets/images/vietnam-airline.png';

import { Color } from '../Color/CustomColor';

interface FlightInfoCardProps {
    title: string;
    airlineName: string;
    airlineCode: string;
    flightNumber: string;
    departureTime: string;
    arrivalTime: string;
}

const FlightInfoCard = ({
    title,
    airlineName,
    airlineCode,
    flightNumber,
    departureTime,
    arrivalTime,
}: FlightInfoCardProps) => {
    return (
        <div>
            <span className={`${Color.text_black_88} text-xs`}>{title}</span>
            <div
                className={`${Color.border_DBDBDB} mt-[6px] rounded border border-solid px-[6px] flex items-center gap-1`}
            >
                <img
                    src={VietnamAirline}
                    alt={`${airlineName} logo`}
                    className="aspect-square w-5 h-5 object-contain"
                />
                <Tag
                    bordered={false}
                    className={`${Color.text_F6F7FA} ${Color.bg_3E5BE0} text-[10px]/[14px] font-medium w-full px-1 flex items-center justify-center max-w-max mr-0 rounded-[3px]`}
                >
                    {airlineCode}
                </Tag>
                <p className={`${Color.text_2A2A2A} font-medium text-sm/[22px]`}>{airlineName}</p>
            </div>
            <p className={`${Color.text_2A2A2A} font-medium text-xs/[22px] mt-1`}>
                <span className={`${Color.text_3E5BE0} font-bold`}>{flightNumber}</span> • {departureTime} -{' '}
                {arrivalTime} (2h)
            </p>
        </div>
    );
};

export default FlightInfoCard;
