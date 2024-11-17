import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import { FormInstance, Switch } from 'antd';

import { AnyObject } from 'antd/es/_util/type';
import { BaseInput } from '@components/customizes/Input/BaseInput';
import { BranchDto } from '@sdk/identity-next/models';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import modal from 'antd/es/modal';

export interface SwitchItemProps {
    dataBranch?: BranchDto;
    form: FormInstance;
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
}

export const SwitchItem: React.FC<SwitchItemProps> = props => {
    const { dataBranch, form, setIsEnableEdit } = props;
    const [isSwitchActive, setIsSwitchActive] = useState<boolean>(false);

    const handleChangeToggle = (e: boolean) => {
        if (!dataBranch || !isSwitchActive) {
            setIsSwitchActive(e);
            setIsEnableEdit(true);
            form.setFieldValue('isActive', e);
        } else {
            if ((dataBranch as AnyObject)?.hasActiveAgents || (dataBranch as AnyObject)?.hasActiveUsers) {
                modal.warning({
                    title: 'Cảnh báo',
                    icon: <ExclamationCircleOutlined />,
                    okText: 'Đóng',
                    content: (
                        <>
                            Chi nhánh {dataBranch?.name}{' '}
                            <span className="font-semibold">đang có đại lý hoặc tài khoản được kích hoạt</span>. Không
                            được tắt kích hoạt!
                        </>
                    ),
                });
            } else {
                modal.confirm({
                    title: 'Cảnh báo',
                    content: `Bạn muốn hủy kích hoạt chi nhánh ${dataBranch?.name}?`,
                    icon: <ExclamationCircleOutlined />,
                    okText: `Đồng ý`,
                    cancelText: 'Đóng',
                    onOk: () => {
                        setIsSwitchActive(false);
                        setIsEnableEdit(true);
                        form.setFieldValue('isActive', false);
                    },
                });
            }
        }
    };

    useEffect(() => {
        if (dataBranch?.isActive) {
            setIsSwitchActive(dataBranch?.isActive);
        }
    }, [dataBranch?.isActive]);

    return (
        <Fragment>
            <BaseInput isForm name="isActive" isHidden />
            <div>
                <p className="mb-3 font-semibold">Kích hoạt</p>
                <Switch size="default" onClick={handleChangeToggle} checked={isSwitchActive} />
            </div>
        </Fragment>
    );
};
