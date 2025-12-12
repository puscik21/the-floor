import {useCallback, useEffect, useState} from 'react';
import type {DuelInfo, DuelPlayer, GameState, Player, Question} from '../types';
import {getImageFromCategory} from '../components/gamescreen/question/questionUtils.ts';
import {checkImageExists} from '../components/gamescreen/question/imageLoader.ts';
import {fetchExternalImage} from '../components/gamescreen/question/tauriHelper.tsx';
import { invoke } from '@tauri-apps/api/tauri';

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
    const [isCheckingNextQuestion, setIsCheckingNextQuestion] = useState(false);

    useEffect(() => {
        if (gameState !== 'duel') return;
        const intervalId = setInterval(() => {
            if (activePlayer === 'challenger') setChallengerTimer((prev) => prev - 1);
            else setDefenderTimer((prev) => prev - 1);

            if (isPassPenaltyActive) setPassTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [activePlayer, gameState, isPassPenaltyActive]);

    const getQuestionCategory = useCallback(() => {
        // return defender?.category || 'Co to jest?'; // TODO: Revert
        return 'Informatyka';
    }, [])

    // useEffect(() => {
    //     setQuestionImageUrl(getImageFromCategory(getQuestionCategory(), questionId))
    // }, [getQuestionCategory, questionId]);

    const getWinnerOnTimeout = useCallback((challenger: Player, defender: Player) => {
        if (challengerTimer > defenderTimer) {
            return challenger;
        }
        if (defenderTimer > challengerTimer) {
            return defender;
        }
        return defender;
    }, [challengerTimer, defenderTimer]);

    const finishDuel = useCallback((winningPlayer: Player, losingPlayer: Player) => {
        setWinner(winningPlayer);
        setGameState('finished');
        conquerTerritory(winningPlayer, losingPlayer);
    }, [conquerTerritory, setGameState, setWinner])

    const fetchExternalImage = async (category: string, id: number): Promise<string> => {
        // To jest nasz nowy "getImageFromCategory" + "checkImageExists"
        const relativePath = `${category}/${id}.jpg`;

        // Wywołanie komendy Rust: Rust odczyta plik z dysku i zwróci Data URL (Base64)
        const base64DataUrl: string = await invoke('get_base64_image', {
            // Pamiętaj: w Rust dodaliśmy "categories/" do ścieżki,
            // więc tu wysyłamy tylko to, co jest wewnątrz "categories/".
            relativePath: `${category}/${id}.jpg`
        });

        return base64DataUrl;
    };

    const tryAdvanceQuestion = useCallback(async (currentId: number) => {
        if (isCheckingNextQuestion) return;

        setIsCheckingNextQuestion(true);

        const currentCategory = getQuestionCategory();
        const nextId = currentId + 1;

        try {
            // Krok 1: Próbujemy asynchronicznie pobrać następne zdjęcie z dysku (przez Rust)
            const nextImageUrl = await fetchExternalImage(currentCategory, nextId);

            // Krok 2: Jeśli Rust zwrócił Base64 (bez błędu), to plik istnieje.
            setQuestionImageUrl(nextImageUrl); // Ustawiamy nowy Data URL
            setQuestionId(nextId); // Przechodzimy do następnego ID

        } catch (error) {
            // Krok 3: Jeśli Rust zwrócił błąd, plik nie istnieje lub jest błąd odczytu.
            // W naszym przypadku błąd z Rust o braku pliku: `Błąd: Nie znaleziono pliku...`

            // TODO: Toastify
            console.warn(`Koniec pytań w kategorii ${currentCategory} (brak pliku ${nextId}.jpg). Koniec pojedynku.`, error);

            if (challenger && defender) {
                const winner = getWinnerOnTimeout(challenger, defender);
                // Wywołaj funkcję, która kończy pojedynek (zwycięstwo na czas)
                finishDuel(winner, winner.id === challenger.id ? defender : challenger);
            }
        }

        setIsCheckingNextQuestion(false);
    }, [isCheckingNextQuestion, getQuestionCategory, challenger, defender, getWinnerOnTimeout, finishDuel, setQuestionImageUrl, setQuestionId]);

    // TODO: Improve duel timer
    useEffect(() => {
        if (gameState !== 'duel') return;

        if (isPassPenaltyActive && passTimer <= 0) {
            setIsPassPenaltyActive(false);
            setPassTimer(PASS_PENALTY_SECONDS);
            tryAdvanceQuestion(questionId);
        }

        if (!challenger || !defender) return;

        if (challengerTimer <= 0) {
            finishDuel(defender, challenger);
        }
        if (defenderTimer <= 0) {
            finishDuel(challenger, defender);
        }
    }, [passTimer, challengerTimer, defenderTimer, isPassPenaltyActive, gameState, challenger, defender, setGameState, conquerTerritory, setWinner, tryAdvanceQuestion, questionId, finishDuel]);

    const handleCorrectAnswer = useCallback(() => {
        setActivePlayer((prev: DuelPlayer) => {
            return prev === 'challenger' ? 'defender' : 'challenger'
        })
        tryAdvanceQuestion(questionId);
    }, [questionId, tryAdvanceQuestion]);

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
