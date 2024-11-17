import 'react-toastify/dist/ReactToastify.css';

/* eslint-disable react-refresh/only-export-components */
import { ToastContainer, ToastOptions, toast as toastCmd } from 'react-toastify';

import { ReactNode } from 'react';
import ToastUI from './ToastUI';

const toastOptions: ToastOptions = {
    position: 'bottom-right',
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    rtl: false,
    closeButton: true,
};

export const toastErr = (title: string, content: ReactNode, otps = { type: 'error' }) => {
    toast(title, content, otps);
};
export const toastWarning = (title: string, content: ReactNode, otps = { type: 'warning' }) => {
    toast(title, content, otps);
};
export const toastBasic = (title: string, content: ReactNode, otps = { type: 'default' }) => {
    toast(title, content, otps);
};
export const toastSuccess = (title: string, content: ReactNode, otps = { type: 'success' }) => {
    toast(title, content, otps);
};

export const dismissAll = () => toastCmd.dismiss();

export const toast = (title: string, content: ReactNode, otps = { type: 'info' }) => {
    if (otps.type === 'success' || otps.type === 'error' || otps.type === 'warning')
        toastCmd(<ToastUI title={title} message={content} type={otps.type} />, toastOptions);
    else toastCmd(<ToastUI title={title} message={content} type={'info'} />, toastOptions);
};

export default function Toast(): JSX.Element {
    return <ToastContainer className="z-[9999]" limit={3} />;
}
