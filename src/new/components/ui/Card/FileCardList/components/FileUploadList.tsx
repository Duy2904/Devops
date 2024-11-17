import { Upload, UploadFile } from 'antd';

import FileCard from '../../../FileCard';
import { downloadfileFromUrl } from '@src/new/shared/utils/downloadFile';

interface FileUploadListProps {
    className?: string;
    fileList: UploadFile[];
}

const FileUploadList = ({ className = '', fileList }: FileUploadListProps) => {
    return (
        <Upload
            className={className}
            listType="picture"
            fileList={fileList}
            itemRender={(_, file) => (
                <div
                    className="mb-1"
                    onClick={() => {
                        file.url && downloadfileFromUrl(file.url);
                    }}
                >
                    <FileCard fileName={file.name} />
                </div>
            )}
        />
    );
};

export default FileUploadList;
