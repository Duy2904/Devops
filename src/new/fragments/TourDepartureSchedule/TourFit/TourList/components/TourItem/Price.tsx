import { Button, Flex } from 'antd';
import clsx from 'clsx';
import isNil from 'lodash/isNil';
import { useNavigate } from 'react-router-dom';

import { TourScheduleDto, TourScheduleStatus, TourSearchFitViewDto } from '@sdk/tour-operations';
import Can from '@src/new/components/common/Can';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import { RouteCreateSOFromTourState } from '@src/new/fragments/SaleOrders/features';
import { useSearchTableStoreNew } from '@src/new/shared/stores/SearchTableStore';
import { rootPathsNew } from '@src/routers/newRoute';
import { useTourScheduleStore } from '@store/tourScheduleStore';
import Format from '@utils/format';
import { MyPermissions } from '@utils/Permissions';

interface TransportProps {
    item: TourSearchFitViewDto;
}

export const Price: React.FC<TransportProps> = props => {
    const { item } = props;
    const navigate = useNavigate();
    const {
        actions: { setTourSchedule },
    } = useTourScheduleStore(state => state);
    const {
        actions: { resetParamsNew },
    } = useSearchTableStoreNew(state => state);

    const redirectToSOPage = () => {
        setTourSchedule(item as TourScheduleDto);
        navigate(`${rootPathsNew.saleOrderFormDetail}`, {
            state: {
                createSOFromTourId: item?.id,
            } as RouteCreateSOFromTourState,
        });
        resetParamsNew();
    };

    const renderBtnBookSO = () => {
        let className = '';
        let btnTetx = '';
        if ((item?.remainingCapacity ?? 0) > 0) {
            btnTetx = 'ĐẶT CHỖ';
            className = `${Color.bg_3E5BE0_90} text-white`;
        } else {
            btnTetx = 'ĐẶT CHỜ';
            className = `${Color.bg_F54545_10} ${Color.text_F54545}`;
        }

        return item?.status !== TourScheduleStatus.SaleTimeExpired ? (
            <Button
                className={clsx('uppercase py-1 px-2 font-extrabold w-40 border-transparent', className)}
                onClick={redirectToSOPage}
            >
                {btnTetx}
            </Button>
        ) : null;
    };

    return (
        <Flex vertical align="flex-start" justify="center" className="shadow p-4 rounded-br-xl">
            <span>Giá bán</span>
            <p className={clsx('text-2xl font-extrabold mb-3 text-nowrap', Color.text_F54545)}>
                {Format.formatNegativeNumber(item.taxInclusivePrice)}₫
            </p>
            {!isNil(item?.commissionValue) && item?.commissionValue > 0 && (
                <p className="text-xs mb-3">
                    Hoa hồng{' '}
                    <span className="text-sm font-bold text-state-success">
                        {Format.formatNegativeNumber(item?.commissionValue)}₫
                    </span>
                </p>
            )}
            <Flex className="w-full" justify="center">
                <Can permissions={[MyPermissions.SaleOrderCreate, MyPermissions.AgencySaleOrderCreate]}>
                    {renderBtnBookSO()}
                </Can>
            </Flex>
        </Flex>
    );
};
