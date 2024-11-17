import { Col, Flex, FormInstance } from 'antd';
import { Dispatch, SetStateAction } from 'react';

import { SaleOrderDto } from '@sdk/tour-operations';

import { LeftBlock } from './LeftBlock';
import { RightBlock } from './RightBlock';

interface CollapseBlockProps {
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

export const CollapseBlock: React.FC<CollapseBlockProps> = props => {
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
        <Flex className="w-full saleOrderCollapse" gap={20}>
            <Col className="w-2/3">
                <LeftBlock
                    dataSO={dataSO}
                    travellersForm={travellersForm}
                    tourInfoForm={tourInfoForm}
                    totalTravellerForm={totalTravellerForm}
                    surchargeForm={surchargeForm}
                    contactPersonForm={contactPersonForm}
                    invoiceForm={invoiceForm}
                    numberOfTotalForm={numberOfTotalForm}
                    reduceForm={reduceForm}
                    isEnableEdit={isEnableEdit}
                    setIsEnableEdit={setIsEnableEdit}
                    isModalWarningOpen={isModalWarningOpen}
                    setIsModalWarningOpen={setIsModalWarningOpen}
                />
            </Col>
            <Col className="w-1/3">
                <RightBlock
                    dataSO={dataSO}
                    totalAmountForm={totalAmountForm}
                    commissionRefForm={commissionRefForm}
                    commissionCollabForm={commissionCollabForm}
                    tourInfoForm={tourInfoForm}
                    invoiceForm={invoiceForm}
                    totalTravellerForm={totalTravellerForm}
                    surchargeForm={surchargeForm}
                    numberOfTotalForm={numberOfTotalForm}
                    travellersForm={travellersForm}
                    reduceForm={reduceForm}
                    isEnableEdit={isEnableEdit}
                    setIsEnableEdit={setIsEnableEdit}
                />
            </Col>
        </Flex>
    );
};
