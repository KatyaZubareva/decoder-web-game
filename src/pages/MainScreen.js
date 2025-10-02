import React from "react";
import { Button } from "../components/ui/Button";
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
                className="bg-gray-900 hover:bg-gray-700 text-white text-base font-semibold rounded-lg shadow-lg mb-20 max-w-xl w-full"
                >
                Начать
                </Button>
            </div>
        </div>
    );
}

export default MainScreen;