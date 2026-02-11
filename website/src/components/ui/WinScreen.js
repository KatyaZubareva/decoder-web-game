import React from "react";

export function WinScreen() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 animate-in fade-in duration-200">
            <div className="text-center text-white">
                <h2 className="text-4xl font-bold mb-4">🎉 ПОБЕДА!</h2>
                <p className="text-xl">Ваша команда получила 2 жетона перехвата!</p>
            </div>
        </div>
    )
}

export default WinScreen;
