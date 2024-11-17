import { mapSearchRequest, useExportExcel } from '../hook/useDocumentReceiptVisa';
import { useEffect, useState } from 'react';

import { Button } from 'antd';
import Can from '@components/common/Can';
import { ExportButton } from '@components/customizes/Button/ExportButton';
import Format from '@utils/format';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { PlusOutlined } from '@ant-design/icons';
import { SearchTourVisaRequest } from '@sdk/tour-operations';
import i18n from '@src/i18n';
import { rootPaths } from '@src/routers/route';
import { useDebouncedCallback } from 'use-debounce';
import { useNavigate } from 'react-router-dom';
import { useSaleOrderStore } from '@store/saleOrderStore';
import { useSearchTableStore } from '@store/searchTableStore';
import useSignalRInstance from '@hooks/useSignalRInstance';

export const ButtonDocumentReceipt: React.FC = () => {
    const navigate = useNavigate();

    const [searchRequest, setSearchRequest] = useState<SearchTourVisaRequest>({});

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
                fileName: Format.formatExportExcelTitle('DSBiennhanthuhosoVisa', searchRequest),
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
        <>
            <Can permissions={[MyPermissions.TourVisaCreate]}>
                <Button
                    className="text-xs"
                    type="primary"
                    onClick={() => {
                        navigate(`${rootPaths.documentReceiptForm}`);
                        setItemReceivable({ orderData: {} });
                    }}
                    icon={<PlusOutlined />}
                >
                    {i18n.t('action.create')}
                </Button>
            </Can>
            <Can permissions={[MyPermissions.TourVisaView]}>
                <ExportButton onClick={handleExportExcel} />
            </Can>
        </>
    );
};
