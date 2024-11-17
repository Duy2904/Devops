import { Col } from 'antd';
import { AnyObject } from 'antd/es/_util/type';

import { generateData, TypeContent } from './Features/AutoIncrementCodeFeature';

type PreviewDataProps = {
    valuesData: AnyObject;
};

export const PreviewData: React.FC<PreviewDataProps> = props => {
    const previewData = generateData(props.valuesData, TypeContent.preview);
    const exampleData = generateData(props.valuesData, TypeContent.example);
    return (
        <Col className="flex flex-col gap-5">
            <Col className="flex flex-col lg:flex-row items-start lg:items-center gap-1 lg:gap-3">
                <p className="w-fit lg:w-28">Xem trước:</p>
                <p className="my-2 p-4 py-3 bg-slate-200/60 rounded-lg text-lg w-full">{previewData}</p>
            </Col>
            <Col className="flex flex-col lg:flex-row items-start lg:items-center gap-1 lg:gap-3">
                <p className="w-fit lg:w-28">Ví dụ:</p>
                <p className="my-2 p-4 py-3 bg-slate-200/60 rounded-lg text-lg  w-full">{exampleData}</p>
            </Col>
        </Col>
    );
};
