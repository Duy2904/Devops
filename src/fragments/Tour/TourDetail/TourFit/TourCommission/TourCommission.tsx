import { FormInstance } from 'antd';
import { TourCommissionForm } from './TourCommissionForm';
import { TourScheduleDto } from '@sdk/tour-operations';
import i18n from '@src/i18n';

interface TourCommissionProps {
    tourSchedule?: TourScheduleDto;
    agentForm: FormInstance;
    referrerForm: FormInstance;
}

export const TourCommission: React.FC<TourCommissionProps> = props => {
    return (
        <div>
            <p className="text-blue-600 mb-4">{i18n.t('tour.formTour.commission')}</p>
            <div className="pb-2">
                <TourCommissionForm formItem={props.agentForm} tourSchedule={props.tourSchedule} isType="agent" />
            </div>
            <div className="pb-6">
                <TourCommissionForm formItem={props.referrerForm} tourSchedule={props.tourSchedule} isType="referrer" />
            </div>
        </div>
    );
};
