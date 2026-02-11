// hooks/usePlayerSession.js
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export function usePlayerSession() {
    const [session, setSession] = useState({
        gameId: null,
        teamId: null,
        role: null,
        playerName: null,
        roundNumber: null,
        correctCode: null,
        words: []
    });

    useEffect(() => {
        const gameId = Cookies.get("game_id");
        const teamId = Cookies.get("team_id");
        const role = Cookies.get("role");
        const playerName = Cookies.get("playerName");
        const roundNumber = Cookies.get("round_number");
        const correctCode = Cookies.get("correctCode");
        const words = Cookies.get("words");

        let parsedWords = [];
        try {
            parsedWords = words ? JSON.parse(words) : [];
        } catch (err) {
            console.warn("Ошибка парсинга words:", err);
        }

        setSession({
            gameId: gameId ? parseInt(gameId) : null,
            teamId: teamId ? parseInt(teamId) : null,
            role: role || null,
            playerName: playerName || null,
            roundNumber: roundNumber ? parseInt(roundNumber) : null,
            correctCode: correctCode || null,
            words: parsedWords
        });
    }, []);

    return session;
}
