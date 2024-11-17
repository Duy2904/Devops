import { Button, Result } from 'antd';

import { rootPaths } from '@src/routers/route';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const UnAuthorizedPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Result
            status="403"
            title="403"
            subTitle={t('Bạn không có quyền truy cập vào trang này')}
            extra={
                <Button
                    type="primary"
                    onClick={() => {
                        navigate({ pathname: rootPaths.dashboard }, { replace: true });
                    }}
                >
                    {t('Quay về trang chủ')}
                </Button>
            }
        />
    );
};
