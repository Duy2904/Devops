import { Button, Flex, Form, FormInstance } from 'antd';
import { DocumentType, TourVisaDto, TourVisaStatus } from '@sdk/tour-operations';
import { ExclamationCircleOutlined, PrinterOutlined, SaveOutlined } from '@ant-design/icons';
import { useCallback } from 'react';

import Can from '@components/common/Can';
import { ChangeStatusSelect } from '../Components/ChangeStatusSelect';
import { MyPermissions } from '@utils/Permissions/index.ts';
import i18n from '@src/i18n';
import modal from 'antd/es/modal';
import { rootPaths } from '@src/routers/route';
import { useDebouncedCallback } from 'use-debounce';
import { useDownloadFile } from '../hook/useDocumentReceiptVisa';
import { useNavigate } from 'react-router-dom';

interface ButtonDocumentReceiptDetailProps {
    infoForm: FormInstance;
    documentReceiptId?: string;
    submittable?: boolean;
    data?: TourVisaDto;
}

export const ButtonDocumentReceiptDetail: React.FC<ButtonDocumentReceiptDetailProps> = props => {
    const { infoForm, submittable, documentReceiptId, data } = props;
    const navigate = useNavigate();
    const useWatchForm = Form.useWatch('visaLineId', infoForm);

    // Mutate
    const { mutateAsync: downloadFile, isLoading: loadingDownload } = useDownloadFile();

    const handleBack = () => {
        if (submittable) {
            modal.confirm({
                title: `${i18n.t('message.default.warning')}`,
                icon: <ExclamationCircleOutlined />,
                content: i18n.t('Bạn chưa lưu dữ liệu, bạn có muốn thoát không?'),
                cancelText: i18n.t('action.back'),
                onOk: () => {
                    navigate(rootPaths.documentReceipt);
                },
            });
        } else {
            navigate(rootPaths.documentReceipt);
        }
    };

    const handleDownload = async () => {
        const request = {
            id: documentReceiptId ?? '',
            type: DocumentType.Pdf,
        };
        const res = await downloadFile(request);
        window.open(res, '_blank');
    };

    const handleSubmitForm = useCallback(() => {
        infoForm.submit();
    }, [infoForm]);

    const onSubmit = useDebouncedCallback(
        () => {
            handleSubmitForm();
        },
        2000,
        { leading: true, trailing: false },
    );

    return (
        <Flex gap={8} className="flex-wrap">
            <Can permissions={[MyPermissions.TourVisaCreate, MyPermissions.TourVisaUpdate]}>
                <Button
                    className="text-xs"
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={onSubmit}
                    disabled={!submittable || !useWatchForm}
                >
                    {i18n.t('action.save')}
                </Button>
            </Can>
            {documentReceiptId && (
                <>
                    <Can permissions={[MyPermissions.TourVisaView]}>
                        <Button
                            className="text-xs"
                            type="default"
                            icon={<PrinterOutlined />}
                            onClick={handleDownload}
                            disabled={loadingDownload}
                            loading={loadingDownload}
                        >
                            {i18n.t('In Phiếu')}
                        </Button>
                    </Can>
                    {data?.tourVisaStatus !== TourVisaStatus.Cancel && (
                        <Can permissions={[MyPermissions.TourVisaUpdate]}>
                            <ChangeStatusSelect data={data} />
                        </Can>
                    )}
                </>
            )}
            <Button className="text-xs" onClick={handleBack}>
                {i18n.t('Quay lại')}
            </Button>
        </Flex>
    );
};
