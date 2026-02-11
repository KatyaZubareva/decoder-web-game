import React from "react";

export function WhiteTokenScreen() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 animate-in fade-in duration-200">
            <img src="/assets/white_token.png" alt="Белый жетон" className="h-32 w-32"/>
            <div>
                <h2 className="font-bold text-white text-xl flex items-center">Перехват Успешен! Белый Жетон Ваш!</h2>
                <p className="font-bold text-white flex items-center">Ваша догадка оказалась верной: вы успешно отгадали код, загаданный командой противника.</p>
            </div>
        </div>
    )
}

export default WhiteTokenScreen;