import { Button, Flex, Form, Modal } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { useWatch } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';

import { SaveOutlined } from '@ant-design/icons';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import { ApprovalStatusSelect } from '@components/customizes/Select/ApprovalStatusSelect';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { getApproveStatus, useGetTourFitByCode, useTourFitApproveSalesOpen } from '@fragments/Tour/hooks/useTourFit';
import { useGetTourGitByCode, useTourGitApproveSalesOpen } from '@fragments/Tour/hooks/useTourGit';
import { ApprovalTourStatus } from '@sdk/tour-operations';
import i18n from '@src/i18n';
import { ConfirmBtn } from '@src/new/components/customs/Buttons/ConfirmBtn';
import { TourType } from '@src/types/TypeEnum';

interface RequestApproveModalProps {
    dataApprove: string;
    setIsChangeStatus: React.Dispatch<React.SetStateAction<boolean>>;
    isSmall?: boolean;
    tourType?: TourType;
}

export const RequestApproveModal: React.FC<RequestApproveModalProps> = props => {
    const { isSmall, tourType, dataApprove, setIsChangeStatus } = props;
    const [form] = Form.useForm();
    const valuesForm = useWatch([], form);
    const approveStatus = getApproveStatus();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isLoadingButton, setIsLoadingButton] = useState<boolean>(false);
    const [tourData, setTourData] = useState<AnyObject>({});

    const { data: fetchTourFit } = useGetTourFitByCode(tourType == TourType.FIT ? dataApprove : null);
    const { data: fetchTourGit } = useGetTourGitByCode(tourType == TourType.GIT ? dataApprove : null);

    const { mutateAsync: tourFitApproveSalesOpen } = useTourFitApproveSalesOpen();
    const { mutateAsync: tourGitApproveSalesOpen } = useTourGitApproveSalesOpen();

    const handleOpenModal = async () => {
        setIsModalOpen(true);
        setTourData(tourType == TourType.FIT ? fetchTourFit ?? {} : fetchTourGit ?? {});
    };

    const onFinish = async (values: AnyObject) => {
        setIsLoadingButton(true);
        setIsChangeStatus(false);
        const tourScheduleId = tourData?.id;
        const data = {
            ...values,
            tourScheduleId,
            rejectedReason: values.rejectedReason ?? '',
        };
        const res =
            tourType == TourType.FIT
                ? await tourFitApproveSalesOpen({ id: tourScheduleId ?? '', data })
                : await tourGitApproveSalesOpen({ id: tourScheduleId ?? '', data });
        if (res) {
            setIsModalOpen(false);
            setIsLoadingButton(false);
            setIsChangeStatus(true);
            toastSuccess(i18n.t('message.updateStatus.title'), i18n.t('message.updateStatus.success'));
            return;
        }
        setIsLoadingButton(false);
    };

    return (
        <>
            <ConfirmBtn onClick={handleOpenModal} isSmall={isSmall} />
            <Modal open={isModalOpen} closeIcon={false} footer={null} width={500} destroyOnClose={true}>
                <h6>{i18n.t('action.approvalTour')}</h6>
                {tourData && (
                    <p className="text-xs text-gray-600 font-semibold">
                        {tourData?.tourCode} - {tourData?.name}
                    </p>
                )}
                <Form form={form} layout="vertical" preserve={false} onFinish={onFinish}>
                    <Form.Item name="tourScheduleId" hidden>
                        <BaseInput />
                    </Form.Item>
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
                            name="rejectedReason"
                        >
                            <TextArea className="w-full" />
                        </Form.Item>
                    )}

                    <Flex className="mt-12" justify="end" gap={12}>
                        <Button
                            type="primary"
                            onClick={() => form.submit()}
                            icon={<SaveOutlined />}
                            loading={isLoadingButton}
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
