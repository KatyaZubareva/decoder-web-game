import React from "react";

export default function GameCard({
    name = "Игра",
    players = 2,
    maxPlayers = 4,
    onClick
}) {
    const progress = (players / maxPlayers) * 100;
    const displayName = name || "Игра";

    return (
        <div
            onClick={onClick}
            className="
                w-full p-4 rounded-2xl cursor-pointer
                bg-white/70 backdrop-blur-md
                border border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.06)]
                hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)]
                hover:bg-white/90
                transition-all duration-300 ease-out
                flex justify-between items-center
            "
        >
            <div className="flex items-center gap-4">
                <div
                    className="
                        w-14 h-14 rounded-xl flex items-center justify-center
                        bg-gradient-to-br from-blue-500 to-indigo-600
                        text-white font-semibold text-xl shadow-md
                    "
                >
                    {displayName.charAt(0).toUpperCase()}
                </div>

                <div className="flex flex-col">
                    <p className="text-gray-900 font-semibold text-lg tracking-tight">
                        {displayName}
                    </p>
                    <p className="text-gray-500 text-sm">
                        Комната игры
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-end gap-2">
                <div className="w-28 h-2.5 bg-gray-200 rounded-full overflow-hidden relative">
                    <div
                        className="
                            absolute top-0 left-0 h-full 
                            bg-gradient-to-r from-blue-500 to-indigo-600
                        "
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                <div className="text-gray-700 font-semibold text-sm">
                    {players}/{maxPlayers}
                    <span className="text-gray-500 ml-1">игроков</span>
                </div>
            </div>
        </div>
    );
}
