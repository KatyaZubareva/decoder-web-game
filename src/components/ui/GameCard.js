import React from "react";

export function GameCard({children}) {
    return (
        <div className="bg-white border border-gray-400 rounded-lg py-4 w-full">
            {children}
        </div>
    )
}

export default GameCard;