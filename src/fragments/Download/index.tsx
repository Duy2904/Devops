import { Col, Popover } from 'antd';
import { DownloadSignalModel, TitleSignalDownload, handleReturnTitleStatusDownload } from './Feature';
import { useCallback, useEffect, useState } from 'react';

import { Button } from './components/Button';
import { ContentPopover } from './components/ContentPopover';
import { useDownloadStore } from './Store';
import useSignalRStore from '@hooks/useSignalRInstance';

export const DownloadPopover: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [statusIcon, setStatusIcon] = useState<TitleSignalDownload>();
    const [dataDownloaded, setDataDownloaded] = useState<DownloadSignalModel[]>([]);

    const { signalConnectedId } = useSignalRStore(state => state);
    const { itemDownload, setItemDownload } = useDownloadStore(state => state);

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const checkStatusTitle = useCallback((fetchNotiDownload: DownloadSignalModel) => {
        fetchNotiDownload?.title &&
            !['DownloadReportInProgress', 'DownloadReportStart'].includes(fetchNotiDownload?.title) &&
            setOpen(true);
        handleReturnTitleStatusDownload(fetchNotiDownload);
    }, []);

    const resSignal = useCallback(
        (fetchRes: DownloadSignalModel) => {
            if (fetchRes.connectionId === signalConnectedId) {
                setStatusIcon(fetchRes.title);
                fetchRes.title && checkStatusTitle(fetchRes);
                if (dataDownloaded.find(item => item.data?.fileName === fetchRes.data?.fileName)) {
                    const dataTemp = dataDownloaded.map(item => {
                        if (item.data?.fileName === fetchRes.data?.fileName) {
                            return fetchRes;
                        } else {
                            return item;
                        }
                    });
                    setDataDownloaded(dataTemp);
                } else {
                    setDataDownloaded([fetchRes, ...dataDownloaded]);
                }
            }
        },
        [checkStatusTitle, dataDownloaded, signalConnectedId],
    );

    useEffect(() => {
        if (itemDownload) {
            resSignal(itemDownload);
            setItemDownload(null);
        }
    }, [itemDownload, resSignal, setItemDownload]);

    return (
        <Popover
            content={<ContentPopover dataDownloaded={dataDownloaded} />}
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
            placement="bottomRight"
        >
            <Col onClick={() => handleOpenChange(true)}>
                <Button statusIcon={statusIcon} />
            </Col>
        </Popover>
    );
};
