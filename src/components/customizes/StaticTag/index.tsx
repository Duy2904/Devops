import { Tag } from 'antd';

export interface IStaticTagProps {
    type: string;
    showLabel?: boolean;
    color?: string;
}

export const StaticTag = (props: IStaticTagProps) => {
    const { type, showLabel } = props;
    return (
        <div className="flex gap-2 justify-center items-center text-slate-500">
            {showLabel && <p className="text-xs">Trạng thái</p>}
            <Tag className="font-semibold m-0" bordered={true} color={props.color}>
                {type}
            </Tag>
        </div>
    );
};
