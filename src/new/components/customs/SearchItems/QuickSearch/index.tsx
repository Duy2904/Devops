import { Button, Col, Flex } from 'antd';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useMemo, useRef, useState } from 'react';

import { AreasCheckbox } from './AreasCheckbox';
import Can from '@src/new/components/common/Can';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MyPermissions } from '@utils/Permissions';
import { ProvidersCheckbox } from './ProvidersCheckbox';
import { RegionsCheckbox } from './RegionsCheckbox';
import { TagsCheckbox } from './TagsCheckbox';
import { objQuickType } from './Feature';
import { useSearchTableStoreNew } from '@src/new/shared/stores/SearchTableStore';
import { useTranslation } from 'react-i18next';

export const QuickSearch: React.FC = () => {
    const { t } = useTranslation();

    const wrapperRef = useRef<HTMLDivElement>(null);
    const [objQuicks, setObjQuicks] = useState<objQuickType[]>([]);
    const [isDrop, setIsDrop] = useState<boolean>(false);

    const {
        tableParams,
        actions: { setSearchParams },
    } = useSearchTableStoreNew(state => state);

    const counted = useMemo(() => {
        return objQuicks.map(x => x.counted).reduce((a, b) => a + b, 0);
    }, [objQuicks]);

    const handleResetQuickParams = () => {
        setSearchParams({
            ...tableParams,
            providers: undefined,
            tags: undefined,
            areaIds: undefined,
            regionIds: undefined,
        });
        setObjQuicks([]);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsDrop(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <Col className="relative w-full" ref={wrapperRef}>
            <Flex
                align="center"
                gap={8}
                className={`bg-[#F6F7FA] text-state-info text-sm font-semibold px-4 h-8 cursor-pointer w-fit relative ${
                    isDrop ? 'rounded-t-lg' : 'rounded-lg'
                }`}
                onClick={() => {
                    setIsDrop(!isDrop);
                }}
            >
                <Col>{t('LỌC NHANH')}</Col>
                {counted > 0 && (
                    <Flex
                        className="w-4 h-4 bg-state-info text-white text-[10px] font-semibold rounded mr-1"
                        align="center"
                        justify="center"
                    >
                        <p>{counted}</p>
                    </Flex>
                )}
                <FontAwesomeIcon className="text-greyColor-third" size="xs" icon={isDrop ? faAngleUp : faAngleDown} />
                <Col className={`bg-[#F6F7FA] absolute h-3 w-full left-0 -bottom-3  ${!isDrop && 'hidden'}`}></Col>
            </Flex>
            <Col
                className={`${
                    isDrop ? 'block' : 'hidden'
                } bg-[#F6F7FA] px-6 py-4 rounded-b-lg mt-3 absolute w-full z-10 shadow-[3px_8px_5px_-5px_rgba(0,0,0,0.2)]`}
            >
                <Flex className="flex-wrap w-full gap-x-20 gap-y-6">
                    <TagsCheckbox objQuicks={objQuicks} setObjQuicks={setObjQuicks} />
                    <RegionsCheckbox objQuicks={objQuicks} setObjQuicks={setObjQuicks} />
                    <AreasCheckbox objQuicks={objQuicks} setObjQuicks={setObjQuicks} />
                    <Can permissions={[MyPermissions.TourFitProviderView]}>
                        <ProvidersCheckbox objQuicks={objQuicks} setObjQuicks={setObjQuicks} />
                    </Can>
                </Flex>
                <Col className="text-right">
                    <Button className="text-xs px-4 font-semibold" size="small" onClick={handleResetQuickParams}>
                        {t('Đặt lại')}
                    </Button>
                </Col>
            </Col>
        </Col>
    );
};
