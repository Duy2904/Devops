import { Avatar, Badge, Col } from 'antd';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { useNavigate } from 'react-router-dom';

import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { rootPathsNew } from '@src/routers/newRoute';
import { rootPaths } from '@src/routers/route';
import { AppConfig } from '@utils/config';
import Format from '@utils/format';
import { MyPermissions } from '@utils/Permissions/index.ts';

import { DataSignal } from './features/NotificationFeature';
import { renderNotiDetail } from './features/ReturnDataContent';
import { useMarkReadNotification } from './hooks/useNotification';

export interface NotificationDetailProps {
    item: DataSignal;
    notiDetail: DataSignal['data'];
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NotificationDetail: React.FC<NotificationDetailProps> = props => {
    const { item, notiDetail, setOpen } = props;
    const navigate = useNavigate();
    const canViewFit = useHasAnyPermission([MyPermissions.TourFitView, MyPermissions.AgencyTourFitView]);
    const canViewGit = useHasAnyPermission([MyPermissions.TourGitView]);
    const canViewSO = useHasAnyPermission([MyPermissions.SaleOrderView, MyPermissions.AgencySaleOrderView]);
    const canViewVoucher = useHasAnyPermission([MyPermissions.ReceivableVoucherView]);
    const canViewRefundVoucher = useHasAnyPermission([MyPermissions.RefundVoucherView]);
    const canViewQuote = useHasAnyPermission([MyPermissions.QuoteView, MyPermissions.AgencyQuoteView]);
    const canViewQuoteGit = useHasAnyPermission([MyPermissions.QuoteGitView, MyPermissions.AgencyQuoteGitView]);

    const { mutateAsync: markReadNotification } = useMarkReadNotification();

    const handleRedirectUrl = async () => {
        if (canViewSO && item?.title.startsWith('SaleOrder')) {
            navigate(`${rootPathsNew.saleOrderViewDetail}/${notiDetail?.id}`);
        } else if (canViewVoucher && item?.title.startsWith('Voucher')) {
            navigate(`${rootPaths.receivableVoucherForm}/${notiDetail?.id}`);
        } else if (canViewRefundVoucher && item?.title.startsWith('RefundVoucher')) {
            navigate(`${rootPaths.refundVoucherForm}/${notiDetail?.id}`);
        } else if (canViewQuoteGit && item?.title.startsWith('QuoteGit')) {
            navigate(`${rootPaths.quoteGitForm}/${notiDetail?.id}`);
        } else if (canViewQuote && item?.title.startsWith('Quote')) {
            if (notiDetail?.tourTypeCode === 'GIT') {
                navigate(`${rootPaths.quoteGitForm}/${notiDetail?.id}`);
            } else {
                navigate(`${rootPaths.quoteFitForm}/${notiDetail?.id}`);
            }
        } else {
            if (notiDetail?.tourTypeCode === 'FIT' && canViewFit) {
                navigate(`${rootPaths.fitTourForm}/${notiDetail?.tourCode}`);
            } else if (notiDetail?.tourTypeCode === 'GIT' && canViewGit) {
                navigate(`${rootPaths.gitTourForm}/${notiDetail?.tourCode}`);
            }
        }
        if (!item?.isRead) {
            await markReadNotification(item?.id);
        }
        setOpen(false);
    };

    if (isNil(notiDetail) || isNil(item) || isEmpty(notiDetail) || isEmpty(item)) {
        return <></>;
    }

    return (
        <Col
            className={`py-4 px-3 border border-solid border-transparent border-b-gray-300 ${
                !item?.isRead ? 'opacity-100' : 'opacity-50'
            } hover:bg-blue-200/20 cursor-pointer transition-all`}
            onClick={() => handleRedirectUrl()}
        >
            <Col className="flex items-center justify-between gap-3">
                <Col className="flex items-start gap-2">
                    <Col>
                        <Avatar size={40}>{notiDetail?.firstName?.slice(0, 1)}</Avatar>
                    </Col>
                    <Col className="flex flex-col gap-1">
                        {renderNotiDetail(item, notiDetail)}
                        <p className="text-xs text-gray-500 font-normal">
                            {item?.createdOn
                                ? Format.formatUTCTime(item.createdOn, AppConfig.TimeDateFormat)
                                : undefined}
                        </p>
                    </Col>
                </Col>
                {!item?.isRead ? <Badge status="error" /> : <></>}
            </Col>
        </Col>
    );
};
