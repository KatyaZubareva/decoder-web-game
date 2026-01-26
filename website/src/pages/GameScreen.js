/* eslint-disable */
import React, { useState, useRef, useEffect } from "react";

import { Settings, Send, Mic, Volume2, Music, LogOut, History } from "lucide-react";

import HintFooter from "../components/ui/HintFooter";
import GuessFooter from "../components/ui/GuessFooter";
import GameHeader from "../components/ui/GameHeader";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import HistoryCard from "../components/ui/HistoryCard";

import WhiteTokenScreen from "../components/ui/WhiteTokenScreen";
import Timer from "../components/ui/Timer";

import { StreamChat } from "stream-chat";

export function GameScreen() {

    const [isSettingOpen, setIsSettingsOpen] = useState(false);
    const [isHintOpen, setIsHintOpen] = useState(false);

    const [activeChat, setActiveChat] = useState("global");
    const [message, setMessage] = useState("");

    const [volume, setVolume] = useState(50);
    const [music, setMusic] = useState(50);

    const [gameID, setGameID] = useState("");
    const [gamePassword, setGamePassword] = useState("");
    const [hint, setHint] = useState("");
    const [guess, setGuess] = useState("");

    const [isAuth, login, token, logout] = useAuth();

    useEffect(() => {
        const GetGameState = async () => {
            
        }
    }, []);

    const UserAvatar = ({ src, name, team, isCaptain }) => (
        <div className="flex flex-col items-center gap-2 relative group">
            <div className={`w-14 h-14 rounded-full border-4 shadow-md overflow-hidden transition-transform transform group-hover:scale-105 ${team === 'blue' ? 'border-blue-400' : 'border-rose-400'}`}>
                <img src={src} alt={name} className="w-full h-full object-cover" />
            </div>
            {isCaptain && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white shadow-sm">
                    CAP
                </span>
            )}
            <span className="text-xs font-semibold text-gray-600 bg-white/80 px-2 py-0.5 rounded-md backdrop-blur-sm shadow-sm">{name}</span>
        </div>
    )

    useEffect(() => {
        const GetGameState = async () => {
            try {
                const url = `https://se.ifmo.ru/~t129889/sql.php?s=s336584&f=get_game_state&p=["${login}","${token}",${gameID},"${gamePassword}"]`;
                const responce = await fetch(url);
                const data = await responce.json();

            } catch (err) {
                console.error("Ошибка вывода состояния игры:", err);
            }
        };

        GetGameState();
    }, []);

    const submitGuess = async () => {
        const params = JSON.stringify([
            login,
            password,
            gameID,
            gamePassword,
            guess
        ]);
        const responce = await fetch (url);
        const url = `https://se.ifmo.ru/~t129889/sql.php?s=s336584&f=submit_guess&p=${params}`
        return responce.json()
    };

    const submitHint = async () => {
        const params = JSON.stringify([
            login,
            password,
            gameID,
            gamePassword,
            hint
        ]);
        const responce = await fetch (url);
        const url = `https://se.ifmo.ru/~t129889/sql.php?s=s336584&f=submit_hint&p=${params}`
        return responce.json()
    };

    const GameState = () => {
        const gameState = use(GetGameState())
        return gameState.map(state)
    }

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden selection:bg-indigo-100">
            
            <div className="flex-1 flex flex-col relative">
                
                <GameHeader turn="red" whiteTokens={1} blackTokens={1}/>
                <Timer duration={30 * 1000}/>
                <main className="flex-1 relative bg-slate-100/50 flex items-center justify-center p-6 overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

                    <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                        <UserAvatar name={$opponentLeader} src="/assets/avatar3.png" team={$opponentTeam} isCaptain={true} />
                        <UserAvatar name={$opponentPlayer} src="/assets/avatar4.png" team={$opponentTeam} />
                    </div>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                        <UserAvatar name={$leader} src="/assets/avatar1.png" team={$team} isCaptain={true} />
                        <UserAvatar name={login} src="/assets/avatar2.png" team={$team} />
                    </div>

                    <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 w-full max-w-sm md:max-w-5xl z-0 px-12">
                        {cards.map((card) => (
                            <div key={card.id} className="group relative perspective-1000 lg:h-64 h-44">
                                <div className="absolute inset-0 bg-indigo-500/5 rounded-2xl transform translate-y-2 group-hover:translate-y-4 transition-transform duration-300 blur-sm"></div>
                                
                                <div className="relative h-full bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center 
                                    cursor-pointer transition-all duration-300 ease-out
                                    group-hover:-translate-y-2 group-hover:shadow-xl group-hover:border-indigo-300 overflow-hidden">
                                    
                                    <div className="absolute top-3 w-8 h-8 rounded-full bg-slate-50 text-slate-400 font-bold flex items-center justify-center border border-slate-100 shadow-inner text-sm group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-colors duration-300">
                                        {card.id}
                                    </div>

                                    <div className="mt-4 px-2 text-center">
                                        <span className="text-xl font-bold text-slate-700 tracking-tight group-hover:text-indigo-900 transition-colors">
                                            {card.word}
                                        </span>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent group-hover:via-indigo-400 opacity-50 transition-all"></div>
                                    
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity pointer-events-none"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

                <HintFooter/>

                <footer className="h-32 bg-white border-t border-slate-200 px-8 flex lg:hidden flex-col items-center justify-center z-10">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 w-full max-w-4xl text-center pl-1">
                        Введите код (подсказку из 3 слов):
                    </div>
                    <div className="flex items-center justify-center">
                        <Button className="h-12 px-8 rounded-xl shadow-indigo-500/20" variant="primary">
                            Дать подсказку
                        </Button>
                    </div>
                </footer>
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
                        <button onClick={() => setIsSettingsOpen(true)} className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg">
                            <Settings size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                        <div className="text-center text-xs text-gray-400 my-1 flex items-center justify-center gap-2">
                            <span className="h-[1px] w-8 bg-gray-200"></span>
                            <span>Начало игры</span>
                            <span className="h-[1px] w-8 bg-gray-200"></span>
                        </div>
                        
                        {/*messages[activeChat].map((msg, index) => (
                            <div key={index} className={`flex flex-col ${msg.sender === "Вы" ? "items-end" : "items-start"}`}>
                                {msg.sender !== "Вы" && <span className="text-[10px] text-gray-400 ml-1 mb-1">{msg.sender}</span>}
                                <div
                                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm leading-relaxed ${
                                        msg.sender === "Вы" 
                                        ? "bg-indigo-600 text-white rounded-br-none" 
                                        : "bg-white text-gray-700 border border-gray-100 rounded-bl-none"
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))*/}

                    </div>

                    <div className="p-3 bg-white border-t border-slate-200">
                        <div className="relative flex items-center">
                            <input
                                value={message}
                                placeholder={activeChat === 'team' ? "Сообщение команде..." : "Сообщение всем..."}
                                className="w-full bg-slate-100 text-sm rounded-full pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                            />
                            <div className="absolute right-2 flex items-center gap-1">
                                <button className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-white transition-all flex items-center justify-center">
                                    <Mic size={18} />
                                </button>
                                <button
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
                        {history.map((entry, index) => (
                            <HistoryCard key={index} entry={entry} />
                        ))}
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
                            onChange={(e) => setVolume(e.target.value)}
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
                            onChange={(e) => setMusic(e.target.value)}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                    </div>

                    <div className="h-[1px] bg-gray-100 my-2"></div>

                    <Button variant="danger" className="w-full">
                        <LogOut size={18} /> Покинуть игру
                    </Button>
                </div>
            </Modal>
        </div>
    );
}

export default GameScreen;