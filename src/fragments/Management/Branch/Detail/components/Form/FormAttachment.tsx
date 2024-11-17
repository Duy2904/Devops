import { Dispatch, SetStateAction, useEffect } from 'react';
import { Upload, UploadFile, UploadProps } from 'antd';

import { AnyObject } from 'antd/es/_util/type';
import { BranchDto } from '@sdk/identity-next/models';
import { DocumentDto } from '@sdk/identity-next/models/document-dto';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
import { beforeUploadDocuments } from '@utils/formHelper';
import i18n from '@src/i18n';
import isEmpty from 'lodash/isEmpty';
import { useDeleteDocument } from '@hooks/identity-next/mutates/useUploadMedia';

export interface FormAttachmentProps {
    dataBranch?: BranchDto;
    documentsUpload: UploadFile[];
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
    setDocumentsUpload: React.Dispatch<React.SetStateAction<UploadFile[]>>;
    canChangeData?: boolean;
}

export const FormAttachment: React.FC<FormAttachmentProps> = props => {
    const { dataBranch, documentsUpload, setIsEnableEdit, setDocumentsUpload, canChangeData } = props;
    const { mutateAsync: deleteDocument } = useDeleteDocument();

    const _props: UploadProps = {
        onRemove: file => {
            const index = documentsUpload.indexOf(file);
            const newFileList = documentsUpload.slice();
            newFileList.splice(index, 1);
            setDocumentsUpload(newFileList);
        },
        beforeUpload: async (_, fileList: RcFile[]) => {
            const resChecked = await beforeUploadDocuments(fileList);
            if (resChecked) {
                setDocumentsUpload([...documentsUpload, ...fileList]);
                setIsEnableEdit(true);
            }
            return false;
        },
        multiple: true,
        showUploadList: false,
    };

    const mapFileList = (data: AnyObject): UploadFile[] => {
        const medias: UploadFile[] = [];
        !isEmpty(data?.documents) &&
            data?.documents.forEach((item: DocumentDto) => {
                medias.push({
                    uid: '',
                    name: `${item.name}`,
                    status: 'done',
                    url: `${item.externalUrl}`,
                });
            });
        return medias;
    };

    const removeMedia = async (file: UploadFile<string>) => {
        const urlTemp = dataBranch?.documents?.find(item => item.externalUrl === file.url)?.url;
        let updatedDocuments: UploadFile[];
        if (!urlTemp) {
            updatedDocuments = documentsUpload?.filter(item => item.name !== file.name);
        } else {
            const resBoolean = await deleteDocument({
                id: dataBranch?.id ?? '',
                url: encodeURIComponent(urlTemp),
            });
            if (resBoolean) {
                updatedDocuments = documentsUpload?.filter(item => item.url !== file.url);
            } else {
                updatedDocuments = documentsUpload;
            }
        }
        setDocumentsUpload(updatedDocuments);
    };

    useEffect(() => {
        if (dataBranch) {
            const imgTemp = mapFileList(dataBranch);
            !isEmpty(imgTemp) && setDocumentsUpload(imgTemp);
        }
    }, [dataBranch, setDocumentsUpload]);

    return (
        <div className="py-4">
            <Dragger
                {..._props}
                accept="image/png,image/jpeg,image/jpg,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
                disabled={!canChangeData}
            >
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">{i18n.t('tour.tourDetail.contentMedia')}</p>
                <p className="ant-upload-hint">{i18n.t('tour.tourDetail.fileSupport')}</p>
            </Dragger>
            <Upload
                listType="picture"
                className="container media-grid"
                fileList={documentsUpload}
                onRemove={removeMedia}
                disabled={!canChangeData}
            />
        </div>
    );
};
