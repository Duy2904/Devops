import { Button } from 'antd';
import Can from '@components/common/Can';
import { ClockCircleOutlined } from '@ant-design/icons';
import { PermissionType } from '@src/types/TypeEnum';
import { getPermission } from '@fragments/Quote/features/getPermission';
import i18n from '@src/i18n';
import { useCallback } from 'react';
import { useQuoteStore } from '@fragments/Quote/store/quoteStore';

interface ButtonRequestApproveCommonProps {
    isSmall?: boolean;
    quoteId: string;
    isLoading?: boolean;
    requestApprove: () => Promise<void>;
}

export const ButtonRequestApproveCommon: React.FC<ButtonRequestApproveCommonProps> = props => {
    const { isSmall, quoteId, requestApprove, isLoading } = props;

    // Store
    const { tourType } = useQuoteStore(state => state);

    const submitRequestApproveQuote = useCallback(() => {
        requestApprove();
    }, [requestApprove]);

    return (
        <Can permissions={getPermission(tourType, [PermissionType.Update])}>
            {isSmall ? (
                <Button
                    className="!text-xs"
                    type="default"
                    size="small"
                    icon={<ClockCircleOutlined />}
                    onClick={submitRequestApproveQuote}
                    loading={isLoading}
                    disabled={isLoading}
                >
                    {i18n.t('action.sentRequest')}
                </Button>
            ) : (
                <Button
                    className="text-xs"
                    onClick={submitRequestApproveQuote}
                    disabled={!quoteId}
                    icon={<ClockCircleOutlined />}
                    loading={isLoading}
                >
                    {i18n.t(`action.sentRequest`)}
                </Button>
            )}
        </Can>
    );
};
