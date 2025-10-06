import React, { useState } from "react";
import { Button } from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { useNavigate } from "react-router-dom";
import GameCard from "../components/ui/GameCard";

export function LobbyMenu() {
    const [activeTab, setActiveTab] = useState("public");
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-between h-screen bg-gray-50 text-center gap-5 font-montserrat px-96 py-5">

            <div className="flex flex-row items-center justify-between w-full sticky top-0 mb-4">
                <div className="flex flex-row items-start">
                    <img src="/assets/avatar2.png" className="w-12"></img>
                    <p>user_123</p>
                </div>
                <div className="flex flex-row items-end">
                    <button onClick={() => setActiveTab("public")} className={` px-3 py-1 ${ activeTab === "public" ? "bg-blue-700 text-white rounded-full" : "text-gray-900" }`} >Публичые</button>
                    <button onClick={() => setActiveTab("private")} className={` px-3 py-1 ${ activeTab === "private" ? "bg-blue-700 text-white rounded-full" : "text-gray-900" }`}>Частные</button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto mb-4 gap-5">
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
                <h4 className="text-2xl font-semibold text-center">Создать игру</h4>
                <div>
                    <p>Название</p>
                    <input placeholder="Введите название игры" type="text" className="rounded-lg bg-white stroke-slate-200"></input>
                </div>
                <div>
                    <p>Пароль</p>
                    <input placeholder="Введите пароль" type="password" className="rounded-lg bg-white stroke-slate-200"></input>
                </div>
                <Button className="bg-gray-900 hover:bg-gray-700 text-white text-base font-semibold rounded-lg shadow-lg w-full" onClick={() => {setIsOpen(false); navigate("./game");}}>Создать</Button>
            </Modal>

        </div>
    );
} 

export default LobbyMenu;