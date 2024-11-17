import { useEffect, useState } from 'react';

import { FormInstance } from 'antd';
import { InfoFormCommon } from '../Common/FormInfoCommon';
import { QuoteDetailDto } from '@sdk/tour-operations';
import isEmpty from 'lodash/isEmpty';
import { useQueryGetTourGitScheduleUseId } from '@fragments/Quote/hooks/useSearchTour';
import { useTourScheduleStore } from '@store/tourScheduleStore';

interface InfoFormGitProps {
    form: FormInstance;
    orderNo: string;
    dataQuote: QuoteDetailDto;
}

export const InfoFormGit: React.FC<InfoFormGitProps> = props => {
    const { form, orderNo, dataQuote } = props;

    // Store
    const {
        tourSchedule,
        actions: { setTourSchedule },
    } = useTourScheduleStore(state => state);

    // State
    const [tourIdSelected, setTourIdSelected] = useState<string>('');
    const [isInitSeatFirstTime, setIsInitSeatFirstTime] = useState<boolean>(true);

    // Query
    const { data: dataTourSchedule } = useQueryGetTourGitScheduleUseId(tourIdSelected);

    // Mutate
    // const { data: listTourFit, isSuccess } = useGetListTourGit({ forQuote: true });

    useEffect(() => {
        // get data
        if (dataQuote?.tourScheduleId && !tourIdSelected) {
            setTourIdSelected(dataQuote?.tourScheduleId ?? '');
        }
    }, [dataQuote?.tourScheduleId, tourIdSelected]);

    useEffect(() => {
        if (dataTourSchedule) {
            setTourSchedule(dataTourSchedule);
        }
    }, [dataTourSchedule, setTourSchedule]);

    // set data tour to store
    useEffect(() => {
        if (
            !isEmpty(dataTourSchedule) &&
            ((isEmpty(dataQuote) && isInitSeatFirstTime) ||
                (!isEmpty(dataQuote) && dataQuote.tourScheduleId !== dataTourSchedule.id))
        ) {
            const seatCount = {
                adtQuantity: 0,
                chdQuantity: 0,
                infQuantity: 0,
            };

            dataTourSchedule.id !== tourSchedule.id && setTourSchedule(dataTourSchedule);
            dataTourSchedule?.passengerTypeSeats?.map(x => {
                switch (x.passengerTypeCode) {
                    case 'ADT':
                        seatCount['adtQuantity'] = seatCount['adtQuantity'] + (x.seatCount ?? 0);
                        break;
                    case 'CHD':
                        seatCount['chdQuantity'] = seatCount['chdQuantity'] + (x.seatCount ?? 0);
                        break;
                    case 'INF':
                        seatCount['infQuantity'] = seatCount['infQuantity'] + (x.seatCount ?? 0);
                        break;
                }
            });
            form.setFieldsValue(seatCount);
            setIsInitSeatFirstTime(false);
        }
    }, [dataQuote, dataTourSchedule, form, isInitSeatFirstTime, setTourSchedule, tourSchedule.id]);

    // init data to form
    useEffect(() => {
        if (!isEmpty(tourSchedule) && orderNo) {
            form.setFieldsValue({ orderNo: orderNo, tourScheduleId: tourSchedule.id });
            setTourIdSelected(tourSchedule.id!);
        }
    }, [form, orderNo, tourSchedule]);

    return (
        <InfoFormCommon
            form={form}
            orderNo={orderNo}
            setTourIdSelected={setTourIdSelected}
            setIsInitSeatFirstTime={setIsInitSeatFirstTime}
        />
    );
};
