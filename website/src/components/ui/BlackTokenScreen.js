import React from "react";

export function BlackTokenScreen() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 animate-in fade-in duration-200">
            <img src="/assets/black_token.png" alt="Черный жетон" className="h-32 w-32"/>
            <div>
                <h2 className="font-bold text-white text-xl flex items-center">К сожалению, ваша попытка отгадки не удалась. Вы получаете черный жетон!</h2>
                <p className="font-bold text-white flex items-center">Вы не смогли расшифровать кодовое слово, загаданное вашим ведущим.</p>
            </div>
        </div>
    )
}

export default BlackTokenScreen;