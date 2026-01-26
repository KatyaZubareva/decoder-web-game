import Cookies from "js-cookie";

export const useAuth = () => {
    const login = Cookies.get("login");
    const token = Cookies.get("token");

    const isAuth = Boolean(login && token);

    const logout = () => {
        Cookies.remove("login");
        Cookies.remove("token");
    };

    return [
        isAuth,
        login,
        token,
        logout
    ];
};