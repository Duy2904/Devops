import { Flex, Form, FormInstance, Input } from 'antd';
import { t } from 'i18next';
import isNumber from 'lodash/isNumber';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';

import { BaseInput } from '@components/customizes/Input/BaseInput';
import { OrderStatus, SaleOrderDto, SaleOrderLineTravellerDto } from '@sdk/tour-operations';
import { Color } from '@src/new/components/ui/Color/CustomColor';
import { convertValues, Pattern } from '@utils/formHelper';

import { getRoomTypes } from '../../../../hooks/queries';
import { mapRoom } from '../features';

interface RoomInfoProps {
    dataSO?: SaleOrderDto;
    numberOfTotalForm: FormInstance;
    travellersForm: FormInstance;
    isEnableEdit: boolean;
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
}

export const RoomInfo: React.FC<RoomInfoProps> = props => {
    const { dataSO, numberOfTotalForm, travellersForm, isEnableEdit, setIsEnableEdit } = props;

    const numberOfRooms = Form.useWatch('numberOfRooms', numberOfTotalForm);
    const travellersFormWatch = Form.useWatch([], travellersForm);
    const dataTravellersFormConvert: SaleOrderLineTravellerDto[] = convertValues(travellersFormWatch);

    const roomType = useMemo(() => dataTravellersFormConvert.map(item => item.roomType), [dataTravellersFormConvert]);
    const roomNumber = useMemo(
        () => dataTravellersFormConvert.map(item => item.roomNumber),
        [dataTravellersFormConvert],
    );
    const roomMap = mapRoom(roomType, roomNumber).filter(item => item.key !== 'undefined' && item.key !== 'null');
    const totalCount: number = roomMap.reduce((acc, obj) => acc + obj.value, 0);

    // State
    const [disableFields, setDisableFields] = useState<string[]>([]);

    const roomTypes = getRoomTypes();

    const onValuesChange = () => {
        if (!isEnableEdit) {
            setIsEnableEdit(true);
        }
    };

    const handleDisableFields = useCallback(() => {
        switch (dataSO?.status) {
            case OrderStatus.Canceled:
                setDisableFields(['form']);
                break;
            case OrderStatus.WaitRefund:
                setDisableFields(['form']);
                break;
            case OrderStatus.SendRefund:
                setDisableFields(['form']);
                break;
            case OrderStatus.CompletedRefund:
                setDisableFields(['form']);
                break;
            default:
                setDisableFields([]);
        }
    }, [dataSO?.status]);

    useEffect(() => {
        handleDisableFields();
    }, [handleDisableFields]);

    return (
        <Form
            form={numberOfTotalForm}
            className="bg-white rounded-lg p-5"
            onValuesChange={onValuesChange}
            disabled={disableFields.includes('form')}
        >
            <BaseInput
                isForm
                name={'numberOfTravellers'}
                rules={[{ required: true, message: 'Vui lòng nhập số lượng hành khách' }]}
                className="hidden"
            />
            <Flex align="center" gap={12}>
                <p className="text-black text-base font-bold uppercase">{t('Số lượng phòng')}:</p>
                <Form.Item
                    name="numberOfRooms"
                    className="mb-0"
                    initialValue={dataSO?.numberOfRooms}
                    rules={[
                        () => ({
                            validator(_, value) {
                                if (!isNumber(value) || (value >= 0 && (totalCount <= value || !totalCount))) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('Không hợp lệ.'));
                            },
                        }),
                        { pattern: Pattern.decimal3, message: 'Giá trị không hợp lệ' },
                    ]}
                >
                    <Input
                        className={`${Color.text_black_88} text-center h-8 w-14 text-xl rounded-md border border-solid ${Color.border_DBDBDB}`}
                        type="number"
                    />
                </Form.Item>
                {numberOfRooms && totalCount > numberOfRooms ? (
                    <span className="font-bold text-xs text-red-500 ml-1">(Số lượng không chính xác)</span>
                ) : (
                    ''
                )}
            </Flex>

            <div className="grid grid-cols-3 gap-5 mt-3">
                {roomTypes.map(item => {
                    if (!item) return;

                    const value = roomMap?.find(count => count.key === item.value)?.value ?? 0;

                    return (
                        <Flex vertical gap={2} key={item.value}>
                            <p className={`text-sm font-bold`}>{t(`roomTypes.${item.value}`)}</p>
                            <p className={`text-lg font-medium`}>{value}</p>
                        </Flex>
                    );
                })}
            </div>
        </Form>
    );
};
