import { Button, Flex, Form, Modal } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { useWatch } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import { ReactNode, useState } from 'react';
import { useQueryClient } from 'react-query';

import { SaveOutlined } from '@ant-design/icons';
import { ApprovalStatusSelect } from '@components/customizes/Select/ApprovalStatusSelect';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { getApproveStatus, useApproveRefund } from '@fragments/RefundVoucher/hook/useRefundVoucher';
import { ApprovalTourStatus, ApproveRefundVoucherByManagerRequest } from '@sdk/tour-operations';
import i18n from '@src/i18n';

interface RequestApproveModalProps {
    icon: ReactNode;
    content: string;
    size?: SizeType;
    refundId?: string;
    setIsRefectData?: React.Dispatch<React.SetStateAction<boolean>>;
    isEnableApprove: boolean;
}

export const RequestApproveModal: React.FC<RequestApproveModalProps> = props => {
    const queryClient = useQueryClient();

    const [form] = Form.useForm();
    const valuesForm = useWatch([], form);
    const approveStatus = getApproveStatus();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [disableButton, setDisableButton] = useState<boolean>(true);

    const { mutateAsync: approvalRefund, isLoading } = useApproveRefund();

    const handleOpenModal = async () => {
        setIsModalOpen(true);
    };

    const handleValueChange = () => {
        setDisableButton(false);
    };

    const onFinish = async (values: AnyObject) => {
        const data = {
            ...values,
            receivableVoucherIds: [props.refundId],
        };
        await approvalRefund(data as ApproveRefundVoucherByManagerRequest);
        queryClient.invalidateQueries(['fetchRefundVoucher', props.refundId ?? '']);
        toastSuccess(
            i18n.t('Thông báo'),
            `${i18n.t('Phiếu hoàn')} ${
                valuesForm?.approvalStatus == ApprovalTourStatus.Rejected ? 'đã bị từ chối' : 'đã được duyệt'
            }`,
        );
        props.setIsRefectData && props.setIsRefectData(true);
        setDisableButton(false);
    };

    return (
        <>
            <Button
                className="!text-xs"
                type="default"
                size={props.size}
                icon={props.icon}
                onClick={handleOpenModal}
                disabled={!props.isEnableApprove}
            >
                {props.content}
            </Button>
            <Modal open={isModalOpen} closeIcon={false} footer={null} width={500} destroyOnClose={true}>
                <h6>{i18n.t('Duyệt phiếu hoàn tiền')}</h6>
                <Form
                    form={form}
                    layout="vertical"
                    preserve={false}
                    onFinish={onFinish}
                    onValuesChange={handleValueChange}
                >
                    <ApprovalStatusSelect
                        isForm
                        className="w-1/2 mt-5"
                        rules={[{ required: true, message: i18n.t('validation.tour.validAction') }]}
                        label={i18n.t('tour.tourModal.action')}
                        name="approvalStatus"
                        approveStatus={approveStatus}
                    />
                    <Form.Item
                        label={i18n.t('Lý do')}
                        rules={[
                            {
                                required: valuesForm?.approvalStatus == ApprovalTourStatus.Rejected,
                                message: i18n.t('validation.default.validDefault'),
                            },
                        ]}
                        name="reason"
                    >
                        <TextArea className="w-full" />
                    </Form.Item>

                    <Flex className="mt-12" justify="end" gap={12}>
                        <Button
                            type="primary"
                            onClick={() => form.submit()}
                            icon={<SaveOutlined />}
                            disabled={disableButton}
                            loading={isLoading}
                        >
                            {i18n.t('action.save')}
                        </Button>
                        <Button onClick={() => setIsModalOpen(false)}>{i18n.t('action.close')}</Button>
                    </Flex>
                </Form>
            </Modal>
        </>
    );
};
