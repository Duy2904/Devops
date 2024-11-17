import { Avatar, Button, Col, Dropdown, Flex, Layout, MenuProps, Skeleton } from 'antd';
import { faRightFromBracket, faUnlock, faUser } from '@fortawesome/free-solid-svg-icons';

import { AccountModal } from '@components/ui/Modal/AccountModal';
import { DownloadPopover } from '@fragments/Download';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IndexDrawerNotification } from '@fragments/Notification';
import i18n from '@src/i18n';
import { useChangePassword } from '@hooks/identity-next/mutates/useUser';
import { useFetchPersonalIdentityInfo } from '@hooks/identity-next/queries/usePersonal';
import { useMsal } from '@azure/msal-react';
import { useState } from 'react';

export const HeaderComponent = () => {
    const { instance } = useMsal();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const { data: fetchPersonal, refetch } = useFetchPersonalIdentityInfo();
    const { mutateAsync: getChangePasswordUrl } = useChangePassword();

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
        localStorage.removeItem('permissions');
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
        refetch();
    };

    const handleGetChangePasswordUrl = async () => {
        const dataRes = await getChangePasswordUrl();
        window.location.href = dataRes;
    };

    const items: MenuProps['items'] = [
        {
            className: 'text-xs',
            label: <p className="text-xs my-1">{i18n.t('Thông tin tài khoản')}</p>,
            icon: <FontAwesomeIcon icon={faUser} />,
            onClick: handleOpenModal,
            key: '0',
        },
        {
            className: 'text-xs',
            label: <p className="text-xs my-1">{i18n.t('header.logout')}</p>,
            icon: <FontAwesomeIcon icon={faRightFromBracket} />,
            onClick: handleLogout,
            key: '2',
        },
    ];

    const itemChangePassword = {
        className: 'text-xs',
        label: <p className="text-xs my-1">{i18n.t('Đổi mật khẩu')}</p>,
        icon: <FontAwesomeIcon icon={faUnlock} />,
        onClick: handleGetChangePasswordUrl,
        key: '1',
    };

    if (fetchPersonal?.isExternal) {
        items.splice(1, 0, itemChangePassword);
    }

    return (
        <Layout.Header className={`min-w-[1280px] right-0 bg-white px-0 transition-all shadow`}>
            <Flex className="h-full w-full py-3 px-5" align="center" justify="right">
                <Flex align="center" gap={14}>
                    <DownloadPopover />
                    <IndexDrawerNotification />
                    <Dropdown menu={{ items }} trigger={['click']}>
                        <Button
                            className="border-none shadow-none p-0 h-fit w-fit bg-transparent hover:!bg-transparent"
                            tabIndex={0}
                            onClick={e => e.preventDefault()}
                        >
                            <Flex className="h-10" align="center" gap={10}>
                                <Col className="w-10 h-10">
                                    {fetchPersonal ? (
                                        <>
                                            {fetchPersonal?.imageUrl ? (
                                                <Avatar size={40} src={fetchPersonal?.imageUrl} />
                                            ) : (
                                                <Avatar size={40}>{fetchPersonal?.displayName?.slice(0, 1)}</Avatar>
                                            )}
                                        </>
                                    ) : (
                                        <Skeleton.Avatar className="bg-white/10 rounded-full" active size={40} />
                                    )}
                                </Col>
                                <Flex className="flex-col h-full items-start gap-[6px] hidden md:flex" justify="center">
                                    {fetchPersonal ? (
                                        <>
                                            <p className="leading-none text-[12px] font-medium text-brand-primary truncate max-w-[150px]">
                                                {fetchPersonal?.displayName}
                                            </p>
                                            <Flex align="center" gap={6}>
                                                {(fetchPersonal?.rolesDetail?.[0]?.roleNameAlias ||
                                                    fetchPersonal?.rolesDetail?.[0]?.name) && (
                                                        <p className="bg-brand-primary rounded px-2 py-[2px] text-[10px] text-white font-semibold truncate max-w-[150px]">
                                                            {fetchPersonal?.rolesDetail?.[0]?.roleNameAlias ??
                                                                fetchPersonal?.rolesDetail?.[0]?.name}
                                                        </p>
                                                    )}
                                                <p className="text-black/40 text-xs font-medium truncate max-w-[150px]">
                                                    {fetchPersonal?.groups?.[0]?.groupName}
                                                </p>
                                            </Flex>
                                        </>
                                    ) : (
                                        <>
                                            <Skeleton className="w-20 bg-white/10 rounded" active paragraph={false} />
                                            <Skeleton className="w-28 bg-white/10 rounded" active paragraph={false} />
                                        </>
                                    )}
                                </Flex>
                            </Flex>
                        </Button>
                    </Dropdown>
                </Flex>
            </Flex>
            <AccountModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </Layout.Header>
    );
};
