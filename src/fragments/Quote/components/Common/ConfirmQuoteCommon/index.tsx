import { Button, Flex, Form, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import isString from 'lodash/isString';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { SaveOutlined } from '@ant-design/icons';
import { ApproveQuoteSelect } from '@components/customizes/Select/ApproveQuoteSelect';
import { ConfirmQuoteRequest, ConfirmQuoteStatus, TourScheduleDto } from '@sdk/tour-operations';
import i18n from '@src/i18n';

interface ConfirmQuoteCommonProps {
    isSendRequest: boolean;
    isApproveRequest: boolean;
    isOpenModal: boolean;
    loadingRequestApproveQuote: boolean;
    loadingApproveQuote: boolean;
    dataTourSchedule: TourScheduleDto | undefined;
    quoteCodeConfirmed: string | undefined;
    // eslint-disable-next-line no-unused-vars
    submitApproveQuote: (value: ConfirmQuoteRequest) => Promise<void>;
    submitRequestApproveQuote: () => Promise<void>;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    setQuoteCodeConfirmed: Dispatch<SetStateAction<string | undefined>>;
}

export const ConfirmQuoteCommon: React.FC<ConfirmQuoteCommonProps> = props => {
    const {
        isSendRequest,
        isApproveRequest,
        isOpenModal,
        loadingRequestApproveQuote,
        loadingApproveQuote,
        dataTourSchedule,
        quoteCodeConfirmed,
        submitApproveQuote,
        submitRequestApproveQuote,
        setIsModalOpen,
        setQuoteCodeConfirmed,
    } = props;
    const [form] = Form.useForm();
    const onlyApprove = isSendRequest;

    const [isSelectDeny, setIsSelectDeny] = useState<boolean>(false);

    const handleChangeSelect = (value: string) => {
        setIsSelectDeny(value === ConfirmQuoteStatus.Reject);
    };

    // Events
    const onFinish = useDebouncedCallback(
        (value: ConfirmQuoteRequest) => {
            if (isSendRequest) {
                submitRequestApproveQuote();
            } else if (isApproveRequest) {
                submitApproveQuote(value);
            }
        },
        2000,
        { leading: true, trailing: false },
    );

    const renderTitle = useCallback(() => {
        if (isSendRequest) {
            return i18n.t('quote.modal.sendRequestTitle');
        } else if (isApproveRequest) {
            return i18n.t('quote.modal.approveTitle');
        }
    }, [isApproveRequest, isSendRequest]);

    const onClose = () => {
        setQuoteCodeConfirmed(undefined);
        setIsModalOpen(false);
    };

    return (
        <Modal open={isOpenModal} closeIcon={false} footer={null} destroyOnClose={true}>
            <h6>{renderTitle()}</h6>
            <Form form={form} layout="vertical" preserve={false} onFinish={onFinish}>
                <div className="mt-4">
                    <ApproveQuoteSelect
                        isForm
                        className="w-1/2"
                        name="type"
                        label={<p className="mb-1 font-semibold">{i18n.t('quote.modal.action')}</p>}
                        rules={[{ required: true, message: i18n.t('quote.modal.validAction') }]}
                        initialValue={isSendRequest ? 'Request' : ConfirmQuoteStatus.Approve}
                        disabled={onlyApprove}
                        dataSelect={
                            isSendRequest
                                ? [
                                      {
                                          value: 'Request',
                                          label: i18n.t(`QuoteStatus.Request`),
                                      },
                                  ]
                                : undefined
                        }
                        onChange={value => handleChangeSelect(value)}
                    />
                    {isApproveRequest && (
                        <Form.Item
                            className="mb-0"
                            name="reason"
                            label={<p className="mb-1 font-semibold">{i18n.t('quote.modal.reason')}</p>}
                            dependencies={['type']}
                            rules={[
                                {
                                    required: form.getFieldValue('type') === ConfirmQuoteStatus.Reject,
                                    message: i18n.t('validation.default.validDefault'),
                                },
                            ]}
                            required={form.getFieldValue('type') === ConfirmQuoteStatus.Reject}
                        >
                            <TextArea placeholder={i18n.t('quote.modal.messageReason')} />
                        </Form.Item>
                    )}
                </div>
                <p className="text-xs mt-4 text-red-500">
                    {quoteCodeConfirmed
                        ? `* Tour có chiết tính giá ${quoteCodeConfirmed} đã được xác nhận. Vui lòng hủy chiết tính giá ${quoteCodeConfirmed} nếu muốn duyệt chiết tính giá này.`
                        : `* Tour ${dataTourSchedule?.tourCode} - ${dataTourSchedule?.name} sau khi duyệt chiết tính giá này thì
                        các chiết tính giá còn lại được mặc định là từ chối`}
                </p>
                <Flex className="mt-4" justify="end" gap={12}>
                    <Button
                        type="primary"
                        onClick={() => form.submit()}
                        icon={<SaveOutlined />}
                        loading={loadingRequestApproveQuote || loadingApproveQuote}
                        disabled={isString(quoteCodeConfirmed) && !isSelectDeny}
                    >
                        {i18n.t('action.save')}
                    </Button>
                    <Button onClick={onClose}>{i18n.t('action.close')}</Button>
                </Flex>
            </Form>
        </Modal>
    );
};
