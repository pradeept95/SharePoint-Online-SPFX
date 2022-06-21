import { useContext } from "react"; 
import AuthContext from "./auth-provider.context";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;