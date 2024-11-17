import { Flex } from 'antd';
import { ReactNode } from 'react';

import HeadTitleBlock from '../../common/HeadTitleBlock';

export interface HeadContentProps {
    slugContent?: ReactNode;
    titleContent?: ReactNode;
    buttonActionList?: ReactNode;
}

export const HeadContent: React.FC<HeadContentProps> = props => {
    const { slugContent, titleContent, buttonActionList } = props;
    return (
        <HeadTitleBlock>
            <>
                {slugContent}
                <Flex align="center" justify="space-between">
                    {titleContent}
                    <Flex gap={8}>{buttonActionList}</Flex>
                </Flex>
            </>
        </HeadTitleBlock>
    );
};
