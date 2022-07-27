import { getTheme } from '@fluentui/react';
import { toast, ToastContent, ToastOptions } from 'react-toastify';
import Swal, { SweetAlertResult } from 'sweetalert2'; 

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

    const confirmDelete = (message : string) : Promise<SweetAlertResult> => {
        try { 
            return Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
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
        dark,

        confirmDelete
    };
}