import { Col, Flex, Form, Modal, UploadFile } from 'antd';
import { useEffect, useState } from 'react';

import { AnyObject } from 'antd/es/_util/type';
import { ButtonAction } from './Components/ButtonAction';
import { DataForm } from './Components/DataForm';
import { ImageUpload } from './Components/ImageUpload';
import { RcFile } from 'antd/es/upload';
import i18n from '@src/i18n';
import isEmpty from 'lodash/isEmpty';
import { useFetchPersonalIdentityInfo } from '@hooks/identity-next/queries/usePersonal';
import { useUpdatePersonal } from '@hooks/identity-next/mutates/usePersonal';
import { useUserStore } from '@store/userStore';
import { useUserUploadPhoto } from '@hooks/identity-next/mutates/useUser';

export interface AccountModalProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AccountModal: React.FC<AccountModalProps> = props => {
    const { isModalOpen, setIsModalOpen } = props;
    const [form] = Form.useForm();

    const [isDataChange, setIsDataChange] = useState<boolean>(false);
    const [fileUpload, setFileUpload] = useState<UploadFile[]>([]);

    // store
    const { userId, setUserId } = useUserStore(state => state);

    const { data } = useFetchPersonalIdentityInfo();
    const { mutateAsync: updatePersonal, isLoading: updateLoading } = useUpdatePersonal();
    const { mutateAsync: userUploadPhoto } = useUserUploadPhoto();

    const onFinish = async (values: AnyObject) => {
        const urlRes = !isEmpty(fileUpload[0])
            ? fileUpload[0]?.originFileObj
                ? await userUploadPhoto({ userId: userId, file: fileUpload[0]?.originFileObj as RcFile })
                : values?.imageUrl
            : '';
        await updatePersonal({
            ...values,
            image: urlRes,
            displayName: `${values?.lastName} ${values?.firstName}`,
        });
        setIsDataChange(false);
    };

    useEffect(() => {
        if (data?.id) {
            setUserId(data?.id);
            form.setFieldsValue(data);
        }
    }, [data, data?.id, form, setUserId]);

    return (
        <Modal open={isModalOpen} closeIcon={false} footer={null} width={650} destroyOnClose={true}>
            <Col className="mb-5">
                <p className="text-xl font-medium">{i18n.t('Thông tin cá nhân')}</p>
                <p className="text-slate-400">{i18n.t('Xem, cập nhật thông tin chi tiết về tài khoản')}</p>
            </Col>
            <Flex gap={18}>
                <ImageUpload
                    fileUpload={fileUpload}
                    setFileUpload={setFileUpload}
                    dataUser={data}
                    setIsDataChange={setIsDataChange}
                />
                <DataForm form={form} data={data ?? {}} onFinish={onFinish} setIsDataChange={setIsDataChange} />
            </Flex>
            <ButtonAction
                form={form}
                updateLoading={updateLoading}
                isDataChange={isDataChange}
                setIsModalOpen={setIsModalOpen}
                setIsDataChange={setIsDataChange}
            />
        </Modal>
    );
};
