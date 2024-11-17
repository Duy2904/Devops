import { SearchReceivableVouchersRequest, VoucherStatus } from '@sdk/tour-operations';
import { mapSearchRequest, useExportExcel } from '../hook/useRefundVoucher';
import { useEffect, useState } from 'react';

import { Button } from 'antd';
import Can from '@components/common/Can';
import { ExportButton } from '@components/customizes/Button/ExportButton';
import Format from '@utils/format';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { PlusOutlined } from '@ant-design/icons';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';
import { useDebouncedCallback } from 'use-debounce';
import { useNavigate } from 'react-router-dom';
import { useSaleOrderStore } from '@store/saleOrderStore';
import { useSearchTableStore } from '@store/searchTableStore';
import useSignalRInstance from '@hooks/useSignalRInstance';

export const ButtonRefundVoucher: React.FC = () => {
    const navigate = useNavigate();
    const [searchRequest, setSearchRequest] = useState<SearchReceivableVouchersRequest>({});

    const { mutateAsync: exportExcelData } = useExportExcel();
    const { tableParams } = useSearchTableStore(state => state);

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
            setSearchRequest(mapSearchRequest({ ...tableParams, status: tableParams.status as VoucherStatus[] }));
        }
    }, [tableParams]);

    return (
        <>
            <Can permissions={[MyPermissions.RefundVoucherCreate, MyPermissions.AgencyRefundVoucherCreate]}>
                <Button
                    className="text-xs"
                    type="primary"
                    onClick={() => {
                        setItemReceivable({ orderData: {} });
                        navigate(`${rootPaths.refundVoucherForm}`);
                    }}
                    icon={<PlusOutlined />}
                >
                    {i18n.t('action.create')}
                </Button>
            </Can>
            <Can permissions={[MyPermissions.RefundVoucherView, MyPermissions.AgencyRefundVoucherView]}>
                <ExportButton onClick={handleExportExcel} />
            </Can>
        </>
    );
};
