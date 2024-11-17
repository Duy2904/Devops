import React, { useMemo } from 'react';

import { AreaDto } from '@sdk/tour-operations';
import { GroupCheckbox } from '../GroupCheckbox';
import { objQuickType } from '../Feature';
import { useFetchAreas } from './queries';

interface AreasCheckboxProps {
    objQuicks: objQuickType[];
    setObjQuicks: React.Dispatch<React.SetStateAction<objQuickType[]>>;
}

export const AreasCheckbox: React.FC<AreasCheckboxProps> = props => {
    const { objQuicks, setObjQuicks } = props;
    const { data } = useFetchAreas();
    const AreasArr: AreaDto[] = useMemo(() => data?.data ?? [], [data?.data]);

    return (
        <GroupCheckbox
            title="Tour trong nước"
            listObj={AreasArr}
            objQuicks={objQuicks}
            setObjQuicks={setObjQuicks}
            groupNameCheckbox="area"
        />
    );
};
