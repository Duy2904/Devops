import { Button, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

import { PlusOutlined } from '@ant-design/icons';
import Can from '@components/common/Can';
import { HeadContent } from '@components/ui/HeadContent';
import { TitleHeader } from '@components/ui/TitleHeader';
import { mapSearchRequest, useExportSaleOrder } from '@hooks/queries/useSaleOrders';
import useSignalRInstance from '@hooks/useSignalRInstance';
import { SearchSaleOrdersViewRequest } from '@sdk/tour-operations';
import i18n from '@src/i18n';
import { ExportButton } from '@src/new/components/customs/Buttons/ExportButton';
import { useSearchTableStoreNew } from '@src/new/shared/stores/SearchTableStore';
import { rootPathsNew } from '@src/routers/newRoute';
import { useTourScheduleStore } from '@store/tourScheduleStore';
import Format from '@utils/format';
import { MyPermissions } from '@utils/Permissions/index.ts';

import { SlugSaleOrder } from './Slug';

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
                                    navigate(rootPathsNew.saleOrderFormDetail);
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
