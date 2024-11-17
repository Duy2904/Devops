import { Skeleton } from 'antd';
import { TitleHeader } from '@components/ui/TitleHeader';
import { TourScheduleDto } from '@sdk/tour-operations';
import i18n from '@src/i18n';

interface HeaderRoomListFormProps {
    data?: TourScheduleDto;
    isLoading?: boolean;
}

export const HeaderRoomListForm: React.FC<HeaderRoomListFormProps> = props => {
    return (
        <>
            {props.isLoading ? (
                <Skeleton className="w-full" title={false} paragraph={{ rows: 1 }} active></Skeleton>
            ) : (
                <TitleHeader title={`${i18n.t('Room List: ')} ${props.data?.tourCode} - ${props.data?.name}`} />
            )}
        </>
    );
};
