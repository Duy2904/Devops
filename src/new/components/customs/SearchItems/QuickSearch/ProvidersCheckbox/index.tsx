import React, { useMemo } from 'react';

import { DropdownDto } from '@sdk/tour-operations';
import { GroupCheckbox } from '../GroupCheckbox';
import { objQuickType } from '../Feature';
import { useFetchProviders } from './queries';

interface ProvidersCheckboxProps {
    objQuicks: objQuickType[];
    setObjQuicks: React.Dispatch<React.SetStateAction<objQuickType[]>>;
}

export const ProvidersCheckbox: React.FC<ProvidersCheckboxProps> = props => {
    const { objQuicks, setObjQuicks } = props;
    const { data } = useFetchProviders();
    const providersArr: DropdownDto[] = useMemo(() => data ?? [], [data]);

    return (
        <GroupCheckbox
            title="Đơn vị mở tour"
            listObj={providersArr}
            objQuicks={objQuicks}
            setObjQuicks={setObjQuicks}
            groupNameCheckbox="provider"
        />
    );
};
