import { ReceivableVoucherDto, ReceivableVoucherLineDto } from '@sdk/tour-operations';
import { Col, Collapse, CollapseProps, Form, FormInstance } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GeneralInfo } from './GeneralInfo';
import { AnyObject } from 'antd/es/_util/type';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { useNavigate } from 'react-router-dom';
import { rootPathsNew } from '@src/routers/newRoute';
import { resFetchData } from '../../Features';
import isNil from 'lodash/isNil';
import dayjs from 'dayjs';
import { ContactPerson } from './ContactPerson';
import { TableData } from './TableData';
import { useCreateRefund, useUpdateRefund } from '@src/new/fragments/RefundVoucher/hooks/useRefundDetail';

interface CollapseBlockProps {
    data?: ReceivableVoucherDto;
    form: FormInstance;
    travellerId?: string;
    setIsEnableEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setLoadingSubmit: React.Dispatch<React.SetStateAction<boolean>>;
    setTravellerId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const CollapseBlock: React.FC<CollapseBlockProps> = props => {
    const { data, form, travellerId, setIsEnableEdit, setLoadingSubmit, setTravellerId } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [dataLines, setDataLines] = useState<ReceivableVoucherLineDto[]>([]);

    const { mutateAsync: createRefundDetail, isLoading: loadingCreate } = useCreateRefund();
    const { mutateAsync: updateRefundDetail, isLoading: loadingUpdate } = useUpdateRefund(data?.id ?? '');

    const generalInfoCollapse: CollapseProps['items'] = [
        {
            key: '1',
            label: t('THÔNG TIN CHUNG'),
            children: <GeneralInfo form={form} refundId={data?.id ?? ''} />,
        },
    ];

    const contactPersonCollapse: CollapseProps['items'] = [
        {
            key: '1',
            label: t('NGƯỜI LIÊN LẠC'),
            children: (
                <ContactPerson
                    form={form}
                    travellerId={travellerId}
                />
            ),
        },
    ];

    const tableDataCollapse: CollapseProps['items'] = [
        {
            key: '1',
            label: <p className="text-md">{t('CHỨNG TỪ')}</p>,
            children: (
                <TableData
                    dataRefund={data ?? {}}
                    data={dataLines}
                    form={form}
                    refundId={data?.id ?? ''}
                    setIsEnableEdit={setIsEnableEdit}
                    setTravellerId={setTravellerId}
                />
            ),
        },
    ];

    const createRefundVoucher = async (values: AnyObject) => {
        const res = await createRefundDetail(values);
        toastSuccess(t('menu.refundVoucher'), t('message.default.createContentSuccess'));
        navigate(`${rootPathsNew.refundViewDetail}/${res}`);
    };

    const updateRefundVoucher = async (values: AnyObject) => {
        await updateRefundDetail(values);
        toastSuccess(t('menu.refundVoucher'), t('message.default.updateContentSuccess'));
        navigate(`${rootPathsNew.refundViewDetail}/${data?.id}`);
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
        setIsEnableEdit(true);
    };

    useEffect(() => {
        if (data) {
            setDataLines(data.receivableVoucherLines ?? []);
        }
    }, [data]);

    useEffect(() => {
        setLoadingSubmit(loadingCreate || loadingUpdate);
        setIsEnableEdit(false);
    }, [loadingCreate, loadingUpdate, setIsEnableEdit, setLoadingSubmit]);

    return (
        <Col className="saleOrderCollapse">
            <Form form={props.form} onFinish={onFinish} layout="vertical" onValuesChange={handleValueChange}>
                <Col className="grid grid-cols-2 gap-5">
                    <Collapse defaultActiveKey={['1']} expandIconPosition={'end'} items={generalInfoCollapse} />
                    <Collapse defaultActiveKey={['1']} expandIconPosition={'end'} items={contactPersonCollapse} />
                    <Collapse
                        className="col-span-2"
                        defaultActiveKey={['1']}
                        expandIconPosition={'end'}
                        items={tableDataCollapse}
                    />
                </Col>
            </Form>
        </Col>
    );
};
