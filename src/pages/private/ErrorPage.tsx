import { Button, Result } from 'antd';

import { rootPaths } from '@src/routers/route';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const ErrorPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Result
            status="404"
            title="404"
            subTitle={t('Xin lỗi. Trang của bạn không tồn tại hoặc đã xoá')}
            extra={
                <Button type="primary" onClick={() => navigate(rootPaths.dashboard)}>
                    {t('Quay về trang chủ')}
                </Button>
            }
        />
    );
};
