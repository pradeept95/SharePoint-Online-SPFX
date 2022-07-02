import { PrimaryButton } from '@fluentui/react';
import * as React from 'react'
import { useEffect } from 'react'; 
import { useLoadingService } from '../service/useLoadingService';

export const LoadingExample: React.FunctionComponent<{}> = (props) => { 
    const loader = useLoadingService();
    
    const showLoading = () => { 
        loader.showLoader("I am loading");

        setTimeout(() => {
            loader.showLoader("Hey, did you notice, message just got updated.");
        }, 3000);

        setTimeout(() => {
            loader.hideLoader();
        }, 7000);
    }

    useEffect(() => {
        // showLoading();
    }, [])


    return (
        <>
            <PrimaryButton text="Show Loading Example" onClick={showLoading} />
        </>
    );
}