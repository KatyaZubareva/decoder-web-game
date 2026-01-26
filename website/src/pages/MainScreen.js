import React, { useState } from "react";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

export function MainScreen() {
    const navigate = useNavigate();

    return (
        <div className="font-montserrat" style={{backgroundImage: "url('/assets/main_screen_background.png')", backgroundSize: "cover", backgroundPosition: "center",}}>
            <div className="flex flex-col justify-end items-center text-center min-h-screen">
                <h1 className="text-5xl text-white font-semibold mb-6">Декодер</h1>
                <p className="text-base text-center text-white max-w-xl mx-auto mb-6">
                Передавайте коды своей команде, не давая соперникам их перехватить.  
                Подсказки должны быть понятны только вашим игрокам, но запутывать противников.  
                Попытайтесь перехватить код соперников и получить преимущество!
                </p>
                <Button
                onClick={() => navigate("/lobby")}
                variant="primary"
                className="pointer-events-auto flex items-center gap-2 sm:gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 sm:py-3.5 px-6 sm:px-8 rounded-full shadow-[0_12px_30px_rgb(79,70,229,0.4)] transition-all hover:scale-[1.03] active:scale-95 text-sm sm:text-base"
                >
                Начать
                </Button>
            </div>

        </div>
    );
}

export default MainScreen;