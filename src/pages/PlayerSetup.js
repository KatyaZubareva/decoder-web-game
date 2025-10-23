import React, { useState } from "react";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

const avatars = [
  "/assets/avatar1.png",
  "/assets/avatar2.png",
  "/assets/avatar3.png",
  "/assets/avatar4.png"
];

export function PlayerSetup() {
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 font-montserrat px-4">

      <div className="flex flex-row gap-2 mb-10">
        <div className="w-40 h-1 bg-blue-600 rounded-full"></div>
        <div className="w-40 h-1 bg-gray-300 rounded-full"></div>
      </div>

      <h2 className="text-3xl font-semibold mb-6">Настройка игрока</h2>

      <img src="/assets/avatar2.png" className="w-40 h-40 rounded-full object-cover"></img>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {avatars.map((avatar, index) => (
          <div
            key={index}
            className={`border-4 rounded-full p-1 cursor-pointer transition ${
              selectedAvatar === avatar ? "border-blue-600" : "border-transparent"
            }`}
            onClick={() => setSelectedAvatar(avatar)}
          >
            <img src={avatar} alt={`Avatar ${index + 1}`} className="w-20 h-20 rounded-full object-cover"/>
          </div>
        ))}
      </div>

      <div className="mb-6 w-full max-w-xs">
        <p className="mb-2 text-sm font-medium">Имя игрока</p>
        <input
          type="text"
          placeholder="Введите имя"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <Button
      onClick={() => navigate("/lobby/player/team")}
      className="bg-gray-900 hover:bg-gray-700 text-white text-base font-semibold rounded-lg shadow-lg mb-20 w-full"
      >
      Продолжить
      </Button>
    </div>
  );
}

export default PlayerSetup;
