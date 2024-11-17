import { Select } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { Rule } from 'antd/es/form';
import { ReactNode, useEffect, useState } from 'react';

import { PassengerTypeDto } from '@sdk/tour-operations';

import { usePassengerTypeStore } from '../../../../store/passengerTypeStore';
import FilterSearch from '../../../../utils/filterSearch';
import { BaseSelect } from '../BaseSelect';
import { useFetchPassengerTypeDefaultFIT } from './usePassenger';

interface OptionType {
    value: string;
    label: string;
}

interface PassengerTypeSelectProps {
    className?: string;
    name?: string[] | string;
    rules?: Rule[];
    required?: boolean;
    label?: ReactNode;
    // eslint-disable-next-line no-unused-vars
    onChange?: (value: string) => void;
    initialValue?: string;
    size?: SizeType;
    dataSelected?: AnyObject;
    isDisableOption?: boolean;
    dataSelect?: OptionType[];
    placeholder?: string;
    allowClear?: boolean;
    disabled?: boolean;
    isForm?: boolean;
    isFit?: boolean;
    isGit?: boolean;
}

export const PassengerTypeSelect: React.FC<PassengerTypeSelectProps> = props => {
    const [listDisable, setListDisable] = useState<(string | undefined)[]>([]);
    const {
        passengersType,
        selectPassengerType,
        actions: { setPassengersType },
    } = usePassengerTypeStore(state => state);
    const condition = {
        ...(props.isFit ? { isFit: true } : {}),
        ...(props.isGit ? { isGit: true } : {}),
    };

    const { data, isLoading } = useFetchPassengerTypeDefaultFIT(condition);

    useEffect(() => {
        if (data) {
            setPassengersType(data?.data as PassengerTypeDto[]);
        }
    }, [data, setPassengersType]);

    useEffect(() => {
        if (props.dataSelected) {
            const listCode = passengersType
                .filter(item => props.dataSelected?.includes(item.id))
                .map(item => item.childCode);
            const listIdSelected = passengersType
                .filter(item => listCode.includes(item.childCode))
                .map(item => item.id);
            setListDisable(listIdSelected);
        }
    }, [passengersType, props.dataSelected]);

    const options: OptionType[] = props.isDisableOption
        ? selectPassengerType.map(option => ({
              ...option,
              disabled: listDisable?.includes(option.value),
          }))
        : selectPassengerType;

    const select = () => {
        return (
            <Select
                virtual={false}
                onChange={props.onChange}
                showSearch
                className="w-full"
                placeholder={props.placeholder ? props.placeholder : 'Đại lý'}
                options={props.dataSelect ? props.dataSelect : options}
                filterOption={FilterSearch.filterOption}
                size={props.size}
                allowClear={props.allowClear ?? true}
                disabled={props.disabled}
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
            initialValue={props.initialValue}
            items={select()}
        />
    );
};
