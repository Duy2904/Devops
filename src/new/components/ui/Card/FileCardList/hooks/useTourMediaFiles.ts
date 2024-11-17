import { TourScheduleMediaSummaryDto } from '@sdk/tour-operations';
import { UploadFile } from 'antd';

const useTourMediaFiles = (data?: TourScheduleMediaSummaryDto[], totalDisplayFile?: number) => {
    const MAX_FILE_DISPLAY = totalDisplayFile ?? 2;

    const mapFileList = (start: number, end?: number): UploadFile[] => {
        return (
            data?.slice(start, end)?.map(item => {
                if (!item.id || !item.mediaFileId || !item.mediaFileName) return null;
                return {
                    uid: item.id,
                    percent: 50,
                    name: item.mediaFileName,
                    status: 'done',
                    url: item.mediaFileFilePath,
                };
            }) || []
        ).filter(Boolean) as UploadFile[];
    };

    return {
        mainFiles: mapFileList(0, MAX_FILE_DISPLAY),
        extraFiles: mapFileList(MAX_FILE_DISPLAY),
    };
};

export default useTourMediaFiles;
