import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Lock, Eye, EyeOff, ArrowRight, Wifi } from "lucide-react";
import Button from "../components/ui/Button";
import Cookies from "js-cookie";


export function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ login: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);

            const url = `https://se.ifmo.ru/~t129889/sql.php?s=s336584&f=login_user&p=["${formData.login}","${formData.password}"]`;
            const responce = await fetch(url);
            const data = await responce.json();

            if (data.status !== "ok") {
                alert("Неверный логин или пароль");
                return;
            }

            Cookies.set("login", data.login, { expires: 7});
            Cookies.set("token", data.token, { expires: 7});
            
            navigate("/lobby");
        } catch (err) {
            console.error("Ошибка входа:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F3F4F6] flex flex-col justify-center items-center p-4">
            <div className="flex items-center gap-2 mb-8 animate-fadeIn">
                <div className="text-white w-12  shadow-md rounded-xl">
                    <img src="/assets/logo.png"/>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 hover:text-blue-700">Decoder</h1>
            </div>

            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-gray-100 overflow-hidden transition-all">
                <div className="p-8">
                    <div className="mb-8">
                        <h2 className="text-2xl text-center font-extrabold text-gray-900">С возвращением!</h2>
                        <p className="text-gray-500 mt-1 text-center">Войдите в свой аккаунт, чтобы продолжить игру</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Имя пользователя</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-600 transition-colors">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    required
                                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all outline-none"
                                    placeholder="Player_One"
                                    onChange={(e) => setFormData({...formData, login: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-sm font-semibold text-gray-700">Пароль</label>
                                <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-700">Забыли?</a>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="block w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white transition-all outline-none"
                                    placeholder="••••••••"
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl shadow-blue-200 transition-all active:scale-95 disabled:opacity-70"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Войти в систему</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </Button>
                    </form>
                </div>

                <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
                    <p className="text-sm text-gray-600">
                        Нет аккаунта?{" "}
                        <Link to="/register" className="font-bold text-blue-600 hover:underline transition-all">
                            Создать профиль
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}