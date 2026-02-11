import React, { useState } from "react";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { useNavigate } from "react-router-dom";
import { 
    User, 
    Settings, 
    LogOut, 
    Lock, 
    Key, 
    X,
    ShieldCheck,
    Zap,
    Delete,
    ArrowRight
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export function ProfilePage() {
    const navigate = useNavigate();

    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [isAuth, login, token, logout] = useAuth();

    const handleLogout = () => {
        logout();
        window.location.href = "/lobby";
    };

    const handlePasswordChange = () => {
        if (newPassword.length < 6) {
            setPasswordError("Новый пароль должен быть не менее 6 символов.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setPasswordError("Пароли не совпадают.");
            return;
        }
        console.log("Пароль успешно изменен");
        setIsSettingsModalOpen(false);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordError('');
    };

    const isPasswordFormValid = 
        oldPassword.length > 0 && 
        newPassword.length >= 6 && 
        newPassword === confirmPassword;

    return (
        <div className="min-h-screen bg-[#F3F4F6] font-sans text-slate-800 p-4 sm:p-6">
            <div className="max-w-xl mx-auto flex flex-col gap-8 pt-4">
                <header className="p-8 text-center">
                    
                    <div className="w-32 h-32 bg-indigo-50 border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 shadow-inner">
                        <User size={30} strokeWidth={2.5} />
                    </div>
                    
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 hover:text-blue-600 cursor-pointer">
                        {login}
                    </h1>
                </header>
                <div className="flex flex-col gap-4">
                    <h2 className="text-lg font-extrabold text-gray-900 tracking-tight px-1">
                        Управление аккаунтом
                    </h2>
                    <div 
                        onClick={() => setIsSettingsModalOpen(true)}
                        className="group bg-white p-4 rounded-2xl border border-gray-100 hover:border-blue-400 transition-all cursor-pointer flex justify-between items-center transform hover:scale-[1.005]"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-indigo-50 text-blue-600 border border-indigo-100 group-hover:bg-blue-100 transition-colors">
                                <Key size={20} />
                            </div>
                            <div>
                                <h5 className="font-bold text-lg text-gray-900 group-hover:text-blue-700 transition-colors">
                                    Сменить пароль
                                </h5>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    Для безопасности вашего аккаунта
                                </p>
                            </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                            <ArrowRight size={18} />
                        </div>
                    </div>
                    <div 
                        onClick={handleLogout}
                        className="group bg-white p-4 rounded-2xl border border-gray-100 hover:border-red-400 transition-all cursor-pointer flex justify-between items-center transform hover:scale-[1.005]"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-red-50 text-red-600 border border-red-100 group-hover:bg-red-100 transition-colors">
                                <LogOut size={20} />
                            </div>
                            <div>
                                <h5 className="font-bold text-lg text-gray-900 group-hover:text-red-700 transition-colors">
                                    Выйти
                                </h5>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    Завершить текущую сессию
                                </p>
                            </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-red-600 group-hover:text-white transition-all shadow-inner">
                            <ArrowRight size={18} />
                        </div>
                    </div>
                    <div 
                        onClick={handleLogout}
                        className="group bg-white p-4 rounded-2xl border border-gray-100 hover:border-red-400 transition-all cursor-pointer flex justify-between items-center transform hover:scale-[1.005]"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-red-50 text-red-600 border border-red-100 group-hover:bg-red-100 transition-colors">
                                <Delete size={20} />
                            </div>
                            <div>
                                <h5 className="font-bold text-lg text-gray-900 group-hover:text-red-700 transition-colors">
                                    Удалить аккаунт
                                </h5>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    Завершить текущую сессию
                                </p>
                            </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-red-600 group-hover:text-white transition-all shadow-inner">
                            <ArrowRight size={18} />
                        </div>
                    </div>

                </div>

            </div>
            <Modal open={isSettingsModalOpen} onClose={() => { setIsSettingsModalOpen(false); setPasswordError(''); }}>
                <div className="p-2">
                    <div className="text-center mb-6">
                        <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-600 shadow-inner">
                            <Key size={24} strokeWidth={3} />
                        </div>
                        <h4 className="text-2xl font-bold text-gray-900">Смена пароля</h4>
                        <p className="text-gray-500 text-sm">Обновите учетные данные для {login}</p>
                    </div>

                    <div className="space-y-4">
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Старый пароль</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={oldPassword}
                                onChange={(e) => { setOldPassword(e.target.value); setPasswordError(''); }}
                                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-lg font-mono"
                            />
                            <Lock size={18} className="absolute left-4 top-[42px] -translate-y-1/2 text-gray-400" />
                        </div>
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Новый пароль</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={newPassword}
                                onChange={(e) => { setNewPassword(e.target.value); setPasswordError(''); }}
                                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-lg font-mono"
                            />
                            <ShieldCheck size={18} className="absolute left-4 top-[42px] -translate-y-1/2 text-gray-400" />
                        </div>
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">Подтвердите пароль</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => { setConfirmPassword(e.target.value); setPasswordError(''); }}
                                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-lg font-mono"
                            />
                            <ShieldCheck size={18} className="absolute left-4 top-[42px] -translate-y-1/2 text-gray-400" />
                        </div>

                        {passwordError && (
                            <p className="text-xs text-red-500 mt-2 ml-1 flex items-center gap-1 font-medium">
                                <X size={14} /> {passwordError}
                            </p>
                        )}
                    </div>
                    
                    <Button
                        disabled={!isPasswordFormValid}
                        onClick={handlePasswordChange}
                        className={`w-full py-3.5 font-bold rounded-xl shadow-lg mt-6 transition-all active:scale-95 ${
                            isPasswordFormValid
                                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-300"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                        }`}
                    >
                        Сменить пароль
                    </Button>
                </div>
            </Modal>
        </div>
    );
}

export default ProfilePage;