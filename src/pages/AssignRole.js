import React, { useState, useRef, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

export function AssignRole() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 font-montserrat p-6 text-center">
            <h2 className="text-xl text-gray-600 mb-2">Вам выпала роль</h2>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Шифровальщик!</h1>
            <p className="max-w-xl text-gray-700 text-base leading-relaxed">
                Берите карту кода из колоды своей команды и изучайте её, не показывая другим игрокам. 
                Ваша цель — сделать так, чтобы команда назвала код (например, 3.4.2).
            </p>
            <Button
            onClick={() => navigate("/lobby/game")}
            className="bg-gray-900 hover:bg-gray-700 text-white text-base font-semibold rounded-lg shadow-lg mb-20 max-w-xl w-full"
            >
            Начать
            </Button>
        </div>
    );
}

export default AssignRole;
