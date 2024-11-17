import { ReceivableVoucherDto } from '@sdk/tour-operations';
import { Col, Collapse, CollapseProps } from 'antd';
import React from 'react'
import { GeneralInfo } from './GeneralInfo';
import { useTranslation } from 'react-i18next';
import { ContactPerson } from './ContactPerson';
import { TableData } from './TableData';

interface CollapseBlockProps {
    data?: ReceivableVoucherDto;
}

export const CollapseBlock: React.FC<CollapseBlockProps> = (props) => {
    const { data } = props;
    const { t } = useTranslation();

    const generalInfoCollapse: CollapseProps['items'] = [
        {
            key: '1',
            label: t('THÔNG TIN CHUNG'),
            children: <GeneralInfo data={data} />,
        },
    ];

    const contactPersonCollapse: CollapseProps['items'] = [
        {
            key: '1',
            label: t('NGƯỜI LIÊN LẠC'),
            children: <ContactPerson data={data} />,
        },
    ];

    const tableDataCollapse: CollapseProps['items'] = [
        {
            key: '1',
            label: <p className="text-md">{t('CHỨNG TỪ')}</p>,
            children: (
                <TableData
                    data={data}
                />
            ),
        },
    ];

    return (
        <Col className='saleOrderCollapse'>
            <Col className='grid grid-cols-2 gap-5'>
                <Collapse defaultActiveKey={['1']} expandIconPosition={'end'} items={generalInfoCollapse} />
                <Collapse defaultActiveKey={['1']} expandIconPosition={'end'} items={contactPersonCollapse} />
                <Collapse className='col-span-2' defaultActiveKey={['1']} expandIconPosition={'end'} items={tableDataCollapse} />
            </Col>
        </Col>
    )
}
