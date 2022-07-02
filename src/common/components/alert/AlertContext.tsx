import * as React from 'react' 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AlertProvider = ({ children }) => {
    return (
        <>
            <ToastContainer />
            {children}
        </>
    )
} 
