// src/components/ui/GuessFooter.js

import React, { useState } from "react";
import Button from "./Button";

export function GuessFooter({ onGuessSubmit, guess, setGuess, disabled, currentHint, isOpponentHint }) {
    const [digit1, setDigit1] = useState("");
    const [digit2, setDigit2] = useState("");
    const [digit3, setDigit3] = useState("");

    const handleDigitChange = (value, position) => {
        // Разрешаем только цифры от 1 до 4
        if (value === "" || (/^[1-4]$/.test(value))) {
            if (position === 1) {
                setDigit1(value);
                if (value && digit2 === "" && digit3 === "") {
                    // Автофокус на следующее поле
                    document.getElementById("guess-digit-2")?.focus();
                }
            } else if (position === 2) {
                setDigit2(value);
                if (value && digit3 === "") {
                    document.getElementById("guess-digit-3")?.focus();
                }
            } else if (position === 3) {
                setDigit3(value);
            }
            
            // Обновляем общий guess
            const newGuess = position === 1 ? `${value}${digit2}${digit3}` :
                            position === 2 ? `${digit1}${value}${digit3}` :
                            `${digit1}${digit2}${value}`;
            setGuess(newGuess);
        }
    };

    const handleSubmit = () => {
        const guessCode = `${digit1}${digit2}${digit3}`;
        if (guessCode.length === 3 && /^[1-4]{3}$/.test(guessCode)) {
            if (onGuessSubmit) {
                onGuessSubmit(guessCode);
            }
            if (setGuess) setGuess("");
            setDigit1("");
            setDigit2("");
            setDigit3("");
        }
    };

    const handleReset = () => {
        setDigit1("");
        setDigit2("");
        setDigit3("");
        setGuess("");
    };

    const isDisabled = disabled || digit1 === "" || digit2 === "" || digit3 === "";
    const hintWords = currentHint ? currentHint.split(" ") : [];

    return(
        <footer className="h-40 bg-white border-t border-slate-200 px-4 flex flex-col items-center justify-center z-10">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 w-full max-w-4xl text-center pl-1">
                {isOpponentHint 
                    ? `Подсказка соперников: ${hintWords.join(" • ")}` 
                    : currentHint 
                        ? `Подсказка вашего ведущего: ${hintWords.join(" • ")}`
                        : "Введите 3-значный код (цифры от 1 до 4):"
                }
            </div>
            
            <div className="flex items-center justify-center gap-3 w-full max-w-lg p-3 bg-slate-50 border border-slate-200 rounded-xl shadow-inner transition-all">
                
                {/* Ввод трех цифр */}
                <div className="flex gap-2">
                    <input
                        id="guess-digit-1"
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit1}
                        onChange={(e) => handleDigitChange(e.target.value, 1)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && !isDisabled) handleSubmit();
                            else if (!/^[1-4]$/.test(e.key) && e.key !== 'Backspace') e.preventDefault();
                        }}
                        disabled={disabled}
                        className="w-16 h-12 text-center text-2xl font-mono font-bold bg-white border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="1"
                    />
                    <input
                        id="guess-digit-2"
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit2}
                        onChange={(e) => handleDigitChange(e.target.value, 2)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && !isDisabled) handleSubmit();
                            else if (!/^[1-4]$/.test(e.key) && e.key !== 'Backspace') e.preventDefault();
                        }}
                        disabled={disabled}
                        className="w-16 h-12 text-center text-2xl font-mono font-bold bg-white border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="2"
                    />
                    <input
                        id="guess-digit-3"
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit3}
                        onChange={(e) => handleDigitChange(e.target.value, 3)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && !isDisabled) handleSubmit();
                            else if (!/^[1-4]$/.test(e.key) && e.key !== 'Backspace') e.preventDefault();
                        }}
                        disabled={disabled}
                        className="w-16 h-12 text-center text-2xl font-mono font-bold bg-white border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="3"
                    />
                </div>

                <Button 
                    className={`h-12 px-6 rounded-xl shadow-indigo-500/20 ml-2 transition-all duration-300 text-sm ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={isDisabled}
                >
                    Отправить
                </Button>
                
                <button 
                    onClick={handleReset}
                    disabled={disabled}
                    className={`p-2 text-slate-400 hover:text-red-500 transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <span className="text-sm font-medium">Сброс</span>
                </button>
            </div>
        </footer>
    )
}

export default GuessFooter;
