import React from "react";
import { Navigate } from "react-router-dom";

interface UserData {
    loginStatus: boolean;
    role?: string;
}

interface Props {
    allowedRoles: string[];
    children: React.ReactNode;
}

const RoleBasedRoutes: React.FC<Props> = ({ allowedRoles, children }) => {
    const storedData = localStorage.getItem("userData");
    
    let role = "";
    let loginStatus = false;

    try {
        const parsed: UserData = storedData ? JSON.parse(storedData) : {};
        role = parsed.role || "";
        loginStatus = parsed.loginStatus;
    } catch (e) {
        console.error("Auth Data Corrupt");
    }

    // 1. Check if they have the right Role
    if (loginStatus && allowedRoles.includes(role)) {
        return <>{children}</>;
    } 
    
    // 2. If logged in but wrong role -> Send to Unauthorized Page (or Home)
    if (loginStatus) {
        return <Navigate to="/unauthorized" replace />;
    }

    // 3. Not logged in -> Login
    return <Navigate to="/login" replace />;
};

export default RoleBasedRoutes;