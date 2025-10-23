import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";

export function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex font-montserrat">
            <div className="flex-1 flex justify-center items-center p-10">
                <div className="w-full max-w-md">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Вход</h1>
                    
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Логин</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Введите ваш логин"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Пароль</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Введите пароль"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold rounded-lg py-2 shadow-lg"
                        >
                            Войти
                        </Button>
                    </form>

                    <p className="text-sm text-gray-600 mt-4 text-center">
                        Войдите если у вас уже есть аккаунт или{" "}
                        <span
                            className="text-blue-600 hover:underline cursor-pointer"
                            onClick={() => navigate("/register")}
                        >
                            зарегестриуйтесь.
                        </span>
                    </p>
                </div>
            </div>

            <div className="flex-1 relative hidden md:flex justify-center items-center p-6">
                <img
                    src="/assets/login_screen_background.png"
                    alt="Вход фон"
                    className="h-screen w-auto object-cover rounded-lg"
                    style={{ padding: "24px" }}
                />
            </div>
        </div>
    );
}

export default Login;
