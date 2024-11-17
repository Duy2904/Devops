import { ReactNode } from 'react';
import { Tooltip } from 'antd';

interface TooltipComponentProps {
    title: string;
    content: ReactNode;
}

export const TooltipComponent: React.FC<TooltipComponentProps> = props => {
    return (
        <Tooltip className="cursor-pointer ml-1 text-gray-400" placement="top" title={props.title}>
            {props.content}
        </Tooltip>
    );
};
