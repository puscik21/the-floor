import {createContext, useCallback, useContext, useEffect, useRef, useState} from 'react';
import type {GameConfig, GameContextValue, GameState, Player} from '../types';
import {useGameDuelState} from './useGameDuelState.ts';
import {useGameMapState} from './useGameMapState.ts';

const GameContext = createContext<GameContextValue | undefined>(undefined);

const defaultGameConfig: GameConfig = {
    initTimeSeconds: 60,
    passPenaltySeconds: 3,
};

export const GameContextProvider = ({children}: { children: React.ReactNode }) => {
    const [gameState, setGameState] = useState<GameState>('init');
    const [winner, setWinner] = useState<Player | null>(null);
    const [gameConfig, setGameConfig] = useState<GameConfig>(defaultGameConfig);

    useEffect(() => {
        loadGameConfig().then(config => {
            setGameConfig(config);
        })
    }, []);

    // TODO: use generic method for loading files
    const loadGameConfig = async (): Promise<GameConfig> => {
        try {
            // Date.now() - to omit browser's cache (cache busting)
            const response = await fetch(`./config.json?t=${Date.now()}`);
            if (!response.ok) {
                throw new Error(`Błąd: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Nie udało się załadować graczy:', error);
            return defaultGameConfig;
        }
    }

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
        gameConfig,
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

    useEffect(() => {
        if (mapState.allPlayers.length == 1) {
            setGameState('podium')
        }
    }, [mapState.allPlayers, mapState.positionToPlayer]);

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
