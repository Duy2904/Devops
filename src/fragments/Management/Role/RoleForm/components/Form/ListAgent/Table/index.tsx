import { Checkbox, Flex, Form, FormInstance } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { StaticTag } from '@components/customizes/StaticTag';
import { GridTableComponent } from '@components/ui/GridTable';
import { mapSearchRequest, useGetListGroupAgent } from '@fragments/Management/Role/hooks/queries';
import { LiteAgentDto, SearchAgentsRequest } from '@sdk/identity-next/models';
import i18n from '@src/i18n';
import { TableParams } from '@src/types/SearchResponse';
import { setAgentStatusColor } from '@utils/colorStatus';

interface TableListProps {
    includeGroupIds: string[];
    form: FormInstance;
    customTableParams: TableParams<AnyObject>;
    setCustomTableParams: Dispatch<SetStateAction<TableParams<AnyObject>>>;
    setIncludeGroupIds: Dispatch<SetStateAction<string[]>>;
}

export const TableList: React.FC<TableListProps> = props => {
    const { includeGroupIds, form, customTableParams, setCustomTableParams, setIncludeGroupIds } = props;
    const { roleId } = useParams<string>();
    const isAllFormWatch = Form.useWatch(['isAll', form]);

    // State
    const [toggleAgentActive, setToggleAgentActive] = useState<boolean>(!roleId);
    const [isDirty, setIsDirty] = useState<boolean>(false);
    const [addGroupIdIds, setAddGroupIdIds] = useState<string[]>([]);
    const [removeGroupIds, setRemoveGroupIds] = useState<string[]>([]);
    const [totalCount, setTotalCount] = useState<number | undefined>(undefined);

    // Query
    const { data, isLoading } = useGetListGroupAgent(mapSearchRequest(customTableParams));

    const agentsArr: LiteAgentDto[] = useMemo(() => data?.data ?? [], [data?.data]);

    const handleTogglePermission = () => {
        const agentActive: {
            [key: string]: boolean;
        } = {};

        agentsArr?.forEach((item: LiteAgentDto) => (agentActive[item.id ?? ''] = !toggleAgentActive));

        if (!roleId) {
            form.setFieldValue('isAll', !toggleAgentActive);
        }

        form.setFieldValue('agentActive', agentActive);
        setToggleAgentActive(!toggleAgentActive);
        setAddGroupIdIds([]);
        setRemoveGroupIds([]);

        if (!isDirty) {
            setIsDirty(true);
        }
    };

    const handleTableChange = async (
        pagination: TablePaginationConfig,
        _advancedFilter: Record<string, FilterValue | null>,
        sorter: SorterResult<SearchAgentsRequest> | SorterResult<SearchAgentsRequest>[],
    ) => {
        setCustomTableParams({
            ...customTableParams,
            pagination,
            sorter,
        });
    };

    const handleToogle = (e: CheckboxChangeEvent, id: string) => {
        const findItemDefault = includeGroupIds?.find(x => x === id);
        const findItemAdded = addGroupIdIds?.find(x => x === id);
        const findItemRemoved = removeGroupIds?.find(x => x === id);

        if (e.target.checked) {
            if (!isEmpty(findItemRemoved)) {
                const newListRemoved = removeGroupIds.filter(x => x !== id);
                setRemoveGroupIds(newListRemoved);
            }

            if (isEmpty(findItemAdded)) {
                if (isEmpty(findItemDefault)) {
                    const newListAdded = [...addGroupIdIds, id];
                    setAddGroupIdIds(newListAdded);
                } else {
                    if (isAllFormWatch) {
                        const newListAdded = addGroupIdIds.filter(x => x !== id);
                        setAddGroupIdIds(newListAdded);
                        if (!roleId) {
                            form.setFieldValue('isAll', newListAdded.length === 0);
                            setToggleAgentActive(true);
                        }
                    } else {
                        const newListAdded = [...addGroupIdIds, id];
                        setAddGroupIdIds(newListAdded);
                    }
                }
            }
        } else {
            if (!isEmpty(findItemAdded)) {
                const newListAdded = addGroupIdIds.filter(x => x !== id);
                setAddGroupIdIds(newListAdded);
            }

            if (isEmpty(findItemRemoved) && !isEmpty(findItemDefault)) {
                const newListRemoved = [...removeGroupIds, id];
                setRemoveGroupIds(newListRemoved);
            }

            if (!roleId) {
                form.setFieldValue('isAll', false);
                setToggleAgentActive(false);
            }
        }

        if (!isDirty) {
            setIsDirty(true);
        }
    };

    const checkAgentActive = () => {
        const agentActive: {
            [key: string]: boolean;
        } = {};
        const includeGroupIdsTemp = agentsArr.map(x => x.id ?? '');

        agentsArr?.forEach((item: LiteAgentDto) => {
            let isActive = false;

            if (toggleAgentActive) {
                isActive = true;
            } else {
                if (!removeGroupIds?.find(x => x === item.id) && removeGroupIds.length > 0) {
                    isActive = true;
                }
                if (addGroupIdIds?.find(x => x === item.id) && addGroupIdIds.length > 0) {
                    isActive = true;
                }
            }

            return (agentActive[item.id ?? ''] = isActive);
        });

        form.setFieldValue('agentActive', agentActive);
        setIncludeGroupIds(includeGroupIdsTemp);
    };

    useEffect(() => {
        if (data?.totalCount && isNil(totalCount)) {
            setTotalCount(data?.totalCount);
        }
    }, [data?.totalCount, totalCount]);

    useEffect(() => {
        form.setFieldValue('isAll', true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        form.setFieldValue('addGroupIdIds', addGroupIdIds);
    }, [addGroupIdIds, form]);

    useEffect(() => {
        form.setFieldValue('removeGroupIds', removeGroupIds);
    }, [form, removeGroupIds]);

    useEffect(() => {
        if (!roleId && !isEmpty(agentsArr)) {
            checkAgentActive();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [agentsArr, roleId]);

    const columnsData: ColumnsType<LiteAgentDto> = [
        {
            title: '',
            dataIndex: 'agentActive',
            key: 'agentActive',
            fixed: 'left',
            align: 'center',
            width: 60,
            render: (value: boolean, record: LiteAgentDto) => (
                <Form.Item
                    className="flex justify-center mb-0"
                    name={['agentActive', record.id!]}
                    valuePropName="checked"
                    initialValue={value}
                >
                    <Checkbox onChange={e => handleToogle(e, record.id!)} />
                </Form.Item>
            ),
        },
        {
            title: i18n.t('Mã hệ thống'),
            dataIndex: 'systemId',
            key: 'SystemId',
            fixed: 'left',
            sorter: true,
            width: 150,
            render: value => <p className="line-clamp-2">{value}</p>,
        },
        {
            title: i18n.t('Mã đại lý'),
            dataIndex: 'code',
            key: 'Code',
            width: 150,
            sorter: true,
            render: value => <p className="line-clamp-2">{value}</p>,
        },
        {
            title: i18n.t('Tên đại lý'),
            dataIndex: 'name',
            key: 'Name',
            width: 150,
            sorter: true,
            render: value => <p className="line-clamp-2">{value}</p>,
        },
        {
            title: i18n.t('Chi nhánh'),
            dataIndex: 'branchName',
            key: 'BranchName',
            width: 150,
            sorter: true,
            render: value => <p className="line-clamp-2">{value}</p>,
        },
        {
            title: i18n.t('Email'),
            dataIndex: 'email',
            key: 'Email',
            width: 150,
            sorter: true,
            render: value => <p className="line-clamp-2">{value}</p>,
        },
        {
            title: i18n.t('Số điện thoại'),
            dataIndex: 'phoneNumber',
            key: 'PhoneNumber',
            width: 150,
            sorter: true,
            render: value => <p className="line-clamp-2">{value}</p>,
        },
        {
            title: i18n.t('Tình trạng'),
            dataIndex: 'agentState',
            key: 'AgentState',
            width: 150,
            render: value => (
                <StaticTag type={i18n.t(`agentStatus.${value}`)} color={`${setAgentStatusColor(`${value}`)}`} />
            ),
        },
    ];

    return (
        <>
            {!roleId ? (
                <Flex className="gap-2 cursor-pointer" align="center" onClick={handleTogglePermission}>
                    <Checkbox checked={toggleAgentActive} />
                    <p>Chọn tất cả đại lý ({totalCount} đại lý)</p>
                </Flex>
            ) : null}
            <GridTableComponent
                loading={isLoading}
                isHideSelectColumn
                columns={columnsData}
                tableParams={{
                    ...customTableParams,
                    pagination: { ...customTableParams.pagination, total: data?.totalCount },
                }}
                dataSource={agentsArr}
                onChange={handleTableChange}
                bordered={true}
                scrollX={200}
                scrollY={window.innerHeight - 580}
                showReport={true}
                tableName={i18n.t('Đại lý')}
            />
        </>
    );
};
