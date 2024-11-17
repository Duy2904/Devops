import { DatePicker, Flex } from 'antd';
import { RangeValue, currentPage, pageSize } from '../../../utils/filterSearch';
import dayjs, { Dayjs } from 'dayjs';

import { t } from 'i18next';
import { useSearchTableStore } from '../../../store/searchTableStore';

const { RangePicker } = DatePicker;

interface DateSearchProps {
    className?: string;
    showTitle?: boolean;
    title?: string;
}

export const DateSearch = (_props: DateSearchProps) => {
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStore(state => state);
    // eslint-disable-next-line no-unused-vars
    const onDateChange = (values: RangeValue<Dayjs>, _: [string, string]) => {
        const startDate = values?.[0] ?? undefined;
        const endDate = values?.[1] ?? undefined;
        setSearchParams({
            ...tableParams,
            pagination: { current: currentPage, pageSize: pageSize, showSizeChanger: true },
            fromDate: startDate?.toDate(),
            toDate: endDate?.toDate(),
        });
    };
    return (
        <Flex className={_props.className} vertical>
            {_props?.showTitle && <p className="text-xs mb-2 font-medium">{_props.title}</p>}
            <RangePicker
                className="w-full"
                onChange={onDateChange}
                defaultValue={[dayjs(tableParams?.fromDate), dayjs(tableParams?.toDate)]}
                placeholder={[t('Từ ngày'), t('Đến ngày')]}
                format={'DD/MM/YYYY'}
            />
        </Flex>
    );
};
