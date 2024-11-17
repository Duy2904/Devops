import { ApproveStatus, OrderStatus } from '../../../sdk/tour-operations';
import i18n from '../../i18n';

export const getOrderStatus = () =>
    Object.values(OrderStatus).map((key: string) => ({
        value: key,
        label: i18n.t(`OrderStatus.${key}`),
    }));

export const getApproveStatus = () =>
    Object.values(ApproveStatus).map((key: string | ApproveStatus) => ({
        value: key,
        label: i18n.t(`OrderStatus.${key}`),
    }));
