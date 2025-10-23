import React from "react";
import { Button } from "../components/ui/Button";

export function ProfilePage() {
    return (
        <div className="min-h-screen bg-gray-100 font-montserrat flex justify-center items-start py-10">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
                
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Личный кабинет</h1>
                
                <div className="flex flex-col items-center mb-8">
                    <img
                        src="/assets/avatar1.png"
                        alt="Аватар пользователя"
                        className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md object-cover"
                    />
                    <p className="mt-4 text-xl font-semibold text-gray-700">user_123</p>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <p className="text-gray-600 font-medium">Логин:</p>
                        <p className="text-gray-800 font-semibold">user_123</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="text-gray-600 font-medium">Пароль:</p>
                        <p className="text-gray-800 font-semibold">*******</p>
                    </div>
                </div>

                <div className="mt-8 flex flex-col gap-4">
                    <Button className="bg-gray-900 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-lg py-2">
                        Редактировать профиль
                    </Button>
                    <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg py-2">
                        Выйти
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
