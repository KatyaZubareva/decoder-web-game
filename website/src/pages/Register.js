import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Lock, ShieldCheck, ArrowRight, Wifi } from "lucide-react";
import Button from "../components/ui/Button";
import Cookies from "js-cookie";

export function Register() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ login: "", password: "" });

    const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                setIsLoading(true);
    
                const url = `https://se.ifmo.ru/~t129889/sql.php?s=s336584&f=register_user&p=["${formData.login}","${formData.password}"]`;
                const responce = await fetch(url);
                const data = await responce.json();
    
                if (data.status !== "ok") {
                    alert("Ошибка регистрации, поыторите попытку позже!");
                    return;
                }
    
                Cookies.set("login", data.login, { expires: 7});
                Cookies.set("token", data.token, { expires: 7});
                
                navigate("/lobby");
            } catch (err) {
                console.error("Ошибка регистрации:", err);
            } finally {
                setIsLoading(false);
            }
        };
    return (
        <div className="min-h-screen bg-[#F3F4F6] flex flex-col justify-center items-center p-4">
            <div className="flex items-center gap-2 mb-8">
                <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-lg">
                    <Wifi size={24} />
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">GameLobby</h1>
            </div>

            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-gray-100 overflow-hidden">
                <div className="p-8">
                    <div className="mb-8">
                        <h2 className="text-2xl font-extrabold text-gray-900">Регистрация</h2>
                        <p className="text-gray-500 mt-1">Присоединяйтесь к сообществу игроков</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 ml-1">Имя пользователя</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    required
                                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                                    placeholder="Player_One"
                                    onChange={(e) => setFormData({...formData, login: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Пароль</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600">
                                        <Lock size={17} />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                                        placeholder="••••••"
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Повтор</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600">
                                        <ShieldCheck size={17} />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        className="block w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                                        placeholder="••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 py-2">
                            <input type="checkbox" required className="mt-1 rounded text-indigo-600 focus:ring-indigo-500" />
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Я принимаю условия <a href="#" className="text-indigo-600 hover:underline">Пользовательского соглашения</a> и политики конфиденциальности.
                            </p>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-95 disabled:opacity-70"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Создать аккаунт</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </Button>
                    </form>
                </div>

                <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
                    <p className="text-sm text-gray-600">
                        Уже есть аккаунт?{" "}
                        <Link to="/login" className="font-bold text-indigo-600 hover:underline transition-all">
                            Войти
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}