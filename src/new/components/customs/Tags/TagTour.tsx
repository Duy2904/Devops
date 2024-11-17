import { Flex } from 'antd';

export interface TagTourProps {
    color?: string;
    icon?: string;
    content?: string;
}

export const TagTour: React.FC<TagTourProps> = props => {
    const { color, icon, content } = props;
    return (
        <Flex align="center" className="w-fit border-[2px] rounded border-solid" style={{ borderColor: color }}>
            <Flex className="w-5 h-5 px-[5px] bg-white rounded" align="center" justify="center">
                <img className="w-full" src={icon} />
            </Flex>
            <Flex align="center" className="px-1 rounded-sm h-5 text-xs text-white" style={{ backgroundColor: color }}>
                {content}
            </Flex>
        </Flex>
    );
};
