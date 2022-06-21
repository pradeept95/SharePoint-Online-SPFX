import * as React from 'react';  
import { createContext, useState } from "react";
import { UserAccess } from './user-access.model';

const AuthContext = createContext<any>({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState();

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;