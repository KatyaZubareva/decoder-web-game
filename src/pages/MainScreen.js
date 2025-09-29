import React from "react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export function MainScreen() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col justify-center items-center text-center min-h-screen">
            <h1 className="text-6xl font-medium mb-6">Декодер</h1>
            <p className="text-center text-gray-700 max-w-xl mx-auto mb-6">
            Передавайте коды своей команде, не давая соперникам их перехватить.  
            Подсказки должны быть понятны только вашим игрокам, но запутывать противников.  
            Попытайтесь перехватить код соперников и получить преимущество!
            </p>
            <Button onClick={() => navigate("/lobby")}>Начать</Button>
        </div>
    );
}

export default MainScreen;