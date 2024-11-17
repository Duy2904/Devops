import { Collapse, CollapseProps, FormInstance } from 'antd';
import React, { useMemo } from 'react';

import { TravellerDto } from '@sdk/tour-operations';
import i18n from '@src/i18n';

import { InfoComponent } from '../components/Info';

interface ItemCollapseInfoProps {
    form: FormInstance;
    touristForm: FormInstance;
    totalAmountForm: FormInstance;
    surchargeForm: FormInstance;
    soCode?: string;
    paymentMethod: { id: string; value: number };
    isEnableEdit: boolean;
    isFirstTimeDirty: boolean;
    isModalWarningOpen: boolean;
    isConfirmOverload: boolean;
    personContactForm: FormInstance;
    setSoCode: React.Dispatch<React.SetStateAction<string | undefined>>;
    setIsEnableEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setIsFirstTimeDirty: React.Dispatch<React.SetStateAction<boolean>>;
    setIsModalWarningOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsConfirmOverload: React.Dispatch<React.SetStateAction<boolean>>;
    setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
    setInvalidQuerySOList: () => void;
    // eslint-disable-next-line no-unused-vars
    handleDataPersonContact: (traveller: TravellerDto) => void;
}

export const CollapseInfo: React.FC<ItemCollapseInfoProps> = props => {
    const itemCollapseInfo: CollapseProps['items'] = useMemo(
        () => [
            {
                key: '1',
                className: 'rounded-b-lg overflow-hidden',
                label: <p className="text-md">{i18n.t('saleorder.defaultContact.title')}</p>,
                children: <InfoComponent {...props} />,
            },
        ],
        [props],
    );

    return (
        <Collapse
            className="rounded-b-lg rounded-t-none"
            defaultActiveKey={['1']}
            expandIconPosition={'end'}
            items={itemCollapseInfo}
        />
    );
};
