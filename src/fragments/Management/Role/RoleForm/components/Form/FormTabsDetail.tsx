import { FormInstance, Tabs, TabsProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { Dispatch, SetStateAction } from 'react';

import { useFetchPersonalIdentityInfo } from '@hooks/identity-next/queries/usePersonal';
import i18n from '@src/i18n';
import { TableParams } from '@src/types/SearchResponse';
import { RoleType } from '@src/types/TypeEnum';

import { FormListAgent } from './FormListAgent';
import { FormSettingPermission } from './FormSettingPermission';

interface FormTabsDetailProps {
    form: FormInstance;
    includeGroupIds: string[];
    type: RoleType;
    customTableParams: TableParams<AnyObject>;
    setCustomTableParams: Dispatch<SetStateAction<TableParams<AnyObject>>>;
    onValuesChange: () => void;
    onFinish: (values: AnyObject) => void;
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
    setIncludeGroupIds: Dispatch<SetStateAction<string[]>>;
}

export const FormTabsDetail: React.FC<FormTabsDetailProps> = props => {
    const { form, includeGroupIds, type, customTableParams, setCustomTableParams, setIncludeGroupIds } = props;

    const { data: personInfo } = useFetchPersonalIdentityInfo();

    const companyTab: TabsProps['items'] = [
        {
            forceRender: true,
            label: i18n.t('Chức năng'),
            key: 'tabPermission',
            children: <FormSettingPermission form={form} type={type} />,
        },
        {
            forceRender: true,
            label: i18n.t('Dữ liệu'),
            key: 'tabData',
            children: (
                <FormListAgent
                    includeGroupIds={includeGroupIds}
                    form={form}
                    customTableParams={customTableParams}
                    setCustomTableParams={setCustomTableParams}
                    setIncludeGroupIds={setIncludeGroupIds}
                />
            ),
        },
    ];

    const agentTab: TabsProps['items'] = [
        {
            forceRender: true,
            label: i18n.t('Chức năng'),
            key: 'tabPermission',
            children: <FormSettingPermission form={form} type={type} />,
        },
    ];

    return (
        <div>
            <Tabs type="card" items={personInfo?.isGlobal ? companyTab : agentTab} />
        </div>
    );
};
