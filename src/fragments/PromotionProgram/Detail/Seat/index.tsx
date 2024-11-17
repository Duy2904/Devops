import { Col, Collapse, CollapseProps, Form } from 'antd';
import { CreateDiscountRequest, DiscountOnType, UpdateDiscountRequest } from '@sdk/tour-operations';
import {
    useCreatePromotionDetail,
    useFetchPromotionDetail,
    useUpdatePromotionDetail,
} from '@fragments/PromotionProgram/hook/usePromoteProgram';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AnyObject } from 'antd/es/_util/type';
import { ButtonPromotionDetail } from '../Button';
import { GeneralInfo } from '../GeneralInfo';
import { HeaderSeatDetail } from './Header';
import { History } from '@fragments/History';
import { LoadingSubmit } from '@components/customizes/Loading/LoadingSubmit';
import { MyPermissions } from '@utils/Permissions/index.ts';
import { TableCondition } from './TableCondition';
import dayjs from 'dayjs';
import i18n from '@src/i18n';
import isNil from 'lodash/isNil';
import { isString } from 'lodash';
import { resFetchData } from '@fragments/PromotionProgram/Feature';
import { rootPaths } from '@src/routers/route';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { useGetCurrencies } from '@components/customizes/Select/Currency/useCurrencies';
import useHasAnyPermission from '@hooks/useHasAnyPermission';

export const IndexSeatDetail: React.FC = () => {
    const { discountId } = useParams<string>();
    const [infoForm] = Form.useForm();
    const navigate = useNavigate();

    const [isOpenHistory, setIsOpenHistory] = useState<boolean>(false);
    const isChangeData = useHasAnyPermission([MyPermissions.DiscountCreate, MyPermissions.DiscountUpdate]);

    const { data: dataCurrencies } = useGetCurrencies();
    const { data, isLoading } = useFetchPromotionDetail(discountId!);
    const { mutateAsync: createDiscountDetail, isLoading: loadingCreate } = useCreatePromotionDetail();
    const { mutateAsync: updateDiscountDetail, isLoading: loadingUpdate } = useUpdatePromotionDetail(discountId!);

    const itemCollapseGeneralInfo: CollapseProps['items'] = [
        {
            key: '1',
            label: <p className="text-md">Thông tin chung</p>,
            children: <GeneralInfo infoForm={infoForm} data={data} />,
        },
    ];
    const itemCollapseCondition: CollapseProps['items'] = [
        {
            key: '1',
            label: <p className="text-md">Thông tin chi tiết</p>,
            children: <TableCondition discountId={discountId!} data={data} isLoading={isLoading} infoForm={infoForm} />,
        },
    ];

    const createDiscount = async (values: CreateDiscountRequest) => {
        const res = await createDiscountDetail(values);
        toastSuccess(i18n.t('menu.promoteProgram'), i18n.t('message.default.createContentSuccess'));
        navigate(`${rootPaths.promoteBySeatForm}/${res}`);
    };

    const updateDiscount = async (values: UpdateDiscountRequest) => {
        await updateDiscountDetail(values);
        toastSuccess(i18n.t('menu.promoteProgram'), i18n.t('message.default.updateContentSuccess'));
    };

    const onFinish = async (values: AnyObject) => {
        const valuesRefetch = resFetchData(values, DiscountOnType.EarlyBirdLastMinute);
        if (isNil(values.id)) {
            createDiscount({
                ...valuesRefetch,
                tourScheduleIds: isString(valuesRefetch.tourScheduleIds)
                    ? [valuesRefetch.tourScheduleIds]
                    : valuesRefetch.tourScheduleIds,
            } as CreateDiscountRequest);
        } else {
            updateDiscount({
                ...valuesRefetch,
                tourScheduleIds: isString(valuesRefetch.tourScheduleIds)
                    ? [valuesRefetch.tourScheduleIds]
                    : valuesRefetch.tourScheduleIds,
            } as UpdateDiscountRequest);
        }
    };

    useEffect(() => {
        if (data) {
            infoForm.setFieldsValue({
                ...data,
                startDate: dayjs(data.startDate),
                endDate: dayjs(data.endDate),
            });
        } else {
            infoForm.setFieldsValue({
                currencyId: dataCurrencies?.data?.find(item => item.name === 'VND')?.id,
            });
        }
    }, [data, dataCurrencies, infoForm]);

    return (
        <Col className="relative">
            {(loadingCreate || loadingUpdate) && <LoadingSubmit contentLoading={i18n.t('default.processing')} />}
            <HeaderSeatDetail
                discountId={discountId}
                buttonList={
                    <ButtonPromotionDetail
                        infoForm={infoForm}
                        backRedirect={rootPaths.promoteBySeat}
                        discountId={discountId}
                        setIsOpenHistory={setIsOpenHistory}
                    />
                }
            />
            <Col className="h-[calc(100vh_-_186px)] bg-white gap-6 overflow-auto">
                <Form form={infoForm} layout="vertical" onFinish={onFinish} disabled={!isChangeData}>
                    <Col className="grid grid-cols-12 gap-4">
                        <Col className="col-span-12 lg:col-span-4">
                            <Collapse
                                defaultActiveKey={['1']}
                                expandIconPosition={'end'}
                                items={itemCollapseGeneralInfo}
                            />
                        </Col>
                        <Col className="col-span-12 lg:col-span-8">
                            <Collapse
                                defaultActiveKey={['1']}
                                expandIconPosition={'end'}
                                items={itemCollapseCondition}
                            />
                        </Col>
                    </Col>
                </Form>
                {/* Lịch sử thao tác */}
                {discountId && (
                    <History
                        tableName="Discount"
                        title={i18n.t('Lịch sử thao tác')}
                        id={discountId}
                        isOpenHistory={isOpenHistory}
                        setIsOpenHistory={setIsOpenHistory}
                    />
                )}
            </Col>
        </Col>
    );
};
