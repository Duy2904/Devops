import { Col, Collapse, CollapseProps, Form, FormInstance } from 'antd';
import { SaleOrderByTourDto, TourVisaDto, TourVisaStatus } from '@sdk/tour-operations';
import { dataForm, resFetchData } from '../../Feature';
import { useCallback, useEffect, useState } from 'react';
import {
    useCreateDocumentReceiptVisa,
    useGetCountries,
    useGetLocations,
    useUpdateDocumentReceiptVisa,
} from '../../hook/useDocumentReceiptVisa';

import { AnyObject } from 'antd/es/_util/type';
import { GeneralInfo } from './GeneralInfo';
import { MyPermissions } from '@utils/Permissions';
import { TableData } from './TableVisaLine/TableData';
import i18n from '@src/i18n';
import isNil from 'lodash/isNil';
import { rootPaths } from '@src/routers/route';
import useHasAnyPermission from '@hooks/useHasAnyPermission';
import { useNavigate } from 'react-router-dom';
import { ContactPerson } from './ContactPerson';

interface FormDetailProps {
    form: FormInstance;
    documentReceiptId?: string;
    data?: TourVisaDto;
    submittable: boolean;
    setSubmittable: React.Dispatch<React.SetStateAction<boolean>>;
    setLoadingSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormDetail: React.FC<FormDetailProps> = props => {
    const { form, documentReceiptId, data, setSubmittable, setLoadingSubmit } = props;
    const navigate = useNavigate();

    const [dataSOSelected, setDataSOSelected] = useState<SaleOrderByTourDto>({});
    const canChangeData = useHasAnyPermission([MyPermissions.TourVisaCreate, MyPermissions.TourVisaUpdate]);

    const { data: dataLocation } = useGetLocations();
    const { data: dataContries } = useGetCountries();
    const { mutateAsync: createDocumentReceipt, isLoading: loadingCreate } = useCreateDocumentReceiptVisa();
    const { mutateAsync: updateDocumentReceipt, isLoading: loadingUpdate } = useUpdateDocumentReceiptVisa(
        documentReceiptId!,
    );

    const travellerId =
        data?.travellerId && data?.travellerId !== '' ? data?.travellerId : dataSOSelected?.travellerId ?? '';

    const itemCollapseGeneralInfo: CollapseProps['items'] = [
        {
            key: '1',
            label: <p className="text-md">{i18n.t('Thông tin chung')}</p>,
            children: (
                <GeneralInfo
                    form={form}
                    documentReceiptId={documentReceiptId!}
                    setDataSOSelected={setDataSOSelected}
                    dataSOSelected={dataSOSelected}
                    dataDocumentVisa={data!}
                />
            ),
        },
    ];
    const itemCollapseContactPersonInfo: CollapseProps['items'] = [
        {
            key: '1',
            label: <p className="text-md">{i18n.t('Thông tin khách hàng')}</p>,
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
            label: <p className="text-md">{i18n.t('menu.visaReceipt')}</p>,
            children: (
                <TableData
                    dataSOSelected={dataSOSelected}
                    dataStatus={data?.tourVisaStatus}
                    documentReceiptId={documentReceiptId}
                    setIsEnableEdit={setSubmittable}
                    form={form}
                />
            ),
        },
    ];

    const fetchDataToForm = useCallback(() => {
        const locationId = dataLocation?.data?.find(
            item => item.id == dataSOSelected.tourSchedule?.destinationLocationId,
        )?.countryId;
        const contentCountry = dataContries?.data?.find(item => item.id === locationId)?.name;
        const tempDataForm = dataForm(dataSOSelected, contentCountry);
        form.setFieldsValue({ ...tempDataForm });
    }, [dataContries?.data, dataLocation?.data, dataSOSelected, form]);

    const onFinish = async (values: AnyObject) => {
        const valuesRefetch = resFetchData(values);
        if (!documentReceiptId) {
            const res = await createDocumentReceipt(valuesRefetch);
            navigate(`${rootPaths.documentReceiptForm}/${res}`);
        } else {
            await updateDocumentReceipt({ ...valuesRefetch, id: data?.id });
        }
    };

    const handleValueChange = () => {
        setSubmittable(true);
    };

    useEffect(() => {
        if (!isNil(dataSOSelected)) {
            fetchDataToForm();
        }
    }, [dataSOSelected, fetchDataToForm]);

    useEffect(() => {
        if (data) {
            setDataSOSelected(data);
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
            onValuesChange={handleValueChange}
            disabled={(!!documentReceiptId && data?.tourVisaStatus == TourVisaStatus.Cancel) || !canChangeData}
            layout="vertical"
        >
            <Col className="saleOrderCollapse">
                <Col className="grid grid-cols-12 gap-4">
                    <Col className="col-span-7">
                        <Collapse defaultActiveKey={['1']} expandIconPosition={'end'} items={itemCollapseGeneralInfo} />
                    </Col>
                    <Col className="col-span-5">
                        <Collapse
                            className='h-full'
                            defaultActiveKey={['1']}
                            expandIconPosition={'end'}
                            items={itemCollapseContactPersonInfo}
                        />
                    </Col>
                    <Col className="col-span-12 mt-4">
                        <Collapse defaultActiveKey={['1']} expandIconPosition={'end'} items={tableDataCollapse} />
                    </Col>
                </Col>

            </Col>
        </Form>
    );
};
