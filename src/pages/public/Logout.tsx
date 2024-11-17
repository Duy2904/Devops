import { useMsal } from '@azure/msal-react';
import { useFetchPersonalIdentityInfo } from '@hooks/identity-next/queries/usePersonal';
import React, { useEffect } from 'react'

export const LogoutPage: React.FC = () => {
    const { instance } = useMsal();
    const { data: fetchPersonal } = useFetchPersonalIdentityInfo();

    useEffect(() => {
        if ((fetchPersonal && fetchPersonal.isExternal) || !fetchPersonal) {
            instance.logoutRedirect({
                account: instance.getActiveAccount(),
                postLogoutRedirectUri: '/',
            });
        }
        if (fetchPersonal && !fetchPersonal.isExternal) {
            instance.logoutPopup({
                account: instance.getActiveAccount(),
                mainWindowRedirectUri: '/',
            });
        }
    }, [fetchPersonal, instance]);

    return (
        <></>
    )
}
