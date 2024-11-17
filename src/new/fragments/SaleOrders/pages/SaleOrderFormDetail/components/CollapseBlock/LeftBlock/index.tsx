import { Collapse, CollapseProps, Flex, Form, FormInstance } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { Dispatch, SetStateAction, useMemo } from 'react';

import { SaleOrderDto } from '@sdk/tour-operations';
import i18n from '@src/i18n';

import { useQueryGetTourScheduleUseId } from '../../../hooks/queries';
import { ContactPerson } from '../../Form/ContactPerson';
import { ReduceAmount } from '../../Form/ReduceAmount';
import { Surcharge } from '../../Form/Surcharge';
import { TotalTraveller } from '../../Form/TotalTraveller';

interface LeftBlockProps {
    dataSO?: SaleOrderDto;
    travellersForm: FormInstance;
    tourInfoForm: FormInstance;
    totalTravellerForm: FormInstance;
    surchargeForm: FormInstance;
    contactPersonForm: FormInstance;
    invoiceForm: FormInstance;
    numberOfTotalForm: FormInstance;
    reduceForm: FormInstance;
    isEnableEdit: boolean;
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
    isModalWarningOpen: boolean;
    setIsModalWarningOpen: Dispatch<SetStateAction<boolean>>;
}

export const LeftBlock: React.FC<LeftBlockProps> = props => {
    const {
        dataSO,
        travellersForm,
        tourInfoForm,
        totalTravellerForm,
        surchargeForm,
        contactPersonForm,
        invoiceForm,
        numberOfTotalForm,
        reduceForm,
        isEnableEdit,
        setIsEnableEdit,
        isModalWarningOpen,
        setIsModalWarningOpen,
    } = props;

    const tourIdWatch = Form.useWatch('tourScheduleId', tourInfoForm);
    // Query
    const { data: dataTourSchedule } = useQueryGetTourScheduleUseId(tourIdWatch);

    const itemCollapseTraveller: CollapseProps['items'] = useMemo(
        () => [
            {
                key: '1',
                label: <p className="font-bold">{i18n.t('DANH SÁCH KHÁCH ĐI TOUR')}</p>,
                children: (
                    <TotalTraveller
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
                    />
                ),
            },
        ],
        [
            dataSO,
            isEnableEdit,
            isModalWarningOpen,
            numberOfTotalForm,
            reduceForm,
            setIsEnableEdit,
            setIsModalWarningOpen,
            totalTravellerForm,
            tourInfoForm,
            travellersForm,
        ],
    );

    const itemCollapseSurcharge: CollapseProps['items'] = useMemo(
        () => [
            {
                key: '1',
                label: <p className="font-bold">{i18n.t('PHỤ THU')}</p>,
                children: (
                    <Surcharge
                        surchargeForm={surchargeForm}
                        tourInfoForm={tourInfoForm}
                        dataSO={dataSO}
                        isEnableEdit={isEnableEdit}
                        setIsEnableEdit={setIsEnableEdit}
                    />
                ),
            },
        ],
        [dataSO, isEnableEdit, setIsEnableEdit, surchargeForm, tourInfoForm],
    );

    const itemCollapsededuct: CollapseProps['items'] = useMemo(
        () => [
            {
                key: '1',
                label: <p className="font-bold">{i18n.t('GIẢM TRỪ')}</p>,
                children: (
                    <ReduceAmount
                        reduceForm={reduceForm}
                        tourInfoForm={tourInfoForm}
                        totalTravellerForm={totalTravellerForm}
                        dataSO={dataSO}
                        isEnableEdit={isEnableEdit}
                        setIsEnableEdit={setIsEnableEdit}
                    />
                ),
            },
        ],
        [dataSO, reduceForm, isEnableEdit, setIsEnableEdit, totalTravellerForm, tourInfoForm],
    );

    const itemCollapseContactPerson: CollapseProps['items'] = useMemo(
        () => [
            {
                key: '1',
                label: <p className="font-bold">{i18n.t('NGƯỜI LIÊN LẠC')}</p>,
                children: (
                    <ContactPerson
                        dataSO={dataSO}
                        contactPersonForm={contactPersonForm}
                        invoiceForm={invoiceForm}
                        isEnableEdit={isEnableEdit}
                        setIsEnableEdit={setIsEnableEdit}
                    />
                ),
            },
        ],
        [contactPersonForm, dataSO, invoiceForm, isEnableEdit, setIsEnableEdit],
    );

    return (
        <Flex vertical gap={20}>
            <Collapse defaultActiveKey={['1']} expandIconPosition={'end'} items={itemCollapseTraveller} />
            {!isEmpty(dataTourSchedule?.visaTourService) && (
                <Collapse defaultActiveKey={['1']} expandIconPosition={'end'} items={itemCollapsededuct} />
            )}
            <Collapse defaultActiveKey={['1']} expandIconPosition={'end'} items={itemCollapseSurcharge} />
            <Collapse defaultActiveKey={['1']} expandIconPosition={'end'} items={itemCollapseContactPerson} />
        </Flex>
    );
};
