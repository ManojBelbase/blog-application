import { useAuthStore } from "../store/authStore";
import api from "../axios/axiosInstance";

export const useAuth = () => {
    const { user, login: setLogin, logout: setLogout, isAuthenticated } = useAuthStore();

    const login = async (username: string, password: string) => {
        const res = await api.post('/auth/login', { username, password });
        const { user, token } = res.data.data;
        setLogin(user, token);
    };

    const register = async (username: string, password: string) => {
        await api.post('/auth/register', { username, password });
    };

    const logout = () => {
        setLogout();
    };

    return {
        user,
        login,
        register,
        logout,
        isAuthenticated
    };
};
