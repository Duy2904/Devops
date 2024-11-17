import { SearchReceivableVouchersRequest, VoucherStatus } from '@sdk/tour-operations';
import { useEffect, useState } from 'react';

import { Button } from 'antd';
import Can from '@components/common/Can';
import { ExportButton } from '@src/new/components/customs/Buttons/ExportButton';
import Format from '@utils/format';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { PlusOutlined } from '@ant-design/icons';
import i18n from '@src/i18n';
import { mapSearchRequest } from '../../../features';
import { useDebouncedCallback } from 'use-debounce';
import { useExportExcel } from '../../../hooks/useRefundList';
import { useNavigate } from 'react-router-dom';
import { useSaleOrderStore } from '@store/saleOrderStore';
import { useSearchTableStoreNew } from '@src/new/shared/stores/SearchTableStore';
import useSignalRInstance from '@hooks/useSignalRInstance';
import { rootPathsNew } from '@src/routers/newRoute';

export const ButtonRF: React.FC = () => {
    const navigate = useNavigate();
    const [searchRequest, setSearchRequest] = useState<SearchReceivableVouchersRequest>({});

    const { mutateAsync: exportExcelData } = useExportExcel();
    const { tableParams } = useSearchTableStoreNew(state => state);

    const { signalConnectedId } = useSignalRInstance(state => state);
    const {
        actions: { setItemReceivable },
    } = useSaleOrderStore(state => state);

    const handleExportExcel = useDebouncedCallback(async () => {
        delete searchRequest.pageNumber;
        delete searchRequest.pageSize;
        if (signalConnectedId) {
            await exportExcelData({
                ...searchRequest,
                connectionId: signalConnectedId,
                fileName: Format.formatExportExcelTitle('DSPhieuhoantien', searchRequest),
                locale: 'vi-VN',
            });
        }
    }, 500);

    useEffect(() => {
        if (tableParams) {
            setSearchRequest(mapSearchRequest({ ...tableParams, statuses: tableParams.statuses as VoucherStatus[] }));
        }
    }, [tableParams]);

    return (
        <>
            <Can permissions={[MyPermissions.RefundVoucherView, MyPermissions.AgencyRefundVoucherView]}>
                <ExportButton onClick={handleExportExcel} />
            </Can>
            <Can permissions={[MyPermissions.RefundVoucherCreate, MyPermissions.AgencyRefundVoucherCreate]}>
                <Button
                    className="text-xs"
                    type="primary"
                    onClick={() => {
                        setItemReceivable({ orderData: {} });
                        navigate(`${rootPathsNew.refundFormDetail}`);
                    }}
                    icon={<PlusOutlined />}
                >
                    {i18n.t('action.create')}
                </Button>
            </Can>
        </>
    );
};
