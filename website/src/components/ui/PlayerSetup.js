import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import { 
    User, 
    Shuffle, 
    Lock, 
    Eye, 
    EyeOff, 
    Shield, 
    Check,
    ChevronLeft,
    ArrowRight,
    Gamepad2,
    Users,
    Key,
    X,
    Plus,
    GamepadIcon
} from "lucide-react";
import Cookies from "js-cookie";

const avatars = [
    "/assets/avatar1.png",
    "/assets/avatar2.png",
    "/assets/avatar3.png",
    "/assets/avatar4.png"
];

export function ModalPlayerSetup({ open, onClose, onComplete, mode, selectedGameId, selectedGame }) {
    const [step, setStep] = useState(1);
    const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
    const [playerName, setPlayerName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({gamePassword: "", playerName: "", team: "", role: ""});
    
    const [roomPassword, setRoomPassword] = useState("");
    const [showRoomPassword, setShowRoomPassword] = useState(false);

    if (!open) return null;

    const handleRandomName = () => {
        const names = ["Shadow", "Viper", "Echo", "Flux", "Neon", "Zero", "Rift"];
        setPlayerName(names[Math.floor(Math.random() * names.length)]);
    };

    const handleNextStep = () => {
        if (step === 1 && roomPassword.length >= (mode === 'create' ? 0 : 4)) {
        setStep(2);
        } else if (step === 2 && playerName.trim().length > 0) {
        setStep(3);
        }
    };

    const handlePrevStep = () => {
        if (step > 1) {
        setStep(step - 1);
        }
    };

    const handleFinish = () => {
        if (onClose) onClose();
        
        if (onComplete) {
        const playerData = {
            avatar: selectedAvatar,
            name: playerName,
            team: selectedTeam,
            role: selectedRole,
            gameId: selectedGameId,
            password: roomPassword,
            mode: mode
        };
        onComplete(playerData);
        }
    };

    const handleClose = () => {
        if (onClose) onClose();
    };

    const isRoomPasswordValid = mode === 'create' 
        ? true 
        : roomPassword.length === 0 || roomPassword.length >= 4;
    const isNameValid = playerName.trim().length > 0;
    const isGamePasswordValid = gamePassword.length === 0 || gamePassword.length >= 4;

    const getProgressWidth = () => {
        switch(step) {
        case 1: return 'w-1/3';
        case 2: return 'w-2/3';
        case 3: return 'w-full';
        default: return 'w-1/3';
        }
    };

    const getStepTitle = () => {
        switch(step) {
        case 1: return mode === 'create' ? "Создание игры" : "Вход в игру";
        case 2: return "Профиль игрока";
        case 3: return "Параметры игры";
        default: return "";
        }
    };

    const getStepIcon = () => {
        switch(step) {
        case 1: return mode === 'create' ? 
            <Plus size={20} strokeWidth={3} /> : 
            <GamepadIcon size={20} strokeWidth={3} />;
        case 2: return <User size={20} strokeWidth={3} />;
        case 3: return <Shield size={20} strokeWidth={3} />;
        default: return <GamepadIcon size={20} />;
        }
    };

    const getIconColor = () => {
        switch(step) {
        case 1: return mode === 'create' ? "bg-indigo-50 text-indigo-600" : "bg-yellow-50 text-amber-600";
        case 2: return "bg-blue-50 text-blue-600";
        case 3: return "bg-green-50 text-green-600";
        default: return "bg-gray-50 text-gray-600";
        }
    };

    useEffect(() => {
        if (open) {
        setStep(1);
        setSelectedAvatar(avatars[0]);
        setPlayerName("");
        setGamePassword("");
        setShowPassword(false);
        setSelectedTeam(null);
        setSelectedRole(mode === 'create' ? 'leader' : 'player');
        setRoomPassword("");
        setShowRoomPassword(false);
        }

        const CreateGame = async () => {
            try {
                const url = `https://se.ifmo.ru/~t129889/sql.php?s=s336584&f=create_game&p=[${token}, ${gameId}, "${formData.gamePassword}"]`;
                const responce = await fetch(url);
                const data = await responce.json();

                const formattedData = data.map(game => ({
                    "game_id": game.game_id,
                    "team_id": game.team_id,
                    "role": game.role
                }));

            } catch (err) {
                console.error("Ошибка создания игры:", err);
            }
        };

        const JoinGame = async () => {

        };
        CreateGame();
        JoinGame();
    }, [open, mode]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-in fade-in duration-200">
        <div className="w-full max-w-[480px] bg-white rounded-3xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-300 relative">
            
            <button
            onClick={handleClose}
            className="absolute top-6 right-8 z-10 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
            aria-label="Закрыть"
            >
            <X size={20} />
            </button>
            <div className="px-8 pt-16 pb-4">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                {getStepTitle()}
                </h1>
                <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
                Шаг {step} из 3
                </span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                className={`h-full bg-indigo-600 rounded-full transition-all duration-500 ease-out ${getProgressWidth()}`}
                />
            </div>
            </div>
            {step === 1 && (
            <div className="px-8 pb-8 animate-in slide-in-from-right-4 fade-in duration-300">
                <div className="mb-8">
                <label htmlFor="roomPassword" className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                    {mode === 'create' 
                    ? 'Пароль комнаты (от 4 символов)' 
                    : 'Пароль для входа'}
                    {mode === 'create' && <span className="text-red-500"> *</span>}
                </label>
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={18} />
                    </div>
                    <input
                    id="roomPassword"
                    type={showRoomPassword ? "text" : "password"}
                    onChange={(e) => setFormData({...formData, gamePassword: e.target.value})}
                    placeholder={mode === 'create' ? "Введите пароль..." : "Введите пароль комнаты..."}
                    className={`w-full pl-11 pr-11 py-3.5 bg-gray-50 border rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${
                        !isRoomPasswordValid && roomPassword.length > 0 ? "border-red-300 focus:border-red-500 focus:ring-red-200" : "border-gray-200 focus:border-indigo-500"
                    }`}
                    />
                    <button
                    type="button"
                    onClick={() => setShowRoomPassword(!showRoomPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 rounded-md transition"
                    >
                    {showRoomPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                {!isRoomPasswordValid && (
                    <p className="text-xs text-red-500 mt-1.5 ml-1">Минимум 4 символа</p>
                )}
                </div>

                <Button
                onClick={handleNextStep}
                disabled={!isRoomPasswordValid}
                className={`w-full py-3 rounded-xl font-bold text-base shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                    isRoomPasswordValid
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-indigo-200" 
                    : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                }`}
                >
                Далее <ArrowRight size={18} />
                </Button>
            </div>
            )}

            {step === 2 && (
            <div className="px-8 pb-8 animate-in slide-in-from-right-4 fade-in duration-300">
                <div className="flex flex-col items-center mb-8">
                <div className="relative group mb-6">
                    <img
                    src={selectedAvatar}
                    alt="Selected"
                    className="w-28 h-28 rounded-full object-cover shadow-lg border-4 border-white ring-2 ring-indigo-100"
                    />
                    <div className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1.5 rounded-full shadow-md border-2 border-white">
                    <User size={14} strokeWidth={3} />
                    </div>
                </div>
                
                <div className="flex gap-3 justify-center">
                    {avatars.map((avatar, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedAvatar(avatar)}
                        className={`relative w-12 h-12 rounded-full overflow-hidden transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                        selectedAvatar === avatar 
                            ? "ring-2 ring-indigo-600 ring-offset-2 scale-110 opacity-100" 
                            : "opacity-60 hover:opacity-100 hover:scale-105"
                        }`}
                    >
                        <img src={avatar} className="w-full h-full object-cover" alt="" />
                        {selectedAvatar === avatar && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <Check size={16} className="text-white" strokeWidth={3} />
                        </div>
                        )}
                    </button>
                    ))}
                </div>
                </div>
                <div className="mb-8">
                <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                    Ваш никнейм <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <input
                    id="nickname"
                    type="text"
                    autoFocus
                    placeholder="Введите имя..."
                    value={playerName}
                    onChange={(e) => setFormData({... formData, playerName: e.target.value})}
                    className="w-full pl-4 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium"
                    />
                    <button
                    onClick={handleRandomName}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    aria-label="Сгенерировать имя"
                    title="Случайное имя"
                    >
                    <Shuffle size={20} />
                    </button>
                </div>
                <p className={`text-xs mt-2 ml-1 transition-colors ${playerName.length === 0 ? 'text-gray-400' : 'text-indigo-600'}`}>
                    {playerName.length === 0 ? "Имя будет отображаться в лобби" : "Отличное имя!"}
                </p>
                </div>
                <div className="flex gap-3">
                <button
                    onClick={handlePrevStep}
                    className="px-5 py-3.5 rounded-xl text-gray-500 font-semibold hover:bg-gray-100 hover:text-gray-700 transition-colors"
                >
                    <ChevronLeft size={24} />
                </button>
                
                <Button
                    onClick={handleNextStep}
                    disabled={!isNameValid}
                    className={`flex-grow py-3.5 rounded-xl font-bold text-base shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                    isNameValid 
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer shadow-indigo-200" 
                        : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                    }`}
                >
                    Далее <ArrowRight size={18} />
                </Button>
                </div>
            </div>
            )}
            {step === 3 && (
            <div className="px-8 pb-8 animate-in slide-in-from-right-4 fade-in duration-300">
                <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3 ml-1">Доступные команды</label>
                <div className="space-y-2">
                    {teams.map((team) => {
                    const isSelected = selectedTeam === team.id;
                    
                    return (
                        <button
                        key={team.id}
                        onClick={() => setSelectedTeam(team.id)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                            isSelected 
                            ? `bg-${team.color}-50 border-${team.color}-500 ring-1 ring-indigo-200 text-${team.color}-700` 
                            : 'bg-white border-gray-100 hover:border-gray-200 text-gray-700'
                        }`}
                        >
                        <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full bg-${team.color}-500`} />
                            <span className="font-bold">
                            {team.label}
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            {isSelected && <Check size={20} className={`text-${team.color}-600`} strokeWidth={3} />}
                            {!isSelected && <Users size={16} className="text-gray-300" />}
                        </div>
                        </button>
                    );
                    })}
                </div>
                </div>
                <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3 ml-1">Роль</label>
                <div className="bg-gray-100 p-1.5 rounded-xl flex gap-1">
                    {roles.map((role) => {
                    const isSelected = selectedRole === role.id;
                    const isHostAvailable = mode === 'create';
                    
                    return (
                        <button
                        key={role.id}
                        onClick={() => {
                            if (role.id === 'host' && !isHostAvailable) return;
                            setSelectedRole(role.id);
                        }}
                        disabled={role.id === 'host' && !isHostAvailable}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                            isSelected
                            ? "bg-white text-indigo-900 shadow-sm"
                            : role.id === 'host' && !isHostAvailable
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                        }`}
                        >
                        {role.icon}
                        <span>{role.label}</span>
                        </button>
                    )
                    })}
                </div>
                {mode !== 'create' && (
                    <p className="text-xs text-gray-400 mt-2 ml-1">Ведущий уже выбран создателем комнаты</p>
                )}
                </div>
                <div className="flex gap-3">
                <button
                    onClick={handlePrevStep}
                    className="px-5 py-3.5 rounded-xl text-gray-500 font-semibold hover:bg-gray-100 hover:text-gray-700 transition-colors"
                >
                    <ChevronLeft size={24} />
                </button>
                
                <Button
                    onClick={handleFinish}
                    disabled={!isGamePasswordValid}
                    className={`flex-grow py-3.5 rounded-xl font-bold text-white shadow-lg transition-all active:scale-[0.98] ${
                    isGamePasswordValid
                        ? "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
                        : "bg-gray-300 shadow-none cursor-not-allowed"
                    }`}
                >
                    {mode === 'create' ? 'Создать игру' : 'Присоединиться'}
                </Button>
                </div>
                
            </div>
            )}
        </div>
        </div>
    );
}

export default ModalPlayerSetup;