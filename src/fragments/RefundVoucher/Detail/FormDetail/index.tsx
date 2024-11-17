import { Col, Collapse, CollapseProps, Form, FormInstance } from 'antd';
import { ReceivableVoucherDto, ReceivableVoucherLineDto, VoucherStatus } from '@sdk/tour-operations';
import { useCallback, useEffect, useState } from 'react';
import { useCreateRefund, useUpdateRefund } from '@fragments/RefundVoucher/hook/useRefundVoucher';

import { AnyObject } from 'antd/es/_util/type';
import { CustomerInfo } from './CustomerInfo';
import { GeneralInfo } from './GeneralInfo';
import { MyPermissions } from '@utils/Permissions';
import { TableData } from './TableData';
import dayjs from 'dayjs';
import i18n from '@src/i18n';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { resFetchData } from '../Features';
import { toastSuccess } from '@components/ui/Toast/Toast';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { useNavigate } from 'react-router-dom';
import { rootPathsNew } from '@src/routers/newRoute';

interface FormDetailProps {
    form: FormInstance;
    personContactForm: FormInstance;
    refundId: string;
    setLoadingSubmit: React.Dispatch<React.SetStateAction<boolean>>;
    setSubmittable: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEnableApprove: React.Dispatch<React.SetStateAction<boolean>>;
    data?: ReceivableVoucherDto;
    isLoadingData: boolean;
    submittable: boolean;
}

export const FormDetail: React.FC<FormDetailProps> = props => {
    const {
        data,
        isLoadingData,
        form,
        refundId,
        personContactForm,
        setLoadingSubmit,
        setSubmittable,
        setIsEnableApprove,
        submittable,
    } = props;
    const navigate = useNavigate();
    const formUseWatch = Form.useWatch([], form);
    const amountLinesData = formUseWatch?.amountLines;
    const canChangeData = useHasAnyPermission([
        MyPermissions.RefundVoucherUpdate,
        MyPermissions.AgencyRefundVoucherUpdate,
        MyPermissions.RefundVoucherCreate,
        MyPermissions.AgencyRefundVoucherCreate,
    ]);

    const [dataLines, setDataLines] = useState<ReceivableVoucherLineDto[]>([]);
    const [isDataChange, setIsDataChange] = useState<boolean>(false);
    const [travellerId, setTravellerId] = useState<string | undefined>();

    const { mutateAsync: createRefundDetail, isLoading: loadingCreate } = useCreateRefund();
    const { mutateAsync: updateRefundDetail, isLoading: loadingUpdate } = useUpdateRefund(refundId);

    const itemCollapseGeneralInfo: CollapseProps['items'] = [
        {
            key: '1',
            label: <p className="text-md">Thông tin chung</p>,
            children: <GeneralInfo form={form} refundId={refundId} isLoading={isLoadingData} />,
        },
    ];

    const itemCollapseCustomerInfo: CollapseProps['items'] = [
        {
            key: '1',
            label: <p className="text-md">Người liên lạc</p>,
            children: (
                <CustomerInfo
                    form={form}
                    isLoading={isLoadingData}
                    personContactForm={personContactForm}
                    travellerId={data?.travellerId ?? travellerId ?? ''}
                    submittable={submittable}
                    setSubmittable={setSubmittable}
                />
            ),
        },
    ];

    const tableDataCollapse: CollapseProps['items'] = [
        {
            key: '1',
            label: <p className="text-md">{i18n.t('Chứng từ')}</p>,
            children: (
                <TableData
                    dataRefund={data ?? {}}
                    data={dataLines}
                    form={form}
                    refundId={refundId}
                    isLoading={isLoadingData}
                    canChangeData={canChangeData}
                    setSubmittable={setSubmittable}
                    setTravellerId={setTravellerId}
                />
            ),
        },
    ];

    const createRefundVoucher = async (values: AnyObject) => {
        const res = await createRefundDetail(values);
        toastSuccess(i18n.t('menu.refundVoucher'), i18n.t('message.default.createContentSuccess'));
        navigate(`${rootPathsNew.refundViewDetail}/${res}`);
    };

    const updateRefundVoucher = async (values: AnyObject) => {
        await updateRefundDetail(values);
        setIsDataChange(false);
        toastSuccess(i18n.t('menu.refundVoucher'), i18n.t('message.default.updateContentSuccess'));
    };

    const onFinish = async (values: AnyObject) => {
        const valuesRefetch = resFetchData(values);
        if (isNil(values.id)) {
            createRefundVoucher({ ...valuesRefetch, receivableDate: dayjs() });
        } else {
            updateRefundVoucher(valuesRefetch);
        }
    };

    const handleValueChange = () => {
        !isDataChange && setIsDataChange(true);
        setSubmittable(true);
    };

    const validateAndSetIsEnableApprove = useCallback(() => {
        if (!isEmpty(amountLinesData)) {
            if (data?.status && [VoucherStatus.Draft, VoucherStatus.WaitingForApproval].includes(data?.status)) {
                form.validateFields().catch(() => setIsEnableApprove(false));
            }
            if (!isDataChange) {
                setIsEnableApprove(true);
            }
        }
    }, [amountLinesData, data?.status, form, isDataChange, setIsEnableApprove]);

    useEffect(() => {
        if (data) {
            setDataLines(data.receivableVoucherLines ?? []);
        }
    }, [data]);

    useEffect(() => {
        validateAndSetIsEnableApprove();
    }, [validateAndSetIsEnableApprove]);

    useEffect(() => {
        setLoadingSubmit(loadingCreate || loadingUpdate);
        setSubmittable(false);
        setIsDataChange(false);
    }, [loadingCreate, loadingUpdate, setLoadingSubmit, setSubmittable]);

    return (
        <Form
            form={form}
            onFinish={onFinish}
            disabled={(!!refundId && data?.status === VoucherStatus.Confirmed) || !canChangeData}
            layout="vertical"
            onValuesChange={handleValueChange}
        >
            <div>
                <Col className="grid grid-cols-12 gap-4">
                    <Col className="col-span-5">
                        <Collapse defaultActiveKey={['1']} expandIconPosition={'end'} items={itemCollapseGeneralInfo} />
                    </Col>
                    <Col className="col-span-7">
                        <Collapse
                            defaultActiveKey={['1']}
                            expandIconPosition={'end'}
                            items={itemCollapseCustomerInfo}
                        />
                    </Col>
                </Col>
                <div className="mt-4">
                    <Collapse defaultActiveKey={['1']} expandIconPosition={'end'} items={tableDataCollapse} />
                </div>
            </div>
        </Form>
    );
};
