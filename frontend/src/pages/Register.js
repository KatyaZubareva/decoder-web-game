import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

export function Register() {
    const navigate = useNavigate();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); setSuccess("");

        if (!login || !password || !confirmPassword) {
            setError("Пожалуйста, заполните все поля.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Пароли не совпадают");
            return;
        }

        if (password.length < 6) {
            setError("Пароль должен быть не менее 6 символов");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ login, password }),
            });

            const data = await response.json();

            if (data.error) throw new Error(data.error);

            setSuccess("Аккаунт успешно создан!");
            setTimeout(() => navigate("/login"), 1000);

        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="h-screen w-screen overflow-hidden bg-gray-100 flex font-montserrat">
            <div className="flex-1 flex justify-center items-center p-10 overflow-hidden">
                <div className="w-full max-w-md p-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        Создайте аккаунт
                    </h1>

                    {error && <p className="text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded-lg text-center mb-4">{error}</p>}
                    {success && <p className="text-green-600 bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-center mb-4">{success}</p>}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Логин</label>
                            <input
                                type="text"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                placeholder="Введите ваш логин"
                                className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-800"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Пароль</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Введите пароль"
                                className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-800"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Подтверждение пароля</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Повторите пароль"
                                className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-800"
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full bg-gray-600 hover:bg-gray-700 active:bg-gray-800 text-white font-semibold rounded-lg transition-all">
                            Зарегистрироваться
                        </Button>
                    </form>

                    <p className="text-base text-gray-600 mt-6 text-center">
                        Уже есть аккаунт?{" "}
                        <span className="text-blue-600 hover:underline cursor-pointer" onClick={() => navigate("/login")}>
                            Войти
                        </span>
                    </p>
                </div>
            </div>

            <div className="flex-1 relative hidden md:flex justify-center items-center">
                <img
                    src={process.env.PUBLIC_URL + "/assets/register_screen_background.png"}
                    alt="Регистрация фон"
                    className="h-full w-full object-cover"
                />
            </div>
        </div>
    );
}

export default Register;
