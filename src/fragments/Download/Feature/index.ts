import { toastBasic, toastErr, toastSuccess } from '@components/ui/Toast/Toast';

import i18n from '@src/i18n';

export type TitleSignalDownload =
    | 'DownloadReportStart'
    | 'DownloadReportInProgress'
    | 'DownloadDoneReport'
    | 'DownloadReportError'
    | 'DownloadReportEndTask';

export interface DownloadSignalModel {
    id?: string;
    title?: TitleSignalDownload;
    userId?: string;
    source?: string;
    createdOn?: string;
    connectionId?: string;
    data?: {
        fileUrl?: string;
        fileName?: string;
        messageError?: string;
    };
}

export const handleReturnTitleStatusDownload = (fetchNotiDownload: DownloadSignalModel) => {
    if (fetchNotiDownload.title !== 'DownloadReportInProgress') {
        switch (fetchNotiDownload.title) {
            case 'DownloadDoneReport':
                toastSuccess('Export Excel', i18n.t('Export thành công'));
                fetchNotiDownload.data?.fileUrl && window.open(fetchNotiDownload.data?.fileUrl, '_self');
                break;
            case 'DownloadReportError': {
                const messageError = fetchNotiDownload.data?.messageError
                    ? ` (Lý do: ${fetchNotiDownload.data.messageError})`
                    : '';
                const errorMessage = 'Export thất bại. Vui lòng thử lại' + messageError;
                toastErr('Export Excel', i18n.t(errorMessage));
                break;
            }
            case 'DownloadReportEndTask':
                toastErr('Export Excel', i18n.t('Tiến trình của bạn đã bị huỷ'));
                break;
        }
    } else {
        toastBasic('Export Excel', i18n.t('Bạn đang có tiến trình tải trước đó. Vui lòng đợi!'));
    }
};
