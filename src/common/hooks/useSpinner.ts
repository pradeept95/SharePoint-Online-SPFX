import { useContext } from "react";  
import LoadingContext from "../components/spinner/LoadingContext";

export const usePageSpinner = () => {
    return useContext(LoadingContext);
} 