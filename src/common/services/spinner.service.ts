import { createContext } from "react";
import { string } from "yup";

export const LoadingContext = createContext({
    showLoader : false,
    loadingMessage : '',
    show: (message : string) => { },
    hide: () => {},
});