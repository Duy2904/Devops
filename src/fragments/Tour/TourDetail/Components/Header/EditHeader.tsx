import { Button, Col, FormInstance } from 'antd';
import {
    ClockCircleOutlined,
    DiffOutlined,
    FieldTimeOutlined,
    IssuesCloseOutlined,
    SaveOutlined,
} from '@ant-design/icons';
import { PermissionType, TourType } from '@src/types/TypeEnum';
import { TourScheduleDto, TourScheduleStatus } from '@sdk/tour-operations';

import Can from '@components/common/Can';
import { HeadContent } from '@components/ui/HeadContent';
import { HeaderTourFormComponent } from './HeaderTourForm';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { RequestApproveModal } from '@components/ui/Modal/RequestApproveModal';
import { RouteCreateSOFromTourState } from '@fragments/SaleOrders/features';
import { StaticTag } from '@components/customizes/StaticTag';
import dayjs from 'dayjs';
import { getPermission } from '../../Feature/getPermission';
import i18n from '@src/i18n';
import { rootPathsNew } from '@src/routers/newRoute';
import { setColorStatusTour } from '@utils/colorStatus';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { useDebouncedCallback } from 'use-debounce';
import { useNavigate } from 'react-router-dom';
import { useTourFitRequestApprove } from '@fragments/Tour/hooks/useTourFit';
import { useTourGitRequestApprove } from '@fragments/Tour/hooks/useTourGit';

interface EditHeaderProps {
    tourSchedule?: TourScheduleDto;
    form: FormInstance;
    onClick?: () => void;
    onClickNotBack?: () => void;
    isLoading?: boolean;
    changeStatus: boolean;
    setChangeStatus: React.Dispatch<React.SetStateAction<boolean>>;
    backUrl?: string;
    tourType: TourType;
    setIsOpenHistory: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditHeader: React.FC<EditHeaderProps> = props => {
    const navigate = useNavigate();

    const { mutateAsync: tourFitRequestApprove, isLoading: loadingTourFitRequestApproval } = useTourFitRequestApprove();
    const { mutateAsync: tourGitRequestApprove, isLoading: loadingTourGitRequestApproval } = useTourGitRequestApprove();

    const handleOnClick = () => {
        if (!props.onClick) return;
        props.onClick();
    };

    const handleOnClickNotBack = () => {
        if (!props.onClickNotBack) return;
        props.onClickNotBack();
    };

    const handleSentRequest = useDebouncedCallback(async () => {
        props.setChangeStatus(false);
        const dataObj = {
            id: props.tourSchedule?.id ?? '',
            data: {
                tourScheduleId: props.tourSchedule?.id,
            },
        };
        props.tourType == TourType.FIT
            ? await tourFitRequestApprove({ ...dataObj })
            : await tourGitRequestApprove({ ...dataObj });
        toastSuccess(i18n.t('message.updateStatus.title'), i18n.t('message.updateStatus.sentApproveSuccess'));
        props.setChangeStatus(true);
    }, 500);

    return (
        <HeadContent
            slugContent={<></>}
            titleContent={
                <Col>
                    <HeaderTourFormComponent data={props.tourSchedule} tourType={props.tourType} showTitle />
                    {props.tourSchedule?.status && (
                        <Col className="flex items-center gap-2">
                            <StaticTag
                                type={i18n.t(`tour.status.${props.tourSchedule?.status}`)}
                                showLabel
                                color={`${setColorStatusTour(props.tourSchedule?.status)}`}
                            />
                            <Can permissions={[MyPermissions.HistoryTourFitView]}>
                                <>
                                    <p className="text-xs text-gray-300">|</p>
                                    <Col
                                        className="flex gap-1 items-center text-[#1677ff] text-xs font-semibold cursor-pointer"
                                        onClick={() => props.setIsOpenHistory(true)}
                                    >
                                        <FieldTimeOutlined />
                                        {i18n.t('Lịch sử')}
                                    </Col>
                                </>
                            </Can>
                        </Col>
                    )}
                </Col>
            }
            buttonActionList={
                <>
                    <Can permissions={getPermission(props.tourType, [PermissionType.Update])}>
                        <>
                            <Button
                                className="text-xs"
                                loading={props.isLoading}
                                type="primary"
                                icon={<SaveOutlined />}
                                onClick={handleOnClick}
                            >
                                {i18n.t('action.save')}
                            </Button>
                            <Button
                                className="text-xs"
                                type="primary"
                                icon={<SaveOutlined />}
                                onClick={handleOnClickNotBack}
                                loading={props.isLoading}
                            >
                                {i18n.t('action.saveAndContinue')}
                            </Button>
                        </>
                    </Can>
                    {props.tourSchedule &&
                        (props.tourSchedule?.status === TourScheduleStatus.New ||
                            props.tourSchedule?.status === TourScheduleStatus.Rejected) && (
                            <Can permissions={getPermission(props.tourType, [PermissionType.Update])}>
                                <Button
                                    className="text-xs"
                                    type="default"
                                    icon={<ClockCircleOutlined />}
                                    onClick={handleSentRequest}
                                    loading={
                                        props.tourType == TourType.FIT
                                            ? loadingTourFitRequestApproval
                                            : loadingTourGitRequestApproval
                                    }
                                >
                                    {i18n.t('action.sentRequest')}
                                </Button>
                            </Can>
                        )}
                    {props.tourSchedule && props.tourSchedule?.status === TourScheduleStatus.WaitingForApproval && (
                        <Can permissions={getPermission(props.tourType, [PermissionType.Approve])}>
                            <RequestApproveModal
                                dataApprove={props.tourSchedule?.tourCode ?? ''}
                                icon={<IssuesCloseOutlined />}
                                content={i18n.t('action.acceptOpenSale')}
                                setIsChangeStatus={props.setChangeStatus}
                                tourType={props.tourType}
                            />
                        </Can>
                    )}
                    {props?.tourType == TourType.FIT &&
                        (props.tourSchedule?.status === TourScheduleStatus.SalesOpen ||
                            (props.tourSchedule?.status === TourScheduleStatus.NoSeatsAvailable &&
                                dayjs(props.tourSchedule?.saleEndDate).isAfter(dayjs()) &&
                                !props.tourSchedule?.hasTourThienNhien)) && (
                            <Can permissions={[MyPermissions.SaleOrderCreate, MyPermissions.AgencySaleOrderCreate]}>
                                <Button
                                    className="text-xs bg-gray-200"
                                    type="default"
                                    icon={<DiffOutlined />}
                                    onClick={() =>
                                        navigate(`${rootPathsNew.saleOrderFormDetail}`, {
                                            state: {
                                                createSOFromTourId: props.tourSchedule?.id,
                                            } as RouteCreateSOFromTourState,
                                        })
                                    }
                                    disabled={
                                        !props.tourSchedule ||
                                        (props.tourSchedule?.status !== TourScheduleStatus.SalesOpen &&
                                            !(
                                                props.tourSchedule?.status === TourScheduleStatus.NoSeatsAvailable &&
                                                dayjs(props.tourSchedule?.saleEndDate).isAfter(dayjs())
                                            ))
                                    }
                                >
                                    {i18n.t('action.createSO')}
                                </Button>
                            </Can>
                        )}
                    <Button className="text-xs" type="default" onClick={() => navigate(`${props.backUrl}`)}>
                        {i18n.t('action.back')}
                    </Button>
                </>
            }
        />
    );
};
