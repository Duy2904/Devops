import { Button, Col, Modal, Select } from 'antd';
import { TourVisaDto, TourVisaStatus, UpdateVisaStatusRequest } from '@sdk/tour-operations';
import { getTourVisaStatus, useChangeStatus } from '../../hook/useDocumentReceiptVisa';

import { SizeType } from 'antd/es/config-provider/SizeContext';
import { SwapOutlined } from '@ant-design/icons';
import i18n from '@src/i18n';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { useState } from 'react';

interface ChangeStatusSelectProps {
    data?: TourVisaDto;
    rowSelected?: React.Key[];
    statusCurrent?: TourVisaStatus;
    size?: SizeType;
}

export const ChangeStatusSelect: React.FC<ChangeStatusSelectProps> = props => {
    const { data, rowSelected, statusCurrent, size } = props;
    const [open, setOpen] = useState(false);
    const [statusChange, setStatusChange] = useState<TourVisaStatus>();
    const selectDataStatus = getTourVisaStatus().filter(
        item =>
            item.value !== data?.tourVisaStatus && item.value !== statusCurrent && item.value !== TourVisaStatus.Cancel,
    );

    const { mutateAsync: changeStatus, isLoading } = useChangeStatus();

    const showModal = () => {
        setOpen(true);
    };

    const handleValueStatus = (status: TourVisaStatus) => {
        setStatusChange(status);
    };

    const handleChangeStatus = async () => {
        const listRequest: UpdateVisaStatusRequest = {
            ids: rowSelected ? (rowSelected as string[]) : [data?.id ?? ''],
            status: statusChange,
        };
        await changeStatus(listRequest);
        toastSuccess(i18n.t('menu.visaReceipt'), i18n.t('message.default.updateStatusSuccess'));
        setOpen(false);
    };

    return (
        <>
            <Button className="text-xs" size={size} icon={<SwapOutlined />} onClick={showModal}>
                {i18n.t('Chuyển trạng thái')}
            </Button>
            <Modal
                title={`${i18n.t('Thay đổi trạng thái biên nhận')}`}
                open={open}
                footer={false}
                closeIcon={false}
                destroyOnClose={true}
            >
                {!rowSelected && <p className="text-black/40">{`${i18n.t('Mã biên nhận:')} ${data?.code}`}</p>}
                <Col className="flex items-center gap-3 my-4">
                    <p>{i18n.t('Chọn trạng thái muốn chuyển:')}</p>
                    <Select
                        className="w-52"
                        virtual={false}
                        showSearch
                        optionFilterProp="children"
                        placeholder={i18n.t('Chọn trạng thái')}
                        options={selectDataStatus}
                        onChange={handleValueStatus}
                    />
                </Col>
                <p className="text-red-500 font-bold text-xs">
                    {i18n.t("Lưu ý: Chọn 'Xác nhận' để thay đổi trạng thái, 'Quay lại' để đóng")}
                </p>
                <Col className="flex items-center justify-end mt-6 gap-2">
                    <Button
                        type="primary"
                        className="text-xs"
                        onClick={handleChangeStatus}
                        loading={isLoading}
                        disabled={!statusChange}
                    >
                        Xác nhận
                    </Button>
                    <Button className="text-xs" onClick={() => setOpen(false)}>
                        Quay lại
                    </Button>
                </Col>
            </Modal>
        </>
    );
};
