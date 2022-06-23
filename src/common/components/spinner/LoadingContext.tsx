import * as React from 'react'
import { createContext, useState } from "react"; 
import { LoadingSpinner } from './LoadingSpinner';

const LoadingContext = createContext<any>({});

export const LoadingProvider = ({ children }) => {
    const [loadingState, setLoadingState] = useState({
        loading : false,
        loadingText : "Please Wait" 
    } as LoadingPros);

    return (
        <LoadingContext.Provider value={{ loadingState, setLoadingState }}>
             <LoadingSpinner />
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingContext;

export interface LoadingPros {
    loading : boolean,
    loadingText : string
}