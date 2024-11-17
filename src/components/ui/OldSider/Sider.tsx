import { Col, Menu, MenuProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
    ApartmentOutlined,
    DiffOutlined,
    EnvironmentOutlined,
    PieChartOutlined,
    SafetyCertificateOutlined,
    SettingOutlined,
    SnippetsOutlined,
    TagsOutlined,
} from '@ant-design/icons';
import Can from '@components/common/Can.tsx';
import useHasAnyPermission from '@hooks/useHasAnyPermission.ts';
import i18n from '@src/i18n.ts';
import { rootPaths } from '@src/routers/route.ts';
import { useCollapseSibarStore } from '@store/collapseSibarStore.ts';
import { useSearchTableStore } from '@store/searchTableStore.ts';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { rootPathsNew } from '@src/routers/newRoute';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    onClick?: () => void,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
        onClick,
    } as MenuItem;
}

export const SiderBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [current, setCurrent] = useState(location.pathname);
    const [openKeys, setOpenKeys] = useState(['']);
    const { collapsed } = useCollapseSibarStore(state => state);

    const {
        actions: { resetParams },
    } = useSearchTableStore(state => state);

    // Control Permission
    const items: MenuProps['items'] = [];
    const settingSystemItems: MenuProps['items'] = [];
    const childrenTourFIT: MenuItem[] = []; /*set Children TourFIT*/
    const childrenTourGIT: MenuItem[] = []; /*set Children TourGIT*/
    const childrenVoucher: MenuItem[] = []; /*set Children MenuVoucher*/
    const childrenDiscount: MenuItem[] = []; /*set Children MenuDiscount*/
    const childrenReport: MenuItem[] = []; /*set Children Report*/
    const childrenSettingSystem: MenuItem[] = []; /*set Children Setting System*/
    const childrenVisa: MenuItem[] = []; /*set Children MenuVisa*/
    const childrenManageGlobal: MenuItem[] = []; /*set Children MenuManage*/
    const childrenManageSystem: MenuItem[] = []; /*set Children MenuManage*/

    // Tour FIT
    if (useHasAnyPermission([MyPermissions.TourFitView, MyPermissions.AgencyTourFitView])) {
        childrenTourFIT.push(
            getItem(`${i18n.t('menu.tourFit')}`, rootPaths.fitTours, null, () =>
                navigate({ pathname: rootPaths.fitTours }),
            ),
        );
    }

    // SO for Tour FIT
    if (useHasAnyPermission([MyPermissions.SaleOrderView, MyPermissions.AgencySaleOrderView])) {
        childrenTourFIT.push(
            getItem(`${i18n.t('menu.saleOrder')}`, rootPaths.saleOrders, null, () =>
                navigate({ pathname: rootPaths.saleOrders }),
            ),
        );
    }

    // Quote for Tour FIT
    if (useHasAnyPermission([MyPermissions.QuoteView])) {
        childrenTourFIT.push(
            getItem(`${i18n.t('menu.quote')}`, rootPaths.quoteFitList, null, () =>
                navigate({ pathname: rootPaths.quoteFitList }),
            ),
        );
    }

    // Menu Tour FIT
    if (
        useHasAnyPermission([
            MyPermissions.TourFitView,
            MyPermissions.AgencyTourFitView,
            MyPermissions.SaleOrderView,
            MyPermissions.QuoteView,
            MyPermissions.AgencySaleOrderView,
        ])
    ) {
        items.push(
            getItem(`${i18n.t('menu.tourFit')}`, 'tourFit', <EnvironmentOutlined />, () => undefined, childrenTourFIT),
        );
    }

    // Tour GIT
    if (useHasAnyPermission([MyPermissions.TourGitView])) {
        childrenTourGIT.push(
            getItem(`${i18n.t('menu.tourGit')}`, rootPaths.gitTours, null, () =>
                navigate({ pathname: rootPaths.gitTours }),
            ),
        );
    }

    // Quote for Tour GIT
    if (useHasAnyPermission([MyPermissions.QuoteGitView])) {
        childrenTourGIT.push(
            getItem(`${i18n.t('menu.quote')}`, rootPaths.quoteGitList, null, () =>
                navigate({ pathname: rootPaths.quoteGitList }),
            ),
        );
    }

    // Menu Tour GIT
    if (useHasAnyPermission([MyPermissions.TourGitView])) {
        items.push(
            getItem(`${i18n.t('menu.tourGit')}`, 'tourGit', <ApartmentOutlined />, () => undefined, childrenTourGIT),
        );
    }

    // Receivable Vouchers
    if (useHasAnyPermission([MyPermissions.ReceivableVoucherView])) {
        childrenVoucher.push(
            getItem(`${i18n.t('menu.receivableVoucher')}`, rootPathsNew.receivableList, null, () =>
                navigate({ pathname: rootPathsNew.receivableList }),
            ),
        );
    }

    // Refund Vouchers
    if (useHasAnyPermission([MyPermissions.RefundVoucherView])) {
        childrenVoucher.push(
            getItem(`${i18n.t('menu.refundVoucher')}`, rootPathsNew.refundList, null, () =>
                navigate({ pathname: rootPathsNew.refundList }),
            ),
        );
    }

    // Menu Vouchers
    if (useHasAnyPermission([MyPermissions.ReceivableVoucherView, MyPermissions.RefundVoucherView])) {
        items.push(getItem(`${i18n.t('menu.voucher')}`, 'voucher', <DiffOutlined />, () => undefined, childrenVoucher));
    }

    // Promotion
    if (useHasAnyPermission([MyPermissions.DiscountView])) {
        childrenDiscount.push(
            getItem(`${i18n.t('menu.promoteFromSeat')}`, rootPaths.promoteBySeat, null, () =>
                navigate({ pathname: rootPaths.promoteBySeat }),
            ),
            getItem(`${i18n.t('menu.promoteFromGroup')}`, rootPaths.promoteByGroup, null, () =>
                navigate({ pathname: rootPaths.promoteByGroup }),
            ),
        );
    }

    // Menu Promotion
    if (useHasAnyPermission([MyPermissions.DiscountView])) {
        items.push(
            getItem(`${i18n.t('menu.promoteProgram')}`, 'promote', <TagsOutlined />, () => undefined, childrenDiscount),
        );
    }

    // Visa
    if (useHasAnyPermission([MyPermissions.TourVisaView])) {
        childrenVisa.push(
            getItem(`${i18n.t('menu.visaReceipt')}`, rootPaths.documentReceipt, null, () =>
                navigate({ pathname: rootPaths.documentReceipt }),
            ),
        );
    }

    // Menu Visa
    if (useHasAnyPermission([MyPermissions.TourVisaView])) {
        items.push(getItem(`${i18n.t('menu.visa')}`, 'visa', <SnippetsOutlined />, () => undefined, childrenVisa));
    }

    // Report
    if (useHasAnyPermission([MyPermissions.RevenueReportView])) {
        childrenReport.push(
            getItem(`${i18n.t('menu.revenueTourFit')}`, rootPaths.revenueTourFit, null, () =>
                navigate({ pathname: rootPaths.revenueTourFit }),
            ),
        );
    }

    // Menu Report
    if (useHasAnyPermission([MyPermissions.RevenueReportView])) {
        items.push(
            getItem(`${i18n.t('menu.report')}`, 'report', <PieChartOutlined />, () => undefined, childrenReport),
        );
    }

    // Manage Global

    if (useHasAnyPermission([MyPermissions.AgentView])) {
        childrenManageGlobal.push(
            getItem(`${i18n.t('Thông tin')}`, rootPaths.agentDetail, null, () =>
                navigate({ pathname: rootPaths.agentDetail }),
            ),
        );
    }

    if (useHasAnyPermission([MyPermissions.RolesView])) {
        childrenManageGlobal.push(
            getItem(`${i18n.t('Quyền hạn')}`, rootPaths.roleCompany, null, () =>
                navigate({ pathname: rootPaths.roleCompany }),
            ),
        );
    }

    childrenManageGlobal.push(
        getItem(`${i18n.t('Tài khoản')}`, rootPaths.userList, null, () => navigate({ pathname: rootPaths.userList })),
    );

    // Menu Management System
    if (useHasAnyPermission([MyPermissions.BranchView])) {
        childrenManageSystem.push(
            getItem(`${i18n.t('Chi nhánh')}`, rootPaths.branchList, null, () =>
                navigate({ pathname: rootPaths.branchList }),
            ),
        );
    }

    childrenManageSystem.push(
        getItem(`${i18n.t('menu.department')}`, rootPaths.departmentList, null, () =>
            navigate({ pathname: rootPaths.departmentList }),
        ),
    );

    if (useHasAnyPermission([MyPermissions.AgentView])) {
        childrenManageSystem.push(
            getItem(`${i18n.t('Đại lý')}`, rootPaths.agentList, null, () =>
                navigate({ pathname: rootPaths.agentList }),
            ),
        );
    }

    if (useHasAnyPermission([MyPermissions.GroupRolesView])) {
        childrenManageSystem.push(
            getItem(`${i18n.t('Quyền hạn đại lý')}`, rootPaths.roleAgent, null, () =>
                navigate({ pathname: rootPaths.roleAgent }),
            ),
        );
    }

    if (useHasAnyPermission([MyPermissions.BranchView, MyPermissions.AgentView, MyPermissions.RolesView])) {
        items.push(
            getItem(
                `${i18n.t('Quản lý chung')}`,
                'manage-global',
                <SafetyCertificateOutlined />,
                () => undefined,
                childrenManageGlobal,
            ),
        );
    }

    if (useHasAnyPermission([MyPermissions.BranchView, MyPermissions.AgentView, MyPermissions.RolesView])) {
        items.push(
            getItem(
                `${i18n.t('menu.manageSystem')}`,
                'manage-system',
                <SafetyCertificateOutlined />,
                () => undefined,
                childrenManageSystem,
            ),
        );
    }

    // Approval setting
    if (useHasAnyPermission([MyPermissions.ApprovalView])) {
        childrenSettingSystem.push(
            getItem(`${i18n.t('menu.defaultApprove')}`, '/default-approve', null, () =>
                navigate({ pathname: rootPaths.defaultSetting }),
            ),
        );
    }

    // Notification setting
    if (useHasAnyPermission([MyPermissions.NotificationSettingView])) {
        childrenSettingSystem.push(
            getItem(`${i18n.t('menu.scheduledNotification')}`, '/scheduled-notification', null, () =>
                navigate({ pathname: rootPaths.settingScheduledNotification }),
            ),
        );
    }

    // Menu Setting System
    if (useHasAnyPermission([MyPermissions.SystemSettingView])) {
        settingSystemItems.push(
            getItem(
                `${i18n.t('menu.setting')}`,
                'setting',
                <SettingOutlined />,
                () => undefined,
                childrenSettingSystem,
            ),
        );
    }

    // submenu keys of first level
    const rootSubmenuKeys = ['tourFit', 'tourGit', 'voucher', 'promote', 'visa', 'setting', 'report', 'manage'];

    const onOpenChange: MenuProps['onOpenChange'] = keys => {
        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const handleClick = (e: AnyObject) => {
        setCurrent(e.key);
        resetParams();
    };

    useEffect(() => {
        if (location) {
            if (current !== location.pathname) {
                setCurrent(location.pathname);
            }
        }
    }, [location, current]);

    useEffect(() => {
        if (current && !collapsed) {
            const pathSplit = current.split('-');

            switch (current) {
                case rootPaths.saleOrders:
                case rootPaths.saleOrderForm:
                case rootPaths.fitTours:
                case rootPaths.quoteFitList:
                    setOpenKeys(['tourFit']);
                    break;
                case rootPaths.quoteFitForm:
                case rootPaths.quoteGitList:
                case rootPaths.quoteGitForm:
                case rootPaths.gitTours:
                    setOpenKeys(['tourGit']);
                    break;
                case rootPathsNew.refundList:
                case rootPathsNew.receivableList:
                    setOpenKeys(['voucher']);
                    break;
                case rootPaths.promoteByGroup:
                case rootPaths.promoteBySeat:
                    setOpenKeys(['promote']);
                    break;
                case rootPaths.documentReceipt:
                    setOpenKeys(['visa']);
                    break;
                case rootPaths.settingScheduledNotification:
                case rootPaths.defaultSetting:
                    setOpenKeys(['setting']);
                    break;
                case rootPaths.revenueTourFit:
                    setOpenKeys(['report']);
                    break;
                case rootPaths.agentDetail:
                case rootPaths.userList:
                case rootPaths.roleCompany:
                case rootPaths.roleCompanyForm:
                case rootPaths.userForm:
                    setOpenKeys(['manage-global']);
                    break;
                case rootPaths.branchList:
                case rootPaths.branchForm:
                case rootPaths.departmentList:
                case rootPaths.roleAgent:
                case rootPaths.roleAgentForm:
                case rootPaths.agentList:
                case rootPaths.agentForm:
                    setOpenKeys(['manage-system']);
                    break;
                default:
                    setOpenKeys([pathSplit[pathSplit.length - 1]]);
                    break;
            }
        }
    }, [collapsed, current]);

    return (
        <div className="flex flex-col justify-between w-full bg-[#F6F7FA] h-screen border border-solid border-transparent border-r-slate-200/10 pt-20">
            <Col>
                <Menu
                    className={`border !border-none !bg-[#F6F7FA]`}
                    onClick={handleClick}
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    selectedKeys={[current]}
                    mode="inline"
                    items={items}
                />
            </Col>
            <Can permissions={[MyPermissions.SystemSettingView]}>
                <div>
                    <Menu
                        className={`pt-5 border !border-none bg-[#F6F7FA]`}
                        onClick={handleClick}
                        openKeys={openKeys}
                        onOpenChange={onOpenChange}
                        selectedKeys={[current]}
                        mode="inline"
                        items={settingSystemItems}
                    />
                </div>
            </Can>
        </div>
    );
};
