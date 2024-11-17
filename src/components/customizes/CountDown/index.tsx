import React, { useEffect, useState } from 'react';

import { calculateSecondsToEnd } from '@fragments/SaleOrders/features';

interface CountdownTimerProps {
    endDate: string;
    className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = props => {
    const { endDate, className } = props;
    const [seconds, setSeconds] = useState<number>(calculateSecondsToEnd(endDate)); // Initial countdown time in seconds

    // Prepend a zero for single-digit numbers
    const padTime = (time: number) => (String(time).length === 1 ? `0${time}` : `${time}`);

    // Format seconds into "hh:mm:ss"
    const formatTime = (time: number) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const remainingSeconds = time % 60;

        if (hours == 0 && minutes == 0 && remainingSeconds == 0) {
            return 'Đang tiến hành huỷ';
        }

        return `${padTime(hours)}:${padTime(minutes)}:${padTime(remainingSeconds)}`;
    };
    useEffect(() => {
        if (endDate) {
            setSeconds(calculateSecondsToEnd(endDate));
        }
    }, [endDate]);

    useEffect(() => {
        let timer: number;
        if (seconds > 0) {
            timer = setTimeout(() => setSeconds(prevSeconds => prevSeconds - 1), 1000);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [seconds]);

    return <span className={className}>{formatTime(seconds)}</span>;
};

export default CountdownTimer;
