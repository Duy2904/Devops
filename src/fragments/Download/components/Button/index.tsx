import { Col } from 'antd';
import { IconDownload } from '@src/new/components/common/svg';
import { SyncOutlined } from '@ant-design/icons';
import { TitleSignalDownload } from '@fragments/Download/Feature';

export interface ButtonProps {
    statusIcon?: TitleSignalDownload;
}

export const Button: React.FC<ButtonProps> = props => {
    const { statusIcon } = props;
    return (
        <Col className="w-10 h-10 flex items-center justify-center relative cursor-pointer bg-brand-primary/[12%] rounded-md">
            <SyncOutlined
                className={`text-4xl font-light text-brand-primary/20 ${
                    statusIcon && ['DownloadReportInProgress', 'DownloadReportStart'].includes(statusIcon)
                        ? 'flex'
                        : 'hidden'
                }`}
                spin
            />
            {/* <DownloadOutlined
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-primary font-bold text-md`}
            /> */}
            <Col className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center">
                <IconDownload width={20} height={20} />
            </Col>
        </Col>
    );
};
