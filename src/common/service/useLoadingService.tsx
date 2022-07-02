import { LoadingPros } from "../components/spinner/LoadingContext";
import { useLoading } from "../hooks";

export const useLoadingService = () => {
    (async () => { })();

    const { setLoadingState } = useLoading();

    const showLoader =  (loadingText?: string) => {
        try { 
            setLoadingState({
                loading: true,
                loadingText: loadingText
            } as LoadingPros);
        } catch (error) {
            console.log("showLoader -> error", error);
            throw error;
        }
    };

    const hideLoader = () => {
        try { 
            setLoadingState({
                loading: false
            } as LoadingPros);
        } catch (error) {
            console.log("showLoader -> error", error);
            throw error;
        }
    };

    return {
        showLoader,
        hideLoader
    };
}