import { Button } from 'antd';
import { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
    handleButton: MouseEventHandler<HTMLElement> | undefined;
    icon: ReactNode;
    content: string;
    isLoading: boolean;
}

export const ButtonAction: React.FC<ButtonProps> = props => {
    return (
        <Button
            className="!text-xs"
            type="default"
            icon={props.icon}
            onClick={props.handleButton}
            loading={props.isLoading}
        >
            {props.content}
        </Button>
    );
};
