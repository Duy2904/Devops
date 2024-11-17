import { Col, Form, FormInstance, Switch } from 'antd';

import { AnyObject } from 'antd/es/_util/type';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import { BranchSelect } from './BranchSelect';
import { DepartmentDto } from '@sdk/tour-operations';
import { DepartmentGroupSelect } from './DepartmentGroup';
import { MyPermissions } from '@utils/Permissions';
import { OwnerDepartmentSelect } from './OwnerDepartmentSelect';
import TextArea from 'antd/es/input/TextArea';
import { departmentFormValidation } from '../../Feature';
import i18n from '@src/i18n';
import useHasAnyPermission from '@hooks/useHasAnyPermission';

export interface DataFormProps {
    form: FormInstance;
    setIsDataChange: React.Dispatch<React.SetStateAction<boolean>>;
    // eslint-disable-next-line no-unused-vars
    onFinish: (values: AnyObject) => Promise<void>;
    departmentId?: string;
    fetchData?: DepartmentDto;
}

export const DataForm: React.FC<DataFormProps> = props => {
    const { form, setIsDataChange, onFinish, departmentId, fetchData } = props;
    const branchIdUseWatch = Form.useWatch('branchId', form);
    const canChangeData = useHasAnyPermission([MyPermissions.DepartmentCreate, MyPermissions.DepartmentUpdate]);

    const handleChangeValue = () => {
        setIsDataChange(true);
    };

    const handleChangeBranch = () => {
        form.setFieldValue('parentId', undefined);
    };

    return (
        <Col className="w-full rounded-lg p-4 bg-gray-100/80">
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onValuesChange={handleChangeValue}
                disabled={!canChangeData}
            >
                <BaseInput isForm name="id" isHidden />
                <BaseInput isForm name="departmentNo" isHidden initialValue={''} />
                <Col className="grid grid-cols-2 gap-4 align-middle">
                    <BaseInput
                        isForm
                        name="name"
                        className="col-span-2 lg:col-span-1"
                        label={i18n.t('Tên bộ phận')}
                        placeholder={i18n.t('Nhập tên bộ phận')}
                        rules={departmentFormValidation.name}
                        showCount
                        maxCountNumber={250}
                    />
                    <Form.Item name="isActive" label={i18n.t('Kích hoạt')}>
                        <Switch />
                    </Form.Item>
                </Col>
                <Col className="grid grid-cols-2 gap-4 align-middle">
                    <BranchSelect
                        isForm
                        name="branchId"
                        className="col-span-2 lg:col-span-1"
                        label={i18n.t('Chi nhánh')}
                        rules={departmentFormValidation.branchId}
                        fetchData={fetchData}
                        onChange={handleChangeBranch}
                    />
                    <DepartmentGroupSelect
                        isForm
                        name="parentId"
                        className="col-span-2 lg:col-span-1"
                        label={i18n.t('Bộ phận trực thuộc')}
                        departmentId={departmentId}
                        branchId={branchIdUseWatch}
                    />
                </Col>
                <OwnerDepartmentSelect isForm name="employeeId" label={i18n.t('Trưởng bộ phận')} />
                <Form.Item
                    name="description"
                    className="col-span-4 md:col-span-2 lg:col-span-1 mb-4"
                    label={<p className="mb-1 font-semibold">Ghi chú</p>}
                >
                    <TextArea rows={5} showCount maxLength={500} />
                </Form.Item>
            </Form>
        </Col>
    );
};
