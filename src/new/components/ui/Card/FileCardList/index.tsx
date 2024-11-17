import { Col, Flex, Popover } from 'antd';

import { Color } from '../../Color/CustomColor';
import FileUploadList from './components/FileUploadList';
import { IconArrowDown } from '@src/new/components/common/svg';
import { TooltipPlacement } from 'antd/es/tooltip';
import { TourScheduleMediaSummaryDto } from '@sdk/tour-operations';
import clsx from 'clsx';
import useTourMediaFiles from './hooks/useTourMediaFiles';
import { useTranslation } from 'react-i18next';

interface FileCardListProps {
    data?: TourScheduleMediaSummaryDto[];
    isHorizontal?: boolean;
    totalDisplayFile?: number;
    isHideTitle?: boolean;
    textBtn?: string;
    position?: TooltipPlacement;
}

const FileCardList: React.FC<FileCardListProps> = props => {
    const { data, isHorizontal, totalDisplayFile, isHideTitle, textBtn, position } = props;

    const { t } = useTranslation();
    const { mainFiles, extraFiles } = useTourMediaFiles(data, totalDisplayFile);

    return (
        <Flex vertical={!isHorizontal}>
            <FileUploadList
                className={clsx({
                    '[&>.ant-upload-list]:flex [&>.ant-upload-list]:gap-1': isHorizontal,
                })}
                fileList={mainFiles}
            />

            {extraFiles.length > 0 && (
                <Col className="flex justify-end">
                    <Popover
                        content={
                            <div className="max-w-[220px] max-h-[260px] overflow-auto">
                                <FileUploadList fileList={extraFiles} />
                            </div>
                        }
                        title={
                            !isHideTitle ? (
                                <span className={`${Color.text_black_45} text-xs/[22px] font-normal`}>
                                    {t('File đính kèm')}
                                </span>
                            ) : (
                                <></>
                            )
                        }
                        trigger="hover"
                        placement={position ? position : 'bottomRight'}
                        arrow={false}
                    >
                        <button
                            className={clsx(
                                `h-[30px] min-w-[28px] px-[6px] cursor-pointer border-none text-xs shrink-0 rounded-md`,
                                Color.text_2A2A2A,
                                textBtn ? Color.bg_EAEDF9 : Color.bg_DFE2E6,
                            )}
                        >
                            {textBtn ? (
                                <div>
                                    <span className="pr-1">{textBtn}</span>
                                    <IconArrowDown fill={Color.color_black_45} />
                                </div>
                            ) : (
                                `+${extraFiles.length}`
                            )}
                        </button>
                    </Popover>
                </Col>
            )}
        </Flex>
    );
};

export default FileCardList;
