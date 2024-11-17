import { Alert, Col } from 'antd';
import { ReactNode, useEffect } from 'react';

import { ThrowErrorAPI } from '@src/types/TypeEnum';
import i18n from '../../../i18n';
import { rootPaths } from '@src/routers/route';
import { useNavigate } from 'react-router-dom';

export declare type ToastType = 'info' | 'success' | 'error' | 'warning';

interface ToastProps {
    message: ReactNode;
    title?: string;
    type: ToastType;
}

const Toast = (props: ToastProps) => {
    const navigate = useNavigate();
    const excludeErrToast = [ThrowErrorAPI.UnAuthorized, ThrowErrorAPI.PageNotFound];

    useEffect(() => {
        if (props.message) {
            if (props.message == ThrowErrorAPI.UnAuthorized) {
                navigate(rootPaths.privateUnauthorized);
            }
            if (props.message == ThrowErrorAPI.PageNotFound) {
                navigate(rootPaths.privatePageNotFound);
            }
        }
    }, [navigate, props]);

    return props.message && !excludeErrToast.includes(props.message as ThrowErrorAPI) ? (
        <Alert
            className="border-none max-w-xs"
            message={
                props?.title ? (
                    <p className="text-sm font-bold">
                        {props?.title !== '' ? props?.title : i18n.t(`message.default.${props.type}`)}
                    </p>
                ) : (
                    <Col className="py-4 w-[320px] text-sm font-bold">{props.message}</Col>
                )
            }
            description={props?.title && props.message}
            type={props.type}
            showIcon
        />
    ) : (
        <></>
    );
};

export default Toast;
