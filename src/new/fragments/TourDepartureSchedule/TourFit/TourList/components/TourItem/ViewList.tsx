import { Flex } from 'antd';
import { SaleOrderDrawer } from '../SaleOrderDrawer';
import { TourSearchFitViewDto } from '@sdk/tour-operations';
import { TypeList } from '../SaleOrderDrawer/TableData';
import clsx from 'clsx';
import Can from '@src/new/components/common/Can';
import { MyPermissions } from '@utils/Permissions';

interface ViewListProps {
    text: string;
    number: number;
    hasIcon?: boolean;
    tooltip?: string;
    colorNumber: string;
    dataTour?: TourSearchFitViewDto;
    typeList?: TypeList;
}
export const ViewList: React.FC<ViewListProps> = props => {
    const { text, number, colorNumber, hasIcon, tooltip, dataTour, typeList } = props;

    return (
        <Flex gap={4} justify="flex-end" align="center" className={clsx(`w-40`)}>
            <Flex justify="flex-end" align="center" className={clsx('p-px rounded text-xs')}>
                <span className={clsx('px-1 text-black font-semibold')}>{text}</span>
                <p className={clsx('py-0.5 px-0.5 w-8 text-center text-base font-black', colorNumber)}>{number}</p>
            </Flex>
            <Can permissions={[MyPermissions.SaleOrderView, MyPermissions.AgencySaleOrderView]}>
                <SaleOrderDrawer hasIcon={hasIcon} tooltip={tooltip} dataTour={dataTour} typeList={typeList} />
            </Can>
        </Flex>
    );
};
