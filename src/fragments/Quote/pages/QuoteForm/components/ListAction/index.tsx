import { ClockCircleOutlined, SaveOutlined } from '@ant-design/icons';
import { PermissionType, TourType } from '@src/types/TypeEnum';
import { QuoteDetailDto, QuoteStatus } from '@sdk/tour-operations';
import { useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from 'antd';
import { ButtonExportExcelFit } from '@fragments/Quote/components/TourFit/ButtonExportExcelFit';
import { ButtonExportExcelGit } from '@fragments/Quote/components/TourGit/ButtonExportExcelGit';
import { ButtonRequestApproveFit } from '@fragments/Quote/components/TourFit/ButtonRequestApproveFit';
import { ButtonRequestApproveGit } from '@fragments/Quote/components/TourGit/ButtonRequestApproveGit';
import Can from '@components/common/Can';
import { ConfirmBackModal } from '@components/ui/Modal/ConfirmBackModal';
import { ConfirmQuoteFit } from '@fragments/Quote/components/TourFit/ConfirmQuoteFit';
import { ConfirmQuoteGit } from '@fragments/Quote/components/TourGit/ConfirmQuoteGit';
import { RouteCloneQuoteState } from '@fragments/Quote/features';
import dayjs from 'dayjs';
import { getLinkQuoteList } from '@fragments/Quote/features/getLink';
import { getPermission } from '@fragments/Quote/features/getPermission';
import i18n from '@src/i18n';
import { useDebouncedCallback } from 'use-debounce';
import { useQuoteStore } from '@fragments/Quote/store/quoteStore';
import { useTourScheduleStore } from '@store/tourScheduleStore';

interface ListActionProps {
    dataQuote: QuoteDetailDto;
    quoteId: string;
    isSubmitting: boolean;
    isEnableEdit: boolean;
    isOpenConfirmationModal: boolean;
    isDirty: boolean;
    onSubmit: () => void;
    setIsOpenConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const statusShowApprove = [QuoteStatus.WaitConfirm];
const statusShowRequestApprove = [QuoteStatus.Draft, QuoteStatus.Deny];

export const ListAction: React.FC<ListActionProps> = props => {
    const {
        quoteId,
        isSubmitting,
        onSubmit,
        isEnableEdit,
        dataQuote,
        isOpenConfirmationModal,
        setIsOpenConfirmationModal,
        isDirty,
    } = props;

    const navigate = useNavigate();
    const { clonedId } = (useLocation().state ?? { cloneId: false }) as RouteCloneQuoteState;
    const isCloned = !!clonedId;
    const isShowApproveBtn = dataQuote?.status && statusShowApprove.includes(dataQuote?.status);
    const isShowRequestApproveBtn = dataQuote?.status && statusShowRequestApprove.includes(dataQuote?.status);

    // Store
    const { tourSchedule } = useTourScheduleStore(state => state);
    const { tourType } = useQuoteStore(state => state);

    // State
    const [isOpenConfirmBack, setIsOpenConfirmBack] = useState<boolean>(false);

    const fileName = useMemo(
        () => `${dataQuote.orderNo}_${tourSchedule.tourCode}_${dayjs().format('DDMMYYYY')}.xlsx`,
        [dataQuote.orderNo, tourSchedule.tourCode],
    );

    const handleClickBackBtn = () => {
        if (isDirty) {
            setIsOpenConfirmBack(true);
        } else {
            handleBack();
        }
    };

    const handleBack = () => {
        navigate(getLinkQuoteList(tourType));
    };

    const handleClickApprove = useDebouncedCallback(
        () => {
            setIsOpenConfirmationModal(true);
        },
        1000,
        { leading: true, trailing: false },
    );

    const renderBtnRequestApprove = useCallback(() => {
        if (tourType === TourType.GIT) {
            return <ButtonRequestApproveGit quoteId={quoteId} />;
        } else {
            return <ButtonRequestApproveFit quoteId={quoteId} />;
        }
    }, [quoteId, tourType]);

    const isSendRequest = dataQuote.status === QuoteStatus.Draft || dataQuote.status === QuoteStatus.Deny;
    const isApproveRequest = dataQuote.status === QuoteStatus.WaitConfirm;

    return (
        <>
            <div className="flex flex-wrap gap-2">
                <Can permissions={getPermission(tourType, [PermissionType.Create, PermissionType.Update])}>
                    <Button
                        className="text-xs"
                        type="primary"
                        icon={<SaveOutlined />}
                        onClick={onSubmit}
                        loading={isSubmitting}
                        disabled={!isEnableEdit}
                    >
                        {i18n.t(`action.save`)}
                    </Button>
                </Can>
                {isShowRequestApproveBtn && quoteId && !isCloned && (
                    <Can permissions={getPermission(tourType, [PermissionType.Update])}>
                        {renderBtnRequestApprove()}
                    </Can>
                )}
                {isShowApproveBtn && quoteId && !isCloned && (
                    <Can permissions={getPermission(tourType, [PermissionType.Approve])}>
                        <Button
                            className="text-xs"
                            onClick={handleClickApprove}
                            disabled={!quoteId}
                            icon={<ClockCircleOutlined />}
                        >
                            {i18n.t(`action.approve`)}
                        </Button>
                    </Can>
                )}
                {dataQuote.id && tourType === TourType.GIT && !isCloned && (
                    <ButtonExportExcelGit quoteId={quoteId} fileName={fileName} />
                )}
                {dataQuote.id && tourType === TourType.FIT && !isCloned && (
                    <ButtonExportExcelFit quoteId={quoteId} fileName={fileName} />
                )}
                <Button className="text-xs" onClick={handleClickBackBtn}>
                    {i18n.t(`action.back`)}
                </Button>
            </div>
            {tourType === TourType.GIT ? (
                <ConfirmQuoteGit
                    quoteId={quoteId}
                    isSendRequest={isSendRequest}
                    isApproveRequest={isApproveRequest}
                    isOpenModal={isOpenConfirmationModal}
                    setIsModalOpen={setIsOpenConfirmationModal}
                />
            ) : (
                <ConfirmQuoteFit
                    quoteId={quoteId}
                    isSendRequest={isSendRequest}
                    isApproveRequest={isApproveRequest}
                    isOpenModal={isOpenConfirmationModal}
                    setIsModalOpen={setIsOpenConfirmationModal}
                />
            )}
            <ConfirmBackModal
                title={i18n.t(`quote.modal.backModal.title`)}
                content={i18n.t(`quote.modal.backModal.content`)}
                isOpenModal={isOpenConfirmBack}
                setIsModalOpen={setIsOpenConfirmBack}
                handleBack={handleBack}
            />
        </>
    );
};
