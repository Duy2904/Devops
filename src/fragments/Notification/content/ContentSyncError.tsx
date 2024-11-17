import { DataSignal } from '../features/NotificationFeature';

export const ContentSyncErrorDataTourNature = (notiDetail: DataSignal['data']) => {
    const arrSplitFileUrl = notiDetail.failedTourExportUrl.split('/');
    const nameFile = arrSplitFileUrl[arrSplitFileUrl.length - 1];
    return (
        <p className="text-xs font-light">
            <span>{`Hệ thống đã sync về `}</span>
            <span className="font-bold">{notiDetail.successTourNumber}</span>
            <span>{` tour từ đối tác Thiên Nhiên thành công, có `}</span>
            <span className="font-bold">{notiDetail.failedTourNumber}</span>
            <span>{` tour không sync thành công. Xem chi tiết tại đây: `}</span>
            <a className="font-bold" href={notiDetail.failedTourExportUrl}>
                {nameFile}
            </a>
        </p>
    );
};
