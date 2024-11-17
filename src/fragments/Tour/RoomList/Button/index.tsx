import { Button, FormInstance } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

import { FieldTimeOutlined, SaveOutlined } from '@ant-design/icons';
import Can from '@components/common/Can';
import { ExportButton } from '@components/customizes/Button/ExportButton';
import { useExportExcelRoomList, useFetchRoomListOfTourFit } from '@fragments/Tour/hooks/useTourFit';
import useSignalRInstance from '@hooks/useSignalRInstance';
import { TourScheduleDto } from '@sdk/tour-operations';
import i18n from '@src/i18n';
import { rootPathsNew } from '@src/routers/newRoute';
import Format from '@utils/format';
import { MyPermissions } from '@utils/Permissions/index.ts';

interface ButtonRoomListProps {
    data?: TourScheduleDto;
    orderRoomForm?: FormInstance;
    setIsOpenHistory: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ButtonRoomList: React.FC<ButtonRoomListProps> = props => {
    const navigate = useNavigate();
    const { mutateAsync: exportData } = useExportExcelRoomList();
    const { data: dataRoomOfTour } = useFetchRoomListOfTourFit(props.data?.id);

    const { signalConnectedId } = useSignalRInstance(state => state);

    const handleExportExcel = useDebouncedCallback(async () => {
        await exportData({
            id: props.data?.id ?? '',
            request: {
                id: props.data?.id ?? '',
                connectionId: signalConnectedId ?? '',
                fileName: Format.formatExportExcelTitle(
                    `RoomList_${props.data?.tourCode}_${dayjs().format('DDMMYYYY')}.xlsx`,
                ),
                locale: 'vi-VN',
            },
        });
    }, 500);

    return (
        <>
            <Can permissions={[MyPermissions.RoomListUpdate]}>
                <Button
                    className="text-xs"
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={() => props.orderRoomForm?.submit()}
                >
                    {i18n.t('action.save')}
                </Button>
            </Can>
            <Can permissions={[MyPermissions.RoomListView]}>
                <ExportButton onClick={handleExportExcel} disabled={dataRoomOfTour?.length == 0} />
            </Can>
            <Button className="text-xs" icon={<FieldTimeOutlined />} onClick={() => props.setIsOpenHistory(true)}>
                {i18n.t('Lịch sử')}
            </Button>
            <Button className="text-xs" onClick={() => navigate(`${rootPathsNew.tourFit}`)}>
                {i18n.t('action.back')}
            </Button>
        </>
    );
};
