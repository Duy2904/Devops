import { Outlet, useNavigate } from 'react-router-dom';

import { AppConfig } from '@utils/config.ts';
import { Content } from 'antd/es/layout/layout';
import { HeaderComponent } from '../../components/ui/Header/index.tsx';
import { Layout, Spin } from 'antd';
import { NewSiderBar } from '@components/ui/Sidebar/index.tsx';
import Sider from 'antd/es/layout/Sider';
import Toast from '../../components/ui/Toast/Toast.tsx';
import clsx from 'clsx';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { rootPaths } from '../../routers/route.ts';
import useAuthStore from '@store/authStore.ts';
import { useCollapseSibarStore } from '../../store/collapseSibarStore.ts';
import { useEffect } from 'react';
import { useFetchPersonalIdentityInfo } from '@hooks/identity-next/queries/usePersonal.ts';
import { useGetMyApprovalSetting } from '@hooks/queries/useGetApprovalSetting.ts';
import { useMsal } from '@azure/msal-react';

export const IndexPage = () => {
    const navigate = useNavigate();
    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();
    const { data: fetchPersonal } = useFetchPersonalIdentityInfo();

    // Store
    const { collapsed } = useCollapseSibarStore(state => state);
    const { setMyApprovalPermission } = useAuthStore();

    // Query
    const { data: dataMyApprovalSetting } = useGetMyApprovalSetting();

    useEffect(() => {
        if (!isNil(dataMyApprovalSetting) && !isEmpty(dataMyApprovalSetting)) {
            setMyApprovalPermission(dataMyApprovalSetting);
        }
    }, [dataMyApprovalSetting, setMyApprovalPermission]);

    useEffect(() => {
        if (activeAccount === null) {
            navigate({ pathname: rootPaths.login }, { replace: true });
        } else {
            const prevPath = localStorage.getItem(AppConfig.StorageEnum.PrevPath);
            if (prevPath) {
                navigate(prevPath);
                localStorage.removeItem(AppConfig.StorageEnum.PrevPath);
            }
        }
    }, [activeAccount, navigate]);

    useEffect(() => {
        if (fetchPersonal && (!fetchPersonal.isActive || !fetchPersonal.groups?.[0]?.healthz)) {
            return navigate({ pathname: rootPaths.deActived }, { replace: true });
        }
    }, [fetchPersonal, navigate]);

    if (!fetchPersonal || (fetchPersonal && !fetchPersonal.groups?.[0]?.healthz)) {
        return <div className='flex h-screen items-center justify-center'>
            <Spin size='large' />
        </div>;
    }

    return (
        <Layout hasSider className="h-screen !overflow-y-hidden bg-white">
            <div className="relative w-full max-w-[1920px] mx-auto">
                <Layout>
                    <Sider
                        trigger={null}
                        className={`!absolute h-screen !overflow-y-hidden left-0 top-0 bottom-0 z-20 shadow ${collapsed ? ' -left-60' : 'left-0'
                            }`}
                        collapsible
                        width={240}
                        collapsedWidth={80}
                        collapsed={collapsed}
                    >
                        <NewSiderBar />
                    </Sider>
                    <Layout className={`h-screen bg-white transition-all ${collapsed ? 'ml-20' : 'ml-60'}`}>
                        <HeaderComponent />
                        <Content
                            className={clsx(
                                'p-5 overflow-auto !overflow-y-hidden min-w-[1280px] h-[calc(100vh_-_60px)]',
                            )}
                        >
                            <Outlet />
                            <Toast />
                        </Content>
                    </Layout>
                </Layout>
            </div>
        </Layout>
    );
};
