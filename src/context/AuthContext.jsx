import { createContext, useContext, useState } from "react";
import { AuthService } from "../services/authService.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token"));

    const login = async (username, password) => {
        const result = await AuthService.login(username, password);
        localStorage.setItem("token", result.token);
        setToken(result.token);
        return result;
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
