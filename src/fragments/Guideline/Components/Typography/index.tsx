import { Col } from 'antd';
import { HeaderDetail } from '../HeaderDetail';

export const TypographyGuideline: React.FC = () => {
    return (
        <Col className="pl-5">
            <HeaderDetail
                content={
                    <Col>
                        <p>- Heading using same as HTML tag: h1, h2, h3, h4, h5, h6</p>
                        <p>- Text font using with Tailwind CSS: text-lg/md/normal/sm</p>
                    </Col>
                }
            />
            <Col className=" lg:h-[calc(100vh_-_150px)] overflow-y-auto pb-20 pt-10">
                <Col className="grid grid-cols-4 items-center mb-10">
                    <h6 className="text-greyColor-third font-normal">Name</h6>
                    <h6 className="text-center text-greyColor-third font-normal">Font size</h6>
                    <h6 className="text-center text-greyColor-third font-normal">Line height</h6>
                    <h6 className="text-center text-greyColor-third font-normal">How to use</h6>
                </Col>
                <Col className="grid grid-cols-4 items-center mb-5 h-16">
                    <h1>Heading1</h1>
                    <h6 className="text-center text-greyColor-fourth">56px</h6>
                    <h6 className="text-center text-greyColor-fourth">61.6px</h6>
                    <h6 className="text-center text-greyColor-fourth">{`<h1></h1>`}</h6>
                </Col>
                <Col className="grid grid-cols-4 items-center mb-5 h-16">
                    <h2>Heading2</h2>
                    <h6 className="text-center text-greyColor-fourth">48px</h6>
                    <h6 className="text-center text-greyColor-fourth">52.8px</h6>
                    <h6 className="text-center text-greyColor-fourth">{`<h2></h2>`}</h6>
                </Col>
                <Col className="grid grid-cols-4 items-center mb-5 h-16">
                    <h3>Heading3</h3>
                    <h6 className="text-center text-greyColor-fourth">40px</h6>
                    <h6 className="text-center text-greyColor-fourth">44px</h6>
                    <h6 className="text-center text-greyColor-fourth">{`<h3></h3>`}</h6>
                </Col>
                <Col className="grid grid-cols-4 items-center mb-5 h-16">
                    <h4>Heading4</h4>
                    <h6 className="text-center text-greyColor-fourth">32px</h6>
                    <h6 className="text-center text-greyColor-fourth">35.2px</h6>
                    <h6 className="text-center text-greyColor-fourth">{`<h4></h4>`}</h6>
                </Col>
                <Col className="grid grid-cols-4 items-center mb-5 h-16">
                    <h5>Heading5</h5>
                    <h6 className="text-center text-greyColor-fourth">24px</h6>
                    <h6 className="text-center text-greyColor-fourth">26.4px</h6>
                    <h6 className="text-center text-greyColor-fourth">{`<h5></h5>`}</h6>
                </Col>
                <Col className="grid grid-cols-4 items-center mb-5 h-16">
                    <h6>Heading6</h6>
                    <h6 className="text-center text-greyColor-fourth">20px</h6>
                    <h6 className="text-center text-greyColor-fourth">22px</h6>
                    <h6 className="text-center text-greyColor-fourth">{`<h6></h6>`}</h6>
                </Col>
                <Col className="grid grid-cols-4 items-center mb-5 h-16">
                    <p className="text-lg">Large Text</p>
                    <h6 className="text-center text-greyColor-fourth">20px</h6>
                    <h6 className="text-center text-greyColor-fourth">28px</h6>
                    <h6 className="text-center text-greyColor-fourth">text-lg</h6>
                </Col>
                <Col className="grid grid-cols-4 items-center mb-5 h-16">
                    <p className="text-md">Medium Text</p>
                    <h6 className="text-center text-greyColor-fourth">18px</h6>
                    <h6 className="text-center text-greyColor-fourth">25.2px</h6>
                    <h6 className="text-center text-greyColor-fourth">text-md</h6>
                </Col>
                <Col className="grid grid-cols-4 items-center mb-5 h-16">
                    <p className="text-normal">Normal Text</p>
                    <h6 className="text-center text-greyColor-fourth">16px</h6>
                    <h6 className="text-center text-greyColor-fourth">22.4px</h6>
                    <h6 className="text-center text-greyColor-fourth">text-normal</h6>
                </Col>
                <Col className="grid grid-cols-4 items-center mb-5 h-16">
                    <p className="text-sm">Small Text</p>
                    <h6 className="text-center text-greyColor-fourth">14px</h6>
                    <h6 className="text-center text-greyColor-fourth">19.6px</h6>
                    <h6 className="text-center text-greyColor-fourth">text-sm</h6>
                </Col>
            </Col>
        </Col>
    );
};
