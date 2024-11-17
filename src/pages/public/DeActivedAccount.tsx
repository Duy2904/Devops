import { Button, Result } from "antd";

import { useFetchPersonalIdentityInfo } from "@hooks/identity-next/queries/usePersonal";
import { useMsal } from "@azure/msal-react";

export const DeActivedAccount = () => {
    const { instance } = useMsal();
    const { data: fetchPersonal } = useFetchPersonalIdentityInfo();

    const handleLogout = async () => {
        if (fetchPersonal?.isExternal) {
            instance.logoutRedirect({
                account: instance.getActiveAccount(),
                postLogoutRedirectUri: '/',
            });
        } else {
            instance.logoutPopup({
                account: instance.getActiveAccount(),
                mainWindowRedirectUri: '/',
            });
        }
    };
    return (
        <Result
    status="500"
    title="Access Denied"
    subTitle="Xin lỗi, tài khoản không có quyền truy cập. Vui lòng liên hệ quản trị viên"
    extra={<Button type="primary" onClick={handleLogout}>Trở về trang đăng nhập</Button>}
  />
    );
};