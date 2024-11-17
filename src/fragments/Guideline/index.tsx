import { Col, Flex, Tabs, TabsProps } from 'antd';

import { ColorsGuideline } from './Components/Colors';
import { GridSystemGuideline } from './Components/GridSystem';
import { Header } from './Components/Header';
import { InputGuideline } from './Components/Input';
import SearchBoxGuideline from './Components/SearchBox';
import { SpacingGuideline } from './Components/Spacing';
import { IconSvgGuideline } from './Components/Svg';
import { TagsLabelGuideline } from './Components/TagsLabel';
import { TagStatusGuideline } from './Components/TagStatus';
import { TypographyGuideline } from './Components/Typography';

const items: TabsProps['items'] = [
    { key: '1', label: 'Colors', children: <ColorsGuideline /> },
    { key: '2', label: 'Typography', children: <TypographyGuideline /> },
    { key: '3', label: 'Grid Systems', children: <GridSystemGuideline /> },
    { key: '4', label: 'Spacing', children: <SpacingGuideline /> },
    { key: '5', label: 'Textfields', children: 'Content of Tab Pane 3' },
    { key: '6', label: 'Selectors', children: 'Content of Tab Pane 3' },
    { key: '7', label: 'Buttons', children: 'Content of Tab Pane 3' },
    { key: '8', label: 'SearchBox', children: <SearchBoxGuideline /> },
    { key: '9', label: 'Tags status', children: <TagStatusGuideline /> },
    { key: '10', label: 'Tags Label', children: <TagsLabelGuideline /> },
    { key: '11', label: 'Icon svg', children: <IconSvgGuideline /> },
    { key: '12', label: 'Input', children: <InputGuideline /> },
];

export const GuidelineTempIndex: React.FC = () => {
    return (
        <div className="h-full bg-white p-3">
            <Flex align="center" justify="space-between">
                <Header />
            </Flex>
            <Col className="mt-6">
                <Tabs type="card" tabPosition="left" defaultActiveKey="1" items={items} />
            </Col>
        </div>
    );
};
