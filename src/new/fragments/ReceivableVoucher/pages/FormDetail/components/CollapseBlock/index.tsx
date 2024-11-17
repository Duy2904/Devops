import { ReceivableVoucherDto, ReceivableVoucherLineDto } from '@sdk/tour-operations';
import { Col, Collapse, CollapseProps, Form, FormInstance } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GeneralInfo } from './GeneralInfo';
import { AnyObject } from 'antd/es/_util/type';
import { useCreateReceivable, useUpdateReceivable } from '@src/new/fragments/ReceivableVoucher/hooks/useRCDetail';
import { toastSuccess, toastWarning } from '@components/ui/Toast/Toast';
import { useNavigate } from 'react-router-dom';
import { rootPathsNew } from '@src/routers/newRoute';
import { resFetchData } from '../../Features';
import isNil from 'lodash/isNil';
import dayjs from 'dayjs';
import { ContactPerson } from './ContactPerson';
import { TableData } from './TableData';
import isEmpty from 'lodash/isEmpty';

interface CollapseBlockProps {
    data?: ReceivableVoucherDto;
    form: FormInstance;
    travellerId?: string;
    isEnableEdit?: boolean;
    setIsEnableEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setLoadingSubmit: React.Dispatch<React.SetStateAction<boolean>>;
    setTravellerId: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const CollapseBlock: React.FC<CollapseBlockProps> = props => {
    const { data, form, travellerId, isEnableEdit, setIsEnableEdit, setLoadingSubmit, setTravellerId } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [dataLines, setDataLines] = useState<ReceivableVoucherLineDto[]>([]);

    const { mutateAsync: createReceivableVoucherDetail, isLoading: loadingCreate } = useCreateReceivable();
    const { mutateAsync: updateReceivableVoucherDetail, isLoading: loadingUpdate } = useUpdateReceivable(
        data?.id ?? '',
    );

    const generalInfoCollapse: CollapseProps['items'] = [
        {
            key: '1',
            label: t('THÔNG TIN CHUNG'),
            children: <GeneralInfo form={form} recId={data?.id ?? ''} />,
        },
    ];

    const contactPersonCollapse: CollapseProps['items'] = [
        {
            key: '1',
            label: t('NGƯỜI LIÊN LẠC'),
            children: (
                <ContactPerson
                    recId={data?.id}
                    travellerId={travellerId}
                    isEnableEdit={isEnableEdit}
                    form={form}
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
                    dataRec={data ?? {}}
                    data={dataLines}
                    form={form}
                    recId={data?.id ?? ''}
                    setIsEnableEdit={setIsEnableEdit}
                    setTravellerId={setTravellerId}
                />
            ),
        },
    ];

    const createReceivableVoucher = async (values: AnyObject) => {
        const res = await createReceivableVoucherDetail(values);
        toastSuccess(t('menu.receivableVoucher'), t('message.default.createContentSuccess'));
        navigate(`${rootPathsNew.receivableViewDetail}/${res}`);
    };

    const updateReceivableVoucher = async (values: AnyObject) => {
        await updateReceivableVoucherDetail(values);
        toastSuccess(t('menu.receivableVoucher'), t('message.default.updateContentSuccess'));
        navigate(`${rootPathsNew.receivableViewDetail}/${data?.id}`);
    };

    const onFinish = async (values: AnyObject) => {
        const valuesRefetch = resFetchData(values);
        if (isEmpty(valuesRefetch.receivableVoucherLines)) {
            setLoadingSubmit(false);
            toastWarning('', t('Chứng từ không được trống'));
            return;
        }
        if (isNil(values.id)) {
            createReceivableVoucher({ ...valuesRefetch, receivableDate: dayjs() });
        } else {
            updateReceivableVoucher(valuesRefetch);
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
            <Col className="grid grid-cols-2 gap-5">
                <Form form={props.form} onFinish={onFinish} layout="vertical" onValuesChange={handleValueChange}>
                    <Collapse defaultActiveKey={['1']} expandIconPosition={'end'} items={generalInfoCollapse} />
                </Form>
                <Collapse defaultActiveKey={['1']} expandIconPosition={'end'} items={contactPersonCollapse} />
                <Form className="col-span-2" form={props.form} onFinish={onFinish} layout="vertical" onValuesChange={handleValueChange}>
                    <Collapse
                        defaultActiveKey={['1']}
                        expandIconPosition={'end'}
                        items={tableDataCollapse}
                    />
                </Form>
            </Col>
        </Col>
    );
};
