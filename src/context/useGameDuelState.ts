import {useCallback, useEffect, useState} from 'react';
import type {DuelInfo, DuelPlayer, GameConfig, GameState, Player, Question} from '../types';
import {getImageFromCategory} from '../components/duel/question/questionUtils.ts';
import {checkImageExists} from '../components/duel/question/imageLoader.ts';
import {notifyWarning} from "../utils/toast/notifier.tsx";

interface GameDuelStateResult {
    duelInfo: DuelInfo;
    actions: {
        handleCorrectAnswer: () => void;
        handlePass: () => void;
        handleReturnToMap: () => void;
        prepareDuelState: (challenger: Player, defender: Player) => void;
        addTimeBoostsToPlayerTimer: (duelPlayer: DuelPlayer) => void;
    };
}

export const useGameDuelState = (
    gameConfig: GameConfig,
    gameState: GameState,
    setGameState: (state: GameState) => void,
    setWinner: (player: Player | null) => void,
    conquerTerritory: (winnerName: string, loserName: string, inheritedCategory: string) => void,
    allPlayers: Player[]
): GameDuelStateResult => {
    const [challengerTimer, setChallengerTimer] = useState(gameConfig.initTimeSeconds);
    const [defenderTimer, setDefenderTimer] = useState(gameConfig.initTimeSeconds);
    const [passTimer, setPassTimer] = useState(gameConfig.passPenaltySeconds);
    const [activePlayer, setActivePlayer] = useState<DuelPlayer>('challenger');
    const [isPassPenaltyActive, setIsPassPenaltyActive] = useState(false);
    const [questionId, setQuestionId] = useState(1);
    const [questionImageUrl, setQuestionImageUrl] = useState('/util/placeholder.png');
    const [isCheckingNextQuestion, setIsCheckingNextQuestion] = useState(false);
    const [challengerName, setChallengerName] = useState<string | null>(null);
    const [defenderName, setDefenderName] = useState<string | null>(null);

    const challenger = allPlayers.find(p => p.name === challengerName) || null;
    const defender = allPlayers.find(p => p.name === defenderName) || null;

    useEffect(() => {
        if (gameState !== 'duel') return;
        const intervalId = setInterval(() => {
            if (activePlayer === 'challenger') setChallengerTimer((prev) => prev - 0.1);
            else setDefenderTimer((prev) => prev - 0.1);

            if (isPassPenaltyActive) setPassTimer((prev) => prev - 0.1);
        }, 100);
        return () => clearInterval(intervalId);
    }, [activePlayer, gameState, isPassPenaltyActive]);

    const getQuestionCategory = useCallback(() => {
        return defender?.category || 'Co to jest?';
    }, [defender?.category])

    useEffect(() => {
        setQuestionImageUrl(getImageFromCategory(getQuestionCategory(), questionId, gameConfig.imageFileFormat))
    }, [gameConfig.imageFileFormat, getQuestionCategory, questionId]);

    const getWinnerOnTimeout = useCallback((challenger: Player, defender: Player) => {
        if (challengerTimer > defenderTimer) {
            return challenger;
        }
        if (defenderTimer > challengerTimer) {
            return defender;
        }
        return defender;
    }, [challengerTimer, defenderTimer]);

    const finishDuel = useCallback((winningPlayer: Player, losingPlayer: Player, inheritedCategory: string) => {
        setWinner(winningPlayer);
        setGameState('finished');
        conquerTerritory(winningPlayer.name, losingPlayer.name, inheritedCategory);
    }, [conquerTerritory, setGameState, setWinner]);

    const tryAdvanceQuestionId = useCallback(async (currentId: number) => {
        if (isCheckingNextQuestion) return;

        setIsCheckingNextQuestion(true);

        const currentCategory = getQuestionCategory();
        const nextId = currentId + 1;
        const nextImageUrl = getImageFromCategory(currentCategory, nextId, gameConfig.imageFileFormat);

        const exists = await checkImageExists(nextImageUrl);

        if (exists) {
            setQuestionId(nextId);
        } else {
            notifyWarning(`Koniec pytań w kategorii ${currentCategory}`, `Brak pliku ${nextId}.${gameConfig.imageFileFormat}. Koniec pojedynku.`)
            if (challenger && defender) {
                const winner = getWinnerOnTimeout(challenger, defender);
                finishDuel(winner, winner.name === challenger.name ? defender : challenger, challenger.category);
            }
        }

        setIsCheckingNextQuestion(false);
    }, [isCheckingNextQuestion, getQuestionCategory, gameConfig.imageFileFormat, challenger, defender, getWinnerOnTimeout, finishDuel]);

    // TODO: Improve duel timer
    useEffect(() => {
        if (gameState !== 'duel') return;

        if (isPassPenaltyActive && passTimer <= 0) {
            setIsPassPenaltyActive(false);
            setPassTimer(gameConfig.passPenaltySeconds);
            tryAdvanceQuestionId(questionId);
        }

        if (!challenger || !defender) return;

        if (challengerTimer <= 0) {
            finishDuel(defender, challenger, challenger.category);
        }
        if (defenderTimer <= 0) {
            finishDuel(challenger, defender, challenger.category);
        }
    }, [passTimer, challengerTimer, defenderTimer, isPassPenaltyActive, gameState, challenger, defender, setGameState, conquerTerritory, setWinner, tryAdvanceQuestionId, questionId, finishDuel, gameConfig.passPenaltySeconds]);

    const handleCorrectAnswer = useCallback(() => {
        setActivePlayer((prev: DuelPlayer) => {
            return prev === 'challenger' ? 'defender' : 'challenger'
        })
        tryAdvanceQuestionId(questionId);
    }, [questionId, tryAdvanceQuestionId]);

    const handlePass = useCallback(() => setIsPassPenaltyActive(true), []);

    const handleReturnToMap = useCallback(() => {
        setChallengerName(null); // TODO: DO I need this?
        setDefenderName(null); // TODO: DO I need this?
        setGameState('floor');
    }, [setGameState]);

    const addTimeBoostsToPlayerTimer = useCallback((duelPlayer: DuelPlayer) => {
        if (duelPlayer === 'challenger') {
            setChallengerTimer(gameConfig.initTimeSeconds + 5)
        } else {
            setDefenderTimer(gameConfig.initTimeSeconds + 5)
        }
    }, [gameConfig.initTimeSeconds]);

    const prepareDuelState = useCallback((challengerPlayer: Player, defenderPlayer: Player) => {
        setChallengerName(challengerPlayer.name);
        setDefenderName(defenderPlayer.name);
        setChallengerTimer(gameConfig.initTimeSeconds);
        setDefenderTimer(gameConfig.initTimeSeconds);
        setPassTimer(gameConfig.passPenaltySeconds);
        setActivePlayer('challenger');
        setWinner(null);
        setIsPassPenaltyActive(false);
        setQuestionId(1)
    }, [gameConfig.initTimeSeconds, gameConfig.passPenaltySeconds, setWinner]);

    const question: Question = {
        id: questionId,
        category: getQuestionCategory(),
        imageUrl: questionImageUrl,
    }

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
            prepareDuelState,
            addTimeBoostsToPlayerTimer
        },
    };
};
