/* eslint-disable */
import React, { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";
import { Settings, Send, Mic, Volume2, Music, LogOut, History, Clock9 } from "lucide-react";

import HintFooter from "../components/ui/HintFooter";
import GuessFooter from "../components/ui/GuessFooter";
import GameHeader from "../components/ui/GameHeader";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import HistoryCard from "../components/ui/HistoryCard";
import WhiteTokenScreen from "../components/ui/WhiteTokenScreen";
import BlackTokenScreen from "../components/ui/BlackTokenScreen";
import WinScreen from "../components/ui/WinScreen";
import LossScreen from "../components/ui/LossScreen";
import Timer from "../components/ui/Timer";

import { useAuth } from "../hooks/useAuth";
import { usePlayerSession } from "../hooks/usePlayerSession";

export function GameScreen() {
    const [isSettingOpen, setIsSettingsOpen] = useState(false);
    const [activeChat, setActiveChat] = useState("global");
    const [message, setMessage] = useState("");
    const [volume, setVolume] = useState(50);
    const [music, setMusic] = useState(50);
    const [hint, setHint] = useState("");
    const [guess, setGuess] = useState("");
    const [error, setError] = useState("");
    const [gameState, setGameState] = useState(null);
    const [cards, setCards] = useState([]);
    const [history, setHistory] = useState([]);
    const [messages, setMessages] = useState({
        global: [],
        team: []
    });
    const [showTokenScreen, setShowTokenScreen] = useState(null);
    
    const [isAuth, login, token, logout] = useAuth();
    const session = usePlayerSession();
    const { gameId, teamId, role, playerName } = session;
    
    const gameIdRef = useRef(gameId);
    const teamIdRef = useRef(teamId);
    const roleRef = useRef(role);

    useEffect(() => {
        let interval = null;
        
        const initGame = async () => {
            const currentGameId = Cookies.get("game_id");
            const currentToken = Cookies.get("token");
            
            if (currentGameId && currentToken) {
                try {
                    await getGameState();
                    interval = setInterval(async () => {
                        await getGameState();
                    }, 2000);
                } catch (err) {
                    console.error("Ошибка инициализации игры:", err);
                    setError("Ошибка загрузки игры. Попробуйте обновить страницу.");
                }
            } else {
                if (!currentGameId) {
                    setError("Game ID не найден. Пожалуйста, создайте или присоединитесь к игре.");
                }
                if (!currentToken) {
                    setError("Токен не найден. Пожалуйста, авторизуйтесь заново.");
                }
            }
        };
        
        initGame();
        
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [gameId, token]);

    const getGameState = async () => {
        try {
            const token = Cookies.get("token");
            const gameId = Cookies.get("game_id");
            const gamePassword = Cookies.get("game_password") || "";

            if (!gameId) {
                setError("Game ID не найден. Пожалуйста, создайте или присоединитесь к игре.");
                return null;
            }
            if (!token) {
                setError("Токен не найден. Пожалуйста, авторизуйтесь заново.");
                return null;
            }

            const url = `https://se.ifmo.ru/~t129889/sql.php?s=s336584&f=get_game_state&p=[${token}, ${gameId}, "${gamePassword}"]`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (data.error) {
                setError(data.error);
                setGameState({ error: data.error, teams: [] });
                return null;
            }

            console.log("Получены данные игры:", data);
            setGameState(data);

            // Обрабатываем карточки
            processCards(data);

            return data;
        } catch (err) {
            console.error("Ошибка получения состояния игры:", err);
            setError("Ошибка сети или сервера");
            return null;
        }
    };

    const processCards = (data) => {
        try {
            if (!data || !data.teams || !Array.isArray(data.teams)) {
                return;
            }

            const currentTeamId = Cookies.get("team_id");
            const teamIdNum = currentTeamId ? parseInt(currentTeamId) : null;

            // Находим нашу команду
            const myTeam = data.teams.find(t => t.team_id === teamIdNum);
            if (!myTeam) return;

            // Получаем наши карточки
            let myCards = [];
            if (myTeam.cards && Array.isArray(myTeam.cards)) {
                myCards = myTeam.cards.map(card => ({
                    id: card.position,
                    word: card.word,
                    type: "mine"
                }));
            }

            // Получаем карточки противника
            const opponentTeam = data.teams.find(t => t.team_id !== teamIdNum);
            let opponentCards = [];
            if (opponentTeam && opponentTeam.cards && Array.isArray(opponentTeam.cards)) {
                opponentCards = opponentTeam.cards.map(card => ({
                    id: card.position + 4,
                    word: card.word,
                    type: "opponent"
                }));
            }

            // Объединяем карточки
            const allCards = [...myCards, ...opponentCards];
            
            if (JSON.stringify(cards) !== JSON.stringify(allCards)) {
                setCards(allCards);
            }

        } catch (err) {
            console.error("❌ Ошибка обработки карточек:", err);
        }
    };

    const submitGuess = async (code) => {
        const guessToSend = code || guess;
        if (!guessToSend || !/^[1-4]{3}$/.test(guessToSend)) {
            setError("Догадка должна состоять из 3 цифр от 1 до 4");
            return;
        }
        
        const token = Cookies.get("token");
        const gamePassword = Cookies.get("game_password") || "";
        
        try {
            const url = `https://se.ifmo.ru/~t129889/sql.php?s=s336584&f=submit_guess&p=[${token}, ${gameId}, "${gamePassword}", "${guessToSend}"]`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.error) {
                setError(data.error);
                return null;
            }
            
            if (data.result === 'intercept') {
                setShowTokenScreen('black');
                setTimeout(() => setShowTokenScreen(null), 3000);
            } else if (data.result === 'disruption') {
                setShowTokenScreen('white');
                setTimeout(() => setShowTokenScreen(null), 3000);
            }
            
            setGuess("");
            await getGameState();
            
            return data;
        } catch (err) {
            console.error("Ошибка отправления догадки:", err);
            setError("Ошибка сети или сервера");
            return null;
        }
    };

    const submitHint = async (hintText) => {
        const hintToSubmit = hintText || hint;
        
        if (!hintToSubmit.trim() || hintToSubmit.split(" ").length !== 3) {
            setError("Подсказка должна состоять из 3 слов");
            return;
        }
        
        const token = Cookies.get("token");
        const gamePassword = Cookies.get("game_password") || "";
        
        try {
            const url = `https://se.ifmo.ru/~t129889/sql.php?s=s336584&f=submit_hint&p=[${token}, ${gameId}, "${gamePassword}", "${hintToSubmit}"]`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.error) {
                setError(data.error);
                return null;
            }
            
            setHint("");
            await getGameState();
            
            return data;
        } catch (err) {
            console.error("Ошибка отправления подсказки:", err);
            setError("Ошибка сети или сервера");
            return null;
        }
    };

    const sendMessage = () => {
        if (!message.trim()) return;
        
        const newMessage = {
            text: message.trim(),
            sender: playerName || "Вы",
            timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
            team: "blue"
        };
        
        setMessages(prev => ({
            ...prev,
            [activeChat]: [...prev[activeChat], newMessage]
        }));
        
        setMessage("");
        
        setTimeout(() => {
            const chatContainer = document.getElementById('chat-messages');
            if (chatContainer) {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        }, 100);
    };

    const UserAvatar = ({ src, name, team, isCaptain, isCurrentPlayer }) => (
    <div className="flex flex-col items-center gap-2 relative">
        <div className="relative">
            <div className={`
                w-14 h-14 rounded-full border-4 shadow-md overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg
                ${isCurrentPlayer ? 'ring-4 ring-yellow-400 ring-offset-2' : ''}
                ${team === 'blue' ? 'border-blue-400' : 'border-rose-400'}
            `}>
                <img src={src} alt={name} className="w-full h-full object-cover" />
            </div>
            {isCaptain && (
                <div className="absolute -top-1 -right-2 z-10">
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 text-[9px] font-bold px-2 py-1 rounded-full border-2 border-white shadow-lg flex items-center justify-center leading-none min-w-[28px] hover:scale-110 transition-transform duration-200">
                        CAP
                    </span>
                </div>
            )}
        </div>
        <div className="relative">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm shadow-sm border border-gray-100">
                <span className={`${isCurrentPlayer ? 'text-yellow-700 font-bold' : 'text-gray-700'}`}>
                    {name} {isCurrentPlayer ? '(Вы)' : ''}
                </span>
            </span>
            {isCurrentPlayer && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className="w-2 h-2rounded-full animate-pulse"></div>
                </div>
            )}
        </div>
    </div>
);
    const getCardsToDisplay = () => {
        const currentTeamId = Cookies.get("team_id");
        const teamIdNum = currentTeamId ? parseInt(currentTeamId) : null;
        
        if (!cards || cards.length === 0) {
            return [];
        }
        
        const myTeam = gameState.teams?.find(t => t.team_id === teamIdNum);
        const isFirstTeam = gameState?.teams?.[0]?.team_id === teamIdNum;
        return isFirstTeam ? cards.slice(0, 4) : cards.slice(4, 8);
    };

    if (!gameState) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50">
                <div className="text-center max-w-md px-6">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 mb-2">Загрузка игры...</p>
                    {error && (
                        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm font-semibold">Ошибка:</p>
                            <p className="text-red-600 text-sm mt-1">{error}</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
    
    if (gameState.error && !gameState.teams) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50">
                <div className="text-center max-w-md px-6">
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm font-semibold">Ошибка загрузки игры:</p>
                        <p className="text-red-600 text-sm mt-1">{gameState.error}</p>
                    </div>
                    <button 
                        onClick={() => window.location.href = "/lobby"}
                        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        Вернуться в лобби
                    </button>
                </div>
            </div>
        );
    }

    // Получаем информацию о командах
    const currentTeamId = Cookies.get("team_id");
    const teamIdNum = currentTeamId ? parseInt(currentTeamId) : null;
    const myTeam = gameState.teams?.find(t => t.team_id === teamIdNum);
    const opponentTeam = gameState.teams?.find(t => t.team_id !== teamIdNum);
    
    // Получаем информацию о состоянии из player_info
    const playerInfo = gameState.player_info || {};
    const leaderSeesHintInput = role === "leader" && playerInfo.can_submit_hint;
    const playerSeesGuessInput = role === "player" && playerInfo.can_submit_guess;
    const isMyTurn = leaderSeesHintInput || playerSeesGuessInput;
    
    // Определяем текущую подсказку
    let currentHintForGuess = null;
    let isGuessingOpponentHint = false;
    
    if (myTeam?.current_round?.hint) {
        currentHintForGuess = myTeam.current_round.hint;
    } else if (opponentTeam?.current_round?.hint) {
        currentHintForGuess = opponentTeam.current_round.hint;
        isGuessingOpponentHint = true;
    }
    
    // Получаем карточки для отображения
    const cardsToShow = getCardsToDisplay();
    
    // Проверяем, все ли игроки присоединились
    const playersCount = gameState.game_state?.players_count || 0;
    const allPlayersReady = gameState.game_state?.all_players_ready || false;
    const gamePhase = gameState.game_state?.phase || 'waiting';
    
    if (!allPlayersReady && gamePhase !== 'playing') {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50">
                <div className="text-center max-w-md px-6">
                    <div className="animate-pulse mb-6">
                        <div className="w-20 h-20 mx-auto bg-blue-50 rounded-full flex items-center justify-center">
                            <Clock9 size={24} className="text-blue-600"/>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Ожидание игроков</h2>
                    <p className="text-gray-600 mb-6">
                        Игра начнется, когда в каждой команде будет 2 игрока.
                        Сейчас в игре: {playersCount} из 4 игроков
                    </p>
                    <div className="space-y-3">
                        {gameState.teams?.map(team => {
                            const count = team.players ? team.players.length : 0;
                            return (
                                <div key={team.team_id} className="bg-white rounded-lg p-4 border border-slate-200">
                                    <div className="flex items-center justify-between">
                                        <span className={`font-semibold ${team.color === 'blue' ? 'text-blue-600' : 'text-rose-600'}`}>
                                            {team.color === 'blue' ? 'Синие' : 'Красные'}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {count} / {2}
                                        </span>
                                    </div>
                                    {team.players && team.players.length > 0 && (
                                        <div className="mt-2 text-xs text-gray-500">
                                            Игроки: {team.players.map(p => p.name).join(', ')}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden selection:bg-indigo-100">
            <div className="flex-1 flex flex-col relative">
            <GameHeader 
                turn={playerInfo.current_turn || "leader"} 
                myTeamTokens={myTeam ? { 
                    white_tokens: myTeam.white_tokens || 0, 
                    black_tokens: myTeam.black_tokens || 0 
                } : null}
                opponentTeamTokens={opponentTeam ? { 
                    white_tokens: opponentTeam.white_tokens || 0, 
                    black_tokens: opponentTeam.black_tokens || 0 
                } : null}
                playerRole={role}
                isMyTurn={isMyTurn}
                gamePhase={role === "leader" ? "spymaster" : "operative"}
                myTeamColor={myTeam?.color || 'blue'}
                opponentTeamColor={opponentTeam?.color || 'red'}
            />
                
                {role === "leader" && myTeam?.current_round?.correct_code && (
                    <div className="bg-indigo-600 text-white px-6 py-3 text-center">
                        <span className="text-sm font-semibold mr-2">Ваш код:</span>
                        <span className="text-2xl font-mono font-bold tracking-wider">
                            {myTeam.current_round.correct_code}
                        </span>
                    </div>
                )}
                
                <main className="flex-1 relative bg-slate-100/50 flex items-center justify-center p-6 overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

                    {opponentTeam && opponentTeam.players && (
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                            {opponentTeam.players.map((player, idx) => (
                                <UserAvatar 
                                    key={idx}
                                    name={player.name} 
                                    src={player.role === "leader" ? "/assets/avatar3.png" : "/assets/avatar4.png"} 
                                    team={opponentTeam.color} 
                                    isCaptain={player.role === "leader"}
                                    isCurrentPlayer={player.name === playerName}
                                />
                            ))}
                        </div>
                    )}

                    {myTeam && myTeam.players && (
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                            {myTeam.players.map((player, idx) => (
                                <UserAvatar 
                                    key={idx}
                                    name={player.name} 
                                    src={player.role === "leader" ? "/assets/avatar1.png" : "/assets/avatar2.png"} 
                                    team={myTeam.color} 
                                    isCaptain={player.role === "leader"}
                                    isCurrentPlayer={player.name === playerName}
                                />
                            ))}
                        </div>
                    )}

                    <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 w-full max-w-sm md:max-w-5xl z-0 px-12">
                        {cardsToShow && Array.isArray(cardsToShow) ? (
                            cardsToShow.map((card) => (
                                <div key={card.id} className="group relative perspective-1000 lg:h-64 h-44">
                                    <div className="absolute inset-0 bg-indigo-500/5 rounded-2xl transform translate-y-2 group-hover:translate-y-4 transition-transform duration-300 blur-sm"></div>
                                    
                                    <div className={`relative h-full bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center 
                                        transition-all duration-300 ease-out overflow-hidden
                                        ${isMyTurn ? 'cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:border-indigo-300' : ''}`}>
                                        
                                        <div className="absolute top-3 w-8 h-8 rounded-full bg-slate-50 text-slate-400 font-bold flex items-center justify-center border border-slate-100 shadow-inner text-sm">
                                            {card.id}
                                        </div>

                                        <div className="mt-4 px-2 text-center">
                                            <span className="text-xl font-bold text-slate-700 tracking-tight">
                                                {card.word}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500">Загрузка карточек...</div>
                        )}
                    </div>
                </main>

                {leaderSeesHintInput ? (
                    <HintFooter 
                        onHintSubmit={(hintText) => submitHint(hintText)}
                        hint={hint}
                        setHint={setHint}
                        disabled={gameState.game_over}
                        correctCode={myTeam?.current_round?.correct_code}
                    />
                ) : playerSeesGuessInput ? (
                    <GuessFooter 
                        onGuessSubmit={(code) => {
                            if (code && /^[1-4]{3}$/.test(code)) {
                                submitGuess(code);
                            }
                        }}
                        guess={guess}
                        setGuess={setGuess}
                        disabled={gameState.game_over}
                        currentHint={currentHintForGuess}
                        isOpponentHint={isGuessingOpponentHint}
                    />
                ) : role === "leader" && !leaderSeesHintInput ? (
                    <footer className="h-20 bg-white border-t border-slate-200 px-4 flex items-center justify-center z-10">
                        <p className="text-slate-500 text-sm">Ожидание догадок игроков</p>
                    </footer>
                ) : null}

                {showTokenScreen === 'white' && <WhiteTokenScreen />}
                {showTokenScreen === 'black' && <BlackTokenScreen />}
                {showTokenScreen === 'win' && <WinScreen />}
                {showTokenScreen === 'lose' && <LossScreen />}

                {error && (
                    <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
                        {error}
                        <button onClick={() => setError("")} className="float-right font-bold">×</button>
                    </div>
                )}
            </div>

            <div className="w-80 lg:flex flex-col border-l border-slate-200 shadow-xl hidden">
                <div className="flex-1 flex flex-col bg-white">
                    <div className="flex border-b border-slate-100 p-1">
                        <button
                            onClick={() => setActiveChat("global")}
                            className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all ${
                                activeChat === "global" ? "bg-indigo-50 text-indigo-600" : "text-gray-500 hover:bg-gray-50"
                            }`}
                        >
                            Общий
                        </button>
                        <button
                            onClick={() => setActiveChat("team")}
                            className={`flex-1 py-3 text-sm font-medium rounded-lg transition-all ${
                                activeChat === "team" ? "bg-indigo-50 text-indigo-600" : "text-gray-500 hover:bg-gray-50"
                            }`}
                        >
                            Команда
                        </button>
                        <button onClick={() => setIsSettingOpen(true)} className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg">
                            <Settings size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50" id="chat-messages">
                        {messages[activeChat].length === 0 ? (
                            <div className="text-center text-xs text-gray-400 my-1 flex items-center justify-center gap-2">
                                <span className="h-[1px] w-8 bg-gray-200"></span>
                                <span>Начало игры</span>
                                <span className="h-[1px] w-8 bg-gray-200"></span>
                            </div>
                        ) : (
                            <>
                                <div className="text-center text-xs text-gray-400 my-1 flex items-center justify-center gap-2">
                                    <span className="h-[1px] w-8 bg-gray-200"></span>
                                    <span>Начало игры</span>
                                    <span className="h-[1px] w-8 bg-gray-200"></span>
                                </div>
                                {messages[activeChat].map((msg, index) => {
                                    const isMyMessage = msg.sender === playerName || msg.sender === "Вы";
                                    return (
                                        <div key={index} className={`flex flex-col ${isMyMessage ? "items-end" : "items-start"}`}>
                                            {!isMyMessage && <span className="text-[10px] text-gray-400 ml-1 mb-1">{msg.sender}</span>}
                                            <div
                                                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm leading-relaxed ${
                                                    isMyMessage 
                                                    ? "bg-indigo-600 text-white rounded-br-none" 
                                                    : "bg-white text-gray-700 border border-gray-100 rounded-bl-none"
                                                }`}
                                            >
                                                {msg.text}
                                            </div>
                                            {msg.timestamp && (
                                                <span className={`text-[9px] text-gray-400 mt-0.5 ${isMyMessage ? 'mr-1' : 'ml-1'}`}>
                                                    {msg.timestamp}
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </>
                        )}
                    </div>

                    <div className="p-3 bg-white border-t border-slate-200">
                        <div className="relative flex items-center">
                            <input
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                placeholder={activeChat === 'team' ? "Сообщение команде..." : "Сообщение всем..."}
                                className="w-full bg-slate-100 text-sm rounded-full pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                            />
                            <div className="absolute right-2 flex items-center gap-1">
                                <button className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-white transition-all flex items-center justify-center">
                                    <Mic size={18} />
                                </button>
                                <button
                                    onClick={sendMessage}
                                    className="p-1.5 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 shadow-sm transition-all flex items-center justify-center"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-96 border-t border-slate-200 bg-white flex flex-col">
                    <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-white">
                        <h2 className="font-bold text-slate-700 text-sm flex items-center gap-2">
                            <History size={18} className="text-slate-400"/>
                            История ходов
                        </h2>
                        <span className="text-xs text-slate-400 bg-white px-2 py-1 rounded border border-slate-200">
                            {history.length} записей
                        </span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-slate-50/30">
                        {history.length > 0 ? (
                            history.map((entry, index) => (
                                <HistoryCard key={index} entry={entry} />
                            ))
                        ) : (
                            <div className="text-center text-gray-400 text-sm py-8">
                                История ходов пуста
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Modal open={isSettingOpen} onClose={() => setIsSettingsOpen(false)}>
                <div className="flex flex-col gap-6">
                    <h4 className="text-2xl font-bold text-center text-gray-800">Настройки</h4>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center gap-2"><Volume2 size={18}/> Громкость</div>
                            <span>{volume}%</span>
                        </div>
                        <input
                            type="range"
                            min="0" max="100"
                            value={volume}
                            onChange={(e) => setVolume(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center gap-2"><Music size={18}/> Музыка</div>
                            <span>{music}%</span>
                        </div>
                        <input
                            type="range"
                            min="0" max="100"
                            value={music}
                            onChange={(e) => setMusic(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                    </div>

                    <div className="h-[1px] bg-gray-100 my-2"></div>

                    <Button 
                        variant="danger" 
                        className="w-full"
                        onClick={() => {
                            Cookies.remove("token");
                            Cookies.remove("game_id");
                            Cookies.remove("team_id");
                            Cookies.remove("role");
                            Cookies.remove("playerName");
                            Cookies.remove("game_password");
                            window.location.href = "/";
                        }}
                    >
                        <LogOut size={18} /> Покинуть игру
                    </Button>
                </div>
            </Modal>
        </div>
    );
}

export default GameScreen;