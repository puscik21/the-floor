import {useCallback, useEffect, useState} from 'react';
import type {DuelInfo, DuelPlayer, GameState, Player, Question} from '../types';

const INIT_TIME_SECONDS = 300;
const PASS_PENALTY_SECONDS = 3;

interface GameDuelStateResult {
    duelInfo: DuelInfo;
    actions: {
        handleCorrectAnswer: () => void;
        handlePass: () => void;
        handleReturnToMap: () => void;
        // Funkcja do resetowania timera przy starcie duelu (wywoływana z GameContext)
        resetDuelState: (challenger: Player, defender: Player) => void;
    };
}

export const useGameDuelState = (
    gameState: GameState,
    setGameState: (state: GameState) => void,
    setWinner: (player: Player | null) => void,
    conquerTerritory: (winnerPlayer: Player, loserPlayer: Player) => void,
): GameDuelStateResult => {
    const [challengerTimer, setChallengerTimer] = useState(INIT_TIME_SECONDS);
    const [defenderTimer, setDefenderTimer] = useState(INIT_TIME_SECONDS);
    const [passTimer, setPassTimer] = useState(PASS_PENALTY_SECONDS);
    const [activePlayer, setActivePlayer] = useState<DuelPlayer>('challenger');
    const [isPassPenaltyActive, setIsPassPenaltyActive] = useState(false);

    // Potrzebujemy też stanu Challenger/Defender, ale będziemy go przechowywać w GameContext
    const [challenger, setChallenger] = useState<Player | null>(null);
    const [defender, setDefender] = useState<Player | null>(null);

    // ... (Możesz tu przenieść logikę Question, jeśli jest niezależna od innych stanów)

    // TIMERY
    useEffect(() => {
        if (gameState !== 'duel') return;
        const intervalId = setInterval(() => {
            if (activePlayer === 'challenger') setChallengerTimer((prev) => prev - 1);
            else setDefenderTimer((prev) => prev - 1);

            if (isPassPenaltyActive) setPassTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [activePlayer, gameState, isPassPenaltyActive]);

    // LOGIKA ZAKOŃCZENIA/KARY
    useEffect(() => {
        if (gameState !== 'duel') return;

        if (isPassPenaltyActive && passTimer <= 0) {
            setIsPassPenaltyActive(false);
            setPassTimer(PASS_PENALTY_SECONDS);
        }

        if (!challenger || !defender) return;

        if (challengerTimer <= 0) {
            setWinner(defender);
            setGameState('finished');
            conquerTerritory(defender, challenger);
        }
        if (defenderTimer <= 0) {
            setWinner(challenger);
            setGameState('finished');
            conquerTerritory(challenger, defender);
        }
    }, [passTimer, challengerTimer, defenderTimer, isPassPenaltyActive, gameState, challenger, defender, setGameState, conquerTerritory]);

    // AKCJE DUELU
    const handleCorrectAnswer = useCallback(() => setActivePlayer((prev) => prev === 'challenger' ? 'defender' : 'challenger'), []);
    const handlePass = useCallback(() => setIsPassPenaltyActive(true), []);

    // RESETOWANIE POJEDYNKU (Używane przez GameContext przy starcie)
    const resetDuelState = useCallback((challengerPlayer: Player, defenderPlayer: Player) => {
        setChallenger(challengerPlayer);
        setDefender(defenderPlayer);
        setChallengerTimer(INIT_TIME_SECONDS);
        setDefenderTimer(INIT_TIME_SECONDS);
        setPassTimer(PASS_PENALTY_SECONDS);
        setActivePlayer('challenger');
        setWinner(null);
        setIsPassPenaltyActive(false);
    }, [setWinner]);

    const handleReturnToMap = useCallback(() => {
        setChallenger(null);
        setDefender(null);
        setGameState('map');
    }, [setGameState]);

    const question: Question = {
        category: defender?.category || 'Co to jest?',
        type: 'image',
        text: 'Kto był pierwszym królem Polski?',
        imageUrl: 'https://przepisna.pl/wp-content/uploads/marchewka-wartosci-odzywcze.jpeg',
    }

    // Zwracamy stan i akcje
    const duelInfo: DuelInfo = {
        challengerTimer,
        defenderTimer,
        activePlayer,
        passTimer,
        isPassPenaltyActive,
        challengerName: challenger?.name || 'Gracz 1',
        defenderName: defender?.name || 'Gracz 2',
        question,
    };

    return {
        duelInfo,
        actions: {
            handleCorrectAnswer,
            handlePass,
            handleReturnToMap,
            resetDuelState,
        },
    };
};
