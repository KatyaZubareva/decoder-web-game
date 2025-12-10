import React from "react";

export function HintBlock() {
    return (
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 p-4 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-rose-200/50 z-10 flex items-center gap-4">
                <span className="text-sm font-bold text-rose-600 uppercase tracking-wider pr-2 border-r border-slate-200">
                    Подсказки (Красные):
                </span>
                {lastHints.map((hint, index) => (
                    <div key={index} className="px-3 py-1 bg-rose-100 text-rose-800 text-sm font-semibold rounded-full shadow-inner">
                        {hint}
                    </div>
                ))}
        </div>
    )
}

export default HintBlock;