import React, { useEffect, useState } from "react";
import { Hourglass } from 'lucide-react';

const Timer = ({ timeLeft }) => {
    const [time, setTime] = useState(timeLeft);
    const [totalSeconds, setTotalSeconds] = useState(0);

    useEffect(() => {
        if (!timeLeft || timeLeft === '00:00:00') {
            setTime(null);
            return;
        }

        // Парсим время в формате HH:MM:SS
        const parts = timeLeft.split(':');
        const hours = parseInt(parts[0]) || 0;
        const minutes = parseInt(parts[1]) || 0;
        const seconds = parseInt(parts[2]) || 0;
        
        const total = hours * 3600 + minutes * 60 + seconds;
        setTotalSeconds(total);
        setTime(timeLeft);
    }, [timeLeft]);

    useEffect(() => {
        if (totalSeconds <= 0) return;

        const interval = setInterval(() => {
            setTotalSeconds(prev => {
                if (prev <= 1) {
                    setTime('00:00:00');
                    return 0;
                }
                
                const newTotal = prev - 1;
                const hours = Math.floor(newTotal / 3600);
                const minutes = Math.floor((newTotal % 3600) / 60);
                const seconds = newTotal % 60;
                
                const formatTime = (val) => val.toString().padStart(2, '0');
                const newTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
                setTime(newTime);
                
                return newTotal;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [totalSeconds]);

    if (!time || time === '00:00:00' || totalSeconds <= 0) {
        return null;
    }

    return (
        <div className="flex justify-center items-center mt-3 px-6 py-2.5">
            <div className="flex flex-row gap-2 justify-center items-center px-6 py-2.5 rounded-full bg-red-100 text-red-600 border border-red-600">
                <Hourglass size={20} />
                {time}
            </div>
        </div>
    )
}

export default Timer;