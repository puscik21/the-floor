import {createContext, useCallback, useContext, useEffect, useRef, useState} from 'react';
import type {GameContextValue, GameState, Player} from '../types';
import {useGameDuelState} from './useGameDuelState.ts';
import {useGameMapState} from './useGameMapState.ts';

const GameContext = createContext<GameContextValue | undefined>(undefined);

export const GameContextProvider = ({children}: { children: React.ReactNode }) => {
    const [gameState, setGameState] = useState<GameState>('init');
    const [winner, setWinner] = useState<Player | null>(null);

    const handleSetWinner = useCallback((player: Player | null) => setWinner(player), []);
    const handleStartGame = useCallback(() => setGameState('floor'), []);
    const handleStartDuel = useCallback(() => setGameState('duel'), []);

    // To omit circular dependencies
    const prepareDuelRef = useRef<((challenger: Player, defender: Player) => void)>(undefined);

    const startDuelWrapper = useCallback((challenger: Player, defender: Player) => {
        if (prepareDuelRef.current) {
            prepareDuelRef.current(challenger, defender);
        } else {
            console.error('prepareDuel logic not yet initialized!');
        }
    }, []);

    const {
        mapState,
        actions: mapActions,
    } = useGameMapState(gameState, startDuelWrapper);

    const {
        duelInfo,
        actions: duelActions,
    } = useGameDuelState(
        gameState,
        setGameState,
        handleSetWinner,
        mapActions.conquerTerritory,
    );

    const prepareDuel = useCallback((challenger: Player, defender: Player) => {
        duelActions.prepareDuelState(challenger, defender);
        setGameState('ready');
    }, [duelActions, setGameState]);

    // here, at the end, we connect the real function with useRef
    useEffect(() => {
        prepareDuelRef.current = prepareDuel;
    }, [prepareDuel]);

    const value: GameContextValue = {
        general: {
            gameState,
            winner,
        },
        map: mapState,
        duel: duelInfo,
        actions: {
            handleStartGame,
            handleStartDuel,
            ...mapActions,
            ...duelActions,
        },
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
