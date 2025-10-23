import React, { useState, useRef, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";

export function GameScreen() {
    const [activeChat, setActiveChat] = useState("global");
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState({
        global: [{ sender: "user_1", text: "Всем привет!" }],
        team: [{ sender: "teammate", text: "Давай напишем 134" }]
    });
    const [username, setUsername] = useState("");
    const [data, setData] = useState(null);
    const [gameId, login, password] = useState("");

    useEffect(() => {
        const params = new encodeURIComponent(`[${gameId}, "${login}", "${password}"]`)
        const ws = new WebSocket(`wss://se.ifmo.ru/~t129889/sql.php?s=s336584&f=get_game_state&p=${params}`)
    });

    const [history] = useState([
        "Игрок user_1 подключился к игре.",
        "Игрок user_2 атаковал монстра.",
        "user_1 подобрал предмет — меч света."
    ]);

    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, activeChat]);

    const sendMessage = () => {
        if (!message.trim()) return;
        setMessages(prev => ({
            ...prev,
            [activeChat]: [...prev[activeChat], { sender: "Вы", text: message }]
        }));
        setMessage("");
    };

    const words = ["Лес", "Огонь", "Ключ", "Книга"];

    return (
        <div className="flex h-screen bg-gray-100 font-montserrat">
            <div className="flex-1 relative bg-white border-r border-gray-300 flex items-center justify-center overflow-hidden">
                
                <img
                    src="/assets/cards-blue.png"
                    alt="Blue cards"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[230px] object-contain rotate-180"
                />

                <div>
                    <h2 className="">Введите подсказку</h2>
                    <div className="flex flex-row gap-8 items-center justify-center">
                        <p>3</p>
                        <p>4</p>
                        <p>1</p>
                    </div>
                    <div className="flex flex-row gap-3 border border-gray-200">
                        <input></input>
                        <input></input>
                        <input></input>
                    </div>
                    <Button className="w-full text-center items-center justify-center">
                        Отправить
                    </Button>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
                    {words.map((word, index) => (
                        <div
                            key={index}
                            className="w-28 h-36 bg-red-100 border-2 border-red-400 rounded-xl shadow-md flex items-center justify-center text-red-900 font-semibold text-lg hover:bg-red-200 transition"
                        >
                            {word}
                        </div>
                    ))}
                </div>

                <div className="absolute top-5 left-5 flex flex-col items-center">
                    <img src="/assets/avatar3.png" alt="Игрок A1" className="w-20 h-20 rounded-full border-4 border-blue-400 shadow-md object-cover" />
                    <p className="mt-1 text-sm text-gray-700 font-semibold">Игрок A1</p>
                </div>

                <div className="absolute top-5 right-5 flex flex-col items-center">
                    <img src="/assets/avatar4.png" alt="Игрок A2" className="w-20 h-20 rounded-full border-4 border-blue-400 shadow-md object-cover" />
                    <p className="mt-1 text-sm text-gray-700 font-semibold">Игрок A2</p>
                </div>

                <div className="absolute bottom-5 left-5 flex flex-col items-center">
                    <img src="/assets/avatar1.png" alt="Игрок B1" className="w-20 h-20 rounded-full border-4 border-red-400 shadow-md object-cover" />
                    <p className="mt-1 text-sm text-gray-700 font-semibold">Игрок B1</p>
                </div>

                <div className="absolute bottom-5 right-5 flex flex-col items-center">
                    <img src="/assets/avatar2.png" alt="Игрок B2" className="w-20 h-20 rounded-full border-4 border-red-400 shadow-md object-cover" />
                    <p className="mt-1 text-sm text-gray-700 font-semibold">Игрок B2</p>
                </div>
            </div>

            <div className="w-96 bg-white border-l border-gray-300 flex flex-col">
                <div className="flex justify-between items-center border-b border-gray-200 px-2">
                    <div className="flex flex-1">
                        <button
                            className={`flex-1 py-3 text-sm font-medium transition ${
                                activeChat === "global" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
                            }`}
                            onClick={() => setActiveChat("global")}
                        >
                            Общий чат
                        </button>
                        <button
                            className={`flex-1 py-3 text-sm font-medium transition ${
                                activeChat === "team" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
                            }`}
                            onClick={() => setActiveChat("team")}
                        >
                            Команда
                        </button>
                    </div>

                    <button className="ml-2 p-2 rounded-full hover:bg-gray-100 transition" onClick={() => setIsOpen(true)}>
                        <img src="/assets/settings_icon.svg" alt="Настройки" className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 border-b border-gray-200">
                    {messages[activeChat].map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === "Вы" ? "justify-end" : "justify-start"}`}>
                            <div
                                className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                                    msg.sender === "Вы" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                                }`}
                            >
                                {msg.sender !== "Вы" && (
                                    <p className="text-xs text-gray-400 italic mb-0.5">{msg.sender}</p>
                                )}
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                <div className="flex items-center gap-2 border-b border-gray-200 px-3 py-2">
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Введите сообщение..."
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button
                        onClick={sendMessage}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-2 rounded-lg shadow"
                    >
                        ➤
                    </Button>
                </div>

                <div className="h-40 bg-gray-50 px-4 py-3 overflow-y-auto">
                    <h3 className="font-semibold text-gray-700 mb-2 text-sm">История событий</h3>
                    <ul className="text-xs text-gray-600 space-y-1">
                        {history.map((event, index) => (
                            <li key={index}>• {event}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <div className="p-4 flex flex-col items-center justify-center gap-4">
                    <h4 className="text-2xl font-semibold text-center">Настройки</h4>
                    <div className="flex items-center justify-between">
                        <p>Громкость</p>
                        <input type="range" min={0} max={100} className="w-full mt-1"/>
                        <img src="/assets/sound_icon.svg" alt="Звук" className="w-6 h-6 ml-2"/>
                    </div>
                    <div className="flex items-center justify-between">
                        <p>Музыка</p>
                        <input type="range" min={0} max={100} className="w-full mt-1"/>
                        <img src="/assets/music_icon.svg" alt="Музыка" className="w-6 h-6 ml-2"/>
                    </div>
                    <Button>Выйти</Button>
                </div>
            </Modal>
        </div>
    );
}

export default GameScreen;
