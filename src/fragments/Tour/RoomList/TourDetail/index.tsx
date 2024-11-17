import { BaseDatePicker } from '@components/customizes/DatePicker/BaseDatePicker';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import { Form } from 'antd';
import { TourScheduleDto } from '@sdk/tour-operations';
import dayjs from 'dayjs';
import i18n from '@src/i18n';

interface TourDetailProps {
    data?: TourScheduleDto;
}

export const TourDetail: React.FC<TourDetailProps> = props => {
    const { data } = props;
    return (
        <Form className="p-4" disabled={true} layout="vertical">
            <BaseInput isForm label={i18n.t('tour.tourList.tourCode')} value={data?.tourCode ?? ''} />
            <BaseInput isForm label={i18n.t('tour.tourList.tourName')} value={data?.name} />
            <BaseDatePicker
                label={i18n.t('tour.tourDetail.departureDate')}
                value={dayjs(data?.departureDate)}
                format="dateTime"
            />
            <BaseDatePicker label={i18n.t('tour.tourDetail.endDay')} value={dayjs(data?.endDate)} format="dateTime" />
        </Form>
    );
};
