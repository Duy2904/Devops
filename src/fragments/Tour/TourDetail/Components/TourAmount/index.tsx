import { TourGitDto, TourScheduleDto } from '@sdk/tour-operations';

import { FormInstance } from 'antd';
import { ProductTourTemplate } from '../Product';
import { TourType } from '@src/types/TypeEnum';

interface TourAmountProps {
    tourSchedule?: TourScheduleDto | TourGitDto;
    form: FormInstance;
    tourFareForm: FormInstance;
    surchargeForm: FormInstance;
    tourType?: TourType;
}

export const TourAmount: React.FC<TourAmountProps> = props => {
    return (
        <ProductTourTemplate
            form={props.form}
            tourFareForm={props.tourFareForm}
            surchargeForm={props.surchargeForm}
            tourSchedule={props.tourSchedule}
            tourType={props.tourType}
        />
    );
};
