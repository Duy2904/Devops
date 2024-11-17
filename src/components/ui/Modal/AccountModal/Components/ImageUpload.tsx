import { Col, Upload, UploadFile, UploadProps } from 'antd';
import { useCallback, useEffect } from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { UserDetailsDto } from '@sdk/identity-next/models';
import { beforeUploadAvatar } from '@utils/formHelper';
import i18n from '@src/i18n';

export interface ImageUploadProps {
    fileUpload: UploadFile[];
    dataUser?: UserDetailsDto;
    setFileUpload: React.Dispatch<React.SetStateAction<UploadFile[]>>;
    setIsDataChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ImageUpload: React.FC<ImageUploadProps> = props => {
    const { fileUpload, dataUser, setFileUpload, setIsDataChange } = props;

    const mapFileList = useCallback((data: UserDetailsDto): UploadFile[] => {
        const medias: UploadFile[] = [];
        medias.push({
            uid: '',
            name: '',
            status: 'done',
            url: `${data.imageUrl}`,
        });
        return medias;
    }, []);

    const _props: UploadProps = {
        beforeUpload: file => {
            return beforeUploadAvatar(file);
        },
        onChange: file => {
            file.file.status != 'removed' ? setFileUpload([{ ...file.file, status: 'done' }]) : setFileUpload([]);
            setIsDataChange(true);
        },
        customRequest: () => {},
        showUploadList: true,
        maxCount: 1,
    };

    useEffect(() => {
        if (dataUser?.imageUrl) {
            const imgTemp = mapFileList(dataUser);
            setFileUpload(imgTemp);
        }
    }, [dataUser, mapFileList, setFileUpload]);

    return (
        <Col className="w-52">
            <Upload {..._props} className="upload-avatar" listType="picture-card" fileList={fileUpload}>
                {fileUpload.length !== 1 && (
                    <button className="!text-blue-500 border-none bg-transparent h-full flex flex-col justify-center items-center cursor-pointer">
                        <PlusOutlined />
                        <p>{i18n.t('Hình đại diện')}</p>
                    </button>
                )}
            </Upload>
        </Col>
    );
};
