import { getTheme } from '@fluentui/react';
import { toast, ToastContent, ToastOptions } from 'react-toastify';

const DEFAULT_POSITION  = toast.POSITION.TOP_CENTER;

export const useAlertService = () => {
    (async () => { })();

    const success = (content: ToastContent, options?: ToastOptions | undefined) => {
        try { 
            toast.success(content, {
                ...options,
                position: options?.position ?? DEFAULT_POSITION,
                
            })

        } catch (error) {
            console.log("showLoader -> error", error);
            throw error;
        }
    };

    const error = (content: ToastContent, options?: ToastOptions | undefined) => {
        try {
            toast.error(content, {
                ...options,
                position: options?.position ?? DEFAULT_POSITION,
            })
        } catch (error) {
            console.log("showLoader -> error", error);
            throw error;
        }
    };

    const info = (content: ToastContent, options?: ToastOptions | undefined) => {
        try {
            toast.info(content, {
                ...options,
                position: options?.position ?? DEFAULT_POSITION,
            })

        } catch (error) {
            console.log("showLoader -> error", error);
            throw error;
        }
    };

    const warning = (content: ToastContent, options?: ToastOptions | undefined) => {
        try {
            toast.warning(content, {
                ...options,
                position: options?.position ?? DEFAULT_POSITION,
            })

        } catch (error) {
            console.log("showLoader -> error", error);
            throw error;
        }
    };

    const dark = (content: ToastContent, options?: ToastOptions | undefined) => {
        try {
            toast.dark(content, {
                ...options,
                position: options?.position ?? DEFAULT_POSITION,
            })
        } catch (error) {
            console.log("showLoader -> error", error);
            throw error;
        }
    };

    return {
        success,
        error,
        info,
        warning,
        dark
    };
}