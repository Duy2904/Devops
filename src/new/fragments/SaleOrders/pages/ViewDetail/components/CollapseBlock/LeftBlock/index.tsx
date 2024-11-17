import { Collapse, CollapseProps, Flex } from 'antd';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';

import { SaleOrderDto } from '@sdk/tour-operations';

import { ContactPerson } from './ContactPerson';
import { ReduceAmount } from './ReduceAmount';
import { Surcharge } from './Surcharge';
import { Traveller } from './Traveller';

interface LeftBlockProps {
    data?: SaleOrderDto;
}

export const LeftBlock: React.FC<LeftBlockProps> = ({ data }) => {
    const { t } = useTranslation();

    const travellerCollapse: CollapseProps['items'] = [
        {
            key: '1',
            label: t('DANH SÁCH KHÁCH ĐI TOUR'),
            children: <Traveller data={data} />,
        },
    ];
    const reduceAmountCollapse: CollapseProps['items'] = [
        {
            key: '1',
            label: t('GIẢM TRỪ'),
            children: <ReduceAmount data={data} />,
        },
    ];
    const surchargeCollapse: CollapseProps['items'] = [
        {
            key: '1',
            label: t('PHỤ THU'),
            children: <Surcharge data={data} />,
        },
    ];
    const contactPersonCollapse: CollapseProps['items'] = [
        {
            key: '1',
            label: t('NGƯỜI LIÊN LẠC'),
            children: <ContactPerson data={data} />,
        },
    ];
    return (
        <Flex vertical gap={20}>
            <Collapse defaultActiveKey={['1']} expandIconPosition={'end'} items={travellerCollapse} />
            {!isEmpty(data?.tourSchedule?.visaTourService) && (
                <Collapse defaultActiveKey={['1']} expandIconPosition={'end'} items={reduceAmountCollapse} />
            )}
            <Collapse defaultActiveKey={['1']} expandIconPosition={'end'} items={surchargeCollapse} />
            <Collapse defaultActiveKey={['1']} expandIconPosition={'end'} items={contactPersonCollapse} />
        </Flex>
    );
};
