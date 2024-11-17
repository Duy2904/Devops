import { CheckOutlined, DoubleRightOutlined, LoadingOutlined } from '@ant-design/icons';
import { Col, Space, Tooltip } from 'antd';

import i18n from '@src/i18n';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { useMarkAllReadNotifications } from './hooks/useNotification';

interface NotificationTitleProps {
    totalNotification: number;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NotificationTitle: React.FC<NotificationTitleProps> = props => {
    const { totalNotification, setOpen } = props;

    // useMutation
    const { mutateAsync: markAllReadNotifications, isLoading } = useMarkAllReadNotifications();

    const markAllRead = async () => {
        await markAllReadNotifications();
        toastSuccess(
            `${i18n.t('notification.title')}`,
            `${i18n.t('action.markAllRead')} ${i18n.t('message.default.success')}`,
        );
    };

    return (
        <Space className="flex items-center justify-between w-full p-3">
            {totalNotification > 0 && (
                <Tooltip title={i18n.t('action.markAllRead')}>
                    <Col
                        className="flex flex-col items-center gap-1 cursor-pointer text-sm bg-blue-700 p-2 rounded-full text-white"
                        onClick={markAllRead}
                    >
                        {isLoading ? <LoadingOutlined /> : <CheckOutlined />}
                    </Col>
                </Tooltip>
            )}
            <Col className="flex items-center gap-1">
                <p className="text-sm">
                    {i18n.t('notification.title')} {totalNotification > 0 && `(${totalNotification})`}
                </p>
            </Col>
            <Col
                className="flex flex-col items-center gap-1 cursor-pointer text-sm bg-slate-300 p-2 rounded-full text-black"
                onClick={() => setOpen(false)}
            >
                <DoubleRightOutlined />
            </Col>
        </Space>
    );
};
