import { Col } from 'antd';
import { CollapseBlock } from './components/CollapseBlock';
import { Fragment } from 'react';
import { Header } from './components/Header';
import { HeaderContent } from './components/Content';
import LayoutContentBlock from '@src/new/components/common/LayoutContentBlock';
import { SkeletonPage } from '../../components/SkeletonPage';
import { useGetSaleOrder } from '../../hooks/queries';
import { useParams } from 'react-router-dom';

export const SaleOrderViewDetail: React.FC = () => {
    const { soId } = useParams<string>();
    const { data, isLoading } = useGetSaleOrder(soId);

    if (isLoading) {
        return <SkeletonPage />;
    }

    return (
        <Col className="h-full">
            <Header data={data} />
            <LayoutContentBlock className="max-h-[calc(100vh_-_220px)] px-1">
                <Fragment>
                    <HeaderContent data={data} />
                    <CollapseBlock data={data} />
                </Fragment>
            </LayoutContentBlock>
        </Col>
    );
};
