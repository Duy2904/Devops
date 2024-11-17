import { Col, Collapse, CollapseProps, Form } from 'antd';
import { useFetchRoomListOfTourFit, useGetTourFitByCode } from '../hooks/useTourFit';

import { ButtonRoomList } from './Button';
import { HeadContent } from '@components/ui/HeadContent';
import { HeaderRoomListForm } from './Header';
import { History } from '@fragments/History';
import { OrderRoomForm } from './OrderRoomForm';
import { SlugTitle } from './Header/SlugTitle';
import { TourDetail } from './TourDetail';
import i18n from '@src/i18n';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

export const RoomList: React.FC = () => {
    const { tourCode } = useParams();
    const [orderRoomForm] = Form.useForm();

    const [isOpenHistory, setIsOpenHistory] = useState<boolean>(false);

    const { data: dataTourFit, isLoading } = useGetTourFitByCode(tourCode!);
    const { data: dataRoomList, isLoading: loadingRoomList } = useFetchRoomListOfTourFit(dataTourFit?.id);

    const itemCollapseTourDetail: CollapseProps['items'] = [
        {
            key: '1',
            label: <p className="text-md">Thông tin Tour</p>,
            children: <TourDetail data={dataTourFit} />,
        },
    ];
    const itemCollapseOrderRoomForm: CollapseProps['items'] = [
        {
            key: '1',
            label: <p className="text-md">Thông tin hành khách</p>,
            children: (
                <OrderRoomForm
                    orderRoomForm={orderRoomForm}
                    dataTourFit={dataTourFit}
                    data={dataRoomList}
                    isLoading={loadingRoomList}
                />
            ),
        },
    ];

    return (
        <Col>
            <HeadContent
                slugContent={<SlugTitle data={dataTourFit} />}
                titleContent={<HeaderRoomListForm data={dataTourFit} isLoading={isLoading} />}
                buttonActionList={
                    <ButtonRoomList
                        data={dataTourFit}
                        orderRoomForm={orderRoomForm}
                        setIsOpenHistory={setIsOpenHistory}
                    />
                }
            />
            <div className="h-[calc(100vh_-_143px)] bg-white gap-6 py-3 overflow-auto">
                <Col className="grid grid-cols-12 gap-4">
                    <Col className="col-span-12 lg:col-span-3">
                        <Collapse defaultActiveKey={['1']} expandIconPosition={'end'} items={itemCollapseTourDetail} />
                    </Col>
                    <Col className="col-span-12 lg:col-span-9">
                        <Collapse
                            defaultActiveKey={['1']}
                            expandIconPosition={'end'}
                            items={itemCollapseOrderRoomForm}
                        />
                    </Col>
                </Col>
            </div>
            {/* Lịch sử thao tác */}
            {dataTourFit?.id && (
                <History
                    tableName="RoomList"
                    title={i18n.t('Lịch sử thao tác')}
                    id={dataTourFit?.id}
                    isOpenHistory={isOpenHistory}
                    setIsOpenHistory={setIsOpenHistory}
                />
            )}
        </Col>
    );
};
