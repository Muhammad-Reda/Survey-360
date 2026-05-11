import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import apiClient from "../services/Api";

export default function PrivateRoute() {
    const [authStatus, setAuthStatus] = useState("loading");

    useEffect(() => {
        const token = localStorage.getItem("AuthToken");
        
        if (!token) {
            setAuthStatus("unauthenticated");
            return;
        }

        // Validasi token dengan backend
        apiClient.get("/user/current", {
            headers: { 
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })
        .then(() => setAuthStatus('authenticated'))
        .catch((error) => {
            console.error("Token validation failed:", error);
            localStorage.removeItem('AuthToken');
            localStorage.removeItem('DataUser');
            localStorage.removeItem('IdUser');
            setAuthStatus('unauthenticated');
        });
    }, []);

    if (authStatus === 'loading') return <div className="text-center p-10">Loading...</div>;
    if (authStatus === 'unauthenticated') return <Navigate to='/' replace />;

    return <Outlet />;
}