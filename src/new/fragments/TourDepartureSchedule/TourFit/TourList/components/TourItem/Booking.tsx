import { Color } from '@src/new/components/ui/Color/CustomColor';
import { Flex } from 'antd';
import { TourSearchFitViewDto } from '@sdk/tour-operations';
import { ViewList } from './ViewList';

interface BookingProps {
    item: TourSearchFitViewDto;
}

export const Booking: React.FC<BookingProps> = props => {
    const { item } = props;

    return (
        <Flex vertical gap={2} className="w-40" justify="center">
            <ViewList
                text="Đã bán"
                number={item?.bookedQuantity ?? 0}
                colorNumber={Color.text_3E5BE0}
                hasIcon
                tooltip="Xem danh sách đơn hàng đã bán"
                dataTour={item}
                typeList="bookedQuantity"
            />
            <ViewList
                text="Giữ chỗ (24h)"
                number={item?.reservedQuantity ?? 0}
                hasIcon
                tooltip="Xem danh sách đơn hàng giữ chỗ"
                colorNumber={Color.text_E67E22}
                dataTour={item}
                typeList="reserveQuantity"
            />
            <ViewList text="Còn nhận" number={item?.remainingCapacity ?? 0} colorNumber={Color.text_27AE60} />
        </Flex>
    );
};
