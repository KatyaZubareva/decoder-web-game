// src/components/ui/GameHeader.js

import React from "react";
import Token from "./Token";

export function GameHeader({ turn, whiteTokens, blackTokens }) {
    return(
        <header className="h-24 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm z-10">
                    
                    {/* СИНИЕ: Жетоны */}
                    <div className="lg:flex flex-col hidden">
                        <div className="flex items-center gap-2">
                            <h3 className="text-blue-600 font-bold text-lg uppercase tracking-wider">Синие</h3>
                        </div>
                        <div className="flex gap-4">
                            {/* Белые жетоны */}
                            <div className="flex gap-1 items-center bg-slate-100 px-2 py-1 rounded-lg border border-slate-200">
                                <span className="text-[10px] text-slate-400 font-bold mr-1">УСПЕХ</span>
                                <Token color="white" filled={whiteTokens === 1} />
                                <Token color="white" filled={whiteTokens >= 2} />
                            </div>
                            {/* Черные жетоны */}
                            <div className="flex gap-1 items-center bg-slate-100 px-2 py-1 rounded-lg border border-slate-200">
                                <span className="text-[10px] text-slate-400 font-bold mr-1">ПЕРЕХВАТ</span>
                                <Token color="black" filled={blackTokens === 1} />
                                <Token color="black" filled={blackTokens >= 2} />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        {turn === 'blue' ? (
                            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-100 px-3 py-1.5 rounded-full border border-blue-200 shadow-sm animate-pulse transition-colors duration-500">
                                ХОД СИНИХ
                            </span>
                        ) : (
                            <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-100 px-3 py-1.5 rounded-full border border-rose-200 shadow-sm animate-pulse transition-colors duration-500">
                                ХОД КРАСНЫХ
                            </span>
                        )}
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-1 mt-3 rounded-full border border-slate-300 bg-slate-50">
                            ОЖИДАНИЕ ХОДА ПРОТИВНИКА
                        </span>
                    </div>

                    {/* КРАСНЫЕ: Жетоны */}
                    <div className="lg:flex flex-col hidden items-end">
                        <div className="flex items-end gap-2">
                            <h3 className="text-rose-600 font-bold text-lg uppercase tracking-wider">Красные</h3>
                        </div>
                        <div className="flex gap-4">
                             {/* Черные жетоны */}
                            <div className="flex gap-1 items-center bg-slate-100 px-2 py-1 rounded-lg border border-slate-200">
                                <span className="text-[10px] text-slate-400 font-bold mr-1">УСПЕХ</span>
                                <Token color="white" filled={whiteTokens === 1} />
                                <Token color="white" filled={whiteTokens >= 2} />
                            </div>
                            {/* Белые жетоны */}
                            <div className="flex gap-1 items-center bg-slate-100 px-2 py-1 rounded-lg border border-slate-200">
                                <span className="text-[10px] text-slate-400 font-bold mr-1">ПЕРЕХВАТ</span>
                                <Token color="black" filled={blackTokens === 1} />
                                <Token color="black" filled={blackTokens >= 2} />
                            </div>
                        </div>
                    </div>
                </header>
    )
}

export default GameHeader;