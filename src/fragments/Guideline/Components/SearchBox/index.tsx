import 'dayjs/locale/vi';

import { Col, Flex, TimeRangePickerProps } from 'antd';

import { AppConfig } from '@utils/config';
import { HeaderDetail } from '../HeaderDetail';
import { LunarDatePicker } from '@src/new/components/ui/DatePicker/LunarDatePicker';
import { LunarRangePicker } from '@src/new/components/ui/DatePicker/LunarRangePicker';
import dayjs from 'dayjs';

const SearchBoxGuideline = () => {
    const rangePresets: TimeRangePickerProps['presets'] = [
        { label: 'Hôm nay', value: [dayjs(), dayjs()] },
        { label: '07 ngày tới', value: [dayjs(), dayjs().add(6, 'day')] },
        { label: 'Trong tháng', value: [dayjs().startOf('month'), dayjs().endOf('month')] },
        { label: '03 tháng tới', value: [dayjs(), dayjs().add(3, 'months')] },
        { label: '06 tháng tới', value: [dayjs(), dayjs().add(6, 'months')] },
    ];

    return (
        <Col className="pl-5">
            <HeaderDetail
                content={
                    <Col>
                        <p>- Components: LunarRangePicker</p>
                    </Col>
                }
            />
            <Col className=" lg:h-[calc(100vh_-_150px)] overflow-y-auto pb-20">
                <Flex vertical className="my-8" gap={32}>
                    <Col>
                        <h6 className="text-greyColor-third font-normal mt-6">LunarRangePicker</h6>
                        <div className="max-w-[300px] mt-4">
                            <LunarRangePicker
                                rangePresets={rangePresets}
                                className="w-full col-span-6 md:col-span-2"
                                formatDate={AppConfig.DateShortYearFormat}
                            />
                        </div>
                    </Col>
                    <Col>
                        <h6 className="text-greyColor-third font-normal mt-6">LunarDatePicker</h6>
                        <div className="max-w-[300px] mt-4">
                            <LunarDatePicker className="col-span-2 lg:col-span-1" format="date" />
                        </div>
                    </Col>
                </Flex>
            </Col>
        </Col>
    );
};

export default SearchBoxGuideline;
