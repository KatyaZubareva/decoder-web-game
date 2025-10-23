import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export function GameCard({ title, playersCount, children }) {
    const navigate = useNavigate();

    return (
        <div className="bg-white border border-gray-300 rounded-2xl transition-all duration-200 p-6 w-full flex flex-row items-center justify-between text-left hover:bg-blue-100 hover:stroke-blue-700 gap-3">
            
            <div className="flex flex-col flex-1 min-w-0">
                {title && (
                    <h2 className="text-xl font-semibold text-gray-800 mb-1 truncate">
                        {title}
                    </h2>
                )}

                {children && <div className="mb-2 text-gray-700 text-sm">{children}</div>}

                <p className="text-gray-600 text-sm">
                    Игроков: <span className="font-medium">{playersCount || "2/4"}</span>
                </p>
            </div>

            <Button
                onClick={() => navigate("/lobby/game")}
                className="bg-gray-900 hover:bg-gray-700 text-white text-base font-semibold rounded-lg px-6 py-2 flex-shrink-0"
            >
                Начать
            </Button>
        </div>
    );
}

export default GameCard;
