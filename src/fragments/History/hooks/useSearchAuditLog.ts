import { AppConfig } from '@utils/config';
import { AuditLogApi } from '@sdk/tour-operations';
import { getAxiosInstance } from '@services/auth';
import { useMutation } from 'react-query';

export const auditLogApi = () => {
    return new AuditLogApi(undefined, AppConfig.ApiHost, getAxiosInstance());
};

export const useGetAuditLog = () => {
    const fetchData = async (data: { tableName: string; id: string | undefined }) => {
        let response;
        const { id, tableName } = data;
        switch (tableName) {
            case 'TourSchedule':
                response = await auditLogApi().auditLogGetTourAuditLogs('root', { primaryKey: id });
                break;
            case 'TourGit':
                response = await auditLogApi().auditLogGetTourGitAuditLogs('root', { primaryKey: id });
                break;
            case 'SaleOrder':
                response = await auditLogApi().auditLogGetSaleOrderAuditLogs('root', { primaryKey: id });
                break;
            case 'ReceivableVoucher':
                response = await auditLogApi().auditLogGetReceivableAuditLogs('root', { primaryKey: id });
                break;
            case 'RefundVoucher':
                response = await auditLogApi().auditLogGetRefundAuditLogs('root', { primaryKey: id });
                break;
            case 'Discount':
                response = await auditLogApi().auditLogGetDiscountAuditLogs('root', { primaryKey: id });
                break;
            case 'TourVisa':
                response = await auditLogApi().auditLogGetTourVisaAuditLogs('root', { primaryKey: id });
                break;
            case 'Quote':
                response = await auditLogApi().auditLogGetQuoteAuditLogs('root', { primaryKey: id });
                break;
            case 'QuoteGit':
                response = await auditLogApi().auditLogGetQuoteGitAuditLogs('root', { primaryKey: id });
                break;
            case 'RoomList':
                response = await auditLogApi().auditLogGetRoomListAuditLogs('root', { primaryKey: id });
                break;
            case 'AgentDetail':
                response = await auditLogApi().auditLogGetAgentAuditLogs('root', { primaryKey: id });
                break;
            case 'BranchDetail':
                response = await auditLogApi().auditLogGetBranchAuditLogs('root', { primaryKey: id });
                break;
            case 'UserDetail':
                response = await auditLogApi().auditLogGetAccountAuditLogs('root', { primaryKey: id });
                break;
            case 'RoleDetail':
                response = await auditLogApi().auditLogGetRoleAuditLogs('root', { primaryKey: id });
                break;
            default:
                // Handle default case
                throw new Error(`Invalid table name: ${tableName}`);
        }
        return response.data;
    };
    return useMutation(['getAuditLog'], fetchData);
};
