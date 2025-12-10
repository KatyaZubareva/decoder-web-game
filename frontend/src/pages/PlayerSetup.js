import React, { useState } from "react";
import Button from "../components/ui/Button";
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

  const handleRandomName = () => {
    const names = ["ShadowFox", "StormRider", "Nova", "Echo", "Luna", "Blade"];
    const random = names[Math.floor(Math.random() * names.length)];
    setPlayerName(random);
  };

  const isNameValid = playerName.trim().length > 0;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 font-montserrat px-4 relative">

      <div className="absolute top-0 left-0 right-0 flex flex-row gap-2 justify-center mt-10">
        <div className="w-40 h-1 bg-blue-600 rounded-full"></div>
        <div className="w-40 h-1 bg-gray-300 rounded-full"></div>
      </div>

      <h2 className="text-3xl font-semibold mb-6">Настройка игрока</h2>

      <img
        src={selectedAvatar}
        alt="Selected avatar"
        className="w-40 h-40 rounded-full object-cover mb-6 shadow-md"
      />

      <div className="grid grid-cols-4 gap-4 mb-8">
        {avatars.map((avatar, index) => (
          <div
            key={index}
            className={`border-4 rounded-full p-1 cursor-pointer transition ${
              selectedAvatar === avatar ? "border-blue-600" : "border-transparent"
            }`}
            onClick={() => setSelectedAvatar(avatar)}
          >
            <img
              src={avatar}
              alt={`Avatar ${index + 1}`}
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-8 w-full max-w-sm">
        <input
          type="text"
          placeholder="Введите имя"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="flex-grow px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleRandomName}
          className="p-2 hover:opacity-80 active:scale-95 transition"
        >
          <img
            src="/assets/random_icon.svg"
            alt="Random name"
            className="w-6 h-6"
          />
        </button>
      </div>

      <Button
        onClick={() => navigate("/lobby/player/team")}
        disabled={!isNameValid}
        className={`text-white text-base font-semibold rounded-lg shadow-lg mb-20 max-w-sm w-full transition ${
          isNameValid
            ? "bg-gray-800 hover:bg-gray-900 cursor-pointer"
            : "bg-gray-400 cursor-not-allowed opacity-70"
        }`}
      >
        Продолжить
      </Button>
    </div>
  );
}

export default PlayerSetup;
