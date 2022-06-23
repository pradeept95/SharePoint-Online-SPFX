import { PrimaryButton } from '@fluentui/react';
import * as React from 'react'
import { useEffect } from 'react'; 
import { LoadingPros } from '../components/spinner/LoadingContext';
import { useLoading } from '../hooks';

export const LoadingExample: React.FunctionComponent<{}> = (props) => {

    const { setLoadingState } = useLoading();

    const showLoading = () => {
        setLoadingState({
            loading: true,
            loadingText: "Hello Loading, Trigger from Admin "
        } as LoadingPros);

        setTimeout(() => {
            setLoadingState({
                loading: true,
                loadingText: "Hello Loading, Trigger from Admin after some time "
            } as LoadingPros);
        }, 3000);

        setTimeout(() => {
            setLoadingState({
                loading: false
            } as LoadingPros);
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