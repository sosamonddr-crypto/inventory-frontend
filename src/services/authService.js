import { api } from "./api.js";

export const AuthService = {
    login: (username, password) => api.post("/auth/login", { username, password }),
    logout: () => api.post("/auth/logout", {}),
};
