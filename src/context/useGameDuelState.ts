import {useCallback, useEffect, useState} from 'react';
import type {DuelInfo, DuelPlayer, GameState, Player, Question} from '../types';
import {getImageFromCategory} from '../components/gamescreen/question/questionUtils.ts';

const INIT_TIME_SECONDS = 300;
const PASS_PENALTY_SECONDS = 3;

interface GameDuelStateResult {
    duelInfo: DuelInfo;
    actions: {
        handleCorrectAnswer: () => void;
        handlePass: () => void;
        handleReturnToMap: () => void;
        prepareDuelState: (challenger: Player, defender: Player) => void;
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

    const [challenger, setChallenger] = useState<Player | null>(null);
    const [defender, setDefender] = useState<Player | null>(null);

    const [questionId, setQuestionId] = useState(1);
    const [questionImageUrl, setQuestionImageUrl] = useState('/util/placeholder.png');

    useEffect(() => {
        if (gameState !== 'duel') return;
        const intervalId = setInterval(() => {
            if (activePlayer === 'challenger') setChallengerTimer((prev) => prev - 1);
            else setDefenderTimer((prev) => prev - 1);

            if (isPassPenaltyActive) setPassTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [activePlayer, gameState, isPassPenaltyActive]);

    // TODO: Improve duel timer
    useEffect(() => {
        if (gameState !== 'duel') return;

        if (isPassPenaltyActive && passTimer <= 0) {
            setIsPassPenaltyActive(false);
            setPassTimer(PASS_PENALTY_SECONDS);
            setQuestionId(prevNumber => prevNumber + 1);
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
    }, [passTimer, challengerTimer, defenderTimer, isPassPenaltyActive, gameState, challenger, defender, setGameState, conquerTerritory, setWinner]);

    useEffect(() => {
        setQuestionImageUrl(getImageFromCategory(getQuestionCategory(), questionId))
    }, [questionId]);

    const handleCorrectAnswer = useCallback(() => {
        setActivePlayer((prev: DuelPlayer) => {
            return prev === 'challenger' ? 'defender' : 'challenger'
        })
        setQuestionId(prevNumber => prevNumber + 1);
    }, []);

    const handlePass = useCallback(() => setIsPassPenaltyActive(true), []);

    const handleReturnToMap = useCallback(() => {
        setChallenger(null);
        setDefender(null);
        setGameState('map');
    }, [setGameState]);

    const prepareDuelState = useCallback((challengerPlayer: Player, defenderPlayer: Player) => {
        setChallenger(challengerPlayer);
        setDefender(defenderPlayer);
        setChallengerTimer(INIT_TIME_SECONDS);
        setDefenderTimer(INIT_TIME_SECONDS);
        setPassTimer(PASS_PENALTY_SECONDS);
        setActivePlayer('challenger');
        setWinner(null);
        setIsPassPenaltyActive(false);
        setQuestionId(1)
    }, [setWinner]);

    const getQuestionCategory = () => {
        // return defender?.category || 'Co to jest?'; // TODO: Revert
        return 'Informatyka';
    }

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
        },
    };
};
