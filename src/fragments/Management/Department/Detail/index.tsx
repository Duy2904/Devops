import { Col, Form, Modal } from 'antd';
import { CreateDepartmentRequest, UpdateDepartmentRequest } from '@sdk/tour-operations';
import { useCreateDepartment, useUpdateDepartment } from '../hooks/mutates';
import { useEffect, useState } from 'react';

import { AnyObject } from 'antd/es/_util/type';
import { ButtonAction } from './components/ButtonAction';
import { DataForm } from './components/DataForm';
import i18n from '@src/i18n';
import { useFetchDepartment } from '../hooks/queries';

export interface DepartmentModalProps {
    isModalOpen: boolean;
    departmentId?: string;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setDepartmentId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const DepartmentModal: React.FC<DepartmentModalProps> = props => {
    const { isModalOpen, departmentId, setIsModalOpen, setDepartmentId } = props;
    const [form] = Form.useForm();
    const [isDataChange, setIsDataChange] = useState<boolean>(false);

    const { data: fetchData } = useFetchDepartment(departmentId!);
    const { mutateAsync: createDepartment, isLoading: loadingCreateDepartment } = useCreateDepartment();
    const { mutateAsync: updateDepartment, isLoading: loadingUpdateDepartment } = useUpdateDepartment(departmentId!);

    const onFinish = async (values: AnyObject) => {
        if (!values.id) {
            await createDepartment(values as CreateDepartmentRequest);
            setIsModalOpen(false);
            // Remove all data saved before action
            setDepartmentId(undefined);
            form.resetFields();
        } else {
            await updateDepartment({
                ...(values as UpdateDepartmentRequest),
                parentId: values?.parentId ? values?.parentId : null,
            });
        }
        setIsDataChange(false);
    };

    useEffect(() => {
        form.setFieldsValue({ ...fetchData });
    }, [fetchData, form]);

    return (
        <Modal open={isModalOpen} closeIcon={false} footer={null} width={650} destroyOnClose={true}>
            <Col className="mb-5">
                <p className="text-2xl">{i18n.t('Thông tin Bộ phận')}</p>
                <p className="text-slate-400">
                    {departmentId
                        ? i18n.t('Xem, cập nhật thông tin chi tiết về bộ phận')
                        : i18n.t('Thêm mới thông tin bộ phận')}
                </p>
            </Col>
            <DataForm
                form={form}
                setIsDataChange={setIsDataChange}
                onFinish={onFinish}
                departmentId={departmentId}
                fetchData={fetchData}
            />
            <ButtonAction
                form={form}
                isDataChange={isDataChange}
                setIsDataChange={setIsDataChange}
                setIsModalOpen={setIsModalOpen}
                setDepartmentId={setDepartmentId}
                updateLoading={loadingCreateDepartment || loadingUpdateDepartment}
            />
        </Modal>
    );
};
