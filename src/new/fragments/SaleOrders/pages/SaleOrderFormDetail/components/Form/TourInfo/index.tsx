import {
    useGetListTourFitDropdown,
    useGetListTourFitTransferDropdown,
} from '@src/new/components/customs/AutoComplete/TourFitAutoComplete/mutation';
import {
    RouteChangeTourSOState,
    RouteCloneSOState,
    RouteCreateSOFromTourDepartureSchedule,
    RouteCreateSOFromTourState,
} from '../../../features';
import { Flex, Form, FormInstance, Modal } from 'antd';
import clsx from 'clsx';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { OnForm } from '@components/customizes/AutoComplete/TourAutoComplete/OnForm';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import { OrderStatus, SaleOrderDto } from '@sdk/tour-operations';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import { AppConfig } from '@src/new/shared/utils/config';
import { filterAdvanceListTourFitFromSODetail, pageSize } from '@utils/filterSearch';
import { isEmptyString } from '@utils/formHelper';

import { useQueryGetTourScheduleUseId } from '../../../hooks/queries';

interface FormTourInfoProps {
    dataSO?: SaleOrderDto;
    tourInfoForm: FormInstance;
    isModalWarningOpen: boolean;
    setIsModalWarningOpen: Dispatch<SetStateAction<boolean>>;
}

export const FormTourInfo: React.FC<FormTourInfoProps> = props => {
    const { tourInfoForm, dataSO, isModalWarningOpen, setIsModalWarningOpen } = props;

    const { soId } = useParams<string>();
    const { changeTourSOId } = (useLocation().state ?? { changeTourSOId: false }) as RouteChangeTourSOState;
    const { clonedId } = (useLocation().state ?? { cloneId: false }) as RouteCloneSOState;
    const { createSOFromTourDepartureSchedule } = (useLocation().state ?? {
        createSOFromTourDepartureSchedule: false,
    }) as RouteCreateSOFromTourDepartureSchedule;
    const { createSOFromTourId } = (useLocation().state ?? { createSOFromTourId: false }) as RouteCreateSOFromTourState;

    const tourIdWatch = Form.useWatch('tourScheduleId', tourInfoForm);
    const orderNo = Form.useWatch('orderNo', tourInfoForm);

    // State
    const [tourIdSelected, setTourIdSelected] = useState<string>('');
    const [isFirstTimeInitData, setIsFirstTimeInitData] = useState<boolean>(true);
    const [selectTourData, setSelectTourData] = useState<{ value: string; label: string; disabled: boolean }[]>([]);
    const [selectAgentData, setSelectAgentData] = useState<{ value: string; label: string; disabled: boolean }[]>([]);

    // Query
    const { data: dataTourSchedule } = useQueryGetTourScheduleUseId(tourIdSelected);
    const { mutateAsync: getFitDropdown, isLoading } = useGetListTourFitDropdown();
    const { mutateAsync: getFitTransferDropdown, isLoading: isLoadingTourTransfer } = useGetListTourFitTransferDropdown(
        clonedId ?? changeTourSOId ?? '',
    );

    const paramsSearch = {
        sorter: {
            columnKey: 'CreatedOn',
            order: 'descend',
        },
        advancedFilter: filterAdvanceListTourFitFromSODetail(dayjs().toDate()),
        pageSize: pageSize,
    };

    const handleChangeSelect = (value: string) => {
        setTourIdSelected(value);
        tourInfoForm.setFieldValue('isOverloadConfirmed', false);
    };

    const renderContentModal = useCallback(() => {
        let content = 'Tour đã hết chỗ, vui lòng đặt tour khác. Nếu vẫn lưu thì đơn sẽ được gửi duyệt.';
        if (dataTourSchedule?.remainingCapacity && dataTourSchedule?.remainingCapacity > 0) {
            content = `Tour còn ${dataTourSchedule?.remainingCapacity} chỗ, vui lòng đặt tour khác hoặc bỏ bớt số lượng khách đi tour. Nếu vẫn lưu thì đơn sẽ được gửi duyệt.`;
        }

        return <p className="pr-2">{content}</p>;
    }, [dataTourSchedule?.remainingCapacity]);

    const handleConfirmOverload = () => {
        setIsModalWarningOpen(false);
        tourInfoForm.setFieldValue('isOverloadConfirmed', true);
    };

    useEffect(() => {
        if (!tourIdSelected && tourIdWatch) {
            setTourIdSelected(tourIdWatch);
        }
    }, [tourIdSelected, tourIdWatch]);

    useEffect(() => {
        if (isFirstTimeInitData && !isEmptyString(createSOFromTourDepartureSchedule)) {
            setIsFirstTimeInitData(false);
            tourInfoForm.setFieldValue('tourScheduleId', createSOFromTourDepartureSchedule);
        }
    }, [createSOFromTourDepartureSchedule, isFirstTimeInitData, tourInfoForm]);

    useEffect(() => {
        if (isFirstTimeInitData && !isEmptyString(createSOFromTourId)) {
            setIsFirstTimeInitData(false);
            tourInfoForm.setFieldValue('tourScheduleId', createSOFromTourId);
        }
    }, [createSOFromTourId, isFirstTimeInitData, tourInfoForm]);

    useEffect(() => {
        if (isEmpty(selectTourData) && !isEmpty(dataSO)) {
            setSelectTourData([
                {
                    value: dataSO?.tourSchedule?.id ?? '',
                    label: dataSO?.tourSchedule?.name ?? '',
                    disabled: true,
                },
            ]);
        }
    }, [dataSO, selectTourData]);

    useEffect(() => {
        if (
            isEmpty(selectTourData) &&
            (!isEmptyString(createSOFromTourDepartureSchedule) || !isEmptyString(createSOFromTourId)) &&
            !isEmpty(dataTourSchedule)
        ) {
            setSelectTourData([
                {
                    value: dataTourSchedule?.id ?? '',
                    label: dataTourSchedule?.name ?? '',
                    disabled: true,
                },
            ]);
        }
    }, [createSOFromTourDepartureSchedule, createSOFromTourId, dataTourSchedule, selectTourData]);

    useEffect(() => {
        if (isEmpty(selectAgentData) && !isEmpty(dataSO)) {
            setSelectAgentData([
                {
                    value: dataSO?.groupId ?? '',
                    label: dataSO?.groupName ?? '',
                    disabled: true,
                },
            ]);
        }
    }, [dataSO, selectAgentData]);

    return (
        <>
            <Form
                form={tourInfoForm}
                className={clsx('rounded-xl w-full p-5 border border-solid', Color.border_D9D9D9, Color.bg_F6F7FA)}
            >
                <BaseInput isForm isHidden name={'id'} />
                <BaseInput isForm isHidden name={'orderNo'} />
                <BaseInput
                    isForm
                    isHidden
                    name={'isOverloadConfirmed'}
                    initialValue={dataSO?.status === OrderStatus.Overload}
                />
                <Flex className="w-full mb-5" gap={20}>
                    <Flex align="center" className="w-2/3">
                        <Flex align="center" gap={20} className="w-full">
                            <p>Mã đơn hàng:</p>
                            <p className="font-bold">{orderNo}</p>
                        </Flex>
                        <Flex align="center" gap={20} justify="flex-start" className="w-full">
                            <p></p>
                            {/* <OnForm
                                className="w-full mb-0 gap-5"
                                name="groupId"
                                label={<p className="mb-1">Đại lý</p>}
                                requestSearch={paramsSearch}
                                placeholder="Nhập tên đại lý"
                                dataSelected={!isEmpty(selectAgentData) ? selectAgentData : []}
                                hookOnChange={getAgentDropdown}
                                loading={isLoadingAgent}
                                disabled={!!soId}
                            /> */}
                        </Flex>
                    </Flex>
                    <Flex align="center" className="w-1/3">
                        <Flex align="center" gap={20} className="w-full">
                            <p>Ngày khởi hành:</p>
                            <p className="font-bold">
                                {dataTourSchedule?.departureDate
                                    ? dayjs(dataTourSchedule?.departureDate).format(AppConfig.DateFormat)
                                    : ''}
                            </p>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex className="w-full" gap={20}>
                    <Flex align="center" className="w-2/3">
                        <OnForm
                            className="w-full mb-0 gap-5"
                            name="tourScheduleId"
                            label={<p className="mb-1">Thông tin tour</p>}
                            rules={[{ required: true, message: 'Vui lòng chọn Tour' }]}
                            initialValue={tourIdWatch}
                            requestSearch={paramsSearch}
                            placeholder="Nhập mã, tên tour"
                            dataSelected={!isEmpty(selectTourData) ? selectTourData : []}
                            handleSelectOutSide={id => handleChangeSelect(id)}
                            hookOnChange={changeTourSOId || clonedId ? getFitTransferDropdown : getFitDropdown}
                            loading={isLoading || isLoadingTourTransfer}
                            disabled={soId !== undefined && !clonedId && !changeTourSOId}
                        />
                    </Flex>
                    <Flex align="center" className="w-1/3" gap={20}>
                        <p>Số chỗ còn nhận:</p>
                        <p className="font-bold">{dataTourSchedule?.remainingCapacity}</p>
                    </Flex>
                </Flex>
            </Form>

            <Modal
                open={isModalWarningOpen && dataSO?.status !== OrderStatus.Overload}
                cancelText="Quay lại"
                cancelButtonProps={{ style: { display: 'none' } }}
                okText="Đồng ý"
                onOk={handleConfirmOverload}
                onCancel={handleConfirmOverload}
                destroyOnClose={true}
                maskClosable={false}
            >
                {renderContentModal()}
            </Modal>
        </>
    );
};
