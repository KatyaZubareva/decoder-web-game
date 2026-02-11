import React from "react";
import { Lock, Users, ChevronRight } from "lucide-react";

const GameCard = ({ gameNumber, currentPlayers, maxPlayers, onClick }) => {
    const isFull = currentPlayers === maxPlayers;

    const baseClasses = "p-3 sm:p-4 rounded-xl border transition-all cursor-pointer flex justify-between items-center";
    const fullClasses = "bg-gray-50 border-gray-200 shadow-inner text-gray-400 opacity-80 cursor-not-allowed";
    const freeClasses = "bg-white border-gray-100 shadow-md hover:shadow-xl hover:border-indigo-400 group transform hover:scale-[1.01]";

    return (
        <div 
            onClick={!isFull ? onClick : undefined}
            className={`${baseClasses} ${isFull ? fullClasses : freeClasses} ${isFull ? '' : 'group-hover:shadow-indigo-100'}`}
        >
            <div className="flex items-center gap-2 sm:gap-3">
                <div className={`p-3 sm:p-2 rounded-lg border transition-colors ${isFull ? 'bg-gray-200 text-gray-500 border-gray-300' : 'bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-blue-100'}`}>
                    <Lock size={16} className="sm:w-[18px] sm:h-[18px]" />
                </div>
                <div>
                    <h5 className={`font-bold text-sm sm:text-lg tracking-tight ${isFull ? 'text-gray-500' : 'text-gray-900 group-hover:text-blue-700'} transition-colors`}>
                        Игра № {gameNumber}
                    </h5>
                    <p className="text-xs font-medium text-gray-400 mt-0.5">
                        {isFull ? "Комната заполнена" : "Требуется пароль"}
                    </p>
                </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-1 text-xs sm:text-sm font-bold">
                    <Users size={14} className={`sm:w-4 sm:h-4 ${isFull ? 'text-gray-400' : 'text-blue-400'}`} />
                    <span className={`transition-colors ${isFull ? 'text-gray-500' : 'text-gray-800'}`}>
                        {currentPlayers}
                    </span>
                    <span className="text-gray-400">/ {maxPlayers}</span>
                </div>
                
                <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center transition-all ${isFull ? 'bg-gray-300 text-gray-500' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'}`}>
                    <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                </div>
            </div>
        </div>
    );
};

export default GameCard;