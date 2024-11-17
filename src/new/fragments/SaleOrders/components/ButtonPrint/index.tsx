import { Button } from 'antd';
import { DocumentType } from '@sdk/tour-operations';
import { ReactNode } from 'react';
import { useSODownload } from '@hooks/queries/useSaleOrders';

interface ButtonPrintProps {
    soId: string;
    icon?: ReactNode;
    text?: string;
    className?: string;
}

export const ButtonPrint: React.FC<ButtonPrintProps> = props => {
    const { mutateAsync: SODownloadFile, isLoading: loadingDownload } = useSODownload();

    const handlePrint = async () => {
        const request = {
            id: props.soId ?? '',
            type: DocumentType.Pdf,
        };
        const res = await SODownloadFile(request);
        window.open(res, '_blank');
    };

    return (
        <Button
            onClick={handlePrint}
            disabled={loadingDownload}
            loading={loadingDownload}
            icon={props?.icon}
            className={props.className}
        >
            {props.text ? props.text : ''}
        </Button>
    );
};
