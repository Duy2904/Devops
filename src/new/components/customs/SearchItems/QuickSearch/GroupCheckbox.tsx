import { Checkbox, Col, Flex } from 'antd';
import { AnyObject, GetProp } from 'antd/es/_util/type';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import isEmpty from 'lodash/isEmpty';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { useSearchTableStoreNew } from '@src/new/shared/stores/SearchTableStore';
import { currentPage, pageSize } from '@src/new/shared/types/BaseTypes';
import { isEmptyParams } from '@src/new/shared/utils/validations';

import { TagTour } from '../../Tags/TagTour';
import { groupNameType, objQuickType } from './Feature';

export interface GroupCheckboxProps {
    title?: string;
    listObj: AnyObject[];
    isTag?: boolean;
    objQuicks: objQuickType[];
    setObjQuicks: React.Dispatch<React.SetStateAction<objQuickType[]>>;
    groupNameCheckbox?: groupNameType;
}

export const GroupCheckbox: React.FC<GroupCheckboxProps> = props => {
    const { title, listObj, isTag, objQuicks, setObjQuicks, groupNameCheckbox } = props;
    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStoreNew(state => state);

    const [checkedList, setCheckedList] = useState<string[]>([]);

    const data = listObj.map((item: AnyObject) => {
        return {
            label: (
                <Col className="line-clamp-1 flex items-center">
                    {isTag ? (
                        <TagTour color={item?.color} content={item?.name} icon={item?.icon} />
                    ) : (
                        <Flex align="center" gap={4}>
                            {item?.logo && <img className="w-6 h-6" src={item?.logo} />}
                            <p className="text-xs font-medium text-greyColor-second inline-block whitespace-nowrap overflow-hidden text-ellipsis max-w-[240px]">
                                {item?.name}
                            </p>
                        </Flex>
                    )}
                </Col>
            ),
            value: item?.id,
        };
    });

    const handleDeleleEmptyParam = (itemMap: AnyObject) => {
        if (isEmpty(itemMap.get('tag')?.checkedArr)) {
            delete tableParams.tags;
        }
        if (isEmpty(itemMap.get('provider')?.checkedArr)) {
            delete tableParams.providers;
        }
        if (isEmpty(itemMap.get('area')?.checkedArr)) {
            delete tableParams.areaIds;
        }
        if (isEmpty(itemMap.get('region')?.checkedArr)) {
            delete tableParams.regionIds;
        }
    };

    const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues: CheckboxValueType[]) => {
        setCheckedList(checkedValues as string[]);
        let tempArr: objQuickType[] = [];
        const updatedGroup = {
            groupName: groupNameCheckbox!,
            counted: checkedValues.length,
            checkedArr: checkedValues as string[],
        };

        const groupExists = objQuicks.some(x => x.groupName === groupNameCheckbox);

        if (groupExists) {
            const updatedObjQuicks = objQuicks.map(x => (x.groupName === groupNameCheckbox ? updatedGroup : x));
            setObjQuicks(updatedObjQuicks);
            tempArr = updatedObjQuicks;
        } else {
            setObjQuicks([...objQuicks, updatedGroup]);
            tempArr = [...objQuicks, updatedGroup];
        }

        const itemMap = new Map(tempArr.map(item => [item.groupName, item]));
        handleDeleleEmptyParam(itemMap);
        changeParamsSearch(itemMap);
    };

    const changeParamsSearch = useDebouncedCallback((itemMap: AnyObject) => {
        setSearchParams({
            ...tableParams,
            pagination: { current: currentPage, pageSize: pageSize, showSizeChanger: true },
            ...isEmptyParams('providers', itemMap.get('provider')?.checkedArr),
            ...isEmptyParams('tags', itemMap.get('tag')?.checkedArr),
            ...isEmptyParams('areaIds', itemMap.get('area')?.checkedArr),
            ...isEmptyParams('regionIds', itemMap.get('region')?.checkedArr),
        });
    }, 500);

    useEffect(() => {
        if (!tableParams.tags && !tableParams.providers && !tableParams.areaIds && !tableParams.regionIds) {
            setCheckedList([]);
        }
    }, [tableParams.areaIds, tableParams.providers, tableParams.regionIds, tableParams.tags]);

    return (
        <Col>
            <p className="text-sm font-bold text-state-info mb-4 h-4 uppercase">{title}</p>
            <Col>
                <Checkbox.Group
                    className="grid grid-rows-3 grid-flow-col gap-x-6"
                    onChange={onChange}
                    options={data}
                    value={checkedList}
                ></Checkbox.Group>
            </Col>
        </Col>
    );
};
