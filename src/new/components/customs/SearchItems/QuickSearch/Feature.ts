export type groupNameType = 'tag' | 'region' | 'area' | 'provider';

export type objQuickType = {
    groupName: groupNameType;
    counted: number;
    checkedArr: string[];
};
