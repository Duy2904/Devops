import { Button, Checkbox, Col, Flex, Form, Select } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { ReactNode, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { QuestionCircleOutlined, SaveOutlined } from '@ant-design/icons';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import { BaseSelect } from '@components/customizes/Select/BaseSelect';
import { toastSuccess } from '@components/ui/Toast/Toast';
import { TooltipComponent } from '@components/customizes/Tooltip/Tooltip';
import {
    CreateVoucherParameterRequest,
    UpdateVoucherParameterRequest,
    VoucherParameterDto,
} from '@sdk/tour-operations';
import i18n from '@src/i18n';
import FilterSearch from '@utils/filterSearch';

import { listSeparator, listTypeDate, ruleValidateText, valueSelect } from './Features/AutoIncrementCodeFeature';
import { useCreateVoucherDetail, useSearchVoucherDetail, useUpdateVoucherDetail } from './hooks/useAutoIncrementCode';
import { PreviewData } from './PreviewData';

interface FormAutoIncrementProps {
    name: string;
    tableCode: string;
    title: ReactNode;
    titleToast: string;
}

const SelectDataItem = (listData: valueSelect[]) => {
    return (
        <Select
            allowClear
            virtual={false}
            showSearch
            placeholder="--Chọn--"
            options={listData}
            filterOption={FilterSearch.filterOption}
        />
    );
};

export const FormAutoIncrement: React.FC<FormAutoIncrementProps> = props => {
    const { name, tableCode, title, titleToast } = props;
    const [form] = Form.useForm();
    const listDateData = listTypeDate();
    const listSeparatorData = listSeparator();

    const [dataSoAutoCode, setDataSoAutoCode] = useState<VoucherParameterDto>();
    const [previewText, setPreviewText] = useState<AnyObject>([]);

    const { data: fetchDataSaleOrder } = useSearchVoucherDetail(tableCode);
    const { mutateAsync: createSaleOrderCode } = useCreateVoucherDetail(tableCode);
    const { mutateAsync: updateSaleOrderCode } = useUpdateVoucherDetail(tableCode);

    const createData = async (values: CreateVoucherParameterRequest) => {
        const dataForm: CreateVoucherParameterRequest = {
            ...values,
            name: name,
            tableName: tableCode,
            fieldName: 'OrderNo',
        };
        const resCreate = await createSaleOrderCode(dataForm);
        resCreate && toastSuccess(titleToast, i18n.t('message.default.createContentSuccess'));
    };

    const updateData = async (values: UpdateVoucherParameterRequest) => {
        const resUpdate = await updateSaleOrderCode(values);
        resUpdate && toastSuccess(titleToast, i18n.t('message.default.updateContentSuccess'));
    };

    const onFinish = async (values: AnyObject) => {
        if (!values) return;

        if (!values?.id) {
            createData(values);
        } else {
            updateData(values);
        }
    };

    const handleOnValuesChange = useDebouncedCallback((_: AnyObject, values: AnyObject) => {
        setPreviewText(values);
    }, 1000);

    useEffect(() => {
        if (fetchDataSaleOrder) {
            setDataSoAutoCode(fetchDataSaleOrder?.data && fetchDataSaleOrder?.data[0]);
            form.setFieldsValue({ ...dataSoAutoCode });
            setPreviewText(dataSoAutoCode ?? []);
        }
    }, [fetchDataSaleOrder, dataSoAutoCode, form]);

    return (
        <Col className="mt-5 p-4 bg-slate-200/30 rounded-xl">
            <Flex className="flex-col lg:flex-row items-start lg:items-center lg:justify-between" gap={20}>
                <p>{title}</p>
                <Button type="primary" icon={<SaveOutlined />} onClick={() => form.submit()}>
                    {i18n.t('action.save')}
                </Button>
            </Flex>
            <Form form={form} onFinish={onFinish} onValuesChange={handleOnValuesChange}>
                <Col className="w-full overflow-hidden">
                    <Col className="my-5 lg:w-3/4 overflow-x-auto">
                        <Col className="grid grid-cols-4 gap-4 p-3">
                            <Col className="font-bold text-blue-600 col-span-1">Tiêu đề</Col>
                            <Col className="font-bold text-blue-600 col-span-1">Nội dung</Col>
                            <Col className="font-bold text-blue-600 col-span-1">Vị trí</Col>
                            <Col className="font-bold text-blue-600 col-span-1">Hiển thị</Col>
                        </Col>
                        <BaseInput isForm isHidden name="name" initialValue={dataSoAutoCode?.name} />
                        <BaseInput isForm isHidden name="tableName" initialValue={dataSoAutoCode?.tableName} />
                        <BaseInput isForm isHidden name="fieldName" initialValue={dataSoAutoCode?.fieldName} />
                        <BaseInput isForm isHidden name="id" initialValue={dataSoAutoCode?.id} />
                        <Col className="grid grid-cols-4 gap-4 px-3 py-2">
                            <Col className="flex items-center gap-1 col-span-1">
                                [Prefix] Tiếp đầu ngữ 1{' '}
                                <TooltipComponent
                                    title="Nhập text, chữ cái latinh/số, viết hoa, không dùng từ tiếng việt."
                                    content={<QuestionCircleOutlined />}
                                />
                            </Col>
                            <Col className="col-span-1">
                                <BaseInput
                                    className="mb-0"
                                    isForm
                                    name="prefix"
                                    initialValue={dataSoAutoCode?.prefix}
                                    rules={ruleValidateText()}
                                />
                            </Col>
                            <Col className="col-span-1">
                                <BaseInput type="number" />
                            </Col>
                            <Col className="flex items-center gap-1 col-span-1">
                                <Checkbox checked />
                            </Col>
                        </Col>
                        <Col className="grid grid-cols-4 gap-4 px-3 py-2">
                            <Col className="flex items-center gap-1 col-span-1">
                                [Prefix2] Tiếp đầu ngữ 2
                                <TooltipComponent
                                    title="Nhập text, chữ cái latinh/số, viết hoa, không dùng từ tiếng việt."
                                    content={<QuestionCircleOutlined />}
                                />
                            </Col>
                            <Col className="col-span-1">
                                <BaseInput
                                    className="mb-0"
                                    isForm
                                    name="prefix2"
                                    initialValue={dataSoAutoCode?.prefix2}
                                    rules={ruleValidateText()}
                                />
                            </Col>
                            <Col className="col-span-1">
                                <BaseInput type="number" />
                            </Col>
                            <Col className="flex items-center gap-1 col-span-1">
                                <Checkbox checked />
                            </Col>
                        </Col>
                        <Col className="grid grid-cols-4 gap-4 px-3 py-2">
                            <Col className="flex items-center gap-1 col-span-1">
                                Độ dài số tăng tự động
                                <TooltipComponent
                                    title="Nhập số ký tự của số tăng tự động"
                                    content={<QuestionCircleOutlined />}
                                />
                            </Col>
                            <Col className="col-span-1">
                                <BaseInput
                                    isForm
                                    className="mb-0"
                                    type="number"
                                    name="maxLength"
                                    initialValue={dataSoAutoCode?.maxLength}
                                    min={0}
                                />
                            </Col>
                            <Col className="col-span-1">
                                <BaseInput type="number" />
                            </Col>
                            <Col className="flex items-center gap-1 col-span-1">
                                <Checkbox checked disabled />
                            </Col>
                        </Col>
                        <Col className="grid grid-cols-4 gap-4 px-3 py-2">
                            <Col className="flex items-center gap-1 col-span-1">
                                Thời gian
                                <TooltipComponent
                                    title="Thời gian là tháng, năm tại thời điểm khai báo dữ liệu ở chức năng"
                                    content={<QuestionCircleOutlined />}
                                />
                            </Col>
                            <Col className="col-span-1">
                                <BaseSelect
                                    className="mb-0"
                                    isForm
                                    name="formatDate"
                                    items={SelectDataItem(listDateData)}
                                    initialValue={dataSoAutoCode?.formatDate}
                                />
                            </Col>
                            <Col className="col-span-1">
                                <BaseInput type="number" />
                            </Col>
                            <Col className="flex items-center gap-1 col-span-1">
                                <Checkbox checked />
                            </Col>
                        </Col>
                        <Col className="grid grid-cols-4 gap-4 px-3 py-2">
                            <Col className="flex items-center gap-1 col-span-1">
                                Dấu phân cách
                                <TooltipComponent
                                    title="User được chọn các dấu “-“, “/”, “.” hoặc không chọn"
                                    content={<QuestionCircleOutlined />}
                                />
                            </Col>
                            <Col className="col-span-1">
                                <BaseSelect
                                    isForm
                                    className="mb-0"
                                    name="separation"
                                    items={SelectDataItem(listSeparatorData)}
                                    initialValue={dataSoAutoCode?.separation}
                                />
                            </Col>
                            <Col className="col-span-1">{/* <BaseInput type="number" /> */}</Col>
                            <Col className="flex items-center gap-1 col-span-1">
                                <Checkbox checked />
                            </Col>
                        </Col>
                    </Col>
                </Col>
            </Form>
            <PreviewData valuesData={previewText} />
        </Col>
    );
};
