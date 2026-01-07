import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useFetch from "../services/useFetch";
import { Loader2 } from "lucide-react";

function Protected_Route({ children }) {
    const { data, loading, error } = useFetch("/user/chat");

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-900">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            </div>
        );
    }

    if (error) {
        return <Navigate to="/login" replace />;
    }

    // Only render children if we have data (meaning success)
    if (data) {
        return children;
    }

    return null;
}

export default Protected_Route;
