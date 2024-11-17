import { SearchReceivableVouchersRequest, VoucherStatus } from '@sdk/tour-operations';
import { mapSearchRequest, useExportDataReceivableVoucher } from '../hook/useReceivableVoucher';
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

export const ButtonReceivableVoucher: React.FC = () => {
    const navigate = useNavigate();
    const [searchRequest, setSearchRequest] = useState<SearchReceivableVouchersRequest>({});

    const { mutateAsync: exportExcelData } = useExportDataReceivableVoucher();
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
                fileName: Format.formatExportExcelTitle('DSPhieuThu', searchRequest),
                locale: 'vi-VN',
            });
        }
    }, 500);

    useEffect(() => {
        if (tableParams) {
            setSearchRequest(mapSearchRequest({ ...tableParams, statuses: tableParams.status as VoucherStatus[] }));
        }
    }, [tableParams]);

    return (
        <>
            <Can permissions={[MyPermissions.ReceivableVoucherCreate, MyPermissions.AgencyReceivableVoucherCreate]}>
                <Button
                    className="text-xs"
                    type="primary"
                    onClick={() => {
                        setItemReceivable({ orderData: {} });
                        navigate(`${rootPaths.receivableVoucherForm}`);
                    }}
                    icon={<PlusOutlined />}
                >
                    {i18n.t('action.create')}
                </Button>
            </Can>
            <Can permissions={[MyPermissions.ReceivableVoucherView, MyPermissions.AgencyReceivableVoucherView]}>
                <ExportButton onClick={handleExportExcel} />
            </Can>
        </>
    );
};
