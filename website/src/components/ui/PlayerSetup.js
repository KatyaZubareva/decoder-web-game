import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import { 
    User, 
    Shuffle, 
    Lock, 
    Eye, 
    EyeOff, 
    Check,
    ChevronLeft,
    ArrowRight,
    Users,
    X,
    Crown
} from "lucide-react";
import Cookies from "js-cookie";
import { usePlayerSession } from "../../hooks/usePlayerSession";

const avatars = [
    "/assets/avatar1.png",
    "/assets/avatar2.png",
    "/assets/avatar3.png",
    "/assets/avatar4.png"
];

const teams = [
    { id: 'red', label: 'Красные', color: 'red' },
    { id: 'blue', label: 'Синие', color: 'blue' }
];

const roles = [
    { id: 'leader', label: 'Ведущий', icon: <Crown size={16} /> },
    { id: 'player', label: 'Игрок', icon: <User size={16} /> }
];

export function ModalPlayerSetup({ open, onClose, onComplete, mode, selectedGameId, selectedGame }) {
    const [step, setStep] = useState(1);
    const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
    const [playerName, setPlayerName] = useState("");
    const [roomPassword, setRoomPassword] = useState("");
    const [showRoomPassword, setShowRoomPassword] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [selectedRole, setSelectedRole] = useState(mode === 'create' ? 'leader' : 'player');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (open) {
            setStep(1);
            setSelectedAvatar(avatars[0]);
            setPlayerName("");
            setRoomPassword("");
            setShowRoomPassword(false);
            setSelectedTeam(null);
            setSelectedRole(mode === 'create' ? 'leader' : 'player');
            setError("");
            
            if (mode === 'join' && selectedGame) {
                if (selectedGame.teams && selectedGame.teams.length > 0) {
                    const firstTeam = selectedGame.teams[0];
                    setSelectedTeam(firstTeam.team_color);
                    if (firstTeam.free_roles && firstTeam.free_roles.length > 0) {
                        setSelectedRole(firstTeam.free_roles[0]);
                    }
                } else {
                    setSelectedTeam('red');
                }
            }
        }
    }, [open, mode, selectedGame]);

    if (!open) return null;

    const handleRandomName = () => {
    const prefixes = ["Neo", "Dark", "Cyber", "Void", "Hyper", "Shadow", "Alpha", "Omega", "Night", "Red"];
    const cores = ["Blade", "Echo", "Flux", "Ghost", "Pulse", "Rift", "Nova", "Viper", "Phantom", "Zero"];
    const suffixes = ["X", "Prime", "404", "Omega", "NX", "One", "Zero", "Prime", "Q", "Z"];

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const core = cores[Math.floor(Math.random() * cores.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    
    const number = Math.floor(Math.random() * 1000);

    const randomName = `${prefix}${core}${suffix}${number}`;
    setPlayerName(randomName);
};


    const handleNextStep = () => {
        if (step === 1) {
            if (mode === 'create') {
                if (roomPassword.length > 0 && roomPassword.length < 4) {
                    setError("Пароль должен быть не менее 4 символов");
                    return;
                }
            } else {
                if (!roomPassword) {
                    setError("Введите пароль комнаты");
                    return;
                }
            }
            setError("");
            setStep(2);
        } else if (step === 2) {
            if (!playerName.trim()) {
                setError("Введите имя игрока");
                return;
            }
            setError("");
            setStep(3);
        }
    };

    const handlePrevStep = () => {
        setError("");
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const createGame = async () => {
        const token = Cookies.get("token");
        if (!token) {
            setError("Токен не найден. Авторизуйтесь заново.");
            return null;
        }

        try {
            const url = `https://se.ifmo.ru/~t129889/sql.php?s=s336584&f=create_game&p=[${token}, "${roomPassword}", "${selectedTeam}", "${selectedRole}", "${playerName}"]`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.error) {
                setError(data.error);
                return null;
            }

            Cookies.set("game_id", data.game_id, { expires: 7 });
            Cookies.set("team_id", data.team_id, { expires: 7 });
            Cookies.set("role", data.role, { expires: 7 });
            Cookies.set("playerName", playerName, { expires: 7 });
            if (roomPassword) {
                Cookies.set("game_password", roomPassword, { expires: 7 });
            }

            return data;
        } catch (err) {
            console.error("Ошибка создания игры:", err);
            setError("Ошибка сети или сервера");
            return null;
        }
    };

    const joinGame = async () => {
        const token = Cookies.get("token");
        if (!token) {
            setError("Токен не найден. Авторизуйтесь заново.");
            return null;
        }

        if (!selectedGameId) {
            setError("ID игры не указан");
            return null;
        }

        try {
            const url = `https://se.ifmo.ru/~t129889/sql.php?s=s336584&f=join_game&p=[${token}, ${selectedGameId}, "${roomPassword}", "${selectedTeam}", "${selectedRole}", "${playerName}"]`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.error) {
                setError(data.error);
                return null;
            }

            // Сохраняем только базовые данные, остальное получим через get_game_state
            Cookies.set("game_id", data.game_id, { expires: 7 });
            Cookies.set("team_id", data.team_id, { expires: 7 });
            Cookies.set("role", data.role, { expires: 7 });
            Cookies.set("playerName", playerName, { expires: 7 });
            
            // Не сохраняем words и code в куки, получим их позже
            if (roomPassword) {
                Cookies.set("game_password", roomPassword, { expires: 7 });
            }

            return data;
        } catch (err) {
            console.error("Ошибка входа в игру:", err);
            setError("Ошибка сети или сервера");
            return null;
        }
    };
    const handleFinish = async () => {
        setIsLoading(true);
        setError("");

        let result;
        if (mode === 'create') {
            if (!selectedTeam) {
                setError("Выберите команду");
                setIsLoading(false);
                return;
            }
            result = await createGame();
        } else {
            if (!selectedTeam) {
                setError("Выберите команду");
                setIsLoading(false);
                return;
            }
            result = await joinGame();
        }

        setIsLoading(false);

        if (result) {
            const savedGameId = Cookies.get("game_id");
            const savedTeamId = Cookies.get("team_id");
            const savedRole = Cookies.get("role");
            
            console.log("Сохраненные данные:", {
                gameId: savedGameId,
                teamId: savedTeamId,
                role: savedRole,
                result: result
            });
            
            if (!savedGameId || !savedTeamId || !savedRole) {
                setError("Ошибка сохранения данных игры. Попробуйте еще раз.");
                return;
            }
            
            if (onComplete) {
                onComplete({
                    avatar: selectedAvatar,
                    name: playerName,
                    team: selectedTeam,
                    role: selectedRole,
                    gameId: mode === 'create' ? result.game_id : selectedGameId,
                    password: roomPassword,
                    mode: mode,
                    ...result
                });
            }
            
            if (onClose) {
                onClose();
            }
        } else {
            setError("Не удалось создать/присоединиться к игре. Проверьте данные и попробуйте еще раз.");
        }
    };

    const handleClose = () => {
        if (onClose) onClose();
    };

    const isRoomPasswordValid = mode === 'create' 
        ? roomPassword.length === 0 || roomPassword.length >= 4
        : roomPassword.length >= 4;

    const isNameValid = playerName.trim().length > 0;
    const isTeamSelected = selectedTeam !== null;

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


    const getTeamColorClass = (teamColor, type = 'bg') => {
        const colorMap = {
            red: {
                bg: 'bg-red-500',
                text: 'text-red-700',
                border: 'border-red-500',
                lightBg: 'bg-red-50'
            },
            blue: {
                bg: 'bg-blue-500',
                text: 'text-blue-700',
                border: 'border-blue-500',
                lightBg: 'bg-blue-50'
            }
        };
        return colorMap[teamColor]?.[type] || '';
    };

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
                            className={`h-full bg-blue-600 rounded-full transition-all duration-500 ease-out ${getProgressWidth()}`}
                        />
                    </div>
                </div>

                {error && (
                    <div className="px-8 mt-2">
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    </div>
                )}

                {step === 1 && (
                    <div className="px-8 pb-8 animate-in slide-in-from-right-4 fade-in duration-300">
                        <div className="mb-8">
                            <label htmlFor="roomPassword" className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                                {mode === 'create' 
                                    ? 'Пароль комнаты (опционально, от 4 символов)' 
                                    : 'Пароль для входа'}
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <Lock size={18} />
                                </div>
                                <input
                                    id="roomPassword"
                                    type={showRoomPassword ? "text" : "password"}
                                    value={roomPassword}
                                    onChange={(e) => setRoomPassword(e.target.value)}
                                    placeholder={mode === 'create' ? "Введите пароль или оставьте пустым..." : "Введите пароль комнаты..."}
                                    className={`w-full pl-11 pr-11 py-3.5 bg-gray-50 border rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all ${
                                        !isRoomPasswordValid && roomPassword.length > 0 
                                            ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
                                            : "border-gray-200 focus:border-blue-500"
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
                            {mode === 'create' && roomPassword.length > 0 && roomPassword.length < 4 && (
                                <p className="text-xs text-red-500 mt-1.5 ml-1">Минимум 4 символа</p>
                            )}
                        </div>

                        <Button
                            onClick={handleNextStep}
                            disabled={!isRoomPasswordValid}
                            className={`w-full py-3 rounded-xl font-bold text-base shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                                isRoomPasswordValid
                                    ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-blue-200" 
                                    : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                            }`}
                        >
                            Далее <ArrowRight size={18} />
                        </Button>
                    </div>
                )}

                {step === 2 && (
                    <div className="px-8 pb-8 animate-in slide-in-from-right-4 fade-in duration-300">            
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
                                    onChange={(e) => setPlayerName(e.target.value)}
                                    className="w-full pl-4 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium"
                                />
                                <button
                                    onClick={handleRandomName}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-blue-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                    aria-label="Сгенерировать имя"
                                    title="Случайное имя"
                                >
                                    <Shuffle size={20} />
                                </button>
                            </div>
                            <p className={`text-xs mt-2 ml-1 transition-colors ${playerName.length === 0 ? 'text-gray-400' : 'text-blue-600'}`}>
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
                                        ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-blue-200" 
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
                            <label className="block text-sm font-medium text-gray-700 mb-3 ml-1">
                                Выберите команду
                            </label>
                            <div className="space-y-2">
                                {(mode === 'join' && selectedGame?.teams ? 
                                    selectedGame.teams.map((teamData) => {
                                        const team = teams.find(t => t.id === teamData.team_color);
                                        if (!team) return null;
                                        
                                        const isSelected = selectedTeam === team.id;
                                        const hasFreeRoles = teamData.free_roles && teamData.free_roles.length > 0;
                                        
                                        return (
                                            <button
                                                key={team.id}
                                                onClick={() => {
                                                    setSelectedTeam(team.id);
                                                    if (teamData.free_roles && teamData.free_roles.length > 0) {
                                                        setSelectedRole(teamData.free_roles[0]);
                                                    }
                                                }}
                                                disabled={!hasFreeRoles}
                                                className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                                                    !hasFreeRoles 
                                                        ? 'bg-gray-50 border-gray-200 opacity-50 cursor-not-allowed'
                                                        : isSelected 
                                                            ? `${getTeamColorClass(team.color, 'lightBg')} border-${team.color}-500 ring-1 ring-blue-200` 
                                                            : 'bg-white border-gray-100 hover:border-gray-200'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-3 h-3 rounded-full ${getTeamColorClass(team.color, 'bg')}`} />
                                                    <div className="flex flex-col items-start">
                                                        <span className={`font-bold ${isSelected ? getTeamColorClass(team.color, 'text') : 'text-gray-700'}`}>
                                                            {team.label}
                                                        </span>
                                                        {hasFreeRoles && (
                                                            <span className="text-xs text-gray-500 mt-0.5">
                                                                Доступные роли: {teamData.free_roles.join(', ')}
                                                            </span>
                                                        )}
                                                        {!hasFreeRoles && (
                                                            <span className="text-xs text-red-500 mt-0.5">
                                                                Команда заполнена
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center gap-2">
                                                    {isSelected && (
                                                        <Check size={20} className={getTeamColorClass(team.color, 'text')} strokeWidth={3} />
                                                    )}
                                                    {!isSelected && <Users size={16} className="text-gray-300" />}
                                                </div>
                                            </button>
                                        );
                                    })
                                    :
                                    teams.map((team) => {
                                        const isSelected = selectedTeam === team.id;
                                        
                                        return (
                                            <button
                                                key={team.id}
                                                onClick={() => setSelectedTeam(team.id)}
                                                className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                                                    isSelected 
                                                        ? `${getTeamColorClass(team.color, 'lightBg')} border-${team.color}-500 ring-1 ring-blue-200` 
                                                        : 'bg-white border-gray-100 hover:border-gray-200'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-3 h-3 rounded-full ${getTeamColorClass(team.color, 'bg')}`} />
                                                    <span className={`font-bold ${isSelected ? getTeamColorClass(team.color, 'text') : 'text-gray-700'}`}>
                                                        {team.label}
                                                    </span>
                                                </div>
                                                
                                                <div className="flex items-center gap-2">
                                                    {isSelected && (
                                                        <Check size={20} className={getTeamColorClass(team.color, 'text')} strokeWidth={3} />
                                                    )}
                                                    {!isSelected && <Users size={16} className="text-gray-300" />}
                                                </div>
                                            </button>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                        
                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-700 mb-3 ml-1">Роль</label>
                            {(() => {
                                let availableRoles = roles;
                                if (mode === 'join' && selectedGame?.teams && selectedTeam) {
                                    const selectedTeamData = selectedGame.teams.find(t => t.team_color === selectedTeam);
                                    if (selectedTeamData && selectedTeamData.free_roles) {
                                        availableRoles = roles.filter(r => selectedTeamData.free_roles.includes(r.id));
                                    }
                                }
                                
                                return (
                                    <>
                                        <div className="bg-gray-100 p-1.5 rounded-xl flex gap-1">
                                            {availableRoles.map((role) => {
                                                const isSelected = selectedRole === role.id;
                                                
                                                return (
                                                    <button
                                                        key={role.id}
                                                        onClick={() => {
                                                            setSelectedRole(role.id);
                                                        }}
                                                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                                                            isSelected
                                                                ? "bg-white text-blue-900 shadow-sm"
                                                                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
                                                        }`}
                                                    >
                                                        {role.icon}
                                                        <span>{role.label}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        {mode === 'join' && availableRoles.length === 0 && (
                                            <p className="text-xs text-red-400 mt-2 ml-1">Нет доступных ролей в выбранной команде</p>
                                        )}
                                    </>
                                );
                            })()}
                        </div>
                        
                        <div className="flex gap-3">
                            <button
                                onClick={handlePrevStep}
                                disabled={isLoading}
                                className="px-5 py-3.5 rounded-xl text-gray-500 font-semibold hover:bg-gray-100 hover:text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            
                            <Button
                                onClick={handleFinish}
                                disabled={isLoading || !isTeamSelected}
                                className={`flex-grow py-3.5 rounded-xl font-bold text-white shadow-lg transition-all active:scale-[0.98] ${
                                    !isLoading && isTeamSelected
                                        ? "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
                                        : "bg-gray-300 shadow-none cursor-not-allowed"
                                }`}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        {mode === 'create' ? 'Создание...' : 'Подключение...'}
                                    </div>
                                ) : (
                                    mode === 'create' ? 'Создать игру' : 'Присоединиться'
                                )}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ModalPlayerSetup;