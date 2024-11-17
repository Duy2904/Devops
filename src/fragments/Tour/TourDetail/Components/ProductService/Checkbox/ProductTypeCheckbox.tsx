import { Checkbox, Form } from 'antd';
import { ReactNode, useCallback, useEffect } from 'react';

import { AnyObject } from 'antd/es/_util/type';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Rule } from 'antd/es/form';
import { useGetProductTypes } from '../../../../../../hooks/queries/useProductType';
import { useProductTypesStore } from '../../../../../../store/productTypeStore';
export declare type Mode = 'multiple' | 'tags' | undefined;

export interface ProductTypeCheckboxProps {
    className?: string;
    name?: string;
    rules?: Rule[];
    required?: boolean;
    label?: ReactNode;
    mode?: Mode;
    disable?: boolean;
    initialValue?: AnyObject;
    // eslint-disable-next-line no-unused-vars
    onChange: (checkedValue: CheckboxValueType[]) => void;
    inForm?: boolean;
}

export const ProductTypeCheckbox = (_props: ProductTypeCheckboxProps) => {
    const {
        ProductTypes,
        selectCurrentProductTypes,
        actions: { setProductTypes },
    } = useProductTypesStore(state => state);
    const { mutateAsync: getProductTypes } = useGetProductTypes();

    const fetchProductType = useCallback(async () => {
        if (ProductTypes.length > 0) return;
        const data = await getProductTypes();
        setProductTypes(data.data ?? []);
    }, [getProductTypes, ProductTypes, setProductTypes]);

    useEffect(() => {
        fetchProductType();
    }, [fetchProductType]);

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
                options={selectCurrentProductTypes}
                disabled={_props.disable}
                onChange={_props.onChange}
            />
        </Form.Item>
    ) : (
        <Checkbox.Group
            className={_props.className}
            value={_props.initialValue as []}
            options={selectCurrentProductTypes}
            disabled={_props.disable}
            onChange={_props.onChange}
        />
    );
};
