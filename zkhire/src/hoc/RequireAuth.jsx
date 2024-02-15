import React from "react";
import { useLocation, Navigate } from "react-router";
import { useAccount } from "wagmi";

const RequireAuth = ({children, authLink}) => {
    const account = useAccount();
    const location = useLocation();
    if (account.address === undefined || account.address === "") {
        return <Navigate to={"/auth"} state={{from: location.pathname}} />
    }
    return children;
}

export default RequireAuth;