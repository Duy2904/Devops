import { CheckCircleTwoTone, CloseCircleTwoTone, ExclamationCircleTwoTone, SyncOutlined } from '@ant-design/icons';

import { DownloadSignalModel } from '../../Feature';
import { Flex } from 'antd';
import { Link } from 'react-router-dom';

export interface ItemDownloadProps {
    item: DownloadSignalModel;
}

export const ItemDownload: React.FC<ItemDownloadProps> = props => {
    const { item } = props;
    return (
        <Flex className="pb-3" justify="space-between">
            <Link
                className={`text-[10px] line-clamp-1 ${
                    item.title !== 'DownloadDoneReport' && 'text-black cursor-default hover:text-black'
                }`}
                to={item.data?.fileUrl ?? '#'}
            >
                {item.data?.fileName}
            </Link>
            {item.title == 'DownloadDoneReport' && <CheckCircleTwoTone twoToneColor="#52c41a" />}
            {item.title == 'DownloadReportError' && <CloseCircleTwoTone twoToneColor="#e40513" />}
            {item.title == 'DownloadReportEndTask' && <ExclamationCircleTwoTone twoToneColor="#ffc107" />}
            {item.title && ['DownloadReportInProgress', 'DownloadReportStart'].includes(item.title) && (
                <SyncOutlined className="text-blue-500" spin />
            )}
        </Flex>
    );
};
