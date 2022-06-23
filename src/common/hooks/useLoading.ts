import { useContext } from "react";  
import LoadingContext from "../components/spinner/LoadingContext";

export const useLoading = () => {
    return useContext(LoadingContext);
} 