import { Col, FormInstance, Row } from 'antd';
import { Dispatch, SetStateAction } from 'react';

import { SaleOrderDto } from '@sdk/tour-operations';

import { FormTourInfo } from '../Form/TourInfo';
import { CollapseBlock } from '../CollapseBlock';

interface ContentProps {
    dataSO?: SaleOrderDto;
    travellersForm: FormInstance;
    tourInfoForm: FormInstance;
    totalTravellerForm: FormInstance;
    surchargeForm: FormInstance;
    totalAmountForm: FormInstance;
    contactPersonForm: FormInstance;
    commissionRefForm: FormInstance;
    commissionCollabForm: FormInstance;
    invoiceForm: FormInstance;
    numberOfTotalForm: FormInstance;
    reduceForm: FormInstance;
    isEnableEdit: boolean;
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
    isModalWarningOpen: boolean;
    setIsModalWarningOpen: Dispatch<SetStateAction<boolean>>;
}

export const Content: React.FC<ContentProps> = props => {
    const {
        dataSO,
        travellersForm,
        tourInfoForm,
        totalTravellerForm,
        surchargeForm,
        totalAmountForm,
        contactPersonForm,
        commissionRefForm,
        commissionCollabForm,
        invoiceForm,
        numberOfTotalForm,
        reduceForm,
        isEnableEdit,
        setIsEnableEdit,
        isModalWarningOpen,
        setIsModalWarningOpen,
    } = props;

    return (
        <Col>
            <Row className="mb-5">
                <FormTourInfo
                    tourInfoForm={tourInfoForm}
                    dataSO={dataSO}
                    isModalWarningOpen={isModalWarningOpen}
                    setIsModalWarningOpen={setIsModalWarningOpen}
                />
            </Row>
            <Row>
                <CollapseBlock
                    dataSO={dataSO}
                    travellersForm={travellersForm}
                    tourInfoForm={tourInfoForm}
                    totalTravellerForm={totalTravellerForm}
                    surchargeForm={surchargeForm}
                    totalAmountForm={totalAmountForm}
                    contactPersonForm={contactPersonForm}
                    commissionRefForm={commissionRefForm}
                    commissionCollabForm={commissionCollabForm}
                    invoiceForm={invoiceForm}
                    numberOfTotalForm={numberOfTotalForm}
                    reduceForm={reduceForm}
                    isEnableEdit={isEnableEdit}
                    setIsEnableEdit={setIsEnableEdit}
                    isModalWarningOpen={isModalWarningOpen}
                    setIsModalWarningOpen={setIsModalWarningOpen}
                />
            </Row>
        </Col>
    );
};
