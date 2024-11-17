import { Flex } from 'antd';
import HeadTitleBlock from '@components/common/HeadTitleBlock';
import { ReactNode } from 'react';

export interface HeadContentProps {
    slugContent: ReactNode;
    titleContent: ReactNode;
    buttonActionList: ReactNode;
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
