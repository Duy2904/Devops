import { Button, Tooltip } from 'antd';
import { useEffect, useState } from 'react';

import { IconExortFile } from '../../common/svg/IconExortFile';
import i18n from '@src/i18n';
import { useDownloadStore } from '@fragments/Download/Store';

interface ExportButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    isSmall?: boolean;
}

export const ExportButton: React.FC<ExportButtonProps> = props => {
    const { onClick, disabled, isSmall } = props;
    const { itemDownload } = useDownloadStore(state => state);
    const [disabledButton, setDisabledButton] = useState<boolean>(false);

    useEffect(() => {
        const disabledButton = !!(
            itemDownload?.connectionId &&
            itemDownload?.title &&
            ['DownloadReportInProgress', 'DownloadReportStart'].includes(itemDownload?.title)
        );
        setDisabledButton(disabledButton);
    }, [itemDownload?.connectionId, itemDownload?.title]);

    if (isSmall) {
        return (
            <Tooltip placement="top" title={i18n.t('action.exportExcel')}>
                <Button
                    className="flex items-center justify-center !w-7 !h-7 bg-green-700/10 rounded-sm cursor-pointer text-green-700 font-bold border-none hover:!bg-green-700 hover:!text-white transition-all ease-in-out"
                    icon={<IconExortFile fill="#222222" />}
                    onClick={props.onClick}
                    disabled={disabled || disabledButton}
                    loading={disabled || disabledButton}
                ></Button>
            </Tooltip>
        );
    }

    return (
        <Button
            onClick={onClick}
            className={`flex items-center text-xs hover:!border-gray-300 hover:!text-[#222222] hover:!opacity-60`}
            icon={<IconExortFile fill="#222222" />}
            disabled={disabled || disabledButton}
            loading={disabled || disabledButton}
        >
            {i18n.t('action.exportExcel')}
        </Button>
    );
};
