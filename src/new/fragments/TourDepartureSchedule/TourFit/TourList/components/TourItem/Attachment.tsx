import { Col, Flex, Spin } from 'antd';

import { Color } from '@src/new/components/ui/Color/CustomColor';
import FileCardList from '@src/new/components/ui/Card/FileCardList';
import { IconAttachment } from '@src/new/components/common/svg';
import { LoadingOutlined } from '@ant-design/icons';
import { TourSearchFitViewDto } from '@sdk/tour-operations';
import { downloadfileFromBlob } from '@src/new/shared/utils/downloadFile';
import { t } from 'i18next';
import { useDownloadAllFile } from '../../hooks/mutates';

interface AttachmentProps {
    item: TourSearchFitViewDto;
}

export const Attachment: React.FC<AttachmentProps> = props => {
    const { item } = props;

    const { mutateAsync: downloadFiles, isLoading } = useDownloadAllFile();

    const handleDownload = async () => {
        const blobDataRes = await downloadFiles(item.id!);
        downloadfileFromBlob(blobDataRes, `${item.tourCode}-files-downloaded.zip`);
    };

    return (
        <Col>
            <Flex gap={12} align="center">
                <FileCardList
                    totalDisplayFile={0}
                    data={item.tourScheduleMedias}
                    textBtn="File đính kèm"
                    isHideTitle
                    position={'bottomLeft'}
                />
                <Flex
                    align="center"
                    className={`${Color.text_1677FF} ${
                        isLoading && 'opacity-50 cursor-wait'
                    } gap-1 text-xs hover:underline cursor-pointer`}
                    onClick={() => !isLoading && handleDownload()}
                >
                    <IconAttachment fill="#1677FF" />
                    {t('Tải tất cả')}
                    {isLoading ? (
                        <Spin className="ml-1" indicator={<LoadingOutlined spin />} size="small" />
                    ) : (
                        <div
                            className={`${Color.bg_1677FF} text-[8px] font-medium flex items-center justify-center rounded min-w-[14px] h-[14px] text-white`}
                        >
                            {item.tourScheduleMedias?.length}
                        </div>
                    )}
                </Flex>
            </Flex>
        </Col>
    );
};
