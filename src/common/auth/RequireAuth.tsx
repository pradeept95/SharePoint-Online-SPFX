import * as React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";  
import AppContext from "../config/app-context.config"; 
import { useAuth } from "../hooks";

export const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();  

    const currentContext = AppContext.getInstance(); 
    const user = currentContext.context.pageContext.user

    const waitResolve = !auth; 

    return ( 
        waitResolve ? <div>Loading ..</div> : 
        auth?.roles?.some(role => allowedRoles?.includes(role)) ? <Outlet /> : 
        user ? <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/page-not-found" state={{ from: location }} replace /> // navigate to the login
    );
} 