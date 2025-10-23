import React from "react";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

export function TeamSetup() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 font-montserrat px-4">
      <div className="flex flex-row gap-2 mb-10">
        <div className="w-40 h-1 bg-blue-600 rounded-full"></div>
        <div className="w-40 h-1 bg-blue-600 rounded-full"></div>
      </div>
      <h1 className="text-3xl font-semibold mb-8">Выбери команду</h1>

      <div className="flex items-center gap-6 mb-12">
        <div className="flex flex-col items-center">
          <img
            src="/assets/team_blue.png"
            alt="Команда Синяя"
            className="w-72 object-contain"
          />
          <p className="mt-2 font-medium text-gray-700">Синяя команда</p>
        </div>

        <p className="text-2xl font-bold">vs</p>

        <div className="flex flex-col items-center">
          <img
            src="/assets/team_red.png"
            alt="Команда Красная"
            className="w-72 object-contain"
          />
          <p className="mt-2 font-medium text-gray-700">Красная команда</p>
        </div>
      </div>

      <Button
        onClick={() => navigate("/lobby/player/team/role")}
        className="bg-gray-900 hover:bg-gray-700 text-white text-base font-semibold rounded-lg shadow-lg w-full"
      >
        Продолжить
      </Button>
    </div>
  );
}

export default TeamSetup;
