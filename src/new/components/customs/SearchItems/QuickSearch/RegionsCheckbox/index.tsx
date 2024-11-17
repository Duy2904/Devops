import React, { useMemo } from 'react';

import { GroupCheckbox } from '../GroupCheckbox';
import { RegionDto } from '@sdk/tour-operations';
import { objQuickType } from '../Feature';
import { useFetchRegions } from './queries';

interface RegionsCheckboxProps {
    objQuicks: objQuickType[];
    setObjQuicks: React.Dispatch<React.SetStateAction<objQuickType[]>>;
}

export const RegionsCheckbox: React.FC<RegionsCheckboxProps> = props => {
    const { objQuicks, setObjQuicks } = props;
    const { data } = useFetchRegions();
    const regionsArr: RegionDto[] = useMemo(() => data?.data ?? [], [data?.data]);

    return (
        <GroupCheckbox
            title="Tour nước ngoài"
            listObj={regionsArr}
            objQuicks={objQuicks}
            setObjQuicks={setObjQuicks}
            groupNameCheckbox="region"
        />
    );
};
