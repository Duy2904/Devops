import { useEffect, useState } from 'react';

import { FormInstance } from 'antd';
import { InfoFormCommon } from '../Common/FormInfoCommon';
import { QuoteDetailDto } from '@sdk/tour-operations';
import isEmpty from 'lodash/isEmpty';
import { useQueryGetTourScheduleUseId } from '@fragments/Quote/hooks/useSearchTour';
import { useTourScheduleStore } from '@store/tourScheduleStore';

interface InfoFormFitProps {
    form: FormInstance;
    orderNo: string;
    dataQuote: QuoteDetailDto;
}

export const InfoFormFit: React.FC<InfoFormFitProps> = props => {
    const { form, orderNo, dataQuote } = props;

    // Store
    const {
        tourSchedule,
        actions: { setTourSchedule },
    } = useTourScheduleStore(state => state);

    // State
    const [tourIdSelected, setTourIdSelected] = useState<string>('');

    // Query
    const { data: dataTourSchedule } = useQueryGetTourScheduleUseId(tourIdSelected);

    useEffect(() => {
        // get data
        if (dataQuote?.tourScheduleId && !tourIdSelected) {
            setTourIdSelected(dataQuote?.tourScheduleId ?? '');
        }
    }, [dataQuote?.tourScheduleId, tourIdSelected]);

    // set data tour to store
    useEffect(() => {
        if (dataTourSchedule) {
            setTourSchedule(dataTourSchedule);
        }
    }, [dataTourSchedule, setTourSchedule]);

    // init data to form
    useEffect(() => {
        if (!isEmpty(tourSchedule) && orderNo) {
            form.setFieldsValue({ orderNo: orderNo, tourScheduleId: tourSchedule.id });
            setTourIdSelected(tourSchedule.id!);
        }
    }, [form, orderNo, tourSchedule]);

    return <InfoFormCommon form={form} orderNo={orderNo} setTourIdSelected={setTourIdSelected} />;
};
