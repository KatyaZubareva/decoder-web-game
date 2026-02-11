// src/components/ui/GameHeader.js

import React from "react";
import Token from "./Token";
import { Menu } from 'lucide-react';

export function GameHeader({ 
  turn, 
  myTeamTokens, 
  opponentTeamTokens,
  playerRole, 
  isMyTurn,
  gamePhase,
  myTeamColor,
  opponentTeamColor
}) {
    // Жетоны для синей команды (всегда слева)
    const blueTeamTokens = myTeamColor === 'blue' ? myTeamTokens : opponentTeamTokens;
    // Жетоны для красной команды (всегда справа)  
    const redTeamTokens = myTeamColor === 'red' ? myTeamTokens : opponentTeamTokens;
    
    const blueWhite = blueTeamTokens?.white_tokens || 0;
    const blueBlack = blueTeamTokens?.black_tokens || 0;
    const redWhite = redTeamTokens?.white_tokens || 0;
    const redBlack = redTeamTokens?.black_tokens || 0;

    // Определяем текст для отображения текущего хода
    const getTurnText = () => {
        if (gamePhase === 'spymaster') {
            return 'ХОД ВЕДУЩИХ';
        } else {
            return 'ХОД ИГРОКОВ';
        }
    };

    // Определяем стили для блока хода
    const getTurnStyles = () => {
        const baseStyles = "text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border transition-colors duration-500";
        
        if (isMyTurn) {
            return `${baseStyles} text-emerald-700 bg-emerald-100 border-emerald-200 animate-pulse`;
        } else {
            return `${baseStyles} text-slate-600 bg-slate-100 border-slate-200`;
        }
    };

    return(
        <header className="h-24 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm z-10">
            <Menu className="flex lg:hidden" />
            
            {/* СИНИЕ (всегда слева) */}
            <div className="lg:flex flex-col hidden">
                <div className="flex items-center gap-2">
                    <h3 className="text-blue-600 font-bold text-lg uppercase tracking-wider">
                        Синие
                    </h3>
                    {myTeamColor === 'blue' && (
                        <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                            ВАША КОМАНДА
                        </span>
                    )}
                </div>
                <div className="flex gap-4">
                    {/* Черные жетоны - ПЕРЕХВАТ (успешный перехват кода соперников) */}
                    <div className="flex gap-1 items-center bg-slate-100 px-2 py-1 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-400 font-bold mr-1">ПЕРЕХВАТ</span>
                        <Token color="black" filled={blueBlack >= 1} />
                        <Token color="black" filled={blueBlack >= 2} />
                    </div>
                    {/* Белые жетоны - ПОМЕХИ (неудачная попытка угадать свой код) */}
                    <div className="flex gap-1 items-center bg-slate-100 px-2 py-1 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-400 font-bold mr-1">ПОМЕХИ</span>
                        <Token color="white" filled={blueWhite >= 1} />
                        <Token color="white" filled={blueWhite >= 2} />
                    </div>
                </div>
            </div>

            {/* Центр - информация о ходе */}
            <div className="flex flex-col items-center justify-center gap-1">
                <span className={getTurnStyles()}>
                    {getTurnText()}
                </span>
                {isMyTurn && (
                    <span className="text-[10px] text-emerald-600 font-bold">
                        ВАШ ХОД
                    </span>
                )}
            </div>

            {/* КРАСНЫЕ (всегда справа) */}
            <div className="lg:flex flex-col hidden items-end">
                <div className="flex items-end gap-2">
                    <h3 className="text-rose-600 font-bold text-lg uppercase tracking-wider">
                        Красные
                    </h3>
                    {myTeamColor === 'red' && (
                        <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">
                            ВАША КОМАНДА
                        </span>
                    )}
                </div>
                <div className="flex gap-4">
                    {/* Черные жетоны - ПЕРЕХВАТ */}
                    <div className="flex gap-1 items-center bg-slate-100 px-2 py-1 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-400 font-bold mr-1">ПЕРЕХВАТ</span>
                        <Token color="black" filled={redBlack >= 1} />
                        <Token color="black" filled={redBlack >= 2} />
                    </div>
                    {/* Белые жетоны - ПОМЕХИ */}
                    <div className="flex gap-1 items-center bg-slate-100 px-2 py-1 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-400 font-bold mr-1">ПОМЕХИ</span>
                        <Token color="white" filled={redWhite >= 1} />
                        <Token color="white" filled={redWhite >= 2} />
                    </div>
                </div>
            </div>
            
            <div className="flex lg:hidden"></div>
        </header>
    );
}

export default GameHeader;