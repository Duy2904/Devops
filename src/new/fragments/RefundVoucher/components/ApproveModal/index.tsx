import { ApprovalTourStatus, ApproveRefundVoucherByManagerRequest, ReceivableVoucherDto } from '@sdk/tour-operations';
import { Button, Flex, Form, Modal } from 'antd';
import { QueryKey, useQueryClient } from 'react-query';
import { getApproveStatus, useApproveRefund } from '../../hooks/useRefundList';

import { AnyObject } from 'antd/es/_util/type';
import { ApprovalStatusSelect } from '@components/customizes/Select/ApprovalStatusSelect';
import { ApproveBtn } from '@src/new/components/customs/Buttons/ApproveBtn';
import { SaveOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import i18n from '@src/i18n';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { useState } from 'react';
import { useWatch } from 'antd/es/form/Form';

interface RequestApproveModalProps {
    data: ReceivableVoucherDto;
    queriesKey?: QueryKey;
}

export const RequestApproveModal: React.FC<RequestApproveModalProps> = props => {
    const queryClient = useQueryClient();

    const { data } = props;

    const [form] = Form.useForm();
    const valuesForm = useWatch([], form);
    const approveStatus = getApproveStatus();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const { mutateAsync: approvalRefund, isLoading } = useApproveRefund();

    const handleOpenModal = async () => {
        setIsModalOpen(true);
    };

    const onFinish = async (values: AnyObject) => {
        const dataTemp = {
            ...values,
            receivableVoucherIds: [data.id!],
        };
        await approvalRefund(dataTemp as ApproveRefundVoucherByManagerRequest);
        queryClient.invalidateQueries(props.queriesKey);
        toastSuccess(
            i18n.t('Thông báo'),
            `${i18n.t('Phiếu hoàn')} ${
                valuesForm?.approvalStatus == ApprovalTourStatus.Rejected ? 'đã bị từ chối' : 'đã được duyệt'
            }`,
        );
    };

    return (
        <>
            <ApproveBtn onClick={handleOpenModal} isSmall />
            <Modal open={isModalOpen} closeIcon={false} footer={null} width={500} destroyOnClose={true}>
                <h6>
                    {i18n.t('Duyệt phiếu hoàn')} {data.voucherNo}
                </h6>
                <Form form={form} layout="vertical" preserve={false} onFinish={onFinish}>
                    <ApprovalStatusSelect
                        isForm
                        className="w-1/2 mt-5"
                        rules={[{ required: true, message: i18n.t('validation.tour.validAction') }]}
                        label={i18n.t('tour.tourModal.action')}
                        name="approvalStatus"
                        approveStatus={approveStatus}
                    />
                    {valuesForm?.approvalStatus == ApprovalTourStatus.Rejected && (
                        <Form.Item
                            label={i18n.t('tour.tourModal.rejectedReason')}
                            rules={[{ required: true, message: i18n.t('validation.default.validDefault') }]}
                            name="reason"
                        >
                            <TextArea className="w-full" />
                        </Form.Item>
                    )}

                    <Flex className="mt-12" justify="end" gap={12}>
                        <Button
                            type="primary"
                            onClick={() => form.submit()}
                            icon={<SaveOutlined />}
                            loading={isLoading}
                        >
                            Lưu
                        </Button>
                        <Button onClick={() => setIsModalOpen(false)}>Đóng</Button>
                    </Flex>
                </Form>
            </Modal>
        </>
    );
};
