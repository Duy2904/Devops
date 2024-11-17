import { Col, Form, FormInstance } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { RouteCloneQuoteState, shouldDisableAllForm } from '@fragments/Quote/features';
import { QuoteDetailDto, QuoteType } from '@sdk/tour-operations';
import { convertValues, removeID } from '@utils/formHelper';

import { CollapseDetail } from '../CollapseDetail';
import { CollapseInfo } from '../CollapseInfo';
import { CollapseTotalAmount } from '../CollapseTotalAmount';

interface QuoteFormCommonProps {
    form: FormInstance;
    dataQuote: QuoteDetailDto;
    isEnableEdit: boolean;
    isDirty: boolean;
    orderNo: string | undefined;
    isSubmitting: boolean;
    setIsSubmitting: Dispatch<SetStateAction<boolean>>;
    setIsEnableEdit: Dispatch<SetStateAction<boolean>>;
    setIsDirty: Dispatch<SetStateAction<boolean>>;
    // eslint-disable-next-line no-unused-vars
    handleCreateQuote: (values: AnyObject) => Promise<void>;
    // eslint-disable-next-line no-unused-vars
    handleUpdateQuote: (values: AnyObject) => Promise<void>;
}

export const QuoteFormCommon: React.FC<QuoteFormCommonProps> = props => {
    const {
        form,
        dataQuote,
        isEnableEdit,
        isDirty,
        orderNo,
        isSubmitting,
        setIsDirty,
        setIsSubmitting,
        setIsEnableEdit,
        handleCreateQuote,
        handleUpdateQuote,
    } = props;
    const { clonedId } = (useLocation().state ?? { cloneId: false }) as RouteCloneQuoteState;
    const { quoteId } = useParams<string>();

    // set orderNo to form value
    useEffect(() => {
        if (!form.getFieldValue('orderNo') && orderNo) {
            form.setFieldValue('orderNo', orderNo);
        }
    }, [form, orderNo]);

    const onFinish = (values: AnyObject) => {
        // convert data revenue and cost from form data
        const dataForm = form.getFieldsValue();
        const revenueDataForm = dataForm[QuoteType.Revenue] ?? [];
        const costDataForm = dataForm[QuoteType.Cost] ?? [];
        const revenueData = removeID(convertValues(revenueDataForm), QuoteType.Revenue);
        const costData = removeID(convertValues(costDataForm), QuoteType.Cost);
        delete values[QuoteType.Revenue];
        delete values[QuoteType.Cost];
        values.quoteLines = [...revenueData, ...costData];

        if (clonedId) {
            delete values.id;
        }

        if (quoteId) {
            // update Quote
            handleUpdateQuote(values);
        } else {
            // create new Quote
            handleCreateQuote(values);
        }

        setIsSubmitting(false);
        setIsEnableEdit(false);
    };

    const handleOnValuesChange = () => {
        if (!isEnableEdit) {
            setIsEnableEdit(true);
        }
        if (!isDirty) {
            setIsDirty(true);
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onValuesChange={handleOnValuesChange}
            disabled={shouldDisableAllForm(dataQuote.status) && !clonedId}
        >
            <Col className="grid grid-cols-12 gap-4">
                <Col className="col-span-8">
                    <CollapseInfo form={form} orderNo={orderNo!} dataQuote={dataQuote} />
                </Col>
                <Col className="col-span-4">
                    <CollapseTotalAmount form={form} />
                </Col>
            </Col>
            <div className="mt-4">
                <CollapseDetail
                    form={form}
                    dataQuoteLines={dataQuote?.quoteLines}
                    quoteStatus={dataQuote.status!}
                    isSubmitting={isSubmitting}
                    handleOnValuesChange={handleOnValuesChange}
                />
            </div>
        </Form>
    );
};
