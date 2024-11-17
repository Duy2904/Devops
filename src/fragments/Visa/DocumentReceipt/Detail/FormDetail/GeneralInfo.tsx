import { Flex, FormInstance, Tooltip } from 'antd';
import { SaleOrderByTourDto, TourVisaDto } from '@sdk/tour-operations';

import { BaseDatePicker } from '@components/customizes/DatePicker/BaseDatePicker';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import { GenCode } from './GenCode';
import { SaleOrderSearch } from './SaleOrderSearch';
import dayjs from 'dayjs';
import i18n from '@src/i18n';

interface GeneralInfoProps {
    form: FormInstance;
    documentReceiptId: string;
    setDataSOSelected: React.Dispatch<React.SetStateAction<SaleOrderByTourDto>>;
    dataSOSelected: SaleOrderByTourDto;
    dataDocumentVisa?: TourVisaDto;
}

export const GeneralInfo: React.FC<GeneralInfoProps> = props => {
    const { documentReceiptId, form, setDataSOSelected, dataSOSelected, dataDocumentVisa } = props;

    return (
        <div className="p-4">
            <Flex align="end">
                <BaseInput isForm isHidden name="id" />
                <BaseInput isForm isHidden name="tourScheduleId" />
                <BaseInput isForm isHidden name="travellerId" initialValue={dataDocumentVisa?.travellerId ?? dataSOSelected?.travellerId ?? ''} />
            </Flex>
            <GenCode documentReceiptId={documentReceiptId} form={form} />
            <BaseInput
                isForm
                name="description"
                label={i18n.t('Diễn giải')}
                placeholder={i18n.t('Nội dung diễn giải')}
                rules={[
                    {
                        required: true,
                        message: i18n.t('validation.default.validDefault'),
                    },
                ]}
                showCount
                maxCountNumber={500}
            />
            <SaleOrderSearch
                form={form}
                name="saleOrderId"
                setDataSOSelected={setDataSOSelected}
                disabled={!!documentReceiptId}
                dataDocumentVisa={dataDocumentVisa}
            />
            <BaseInput isForm name={['tourSchedule', 'id']} isHidden />
            <div className="grid grid-cols-2 gap-4">
                <Tooltip
                    placement="right"
                    title={
                        dataSOSelected.tourSchedule?.tourCode &&
                        `${dataSOSelected.tourSchedule?.tourCode ?? ''} - ${dataSOSelected.tourSchedule?.name ?? ''}`
                    }
                >
                    <div>
                        <BaseInput
                            isForm
                            className="col-span-2 lg:col-span-1"
                            name={['tourSchedule', 'name']}
                            disable
                            label={i18n.t('Tour')}
                            placeholder={i18n.t('Thông tin Tour')}
                        />
                    </div>
                </Tooltip>
                <BaseInput
                    isForm
                    className="col-span-2 lg:col-span-1"
                    name={['tourSchedule', 'destinationLocation']}
                    disable
                    label={i18n.t('menu.visa')}
                    placeholder={i18n.t('tour.tourList.destinationLocation')}
                />
            </div>
            {/* Ngày khởi hành - Ngày kết thúc */}
            <div className="grid grid-cols-2 gap-4">
                <BaseDatePicker
                    name={['tourSchedule', 'departureDate']}
                    label={i18n.t('tour.tourDetail.departureDate')}
                    className="col-span-2 lg:col-span-1"
                    format={'dateTime'}
                    placeholder={i18n.t('tour.tourDetail.departureDate')}
                    disabled
                />
                <BaseDatePicker
                    name={['tourSchedule', 'endDate']}
                    label={i18n.t('tour.tourDetail.endDay')}
                    className="col-span-2 lg:col-span-1"
                    format="dateTime"
                    placeholder={i18n.t('tour.tourDetail.endDay')}
                    disabled
                />
            </div>
            {/* Ngày hết hạn nộp hồ sơ - Ngày dự kiến kết quả */}
            <div className="grid grid-cols-2 gap-4">
                <BaseDatePicker
                    name="expectedDate"
                    label={i18n.t('Ngày dự kiến kết quả')}
                    className="col-span-2 lg:col-span-1"
                    format="date"
                    placeholder={i18n.t('Ngày dự kiến kết quả')}
                    disabledDate={current => current <= dayjs()}
                    allowClear={false}
                />
            </div>
        </div>
    );
};
