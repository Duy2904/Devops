import { Col, Tag } from 'antd';

import { ReactNode } from 'react';

export interface HeaderDetailProps {
    content?: string | ReactNode;
}

export const HeaderDetail: React.FC<HeaderDetailProps> = props => {
    return (
        <Tag className="w-full p-2">
            <h5>How to use?</h5>
            <Col className="text-greyColor-third *:font-normal *:text-xs mt-1">{props.content}</Col>
        </Tag>
    );
};
