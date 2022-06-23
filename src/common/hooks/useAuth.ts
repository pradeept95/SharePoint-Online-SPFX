import { useContext } from "react";  
import { AuthContext } from "../auth";

export const useAuth = () => {
    return useContext(AuthContext);
}
 