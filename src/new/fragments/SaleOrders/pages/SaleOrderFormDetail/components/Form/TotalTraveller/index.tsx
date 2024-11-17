import { Col, Flex, Form, FormInstance } from 'antd';
import clsx from 'clsx';
import isEmpty from 'lodash/isEmpty';
import { Dispatch, SetStateAction } from 'react';

import { SaleOrderDto } from '@sdk/tour-operations';

import { useQueryGetTourScheduleUseId } from '../../../hooks/queries';
import { TravellerInfo } from '../TravellerInfo';
import { FormTotalTraveller } from './Form';

interface TotalTravellerProps {
    dataSO?: SaleOrderDto;
    tourInfoForm: FormInstance;
    totalTravellerForm: FormInstance;
    travellersForm: FormInstance;
    numberOfTotalForm: FormInstance;
    reduceForm: FormInstance;
    isEnableEdit: boolean;
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
    isModalWarningOpen: boolean;
    setIsModalWarningOpen: Dispatch<SetStateAction<boolean>>;
}

export const TotalTraveller: React.FC<TotalTravellerProps> = props => {
    const {
        dataSO,
        tourInfoForm,
        totalTravellerForm,
        travellersForm,
        numberOfTotalForm,
        reduceForm,
        isEnableEdit,
        setIsEnableEdit,
        isModalWarningOpen,
        setIsModalWarningOpen,
    } = props;
    const tourIdWatch = Form.useWatch('tourScheduleId', tourInfoForm);

    // Query
    const { data: dataTourSchedule, isLoading: isLoadingTourData } = useQueryGetTourScheduleUseId(tourIdWatch);

    return (
        <Col className="p-5">
            <Flex justify="flex-end" className={clsx('mb-5', isEmpty(dataTourSchedule) && 'hidden')}>
                <TravellerInfo
                    dataSO={dataSO}
                    tourInfoForm={tourInfoForm}
                    totalTravellerForm={totalTravellerForm}
                    travellersForm={travellersForm}
                    numberOfTotalForm={numberOfTotalForm}
                    reduceForm={reduceForm}
                    isEnableEdit={isEnableEdit}
                    setIsEnableEdit={setIsEnableEdit}
                    isModalWarningOpen={isModalWarningOpen}
                    setIsModalWarningOpen={setIsModalWarningOpen}
                    isLoadingTourData={isLoadingTourData}
                />
            </Flex>
            <FormTotalTraveller
                dataSO={dataSO}
                totalTravellerForm={totalTravellerForm}
                travellersForm={travellersForm}
                isEnableEdit={isEnableEdit}
                setIsEnableEdit={setIsEnableEdit}
                dataTourSchedule={dataTourSchedule}
                isLoadingTourData={isLoadingTourData}
            />
        </Col>
    );
};
