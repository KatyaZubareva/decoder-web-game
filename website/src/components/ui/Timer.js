import React, { useEffect, useState } from "react";
import { Hourglass } from 'lucide-react';

const Timer = ({ duration }) => {
    const [time, setTime] = useState(duration);

    useEffect(() => {
        setTimeout(() => {
            setTime(time - 1000);
            if (time == 0) {
                setTime(time);
            }
        }, 1000);
    }, [time]);

    const getFormattedTime = (milliseconds) => {
        let total_seconds = parseInt(Math.floor(milliseconds / 1000));
        let seconds = parseInt(total_seconds % 60);

        if (seconds < 10) {
            return `00:0${seconds}`;
        }

        return `00:${seconds}`
    }

    return (
        <div className="flex justify-center items-center mt-3  px-6 py-2.5 ">
            <div className="flex flex-row gap-2 justify-center items-center px-6 py-2.5 rounded-full bg-red-100 text-red-600 border border-red-600">
                <Hourglass size={20} />
                {getFormattedTime(time)}
            </div>
        </div>
    )

}

export default Timer;