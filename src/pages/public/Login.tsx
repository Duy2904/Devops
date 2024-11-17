import React, { useCallback, useEffect } from 'react';

import { InteractionType } from '@azure/msal-browser'
import { MsalAuthenticationTemplate } from '@azure/msal-react'
import { Spin } from 'antd';
import i18n from '@src/i18n.ts';
import { loginRequest } from '../../services/authConfig.ts';
import { rootPaths } from '../../routers/route.ts';
import { toastSuccess } from '@components/ui/Toast/Toast.tsx';
import { useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();

    const handleLoginPopup = useCallback(async () => {
        await instance
            .loginRedirect({
                ...loginRequest
            });
    }, [instance]);

    const handleRedirect = useCallback(() => {
        if (!activeAccount) {
            return handleLoginPopup();
        } else {
            toastSuccess('Đăng nhập thành công', `${i18n.t('Welcome')} ${activeAccount.name}`);
            return navigate({ pathname: rootPaths.dashboard }, { replace: true });
        }

    }, [activeAccount, handleLoginPopup, navigate])

    useEffect(() => {
        handleRedirect();
    }, [handleRedirect]);

    return <MsalAuthenticationTemplate
        interactionType={InteractionType.Redirect}
        loadingComponent={() => <div className='flex h-screen items-center justify-center'>
            <Spin size='large' />
        </div>}
        errorComponent={(err) => {
            err.login()
            return <></>
        }}
    />
};

