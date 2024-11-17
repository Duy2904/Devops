import { Checkbox, Form } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { Rule } from 'antd/es/form';
import { ReactNode, useCallback, useEffect } from 'react';

import Format from '@utils/format';

import { useGetTransportations } from '../../../../../../hooks/queries/useTransportation';
import { useTransportationStore } from '../../../../../../store/transportationStore';

export interface TransportationCheckboxProps {
    className?: string;
    name?: string[] | string;
    rules?: Rule[];
    required?: boolean;
    label?: ReactNode;
    disable?: boolean;
    size?: SizeType;
    initialValue?: AnyObject;
    mode?: 'multiple' | 'tags';
    // eslint-disable-next-line no-unused-vars
    onChange?: (checkedValue: CheckboxValueType[]) => void;
    inForm?: boolean;
}

export const TransportationCheckbox = (_props: TransportationCheckboxProps) => {
    const {
        transportations,
        selectTransportation,
        actions: { setTrans },
    } = useTransportationStore(state => state);
    const { mutateAsync: getTransportations } = useGetTransportations();

    const fetchTransportations = useCallback(async () => {
        if (transportations.length > 0) {
            return;
        }
        const data = await getTransportations();
        setTrans(Format.formatSortListByOrder(data.data ?? []));
    }, [getTransportations, setTrans, transportations.length]);

    useEffect(() => {
        fetchTransportations();
    }, [fetchTransportations]);

    return _props.inForm ? (
        <Form.Item
            className={_props.className}
            name={_props.name}
            rules={_props.rules}
            required={_props.required}
            label={_props.label}
            initialValue={_props.initialValue}
        >
            <Checkbox.Group
                value={_props.initialValue as []}
                options={selectTransportation}
                disabled={_props.disable}
                onChange={_props.onChange}
            />
        </Form.Item>
    ) : (
        <Checkbox.Group
            className={_props.className}
            value={_props.initialValue as []}
            options={selectTransportation}
            disabled={_props.disable}
            onChange={_props.onChange}
        />
    );
};
