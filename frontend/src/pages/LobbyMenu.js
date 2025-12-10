import React, { useEffect, useState } from "react";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import { useNavigate } from "react-router-dom";
import GameCard from "../components/ui/GameCard";

export function LobbyMenu() {
    const [data, setData] = useState(null);
    const [registeredUser, setRegisteredUser] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(
            "https://se.ifmo.ru/~t129889/sql.php?s=s336584&f=get_game_state&p=[1,%20%22bob456%22,%20%22pass2%22]"
        )
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 font-montserrat flex flex-col items-center py-6 px-4">

            <div className="w-full max-w-4xl flex justify-between items-center mb-6">

                {registeredUser ? (
                    <div className="flex items-center gap-3">
                        <img src="/assets/avatar2.png" className="w-12 h-12 rounded-full" alt="avatar" />
                        <p className="text-lg font-semibold text-gray-800">{data?.username}</p>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <Button
                            className="bg-gray-900 hover:bg-gray-700 text-white rounded-lg font-semibold"
                            onClick={() => navigate("/register")}
                        >
                            Регистрация
                        </Button>

                        <Button
                            className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-900 rounded-lg font-semibold"
                            onClick={() => navigate("/login")}
                        >
                            Вход
                        </Button>
                    </div>
                )}
            </div>

            <div className="w-full max-w-4xl p-5 flex flex-col gap-3 max-h-[75vh] overflow-y-auto">
                <GameCard>Игра 1</GameCard>
                <GameCard>Игра 2</GameCard>
                <GameCard>Игра 3</GameCard>
                <GameCard>Игра 4</GameCard>
                <GameCard>Игра 5</GameCard>
                <GameCard>Игра 6</GameCard>
                <GameCard>Игра 2</GameCard>
                <GameCard>Игра 3</GameCard>
                <GameCard>Игра 4</GameCard>
                <GameCard>Игра 5</GameCard>
                <GameCard>Игра 6</GameCard>
            </div>

            <div className="w-full max-w-4xl mt-6">
                <Button
                    className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg shadow-lg w-full"
                    onClick={() => setIsOpen(true)}
                >
                    <img src="/assets/add_icon.svg" alt="add" />
                    Создать игру
                </Button>
            </div>

            <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                <h4 className="text-2xl font-semibold text-center mb-4">Создать игру</h4>

                <div className="mb-6">
                    <label className="block mb-1 text-gray-700 font-medium">Пароль</label>
                    <input
                        type="password"
                        placeholder="Введите пароль"
                        className="p-3 py-2 rounded-lg bg-gray-50 border border-gray-300 w-full focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <Button
                    className="bg-gray-800 hover:bg-gray-900 text-white rounded-lg w-full font-semibold"
                    onClick={() => {
                        setIsOpen(false);
                        navigate("./player");
                    }}
                >
                    Создать
                </Button>
            </Modal>
        </div>
    );
}

export default LobbyMenu;
