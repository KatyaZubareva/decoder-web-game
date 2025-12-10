// src/components/ui/HintFooter.js

import React from "react";
import Button from "./Button";
import { Send } from "lucide-react";


export function HintFooter() {
    return(
        <footer className="h-32 bg-white border-t border-slate-200 px-8 lg:flex hidden flex-col items-center justify-center z-10">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 w-full max-w-4xl text-left pl-1">
                Введите код (подсказку из 3 слов):
            </div>
            <div className="flex items-center gap-4 w-full max-w-4xl">
                    <div className="flex-1 flex gap-2">
                        <div className="flex-1 relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-xs select-none">
                                #1
                            </span>
                            <input 
                                value={""}
                                placeholder="Слово..." 
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-3 font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="flex-1 flex gap-2">
                        <div className="flex-1 relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-xs select-none">
                                #2
                            </span>
                            <input 
                                value={""}
                                placeholder="Слово..." 
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-3 font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="flex-1 flex gap-2">
                        <div className="flex-1 relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 font-bold text-xs select-none">
                                #3
                            </span>
                            <input 
                                value={""}
                                placeholder="Слово..." 
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-3 font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm"
                            />
                        </div>
                    </div>
                        
                <Button className="h-12 px-8 rounded-xl shadow-indigo-500/20" variant="primary">
                    Отправить <Send size={18} />
                </Button>
            </div>
        </footer>
    )
}

export default HintFooter;