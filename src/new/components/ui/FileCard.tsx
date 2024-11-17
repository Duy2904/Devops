import { Flex } from 'antd';
import clsx from 'clsx';

import { IconJpg, IconPdf, IconPng, IconWord } from '../common/svg';
import { Color } from './Color/CustomColor';

interface FileCardProps {
    fileName: string;
    className?: string;
}

const FileCard = ({ fileName, className }: FileCardProps) => {
    const dotIndex = fileName.lastIndexOf('.');
    const name = fileName.slice(0, dotIndex);
    const fileType = fileName.slice(dotIndex + 1);

    const renderIcon = () => {
        switch (fileType) {
            case 'pdf':
                return (
                    <Flex
                        className={clsx(
                            'aspect-square w-6 h-6 flex items-center justify-center shrink-0 rounded',
                            Color.bg_FFF1F0,
                        )}
                        align="center"
                        justify="center"
                    >
                        <IconPdf fill={Color.color_F5222D} width={16} height={16} />
                    </Flex>
                );
            case 'docx':
            case 'doc':
                return (
                    <Flex
                        className={clsx(
                            'aspect-square w-6 h-6 flex items-center justify-center shrink-0 rounded',
                            Color.bg_E6F4FF,
                        )}
                        align="center"
                        justify="center"
                    >
                        <IconWord fill={Color.color_0958D9} width={16} height={16} />
                    </Flex>
                );

            case 'jpg':
                return (
                    <Flex
                        className={clsx(
                            'aspect-square w-6 h-6 flex items-center justify-center shrink-0 rounded',
                            Color.bg_FA8C16_8,
                        )}
                        align="center"
                        justify="center"
                    >
                        <IconJpg fill={Color.color_FA8C16} width={16} height={16} />
                    </Flex>
                );

            case 'png':
                return (
                    <Flex
                        className={clsx(
                            'aspect-square w-6 h-6 flex items-center justify-center shrink-0 rounded',
                            Color.bg_00C784_10,
                        )}
                        align="center"
                        justify="center"
                    >
                        <IconPng fill={Color.color_03C684} width={16} height={16} />
                    </Flex>
                );
        }
    };

    return (
        <Flex
            justify="space-between"
            align="center"
            className={clsx(
                'cursor-pointer border border-solid rounded-md h-[30px] pl-0.5 pr-[10px] shadow-[0px_2px_0px_0px_#00000005] gap-1.5',
                Color.border_DBDBDB,
                className,
            )}
        >
            {renderIcon()}
            <div className={`${Color.text_2A2A2A} flex font-semibold text-xs break-all`}>
                <span className="line-clamp-1">{name}</span>
                <span className="shrink-0">{fileType}</span>
            </div>
        </Flex>
    );
};

export default FileCard;
