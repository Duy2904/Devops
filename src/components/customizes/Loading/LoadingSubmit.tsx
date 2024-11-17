import { SyncOutlined } from '@ant-design/icons';
import { Tag } from 'antd';

interface LoadingSubmitProps {
    contentLoading: string;
}

export const LoadingSubmit = (_props: LoadingSubmitProps) => {
    return (
        <div className="absolute w-full h-full bg-white/40 z-30 flex justify-center">
            <Tag className="h-fit mt-5" icon={<SyncOutlined spin />} color="processing">
                {_props.contentLoading}
            </Tag>
        </div>
    );
};
