// src/components/ui/GuessFooter.js

import React from "react";
// Импорт компонента Button оставлен, так как он часть UI
import Button from "./Button";

export function GuessFooter() {
    // Статические данные для демонстрации внешнего вида
    const staticCodeExample = [
        { id: 1, word: "Орбита" },
        { id: 3, word: "Корень" },
    ];
    const maxCodeLength = 3;
    const isGuessing = true; // Статическое отображение: Фаза отгадки
    const selectedLength = staticCodeExample.length;

    return(
        <footer className="h-40 bg-white border-t border-slate-200 px-4 flex flex-col items-center justify-center z-10">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 w-full max-w-4xl text-center pl-1">
                {/* Статический текст на основе условного режима */}
                {isGuessing 
                    ? `Выберите ${maxCodeLength} карты для отгадки:` 
                    : `Выберите ${maxCodeLength} карты для подсказки:`
                }
            </div>
            
            <div className="flex items-center justify-center gap-3 w-full max-w-lg p-3 bg-slate-50 border border-slate-200 rounded-xl shadow-inner transition-all">
                
                {/* Статический рендеринг выбранных токенов (2 из 3) */}
                {staticCodeExample.map((card) => (
                    <div 
                        key={card.id} 
                        // Удален onClick
                        className="relative w-28 h-12 flex items-center justify-center text-sm font-black text-white bg-indigo-600 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer group overflow-hidden"
                    >
                        <span className="font-semibold">{card.word}</span>
                        {/* Статический эффект "Вернуть" */}
                        <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/80 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-xs font-semibold text-white">Вернуть</span>
                        </div>
                    </div>
                ))}
                
                {/* Статический рендеринг пустых слотов (1 из 3) */}
                {Array(maxCodeLength - selectedLength).fill(0).map((_, index) => (
                    <div key={index + selectedLength} className="w-28 h-12 flex items-center justify-center text-xs font-medium text-slate-400 border-2 border-dashed border-slate-300 rounded-lg bg-white/50">
                        Слот {selectedLength + index + 1}
                    </div>
                ))}

                {/* Статическая Кнопка (имитация неактивности, т.к. 2/3) */}
                <Button 
                    className={`h-12 px-6 rounded-xl shadow-indigo-500/20 ml-2 transition-all duration-300 text-sm opacity-50 cursor-not-allowed`} // Используем opacity-50 для неактивного вида
                    variant="primary"
                    // Удален onClick и disabled
                >
                    {isGuessing ? 'Дать отгадку' : 'Дать подсказку'}
                </Button>
                
                {/* Статическая кнопка Сброс (имитация активности) */}
                <button 
                    // Удален onClick и disabled
                    className={`p-2 text-slate-400 hover:text-red-500 transition-colors opacity-100`}
                >
                    <span className="text-sm font-medium">Сброс</span>
                </button>
            </div>
        </footer>
    )
}

export default GuessFooter;