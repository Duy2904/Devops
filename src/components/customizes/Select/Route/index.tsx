import { Dispatch, FocusEventHandler, ReactNode, SetStateAction, useEffect } from 'react';

import { BaseSelect } from '../BaseSelect';
import { Rule } from 'antd/es/form';
import { Select } from 'antd';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { useGetRouteByDestinationLocationId } from './useRoute';

interface RouteSelectProps {
    className?: string;
    name?: string[] | string;
    rules?: Rule[];
    required?: boolean;
    label?: ReactNode;
    disable?: boolean;
    size?: SizeType;
    onBlur?: FocusEventHandler<HTMLElement>;
    initialValue?: string | null;
    destinationId?: string;
    isForm?: boolean;
    isChangeDestination?: boolean;
    setIsChangeDestination: Dispatch<SetStateAction<boolean>>;
}

export const RouteSelect: React.FC<RouteSelectProps> = props => {
    const { data, isLoading, refetch } = useGetRouteByDestinationLocationId(props.destinationId!);
    const mappingData: Array<{ value: string; label: string }> =
        data?.data?.map(item => ({
            value: item.id ?? '',
            label: `${item?.code} - ${item?.name ?? item?.code}`,
        })) ?? [];

    useEffect(() => {
        if (props.isChangeDestination) {
            refetch();
            props.setIsChangeDestination(false);
        }
    }, [props, refetch]);

    const select = () => {
        return (
            <Select
                virtual={false}
                disabled={props.disable}
                showSearch
                className="w-full"
                placeholder="--Chọn Hành trình--"
                options={mappingData}
                size={props.size}
                onBlur={props.onBlur}
                value={!props.isForm ? props.initialValue : undefined}
                loading={isLoading}
            />
        );
    };

    return (
        <BaseSelect
            isForm={props.isForm}
            className={props.className}
            name={props.name}
            rules={props.rules}
            required={props.required}
            label={props.label}
            items={select()}
            initialValue={props.initialValue}
        />
    );
};
