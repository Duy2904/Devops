import { OrderStatus, TourScheduleStatus, TravellerOrderStatus, VoucherStatus } from '@sdk/tour-operations';

import { Color } from '../Color/CustomColor';
import { PageName } from '@src/types/TypeEnum';
import clsx from 'clsx';
import { isEmptyString } from '@utils/formHelper';
import { useMemo } from 'react';

interface TagStatusProps {
    text: string;
    bgColor?: string;
    textColor?: string;
    className?: string;
    status?: string;
    page?: string;
}
export const TagStatus: React.FC<TagStatusProps> = props => {
    const { text, bgColor, textColor, className, page, status } = props;

    const colorClassName = useMemo(() => {
        const type = `${page}.${status}`;
        switch (type) {
            case `${PageName.Tour}.${TourScheduleStatus.New}`:
            case `${PageName.Voucher}.${VoucherStatus.Draft}`:
                return `${Color.bg_AFB5BC} ${Color.text_353A40}`;
            case `${PageName.Tour}.${TourScheduleStatus.SalesOpen}`:
            case `${PageName.SaleOrder}.${OrderStatus.Confirmed}`:
                return `bg-state-success text-white`;
            case `${PageName.Tour}.${TourScheduleStatus.Approved}`:
            case `${PageName.SaleOrder}.${OrderStatus.Paid}`:
            case `${PageName.SaleOrder}.${OrderStatus.CompletedRefund}`:
            case `${PageName.SaleOrder}.${TravellerOrderStatus.Booked}`:
            case `${PageName.Voucher}.${VoucherStatus.Refunded}`:
            case `${PageName.Voucher}.${VoucherStatus.Confirmed}`:
                return `bg-state-success/20 text-state-success`;
            case `${PageName.Tour}.${TourScheduleStatus.WaitingForApproval}`:
            case `${PageName.SaleOrder}.${OrderStatus.New}`:
            case `${PageName.SaleOrder}.${OrderStatus.Deposited}`:
            case `${PageName.SaleOrder}.${TravellerOrderStatus.Reserve}`:
            case `${PageName.Voucher}.${VoucherStatus.Received}`:
                return `${Color.bg_2F80ED} text-white`;
            case `${PageName.SaleOrder}.${OrderStatus.Confirming}`:
            case `${PageName.SaleOrder}.${OrderStatus.SendRefund}`:
            case `${PageName.Voucher}.${VoucherStatus.WaitingForApproval}`:
            case `${PageName.Voucher}.${VoucherStatus.WaitingForConfirmation}`:
                return `${Color.bg_2F80ED_20} ${Color.text_2F80ED}`;
            case `${PageName.Tour}.${TourScheduleStatus.NoSeatsAvailable}`:
            case `${PageName.SaleOrder}.${OrderStatus.Overload}`:
            case `${PageName.SaleOrder}.${TravellerOrderStatus.Waiting}`:
                return `bg-state-warning text-white`;
            case `${PageName.Tour}.${TourScheduleStatus.SaleTimeExpired}`:
            case `${PageName.SaleOrder}.${OrderStatus.WaitRefund}`:
                return `bg-state-warning/20 text-state-warning`;
            case `${PageName.Tour}.${TourScheduleStatus.Rejected}`:
            case `${PageName.Voucher}.${VoucherStatus.Rejected}`:
                return `bg-state-error text-white`;
            case `${PageName.Tour}.${TourScheduleStatus.Cancel}`:
            case `${PageName.SaleOrder}.${OrderStatus.Canceled}`:
            case `${PageName.SaleOrder}.${TravellerOrderStatus.Canceled}`:
                return `bg-state-error/20 text-state-error`;
            default:
                return '';
        }
    }, [page, status]);

    return (
        <>
            {isEmptyString(page) ? (
                <p
                    className={clsx(
                        'py-[3px] px-3 rounded-[40px] text-nowrap !inline w-auto',
                        bgColor,
                        textColor ? textColor : 'text-white',
                        className,
                    )}
                >
                    {text}
                </p>
            ) : (
                <p
                    className={clsx(
                        'py-[3px] px-3 rounded-[40px] text-nowrap !inline w-auto',
                        colorClassName,
                        className,
                    )}
                >
                    {text}
                </p>
            )}
        </>
    );
};
