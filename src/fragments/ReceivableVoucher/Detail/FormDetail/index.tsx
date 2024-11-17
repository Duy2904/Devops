import { Col, Collapse, CollapseProps, Form, FormInstance } from 'antd';
import { ReceivableVoucherDto, ReceivableVoucherLineDto, VoucherStatus } from '@sdk/tour-operations';
import { useCreateReceivable, useUpdateReceivable } from '@fragments/ReceivableVoucher/hook/useReceivableVoucher';
import { useEffect, useState } from 'react';

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
import { rootPaths } from '@src/routers/route';
import { toastSuccess } from '@components/ui/Toast/Toast';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { useNavigate } from 'react-router-dom';

interface FormDetailProps {
    form: FormInstance;
    personContactForm: FormInstance;
    recId: string;
    setLoadingSubmit: React.Dispatch<React.SetStateAction<boolean>>;
    setSubmittable: React.Dispatch<React.SetStateAction<boolean>>;
    data: ReceivableVoucherDto;
    isLoadingData: boolean;
    submittable: boolean;
}

export const FormDetail: React.FC<FormDetailProps> = props => {
    const { form, recId, setLoadingSubmit, data, isLoadingData, setSubmittable, personContactForm, submittable } =
        props;
    const navigate = useNavigate();
    const formUseWatch = Form.useWatch([], form);
    const amountLinesData = formUseWatch?.amountLines;
    const canChangeData = useHasAnyPermission([
        MyPermissions.ReceivableVoucherUpdate,
        MyPermissions.AgencyReceivableVoucherUpdate,
        MyPermissions.ReceivableVoucherCreate,
        MyPermissions.AgencyReceivableVoucherCreate,
    ]);

    const [dataLines, setDataLines] = useState<ReceivableVoucherLineDto[]>([]);
    const [travellerId, setTravellerId] = useState<string | undefined>();

    const { mutateAsync: createReceivableVoucherDetail, isLoading: loadingCreate } = useCreateReceivable();
    const { mutateAsync: updateReceivableVoucherDetail, isLoading: loadingUpdate } = useUpdateReceivable(recId);

    const itemCollapseGeneralInfo: CollapseProps['items'] = [
        {
            key: '1',
            label: <p className="text-md">Thông tin chung</p>,
            children: <GeneralInfo form={props.form} recId={props.recId} isLoading={isLoadingData} />,
        },
    ];
    const itemCollapseCustomerInfo: CollapseProps['items'] = [
        {
            key: '1',
            label: <p className="text-md">Người liên lạc</p>,
            children: (
                <CustomerInfo
                    form={props.form}
                    isLoading={isLoadingData}
                    personContactForm={personContactForm}
                    travellerId={data?.travellerId ?? travellerId ?? ''}
                    setSubmittable={setSubmittable}
                    submittable={submittable}
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
                    dataRec={data ?? {}}
                    data={dataLines}
                    form={form}
                    recId={recId}
                    isLoading={isLoadingData}
                    setSubmittable={setSubmittable}
                    setTravellerId={setTravellerId}
                    canChangeData={canChangeData}
                />
            ),
        },
    ];

    const createReceivableVoucher = async (values: AnyObject) => {
        const res = await createReceivableVoucherDetail(values);
        toastSuccess(i18n.t('menu.receivableVoucher'), i18n.t('message.default.createContentSuccess'));
        navigate(`${rootPaths.receivableVoucherForm}/${res}`);
    };

    const updateReceivableVoucher = async (values: AnyObject) => {
        await updateReceivableVoucherDetail(values);
        toastSuccess(i18n.t('menu.receivableVoucher'), i18n.t('message.default.updateContentSuccess'));
    };

    const onFinish = async (values: AnyObject) => {
        const valuesRefetch = resFetchData(values);
        if (isNil(values.id)) {
            createReceivableVoucher({ ...valuesRefetch, receivableDate: dayjs() });
        } else {
            updateReceivableVoucher(valuesRefetch);
        }
    };

    const handleValueChange = () => {
        !isEmpty(amountLinesData) && setSubmittable(true);
    };

    useEffect(() => {
        if (data) {
            setDataLines(data.receivableVoucherLines ?? []);
        }
    }, [data]);

    useEffect(() => {
        setLoadingSubmit(loadingCreate || loadingUpdate);
        setSubmittable(false);
    }, [loadingCreate, loadingUpdate, setLoadingSubmit, setSubmittable]);

    return (
        <Form
            form={props.form}
            onFinish={onFinish}
            disabled={data?.status === VoucherStatus.Confirmed || !canChangeData}
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
