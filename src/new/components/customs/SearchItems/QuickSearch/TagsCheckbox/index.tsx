import React, { useMemo } from 'react';

import { GroupCheckbox } from '../GroupCheckbox';
import { TagDto } from '@sdk/tour-operations';
import { objQuickType } from '../Feature';
import { useFetchTags } from './queries';
import { useTranslation } from 'react-i18next';

interface TagsCheckboxProps {
    objQuicks: objQuickType[];
    setObjQuicks: React.Dispatch<React.SetStateAction<objQuickType[]>>;
}

export const TagsCheckbox: React.FC<TagsCheckboxProps> = props => {
    const { objQuicks, setObjQuicks } = props;
    const { t } = useTranslation();
    const { data } = useFetchTags();
    const tagsArr: TagDto[] = useMemo(() => data?.data ?? [], [data?.data]);

    return (
        <GroupCheckbox
            isTag
            title={t('Thẻ')}
            listObj={tagsArr}
            objQuicks={objQuicks}
            setObjQuicks={setObjQuicks}
            groupNameCheckbox="tag"
        />
    );
};
