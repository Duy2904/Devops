import { Col, Upload, UploadFile, UploadProps } from 'antd';
import { Dispatch, SetStateAction, useEffect } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { AgentDto } from '@sdk/identity-next/models';
import i18n from '@src/i18n';
import { beforeUploadAvatar } from '@utils/formHelper';

export interface FormUploadAvatarProps {
    avatarUpload: UploadFile[];
    data?: AgentDto;
    disabled?: boolean;
    setAvatarUpload: React.Dispatch<React.SetStateAction<UploadFile[]>>;
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
}

export const FormUploadAvatar: React.FC<FormUploadAvatarProps> = props => {
    const { avatarUpload, setAvatarUpload, data, setIsEnableEdit, disabled } = props;

    const mapFileList = (data: AgentDto): UploadFile[] => {
        const medias: UploadFile[] = [];
        if (!data.logo) return [];
        medias.push({
            uid: '',
            name: '',
            status: 'done',
            url: `${data.logo}`,
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
        if (data) {
            const imgTemp = mapFileList(data);
            setAvatarUpload(imgTemp);
        }
    }, [data, setAvatarUpload]);

    return (
        <Col className="w-full aspect-square bg-slate-50">
            <Upload
                {..._props}
                className="upload-avatar"
                listType="picture-card"
                fileList={avatarUpload}
                disabled={disabled}
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
