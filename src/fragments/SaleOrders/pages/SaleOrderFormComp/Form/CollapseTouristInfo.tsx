import { Collapse, CollapseProps, FormInstance } from 'antd';
import React from 'react';

import { InfoTouristComponent } from '../components/InfoTourist';
import { TotalCustomerComponent } from '../components/TotalCustomers';

interface ItemCollapseTouristInfoProps {
    totalCustomerForm: FormInstance;
    touristForm: FormInstance;
    personContactForm: FormInstance;
    isEnableEdit: boolean;
    isFirstTimeDirty: boolean;
    isConfirmOverload: boolean;
    soId: string | undefined;
    setIsEnableEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setIsFirstTimeDirty: React.Dispatch<React.SetStateAction<boolean>>;
    setIsModalWarningOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setInvalidQuerySOList: () => void;
}
export const CollapseTouristInfo: React.FC<ItemCollapseTouristInfoProps> = props => {
    const {
        totalCustomerForm,
        touristForm,
        isEnableEdit,
        isFirstTimeDirty,
        setIsEnableEdit,
        setIsFirstTimeDirty,
        isConfirmOverload,
        setIsModalWarningOpen,
        soId,
        personContactForm,
    } = props;

    const itemCollapse: CollapseProps['items'] = [
        {
            key: '1',
            className: '!rounded-none !border-none',
            label: <p className="text-md">Danh sách khách đi tour</p>,
            children: (
                <div>
                    <TotalCustomerComponent
                        form={totalCustomerForm}
                        setIsEnableEdit={setIsEnableEdit}
                        isEnableEdit={isEnableEdit}
                        isFirstTimeDirty={isFirstTimeDirty}
                        setIsFirstTimeDirty={setIsFirstTimeDirty}
                        touristForm={touristForm}
                        soId={soId}
                    />
                    <InfoTouristComponent
                        form={touristForm}
                        setIsEnableEdit={setIsEnableEdit}
                        isEnableEdit={isEnableEdit}
                        isFirstTimeDirty={isFirstTimeDirty}
                        setIsFirstTimeDirty={setIsFirstTimeDirty}
                        setIsModalWarningOpen={setIsModalWarningOpen}
                        isConfirmOverload={isConfirmOverload}
                        soId={soId}
                        personContactForm={personContactForm}
                        setInvalidQuerySOList={props.setInvalidQuerySOList}
                    />
                </div>
            ),
        },
    ];

    return (
        <Collapse
            className="rounded-t-lg rounded-b-none"
            defaultActiveKey={['1']}
            expandIconPosition={'end'}
            items={itemCollapse}
        />
    );
};
