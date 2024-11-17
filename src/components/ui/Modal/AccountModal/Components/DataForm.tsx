import { Col, Form, FormInstance } from 'antd';

import { AccountFormValidation } from '../Feature';
import { AnyObject } from 'antd/es/_util/type';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import { UserDetailsDto } from '@sdk/identity-next/models';
import i18n from '@src/i18n';

export interface DataFormProps {
    form: FormInstance;
    data: UserDetailsDto;
    // eslint-disable-next-line no-unused-vars
    onFinish: (values: AnyObject) => Promise<void>;
    setIsDataChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DataForm: React.FC<DataFormProps> = props => {
    const { form, data, onFinish, setIsDataChange } = props;
    const roleList = data?.rolesDetail?.[0]?.roleNameAlias ?? data?.rolesDetail?.[0]?.name;

    const handleValueChange = () => {
        setIsDataChange(true);
    };

    return (
        <Col className="w-full rounded-lg p-4 bg-gray-100/80">
            <Form form={form} onFinish={onFinish} onValuesChange={handleValueChange} layout="vertical">
                <BaseInput isForm name="imageUrl" isHidden />
                <BaseInput
                    isForm
                    className="mb-3"
                    type={'mail'}
                    name={'email'}
                    label={i18n.t('personContact.mail')}
                    initialValue={data?.email}
                    disable
                />
                <BaseInput
                    isForm
                    className="mb-3"
                    name={'role'}
                    label={i18n.t('Quyền hạn')}
                    initialValue={roleList}
                    disable
                />
                <Col className='grid grid-cols-2 gap-5'>
                    <BaseInput
                        isForm
                        className="mb-3"
                        name={'lastName'}
                        label={i18n.t('Họ')}
                        rules={AccountFormValidation.lastName}
                        initialValue={data?.lastName}
                        showCount
                        maxCountNumber={20}
                    />
                    <BaseInput
                        isForm
                        className="mb-3"
                        name={'firstName'}
                        label={i18n.t('Tên và tên đệm')}
                        rules={AccountFormValidation.firstName}
                        initialValue={data?.firstName}
                        showCount
                        maxCountNumber={20}
                    />
                </Col>
                <BaseInput
                    isForm
                    className="mb-3"
                    name={'displayName'}
                    label={i18n.t('personContact.fullName')}
                    rules={AccountFormValidation.displayName}
                    initialValue={data?.displayName}
                    disable
                />
                <BaseInput
                    isForm
                    className="mb-3"
                    name={'phoneNumber'}
                    label={i18n.t('personContact.phone')}
                    initialValue={data?.phoneNumber}
                    rules={AccountFormValidation.phoneNumber}
                />
                <BaseInput
                    isForm
                    className="mb-3"
                    name={'jobTitle'}
                    label={i18n.t('personContact.jobTitle')}
                    initialValue={data?.jobTitle}
                    disable
                />
            </Form>
        </Col>
    );
};
