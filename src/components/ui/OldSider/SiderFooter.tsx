import { useMsal } from '@azure/msal-react';
import { Avatar, Flex } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useCollapseSibarStore } from '../../../store/collapseSibarStore';

export const SiderFooter = () => {
    const { collapsed } = useCollapseSibarStore(state => state);
    const { instance } = useMsal();
    const activeAccount = instance.getActiveAccount();
    const logout = () => {
        instance.logoutRedirect();
    };
    return (
        <div className={`flex ${!collapsed ? 'h-[60px] items-center justify-between' : 'flex-col h-auto'} p-3 gap-3`}>
            <Flex className=" h-10" align="center" justify="center" gap={8}>
                <Avatar
                    size={35}
                    src={`${
                        window.location.protocol + '//' + window.location.hostname + ':' + window.location.port
                    }/avatar.jpeg`}
                >
                    {activeAccount?.name?.slice(0, 1)}
                </Avatar>
                {!collapsed && (
                    <Flex className="flex-col h-full items-start" justify="center">
                        <p className="leading-none text-sm font-semibold text-headerText">
                            {activeAccount?.name?.split(',')[0]}
                        </p>
                        <p className="leading-none text-xs text-headerText">{activeAccount?.name?.split(',')[1]}</p>
                    </Flex>
                )}
            </Flex>
            <div className="flex justify-center">
                <LogoutOutlined onClick={logout} onKeyDown={logout} />
            </div>
        </div>
    );
};
