import {createContext, useCallback, useContext, useEffect, useState} from 'react';
import type {DuelPlayer, GameGrid, GridCell, Player} from '../types';
import {initializeGrid, MOCK_PLAYERS} from '../components/grid/gridUtils.ts';

const INIT_TIME_SECONDS = 3;
const PASS_PENALTY_SECONDS = 3;

export type GameState = 'idle' | 'map' | 'running' | 'finished';

// TODO: Move those values to some grouping Objects
interface GameContextValue {
    // General game state
    gameState: GameState;
    winner: Player | null;

    // Map state
    grid: GameGrid;
    allPlayers: Player[];
    activeMapPlayer: Player | null;

    // Duel state
    challengerTimer: number;
    defenderTimer: number;
    activePlayer: DuelPlayer;
    passTimer: number;
    isPassPenaltyActive: boolean;

    // Info to be displayed
    challengerName: string;
    defenderName: string;
    activeQuestionCategory: string;
    questionImageUrl?: string;
    questionTitle?: string;

    // Actions
    handleStartGame: () => void;
    handleReturnToMap: () => void;
    handleCellClick: (cell: GridCell) => void;
    handleCorrectAnswer: () => void;
    handlePass: () => void;
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

export const GameContextProvider = ({children}: { children: React.ReactNode }) => {
    const [gameState, setGameState] = useState<GameState>('idle');
    const [challengerTimer, setChallengerTimer] = useState(INIT_TIME_SECONDS);
    const [defenderTimer, setDefenderTimer] = useState(INIT_TIME_SECONDS);
    const [passTimer, setPassTimer] = useState(PASS_PENALTY_SECONDS);
    const [activePlayer, setActivePlayer] = useState<DuelPlayer>('challenger');
    const [winner, setWinner] = useState<Player | null>(null);
    const [isPassPenaltyActive, setIsPassPenaltyActive] = useState(false);

    const [allPlayers] = useState<Player[]>(MOCK_PLAYERS);
    const [grid, setGrid] = useState<GameGrid>([]);
    const [activeMapPlayer, setActiveMapPlayer] = useState<Player | null>(null);
    const [challenger, setChallenger] = useState<Player | null>(null);
    const [defender, setDefender] = useState<Player | null>(null);
    const [activeQuestionCategory, setActiveQuestionCategory] = useState<string | null>(null);

    useEffect(() => {
        if (gameState === 'idle') {
            setGrid(initializeGrid(allPlayers));
            const firstPlayer = allPlayers[Math.floor(Math.random() * allPlayers.length)];
            setActiveMapPlayer(firstPlayer);
        }
    }, [gameState, allPlayers]);

    useEffect(() => {
        if (gameState !== 'running') return;
        const intervalId = setInterval(() => {
            if (activePlayer === 'challenger') setChallengerTimer((prev) => prev - 1);
            else setDefenderTimer((prev) => prev - 1);

            if (isPassPenaltyActive) setPassTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [activePlayer, gameState, isPassPenaltyActive]);

    const conquerTerritory = useCallback((winnerPlayer: Player, loserPlayer: Player) => {
        const newGrid = grid.map((row) =>
            row.map((cell) => {
                if (cell.ownerId === loserPlayer.id) {
                    return {...cell, ownerId: winnerPlayer.id};
                }
                return cell;
            }),
        );
        setGrid(newGrid);
        setActiveMapPlayer(winnerPlayer);
    }, [grid]);

    useEffect(() => {
        if (gameState !== 'running') return;

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
    }, [passTimer, challengerTimer, defenderTimer, isPassPenaltyActive, gameState, challenger, defender, conquerTerritory]);

    const handleCorrectAnswer = () => setActivePlayer(activePlayer === 'challenger' ? 'defender' : 'challenger');
    const handlePass = () => setIsPassPenaltyActive(true);

    const handleStartGame = () => {
        setGameState('map');
    };

    const handleReturnToMap = () => {
        setChallenger(null);
        setDefender(null);
        setGameState('map');
    };

    const handleCellClick = (cell: GridCell) => {
        if (gameState !== 'map' || !activeMapPlayer) return;

        if (!cell.ownerId || cell.ownerId === activeMapPlayer.id) {
            console.log('Kliknij pole przeciwnika!'); // TODO: Possibly add Toast here
            return;
        }

        const currentChallenger = allPlayers.find((p) => p.id === activeMapPlayer.id);
        const currentDefender = allPlayers.find((p) => p.id === cell.ownerId);

        if (currentChallenger && currentDefender) {
            startDuel(currentChallenger, currentDefender);
        }
    };

    const startDuel = (challengerPlayer: Player, defenderPlayer: Player) => {
        setChallenger(challengerPlayer);
        setDefender(defenderPlayer);

        setChallengerTimer(INIT_TIME_SECONDS);
        setDefenderTimer(INIT_TIME_SECONDS);
        setPassTimer(PASS_PENALTY_SECONDS);
        setActivePlayer('challenger');
        setActiveQuestionCategory(defenderPlayer.category)
        setWinner(null);
        setIsPassPenaltyActive(false);
        setGameState('running');
    };

    const value: GameContextValue = {
        gameState,
        winner,
        grid,
        allPlayers,
        activeMapPlayer,
        challengerTimer,
        defenderTimer,
        activePlayer,
        passTimer,
        isPassPenaltyActive,

        challengerName: challenger?.name || 'Gracz 1',
        defenderName: defender?.name || 'Gracz 2',
        activeQuestionCategory: activeQuestionCategory || 'Co to jest?',
        questionImageUrl: 'https://przepisna.pl/wp-content/uploads/marchewka-wartosci-odzywcze.jpeg',
        questionTitle: 'Co to jest?',

        handleStartGame,
        handleReturnToMap,
        handleCellClick,
        handleCorrectAnswer,
        handlePass,
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGameContext = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGameContext must be used within a GameContextProvider');
    }
    return context;
};
