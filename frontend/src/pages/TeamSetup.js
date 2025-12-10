import React, { useState } from "react";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

export function TeamSetup() {
  const navigate = useNavigate();
  const [selectedTeam, setSelectedTeam] = useState(null);

  const isTeamSelected = selectedTeam !== null;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 font-montserrat px-4">
      
      <div className="absolute top-0 left-0 right-0 flex flex-row gap-2 justify-center mt-10">
        <div className="w-40 h-1 bg-blue-600 rounded-full"></div>
        <div className="w-40 h-1 bg-blue-600 rounded-full"></div>
      </div>

      <h1 className="text-3xl font-semibold mb-8">Выбери команду</h1>

      <div className="flex items-center gap-6 mb-12">

        <div
          className={`flex flex-col items-center relative cursor-pointer transition-transform ${
            selectedTeam === "blue" ? "scale-105" : ""
          }`}
          onClick={() => setSelectedTeam("blue")}
        >
          <img
            src="/assets/team_blue.png"
            alt="Синяя команда"
            className="w-72 object-contain"
          />
          <p className="absolute bottom-2 text-white font-semibold px-3 py-1 rounded-lg text-lg">
            Синяя команда 0/2
          </p>
        </div>

        <p className="text-2xl font-bold">vs</p>

        <div
          className={`flex flex-col items-center relative cursor-pointer transition-transform ${
            selectedTeam === "red" ? "scale-105" : ""
          }`}
          onClick={() => setSelectedTeam("red")}
        >
          <img
            src="/assets/team_red.png"
            alt="Красная команда"
            className="w-72 object-contain"
          />
          <p className="absolute bottom-2 text-white font-semibold px-3 py-1 rounded-lg text-lg">
            Красная команда 0/2
          </p>
        </div>

      </div>

      <Button
        onClick={() => navigate("/lobby/player/team/role")}
        disabled={!isTeamSelected}
        className={`text-white text-base font-semibold rounded-lg shadow-lg max-w-xl w-full transition ${
          isTeamSelected
            ? "bg-gray-900 hover:bg-gray-700 cursor-pointer"
            : "bg-gray-400 cursor-not-allowed opacity-70"
        }`}
      >
        Продолжить
      </Button>

    </div>
  );
}

export default TeamSetup;
