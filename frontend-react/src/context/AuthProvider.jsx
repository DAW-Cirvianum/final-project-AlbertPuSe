import { useState, useEffect } from "react";
import {AuthContext} from "../context/AuthContext";
import { api } from "../api";
import { ROUTES } from "../routes";
import { Navigate } from "react-router-dom";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
            async function fetchUser() {
                const stored = localStorage.getItem("token");
                if (stored){
                    const user= await api.get(ROUTES.ME)
                    setUser(user.data.user)
                }; 
            }
            fetchUser();
        
    }, []);

    const logout = () => {
        /*
        En aquest exemple senzillament esborrem del localStorage
        En un entorn real s'hauria de fer la crida al servidor 
        */
        setUser(null);
        localStorage.removeItem("token");
        <Navigate to={ROUTES.HOME}/>
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
        {children}
        </AuthContext.Provider>
    );
}

