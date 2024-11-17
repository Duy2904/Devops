import { Button, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { mapSearchRequest, useExportSaleOrder } from '@hooks/queries/useSaleOrders';

import Can from '@components/common/Can';
import { ExportButton } from '@components/customizes/Button/ExportButton';
import Format from '@utils/format';
import { HeadContent } from '@components/ui/HeadContent';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { PlusOutlined } from '@ant-design/icons';
import { SearchSaleOrdersViewRequest } from '@sdk/tour-operations';
import { SlugSaleOrder } from './Slug';
import { TitleHeader } from '@components/ui/TitleHeader';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';
import { useDebouncedCallback } from 'use-debounce';
import { useNavigate } from 'react-router-dom';
import { useSearchTableStoreNew } from '@src/new/shared/stores/SearchTableStore';
import useSignalRInstance from '@hooks/useSignalRInstance';
import { useTourScheduleStore } from '@store/tourScheduleStore';

export const DashboardHeader: React.FC = () => {
    const navigate = useNavigate();

    // State
    const [searchRequest, setSearchRequest] = useState<SearchSaleOrdersViewRequest>({});

    // Store
    const {
        actions: { setTourSchedule },
    } = useTourScheduleStore(state => state);
    const { tableParams } = useSearchTableStoreNew(state => state);
    const { signalConnectedId } = useSignalRInstance(state => state);

    // Mutate
    const { mutateAsync: exportSaleOrder } = useExportSaleOrder();

    const handleExportExcel = useDebouncedCallback(async () => {
        delete searchRequest.pageNumber;
        delete searchRequest.pageSize;
        if (signalConnectedId) {
            await exportSaleOrder({
                ...searchRequest,
                connectionId: signalConnectedId,
                fileName: Format.formatExportExcelTitle('SO', searchRequest),
                locale: 'vi-VN',
            });
        }
    }, 500);

    useEffect(() => {
        if (tableParams) {
            setSearchRequest(mapSearchRequest(tableParams));
        }
    }, [tableParams]);

    return (
        <Col>
            <HeadContent
                slugContent={<SlugSaleOrder />}
                titleContent={<TitleHeader title={i18n.t('menu.saleOrder')} />}
                buttonActionList={
                    <>
                        <Can permissions={[MyPermissions.SaleOrderView, MyPermissions.AgencySaleOrderView]}>
                            <ExportButton onClick={handleExportExcel} />
                        </Can>
                        <Can permissions={[MyPermissions.SaleOrderCreate, MyPermissions.AgencySaleOrderCreate]}>
                            <Button
                                className="text-xs"
                                type="primary"
                                onClick={() => {
                                    navigate(rootPaths.saleOrderForm);
                                    setTourSchedule({});
                                }}
                                icon={<PlusOutlined />}
                            >
                                {i18n.t('action.create')}
                            </Button>
                        </Can>
                    </>
                }
            />
        </Col>
    );
};
