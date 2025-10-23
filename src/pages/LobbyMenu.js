import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { useNavigate } from "react-router-dom";
import GameCard from "../components/ui/GameCard";

export function LobbyMenu() {
    const [data, setData] = useState(null);
    const [activeTab, setActiveTab] = useState("public");
    const [registeredUser, setRegisteredUser] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const [username, setUsername] = useState();

    useEffect(() => {
        fetch('https://se.ifmo.ru/~t129889/sql.php?s=s336584&f=get_game_state&p=[1,%20%22bob456%22,%20%22pass2%22]')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);


    return (
        <div className="flex flex-col items-center justify-between h-screen bg-gray-50 text-center gap-5 font-montserrat px-96 py-5">

            <div className="flex flex-row items-center justify-between w-full sticky top-0 mb-4">
                { registeredUser && <div className="flex flex-row items-center text-center">
                    <img src="/assets/avatar2.png" className="w-12"></img>
                    <p className="ml-3">{data.username}</p>
                </div>}
                { !registeredUser && <div className="flex flex-row items-start">
                    <Button className="text-white text-base font-semibold rounded-lg w-full">Регистрация</Button>
                    <Button className="bg-white hover:bg-gray-100 text-gray-900 text-base font-semibold rounded-lg w-full">Вход</Button>
                </div>}
                <div className="flex flex-row items-end">
                    <button onClick={() => setActiveTab("public")} className={` px-3 py-1 ${ activeTab === "public" ? "bg-blue-100 text-blue-700 font-medium rounded-lg" : "text-gray-900 font-medium" }`} >Публичые</button>
                    <button onClick={() => setActiveTab("private")} className={` px-3 py-1 ${ activeTab === "private" ? "bg-blue-100 text-blue-700 font-medium rounded-lg" : "text-gray-900 font-medium" }`}>Частные</button>
                </div>
            </div>

            <div className="flex flex-col w-full gap-5 overflow-y-auto mb-4">
                <GameCard>Игра 1</GameCard>
                <GameCard>Игра 2</GameCard>
            </div>

            <div className="sticky bottom z-10 w-full">
                <Button className="flex flex-row items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-base font-semibold rounded-lg shadow-lg w-full" onClick={() => setIsOpen(true)}>
                <img src="/assets/add_icon.svg"></img>
                Создать игру
                </Button>
            </div>

            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <h4 className="text-2xl font-semibold text-center mb-4 mt-4">Создать игру</h4>
                <div className="text-left mb-3">
                    <p className="mb-1">Название</p>
                    <input placeholder="Введите название игры" type="text" className="p-2 rounded-lg bg-white border border-slate-200"></input>
                </div>
                <div className="text-left mb-4">
                    <p className="mb-1">Пароль</p>
                    <input placeholder="Введите пароль" type="password" className="p-2 rounded-lg bg-white border border-slate-200"></input>
                </div>
                <Button className="bg-gray-900 hover:bg-gray-700 text-white text-base font-semibold rounded-lg shadow-lg w-full" onClick={() => {setIsOpen(false); navigate("./player");}}>Создать</Button>
            </Modal>

        </div>
    );
} 

export default LobbyMenu;