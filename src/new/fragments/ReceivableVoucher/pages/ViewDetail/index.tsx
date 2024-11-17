import { Col } from 'antd';
import { Header } from './components/Header';
import LayoutContentBlock from '@src/new/components/common/LayoutContentBlock';
import { SkeletonPage } from '../../components/SkeletonPage';
import { useFetchRCDetail } from '../../hooks/useRCDetail';
import { useParams } from 'react-router-dom';
import { CollapseBlock } from './components/CollapseBlock';

export const RCViewDetailIndex: React.FC = () => {
    const { recId } = useParams<string>();

    const { data, isLoading } = useFetchRCDetail(recId!);

    if (isLoading) {
        return <SkeletonPage />;
    }

    return (
        <Col className="h-full">
            <Header data={data} />
            <LayoutContentBlock className="max-h-[calc(100vh_-_220px)] px-1">
                <CollapseBlock data={data} />
            </LayoutContentBlock>
        </Col>
    );
};
