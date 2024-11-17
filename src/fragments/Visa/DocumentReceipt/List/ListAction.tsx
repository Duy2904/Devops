import { isUndefined, size } from 'lodash';

import Can from '@components/common/Can';
import { ChangeStatusSelect } from '../Components/ChangeStatusSelect';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { Space } from 'antd';
import { TourVisaStatus } from '@sdk/tour-operations';

interface ListActionProps {
    rowSelected: React.Key[];
    statusChange?: (TourVisaStatus | undefined)[];
}

export const ListAction: React.FC<ListActionProps> = props => {
    const { rowSelected, statusChange } = props;
    return (
        <Space className="h-6">
            {size(statusChange) == 1 &&
                size(rowSelected) > 0 &&
                !isUndefined(statusChange) &&
                statusChange[0] !== TourVisaStatus.Cancel && (
                    <Can permissions={[MyPermissions.TourVisaUpdate]}>
                        <ChangeStatusSelect
                            size="small"
                            rowSelected={rowSelected}
                            statusCurrent={!isUndefined(statusChange) ? statusChange[0] : undefined}
                        />
                    </Can>
                )}
        </Space>
    );
};
