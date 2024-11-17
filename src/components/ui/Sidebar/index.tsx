import { Button, Col, Flex, Tooltip } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import { ItemSidebar, listMenu } from './ListMenu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import Can from '@components/common/Can';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import isEmpty from 'lodash/isEmpty';
import logoB from '@assets/images/hnh_logo.svg';
import logoS from '@assets/images/hnh_logo_s.svg';
import { rootPaths } from '@src/routers/route';
import { useBackStore } from '@src/new/shared/stores/backStore';
import { useCollapseSibarStore } from '@store/collapseSibarStore';
import { useSearchTableStore } from '@store/searchTableStore';
import { useSearchTableStoreNew } from '@src/new/shared/stores/SearchTableStore';

export const NewSiderBar: React.FC = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [pathSlug, setPathSlug] = useState<string>(rootPaths.dashboard);

    // Store
    const {
        actions: { resetParams },
    } = useSearchTableStore(state => state);
    const {
        actions: { resetParamsNew },
    } = useSearchTableStoreNew(state => state);
    const { collapsed, setCollapse } = useCollapseSibarStore(state => state);
    const { pathStore, setPathStore } = useBackStore(state => state);

    const renderFullParent = (item: ItemSidebar) => {
        if (isEmpty(item.child) || !item.child) {
            return renderFullChild(item);
        }
        return (
            <Can permissions={item.permissionsAccess!}>
                <div>
                    <p className="font-bold text-xs text-[#3E5BE0] mb-4 uppercase">{item.title}</p>
                    <Col className="flex flex-col gap-3">
                        {item.child?.map((child: ItemSidebar) => (
                            <Fragment key={child.key}>{renderFullChild(child)}</Fragment>
                        ))}
                    </Col>
                </div>
            </Can>
        );
    };

    const renderFullChild = (item: ItemSidebar) => {
        return (
            <Can permissions={item.permissionsAccess!}>
                <Link
                    to={item.url!}
                    onClick={handleResetParams}
                    className={` p-2 rounded-lg transition-all ease-linear ${
                        pathSlug == item.url!
                            ? 'bg-[#3E5BE0] text-white hover:text-white'
                            : 'hover:bg-black/5 text-black hover:text-black'
                    }`}
                >
                    <Flex align="center" gap={14}>
                        <FontAwesomeIcon
                            className={` ${pathSlug == item.url! ? 'text-white' : 'text-[#2A2A2A]/30'}`}
                            icon={item.icon!}
                            size="lg"
                        />{' '}
                        {item.title}
                    </Flex>
                </Link>
            </Can>
        );
    };

    const renderFullSider = () => {
        return (
            <Col className="flex flex-col gap-8 w-full h-full overflow-auto no-scrollbar">
                {listMenu.map((item: ItemSidebar) => (
                    <Fragment key={item.key}>{renderFullParent(item)}</Fragment>
                ))}
            </Col>
        );
    };

    const renderCollapseParent = (item: ItemSidebar) => {
        if (isEmpty(item.child) || !item.child) {
            return renderCollapseChild(item);
        }
        return (
            <Can permissions={item.permissionsAccess!}>
                <Flex align="start" justify="center" gap={6}>
                    <span className="uppercase font-bold text-xs text-[#3E5BE0] rotate-180 whitespace-pre vertical-rl">
                        {item.titleCollapse}
                    </span>
                    <Col className="flex flex-col gap-1 w-full">
                        {item.child?.map((child: ItemSidebar) => (
                            <Fragment key={child.key}>{renderCollapseChild(child)}</Fragment>
                        ))}
                    </Col>
                </Flex>
            </Can>
        );
    };

    const renderCollapseChild = (item: ItemSidebar) => {
        return (
            <Can permissions={item.permissionsAccess!}>
                <Tooltip placement="right" title={item.title}>
                    <Link to={item.url!} className={`flex justify-center`} onClick={handleResetParams}>
                        <Flex
                            className={`w-8 h-8 rounded-lg transition-all ease-linear ${
                                pathSlug == item.url! ? 'bg-[#3E5BE0]' : 'hover:bg-black/5'
                            } `}
                            align="center"
                            justify="center"
                        >
                            <FontAwesomeIcon
                                icon={item.icon!}
                                className={` ${pathSlug == item.url! ? 'text-white' : 'text-[#2A2A2A]/30'}`}
                                size="lg"
                            />
                        </Flex>
                    </Link>
                </Tooltip>
            </Can>
        );
    };

    const renderCollapseSider = () => {
        return (
            <Col className="flex flex-col gap-8 w-full h-full overflow-auto no-scrollbar">
                {listMenu.map((item: ItemSidebar) => (
                    <Fragment key={item.key}>{renderCollapseParent(item)}</Fragment>
                ))}
            </Col>
        );
    };

    const toggleSider = () => {
        setCollapse(!collapsed);
    };

    const handleResetParams = () => {
        resetParams();
        resetParamsNew();
    };

    useEffect(() => {
        if (pathname) {
            setPathSlug(pathname);
        }
    }, [pathname]);

    useEffect(() => {
        if (pathStore == null && pathname) {
            setPathStore(pathname);
        }
    }, [pathname, pathStore, setPathStore]);

    return (
        <Col className={`bg-[#F6F7FA] relative ${collapsed ? 'px-3' : 'px-5'}`}>
            <Flex className="w-full h-16" justify="center" align="center">
                <img
                    className="cursor-pointer object-cover"
                    onClick={() => navigate(rootPaths.dashboard)}
                    src={collapsed ? logoS : logoB}
                    alt="Hong Ngoc Ha Travel"
                />
            </Flex>
            <Col className="py-5 pb-16 h-[calc(100vh_-_64px)]">
                {collapsed ? renderCollapseSider() : renderFullSider()}
            </Col>
            <Button
                onClick={toggleSider}
                className={`absolute bottom-4 font-semibold border-[#DBDBDB] rounded-lg bg-white px-3 py-1 ${
                    collapsed ? ' left-1/2 -translate-x-1/2' : 'left-5'
                }`}
            >
                {collapsed ? (
                    <FontAwesomeIcon icon={faChevronRight} />
                ) : (
                    <>
                        <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
                        Thu gọn
                    </>
                )}
            </Button>
        </Col>
    );
};
