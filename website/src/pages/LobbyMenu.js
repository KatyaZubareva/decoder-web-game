import React, { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import GameCard from "../components/ui/GameCard";
import ModalPlayerSetup from "../components/ui/PlayerSetup";
import { useNavigate } from "react-router-dom";
import { 
    Plus, 
    Lock, 
    Users, 
    Wifi, 
    ArrowRight,
    ChevronRight,
    Menu,
    X
} from "lucide-react";
import Cookies from "js-cookie";
import { useAuth } from "../hooks/useAuth";

export function LobbyMenu() {
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(true);
    const [gamesToDisplay, setGamesToDisplay] = useState([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const [showPlayerSetup, setShowPlayerSetup] = useState(false);
    const [playerSetupMode, setPlayerSetupMode] = useState(null);
    const [selectedGameId, setSelectedGameId] = useState(null);
    const [selectedGame, setSelectedGame] = useState(null);

    const [isAuth, login] = useAuth();

    useEffect(() => {
        const fetchGames = async () => {
            try {
                setLoading(true);

                const url = "https://se.ifmo.ru/~t129889/sql.php?s=s336584&f=get_games";
                const responce = await fetch(url);
                const data = await responce.json();

                const formattedGames = data.map(game => ({
                    id: game.game_id,
                    currentPlayers: game.players_count || 0,
                    maxPlayers: 4,
                    teams: game.teams || []
                }));

                setGamesToDisplay(formattedGames);
            } catch (err) {
                console.log("Ошибка загрузки игр:", err)
            } finally {
                setLoading(false);
            }
        };
        fetchGames();
    }, []);

    const handleCreateGameClick = () => {
        if (!isAuth) {
            navigate("/login");
            return;
        }
        setPlayerSetupMode('create');
        setSelectedGameId(null);
        setSelectedGame(null);
        setShowPlayerSetup(true);
    };

    const handleJoinGameClick = (gameId) => {
        if (!isAuth) {
            navigate("/login");
            return;
        }
        const game = gamesToDisplay.find(g => g.id === gameId);
        if (game && game.currentPlayers < game.maxPlayers) {
            setPlayerSetupMode('join');
            setSelectedGameId(gameId);
            setSelectedGame(game); // Передаем полную информацию об игре включая teams
            setShowPlayerSetup(true);
        }
    };

    const handlePlayerSetupComplete = (playerData) => {
        setShowPlayerSetup(false);
        setPlayerSetupMode(null);
        
        console.log('Данные игрока:', playerData);
        console.log('Режим:', playerSetupMode);
        console.log('ID игры:', selectedGameId);
        
        if (playerSetupMode === 'create') {
            console.log('Создание игры с данными:', playerData);
            navigate("/game");
        } else if (playerSetupMode === 'join') {
            console.log('Присоединение к игре с данными:', playerData);
            navigate("/game");
        }
    };

    const handlePlayerSetupClose = () => {
        setShowPlayerSetup(false);
        setPlayerSetupMode(null);
        setSelectedGameId(null);
        setSelectedGame(null);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 640) {
                setIsMobileMenuOpen(false);
            }
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="min-h-screen bg-[#F3F4F6] font-sans text-slate-800 pb-24">
            
            <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-sm border-b border-gray-100 px-3 sm:px-4 py-3 sm:py-4 mb-4 sm:mb-6 transition-all">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2 pl-2 pr-4">
                        <div className="text-white flex items-center justify-center w-12 shadow-md rounded-xl">
                            <img src="/assets/logo.png"/>
                        </div>
                        <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-gray-900 hover:text-blue-700">
                            Decoder
                        </h1>
                    </div>

                    <div className="sm:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>

                    {loading ? (
                        <div className="animate-pulse w-32 sm:w-40 h-8 sm:h-9 bg-gray-200 rounded-full hidden sm:block"></div>
                    ) : isAuth ? (
                        <div className="hidden sm:flex items-center gap-3 pl-2 pr-4 py-1 transition-shadow cursor-pointer">
                            <p className="font-bold text-lg text-gray-800 hover:text-blue-600" style={{ lineHeight: "1", margin: 0 }} onClick={() => navigate("/profile")}>{login}</p>
                            <img src="/assets/avatar2.png" className="w-10 h-10 rounded-full border border-gray-50" alt="avatar" />
                        </div>
                    ) : (
                        <div className="hidden sm:flex items-center gap-3">
                            <Button
                                className="px-4 py-2.5 text-sm font-semibold text-blue-600 bg-white hover:bg-blue-50 border border-blue-200 rounded-lg transition"
                                onClick={() => navigate("/login")}
                            >
                                Вход
                            </Button>
                            <Button
                                className="px-4 py-2.5 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition"
                                onClick={() => navigate("/register")}
                            >
                                Регистрация
                            </Button>
                        </div>
                    )}
                </div>

                {isMobileMenuOpen && !loading && (
                    <div className="sm:hidden mt-3 pt-3 border-t border-gray-100 animate-fadeIn">
                        {isAuth ? (
                            <div className="flex items-center gap-3 align-middle">
                                <img src="/assets/avatar2.png" className="w-8 h-8 rounded-full border border-gray-50" alt="avatar" />
                                <p className="text-sm font-bold text-gray-800">{login}</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <Button
                                    className="w-full py-3 text-sm font-semibold text-blue-600 bg-white hover:bg-blue-50 border border-blue-200 rounded-lg transition"
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        navigate("/login");
                                    }}
                                >
                                    Вход
                                </Button>
                                <Button
                                    className="w-full py-3 text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition shadow-md shadow-blue-200"
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        navigate("/register");
                                    }}
                                >
                                    Регистрация
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </header>

            <main className="max-w-5xl mx-auto px-3 sm:px-4 flex flex-col gap-4 sm:gap-6">
                
                <div className="flex flex-col gap-2 sm:gap-3">
                    <div className="flex justify-between items-end px-1 sm:px-2 mb-1">
                        <h2 className="text-base sm:text-lg font-extrabold text-gray-900 tracking-tight">Активные игры</h2>
                        <span className="text-xs font-semibold text-gray-400 bg-gray-200 px-2 py-1 rounded-md">
                            Количество игр: {gamesToDisplay.length} 
                        </span>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-14 sm:h-16 bg-white rounded-xl animate-pulse shadow-md border border-gray-100"></div>
                            ))}
                        </div>
                    ) : gamesToDisplay.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                            {gamesToDisplay.map((game) => (
                                <GameCard 
                                    key={game.id} 
                                    gameNumber={game.id}
                                    currentPlayers={game.currentPlayers}
                                    maxPlayers={game.maxPlayers}
                                    onClick={() => handleJoinGameClick(game.id)} 
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 sm:py-10 text-gray-400">
                            <Lock size={40} className="sm:w-12 sm:h-12 mb-3 sm:mb-4 opacity-50" strokeWidth={1.5} />
                            <p className="font-medium text-base sm:text-lg">Нет подходящих игр</p>
                            <p className="text-sm">Попробуйте создать свою!</p>
                        </div>
                    )}
                </div>
            </main>

            <div className="fixed bottom-4 sm:bottom-6 left-0 right-0 flex justify-center px-3 sm:px-4 pointer-events-none z-30">
                <Button
                    className="pointer-events-auto flex items-center gap-2 sm:gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 w-full sm:w-1/2 rounded-full shadow-[0_12px_30px_rgba(29,78,216,0.4)] transition-all hover:scale-[1.03] active:scale-95 text-sm sm:text-base"
                    onClick={handleCreateGameClick}
                >
                    <Plus strokeWidth={3} size={18} className="sm:w-5 sm:h-5" />
                    <span>Создать игру</span>
                </Button>
            </div>

            <ModalPlayerSetup
                open={showPlayerSetup}
                onClose={handlePlayerSetupClose}
                onComplete={handlePlayerSetupComplete}
                mode={playerSetupMode}
                selectedGameId={selectedGameId}
                selectedGame={selectedGame}
            />

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
            `}</style>
        </div>
    );
}

export default LobbyMenu;