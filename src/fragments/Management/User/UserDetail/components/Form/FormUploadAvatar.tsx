import { Col, Upload, UploadFile, UploadProps } from 'antd';
import { Dispatch, SetStateAction, useEffect } from 'react';

import { GetAccountDto } from '@sdk/tour-operations';
import { PlusOutlined } from '@ant-design/icons';
import { beforeUploadAvatar } from '@utils/formHelper';
import i18n from '@src/i18n';

export interface FormUploadAvatarProps {
    avatarUpload: UploadFile[];
    setAvatarUpload: React.Dispatch<React.SetStateAction<UploadFile[]>>;
    dataAccount?: GetAccountDto;
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
    canChangeData?: boolean;
}

export const FormUploadAvatar: React.FC<FormUploadAvatarProps> = props => {
    const { avatarUpload, setAvatarUpload, dataAccount, setIsEnableEdit, canChangeData } = props;
    const mapFileList = (data: GetAccountDto): UploadFile[] => {
        const medias: UploadFile[] = [];
        if (!data.imageUrl) return [];
        medias.push({
            uid: '',
            name: '',
            status: 'done',
            url: `${data.imageUrl}`,
        });
        return medias;
    };

    const _props: UploadProps = {
        beforeUpload: file => {
            return beforeUploadAvatar(file);
        },
        onChange: file => {
            file.file.status != 'removed' ? setAvatarUpload([{ ...file.file, status: 'done' }]) : setAvatarUpload([]);
            setIsEnableEdit(true);
        },
        customRequest: () => {},
        showUploadList: true,
        maxCount: 1,
    };

    useEffect(() => {
        if (dataAccount) {
            const imgTemp = mapFileList(dataAccount);
            setAvatarUpload(imgTemp);
        }
    }, [dataAccount, setAvatarUpload]);

    return (
        <Col className="w-full aspect-square bg-slate-50">
            <Upload
                {..._props}
                className="upload-avatar"
                listType="picture-card"
                fileList={avatarUpload}
                disabled={!canChangeData}
            >
                {avatarUpload.length !== 1 && (
                    <button className="!text-blue-500 border-none bg-transparent h-full flex flex-col justify-center items-center cursor-pointer">
                        <PlusOutlined />
                        <p>{i18n.t('Hình đại diện')}</p>
                    </button>
                )}
            </Upload>
        </Col>
    );
};
